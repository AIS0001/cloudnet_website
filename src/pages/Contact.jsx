import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Navigation, MessageCircle } from 'lucide-react'
import cloudnetQR from '../assets/img/cloudnetid.jpeg'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLICKEY || ''
  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (emailJsPublicKey) {
      emailjs.init(emailJsPublicKey)
    }
  }, [emailJsPublicKey])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
      setError('Email form is not configured. Please set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID in your environment file.')
      return
    }

    if (!emailJsServiceId.startsWith('service_')) {
      setError('Invalid EmailJS Service ID format. It should look like service_xxxxx.')
      return
    }

    if (!emailJsTemplateId.startsWith('template_')) {
      setError('Invalid EmailJS Template ID format. It should look like template_xxxxx.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const templateParams = {
        to_email: 'info@cloudnetsoftwares.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message
      }

      const response = await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        templateParams
      )

      if (response.status === 200) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      }
    } catch (err) {
      console.error('Email send error:', err)

      if (err?.status === 400 && typeof err?.text === 'string') {
        if (err.text.toLowerCase().includes('service id not found')) {
          setError('EmailJS Service ID was not found. Please check VITE_EMAILJS_SERVICE_ID in your environment file.')
          return
        }

        if (err.text.toLowerCase().includes('template id not found')) {
          setError('EmailJS Template ID was not found. Please check VITE_EMAILJS_TEMPLATE_ID in your environment file.')
          return
        }

        if (err.text.toLowerCase().includes('public key is invalid')) {
          setError('EmailJS Public Key is invalid. Please check VITE_EMAILJS_PUBLIC_KEY in your environment file.')
          return
        }
      }

      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={30} />,
      title: "Email Us",
      content: "info@cloudnetsoftwares.com",
      link: "mailto:info@cloudnetsoftwares.com"
    },
    {
      icon: <Phone size={30} />,
      title: "Call Us",
      content: "+66-948712350",
      link: "tel:+66948712350"
    },
    {
      icon: <MessageCircle size={30} />,
      title: "WhatsApp",
      content: "+66-948712350",
      link: "https://wa.me/66948712350"
    },
    {
      icon: <MapPin size={30} />,
      title: "Visit Us",
      content: "109/19, Soi 14, Pattaya, Moo 10, Nong Prue, Banglamung, Chonburi",
      link: "https://maps.app.goo.gl/khD19HsDttQkMzXB8"
    }
  ]

  return (
    <div>
      <Helmet>
        <title>Contact Us - CloudNet Softwares | Get in Touch</title>
        <meta name="description" content="Contact CloudNet Softwares today. Reach out via email, phone, WhatsApp, or Line for inquiries about our POS and ERP solutions." />
        <meta name="keywords" content="contact CloudNet, support, inquiries, sales, technical support, WhatsApp, Line" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/contact" />
        <meta property="og:title" content="Contact CloudNet Softwares" />
        <meta property="og:description" content="Get in touch with our team. We're here to help with your business software needs." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/contact" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-100 p-6 rounded-xl text-center hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </a>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                  <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-4">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="+66-948712350"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
                </>
              )}
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <div className="bg-gray-200 rounded-xl overflow-hidden mb-6 h-96">
                <iframe
                  src="https://www.google.com/maps?q=109/19%2C%20Soi%2014%2C%20Pattaya%2C%20Moo%2010%2C%20Nong%20Prue%2C%20Banglamung%2C%20Chonburi&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
              <a
                href="https://maps.app.goo.gl/khD19HsDttQkMzXB8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 justify-center mb-6 shadow-lg"
              >
                <Navigation size={20} />
                <span>Get Directions on Google Maps</span>
              </a>
              <div className="bg-gradient-to-r from-primary to-orange-500 p-8 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose CloudNet?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-1" />
                    <span>Expert team with 10+ years of experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-1" />
                    <span>100% client satisfaction guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-1" />
                    <span>Agile development methodology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-1" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-1" />
                    <span>Competitive pricing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Line QR Code and WhatsApp Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect With Us on <span className="text-primary">Social Channels</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reach out to us via WhatsApp or Line for quick support and inquiries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* WhatsApp Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.567.906-2.889 2.236-3.76 3.862C5.124 13.769 4.75 15.572 5.051 17.33c.3 1.758 1.147 3.335 2.466 4.599 1.319 1.264 3.078 2.016 4.949 2.245 1.87.229 3.75-.213 5.359-1.288 1.61-1.075 2.842-2.637 3.614-4.55.772-1.912.867-4.07.284-6.077-.583-2.007-1.855-3.673-3.519-4.697-1.663-1.024-3.66-1.362-5.558-.864z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">WhatsApp</h3>
              <p className="text-gray-600 mb-6">Chat with us directly on WhatsApp for instant support</p>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <a
                    href="https://wa.me/66948712350"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-fit"
                  >
                    <MessageCircle size={20} />
                    <span>+66-948712350</span>
                  </a>
                  <p className="text-gray-600 text-xs mt-1 ml-4">For English Support</p>
                </div>
                <div className="flex flex-col">
                  <a
                    href="https://wa.me/66952477020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-fit"
                  >
                    <MessageCircle size={20} />
                    <span>+66-952477020</span>
                  </a>
                  <p className="text-gray-600 text-xs mt-1 ml-4">For Thai Support</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">Chat with us anytime</p>
            </div>

            {/* Line QR Code Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="inline-block bg-gray-100 p-4 rounded-lg border-2 border-gray-200">
                  <img 
                    src={cloudnetQR} 
                    alt="CloudNet Line QR Code" 
                    className="w-40 h-40 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Line ID</h3>
              <p className="text-gray-600 mb-6">Scan the QR code to add us on Line or search for @cloudnetsoftwares</p>
              <p className="text-primary font-semibold text-lg">@cloudnetsoftwares</p>
              <p className="text-gray-600 mt-4 text-sm">Scan the code above to connect</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is your typical project timeline?",
                a: "Project timelines vary based on complexity, but most projects range from 2-6 months. We provide detailed timelines during the planning phase."
              },
              {
                q: "Do you offer post-launch support?",
                a: "Yes! We provide comprehensive post-launch support and maintenance packages to ensure your software runs smoothly."
              },
              {
                q: "What technologies do you specialize in?",
                a: "We specialize in React, Node.js, Python, Java, mobile development (React Native, Flutter), and cloud platforms (AWS, Azure, GCP)."
              },
              {
                q: "How do you ensure project quality?",
                a: "We follow industry best practices, conduct rigorous testing, code reviews, and maintain constant communication throughout the development process."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-xl shadow-lg group">
                <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
