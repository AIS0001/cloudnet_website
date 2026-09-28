const nodemailer = require('nodemailer')
const config = require('../config')

let transporter = null
function getTransporter() {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.password) {
    throw new Error('Email is not configured on the server (missing SMTP_HOST/SMTP_USER/SMTP_PASSWORD).')
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password
      }
    })
  }
  return transporter
}

async function sendMail({ subject, html, replyTo }) {
  const transport = getTransporter()
  await transport.sendMail({
    from: config.mailFrom,
    to: config.mailTo,
    replyTo,
    subject,
    html
  })
}

module.exports = { sendMail }
