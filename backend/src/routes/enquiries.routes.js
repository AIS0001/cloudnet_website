const express = require('express')
const rateLimit = require('express-rate-limit')
const { sendMail } = require('../utils/mailer')
const { escapeHtml, nl2br } = require('../utils/html')

const router = express.Router()

const enquiryLimiter = rateLimit({
  windowMs: 20 * 1000,
  limit: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Please wait a moment before sending another message.' }
})

router.post('/contact', enquiryLimiter, async (req, res, next) => {
  try {
    const data = req.body || {}
    const name = String(data.name || '').trim()
    const email = String(data.email || '').trim()
    const phone = String(data.phone || '').trim()
    const subject = String(data.subject || '').trim()
    const message = String(data.message || '').trim()
    const honeypot = String(data.website || '').trim()

    if (honeypot) {
      // Bot filled the hidden field — pretend success, send nothing.
      return res.json({ success: true })
    }

    const errors = []
    if (!name || name.length > 150) errors.push('A valid name is required.')
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200) errors.push('A valid email address is required.')
    if (!subject || subject.length > 200) errors.push('A subject is required.')
    if (!message || message.length > 5000) errors.push('A message (up to 5000 characters) is required.')
    if (phone && phone.length > 40) errors.push('Phone number is too long.')

    if (errors.length) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
        <h2 style="color: #f97316;">New Contact Form Submission</h2>
        <table cellpadding="6" cellspacing="0">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || 'Not provided')}</td></tr>
          <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
        </table>
        <p><strong>Message:</strong></p>
        <p>${nl2br(message)}</p>
      </div>
    `

    await sendMail({ subject: `Website Enquiry: ${subject}`, html, replyTo: email })
    res.json({ success: true })
  } catch (err) {
    err.status = err.status || 502
    err.publicMessage = 'Failed to send message. Please try again later or contact us directly.'
    next(err)
  }
})

router.post('/reseller-application', enquiryLimiter, async (req, res, next) => {
  try {
    const data = req.body || {}
    const fullName = String(data.fullName || '').trim()
    const email = String(data.email || '').trim()
    const phone = String(data.phone || '').trim()
    const city = String(data.city || '').trim()
    const country = String(data.country || '').trim()
    const freelancerType = String(data.freelancerType || '').trim()
    const salesChannels = String(data.salesChannels || '').trim()
    const monthlyLeads = String(data.monthlyLeads || '').trim()
    const message = String(data.message || '').trim()
    const productsInterested = Array.isArray(data.productsInterested) ? data.productsInterested : []
    const agreeTerms = Boolean(data.agreeTerms)
    const honeypot = String(data.website || '').trim()

    if (honeypot) {
      return res.json({ success: true })
    }

    const errors = []
    if (!fullName || fullName.length > 150) errors.push('A valid full name is required.')
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200) errors.push('A valid email address is required.')
    if (!phone || phone.length > 40) errors.push('A valid phone number is required.')
    if (!city || city.length > 100) errors.push('City is required.')
    if (!country || country.length > 100) errors.push('Country is required.')
    if (!freelancerType || freelancerType.length > 100) errors.push('Freelancer type is required.')
    if (!salesChannels || salesChannels.length > 300) errors.push('Sales channels are required.')
    if (!monthlyLeads || monthlyLeads.length > 100) errors.push('Estimated monthly leads is required.')
    if (message.length > 3000) errors.push('Message is too long.')
    if (!productsInterested.length) errors.push('Please select at least one product.')
    if (!agreeTerms) errors.push('Please accept the program terms to continue.')

    if (errors.length) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const productsList = productsInterested.map((p) => escapeHtml(String(p))).join(', ')

    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
        <h2 style="color: #f97316;">New Freelancer Reseller Program Registration</h2>
        <table cellpadding="6" cellspacing="0">
          <tr><td><strong>Full Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>City</strong></td><td>${escapeHtml(city)}</td></tr>
          <tr><td><strong>Country</strong></td><td>${escapeHtml(country)}</td></tr>
          <tr><td><strong>Freelancer Type</strong></td><td>${escapeHtml(freelancerType)}</td></tr>
          <tr><td><strong>Sales Channels</strong></td><td>${escapeHtml(salesChannels)}</td></tr>
          <tr><td><strong>Estimated Monthly Leads</strong></td><td>${escapeHtml(monthlyLeads)}</td></tr>
          <tr><td><strong>Products Interested</strong></td><td>${productsList}</td></tr>
        </table>
        <p><strong>Message:</strong></p>
        <p>${nl2br(message || 'No additional note provided.')}</p>
      </div>
    `

    await sendMail({ subject: 'New Freelancer Reseller Program Registration', html, replyTo: email })
    res.json({ success: true })
  } catch (err) {
    err.status = err.status || 502
    err.publicMessage = 'Failed to submit your registration. Please try again in a few minutes.'
    next(err)
  }
})

module.exports = router
