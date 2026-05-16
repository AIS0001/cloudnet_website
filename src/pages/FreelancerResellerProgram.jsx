import { Helmet } from 'react-helmet-async'
import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, CheckCircle2, DollarSign, Send, UserPlus, Users, Briefcase } from 'lucide-react'
import emailjs from '@emailjs/browser'

const FreelancerResellerProgram = () => {
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLICKEY || ''
  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

  const [activeTab, setActiveTab] = useState('restaurant-pos')
  const [openFaq, setOpenFaq] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    freelancerType: '',
    salesChannels: '',
    monthlyLeads: '',
    message: '',
    productsInterested: [],
    agreeTerms: false
  })

  useEffect(() => {
    if (emailJsPublicKey) {
      emailjs.init(emailJsPublicKey)
    }
  }, [emailJsPublicKey])

  const commissionPlans = useMemo(() => ([
    {
      key: 'restaurant-pos',
      product: 'Restaurant POS',
      commission: '15% per successful sale',
      payout: 'Paid monthly after client confirmation',
      notes: 'Best for restaurant, cafe, and food court leads.'
    },
    {
      key: 'erp-solution',
      product: 'ERP Solution',
      commission: '20% for first 6 months subscription value',
      payout: 'Monthly recurring commission for 6 months',
      notes: 'Ideal for SME operations, inventory, and accounting clients.'
    },
    {
      key: 'pos-machine',
      product: 'POS Machine',
      commission: '7% per hardware unit sold',
      payout: 'Per unit payout after completed delivery',
      notes: 'Great for electronics and retail reseller networks.'
    },
    {
      key: 'printer-thermal',
      product: 'Printer & Thermal Paper',
      commission: '10% on printers, 6% on thermal paper orders',
      payout: 'Combined payout at the end of each month',
      notes: 'Works well for repeat sales and consumable re-orders.'
    }
  ]), [])

  const faqs = [
    {
      q: 'Who can join the Freelancer Reseller Program?',
      a: 'Any freelancer, consultant, agency partner, or independent sales professional can apply. If you can connect businesses with the right software, you are welcome to join.'
    },
    {
      q: 'How do commissions work?',
      a: 'Each CloudNet product has a different commission structure. Once a referred customer completes the purchase and onboarding, your commission is calculated and paid based on the product plan.'
    },
    {
      q: 'Do I need technical knowledge to sell?',
      a: 'Not mandatory. We provide product briefs, sales materials, and support from our team so you can confidently present solutions to your clients.'
    },
    {
      q: 'How long does application review take?',
      a: 'Most applications are reviewed within 1-3 working days. We will contact you by email or phone after reviewing your profile.'
    }
  ]

  const programSteps = [
    {
      icon: <UserPlus size={24} />,
      title: 'Register',
      description: 'Submit your details and preferred products through the application form.'
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Get Onboarded',
      description: 'Receive product training, sales assets, and your reseller process guide.'
    },
    {
      icon: <Users size={24} />,
      title: 'Refer & Close',
      description: 'Introduce CloudNet solutions to your clients and collaborate with our team to close deals.'
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Earn Commission',
      description: 'Get paid based on the product-specific commission model for each successful sale.'
    }
  ]

  const leftInfoCards = [
    {
      title: 'Why Join This Program?',
      points: [
        'No joining fee or hidden subscription for freelancers',
        'Dedicated support while pitching to your clients',
        'Fast onboarding with product and sales guidance'
      ]
    },
    {
      title: 'Who Succeeds Most?',
      points: [
        'Freelancers with local business networks',
        'Marketing professionals handling SME clients',
        'Consultants already advising on operations tools'
      ]
    }
  ]

  const rightInfoCards = [
    {
      title: 'Quick Program Facts',
      points: [
        'Multiple products with different commission rates',
        'Monthly payout cycle with clear deal validation',
        'Higher-value products can generate recurring income'
      ]
    },
    {
      title: 'Before You Apply',
      points: [
        'Prepare your main sales channels and target market',
        'Select products that fit your client segment',
        'Share estimated leads for faster profile review'
      ]
    }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox' && name === 'agreeTerms') {
      setFormData((prev) => ({ ...prev, agreeTerms: checked }))
      setError('')
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleProductToggle = (productName) => {
    setFormData((prev) => {
      const exists = prev.productsInterested.includes(productName)
      return {
        ...prev,
        productsInterested: exists
          ? prev.productsInterested.filter((item) => item !== productName)
          : [...prev.productsInterested, productName]
      }
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

    if (!formData.agreeTerms) {
      setError('Please accept the program terms to continue.')
      return
    }

    if (!formData.productsInterested.length) {
      setError('Please select at least one product you want to sell.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const templateParams = {
        to_email: 'info@cloudnetsoftwares.com',
        subject: 'New Freelancer Reseller Program Registration',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        freelancer_type: formData.freelancerType,
        sales_channels: formData.salesChannels,
        monthly_leads: formData.monthlyLeads,
        products_interested: formData.productsInterested.join(', '),
        message: formData.message || 'No additional note provided.'
      }

      const response = await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        templateParams
      )

      if (response.status === 200) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          freelancerType: '',
          salesChannels: '',
          monthlyLeads: '',
          message: '',
          productsInterested: [],
          agreeTerms: false
        })
      }
    } catch (err) {
      console.error('Freelancer program submission error:', err)

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

      setError('Failed to submit your registration. Please try again in a few minutes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Freelancer Reseller Program - CloudNet Softwares</title>
        <meta name="description" content="Join CloudNet Softwares Freelancer Reseller Program. Register, sell our products, and earn commissions with product-specific commission structures." />
        <meta name="keywords" content="freelancer reseller program, CloudNet affiliate, software commission, partner program, reseller registration" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/freelancer-reseller-program" />
        <meta property="og:title" content="Freelancer Reseller Program - CloudNet Softwares" />
        <meta property="og:description" content="Sell CloudNet products and earn commissions. Apply to become a freelancer reseller partner." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/freelancer-reseller-program" />
      </Helmet>

      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Freelancer <span className="text-primary">Reseller Program</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Partner with CloudNet Softwares, recommend the right products to your clients, and earn reliable commissions from successful sales.
          </p>
          <a href="#register" className="btn-primary inline-block">Apply Now</a>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">How The Program <span className="text-primary">Works</span></h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              A simple process designed for freelancers who want to generate recurring income while helping businesses adopt smarter tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programSteps.map((step, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-primary flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Product Commission <span className="text-primary">Structure</span></h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Every product has a unique payout model, so you can focus on the customers and categories you know best.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-8">
              {commissionPlans.map((plan) => (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setActiveTab(plan.key)}
                  className={`px-5 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === plan.key
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                  }`}
                >
                  {plan.product}
                </button>
              ))}
            </div>

            {commissionPlans
              .filter((plan) => plan.key === activeTab)
              .map((plan) => (
                <div key={plan.key} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                  <h3 className="text-3xl font-bold mb-6">{plan.product}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-orange-50 rounded-xl p-5">
                      <p className="text-sm text-gray-600 mb-2">Commission</p>
                      <p className="text-xl font-bold text-primary">{plan.commission}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-5">
                      <p className="text-sm text-gray-600 mb-2">Payout Terms</p>
                      <p className="text-xl font-bold text-primary">{plan.payout}</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-5">
                      <p className="text-sm text-gray-600 mb-2">Best Fit</p>
                      <p className="text-xl font-bold text-primary">{plan.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-title">Program <span className="text-primary">FAQs</span></h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <div key={index} className="border-2 border-gray-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    <span className="text-lg font-semibold text-gray-900">{item.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-primary transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-title">Register As A <span className="text-primary">Freelancer Reseller</span></h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Fill in your details and our team will review your profile. All submissions are sent directly to info@cloudnetsoftwares.com.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="hidden lg:block lg:col-span-3 space-y-6">
                {leftInfoCards.map((card) => (
                  <div key={card.title} className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5">
                    <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                    <ul className="space-y-3">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-gray-100">
                {submitted ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Application Submitted</h3>
                    <p className="text-gray-600">Thank you for applying. Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4">
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="+66-..."
                        />
                      </div>

                      <div>
                        <label htmlFor="freelancerType" className="block text-gray-700 font-medium mb-2">Freelancer Type *</label>
                        <select
                          id="freelancerType"
                          name="freelancerType"
                          value={formData.freelancerType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        >
                          <option value="">Select your profile</option>
                          <option value="Independent Sales Freelancer">Independent Sales Freelancer</option>
                          <option value="Digital Marketing Freelancer">Digital Marketing Freelancer</option>
                          <option value="Business Consultant">Business Consultant</option>
                          <option value="Agency Partner">Agency Partner</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country *</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                          placeholder="Your country"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="salesChannels" className="block text-gray-700 font-medium mb-2">Sales Channels *</label>
                      <input
                        type="text"
                        id="salesChannels"
                        name="salesChannels"
                        value={formData.salesChannels}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        placeholder="Example: Facebook, LinkedIn, direct network, referrals"
                      />
                    </div>

                    <div>
                      <label htmlFor="monthlyLeads" className="block text-gray-700 font-medium mb-2">Estimated Leads Per Month *</label>
                      <input
                        type="number"
                        id="monthlyLeads"
                        name="monthlyLeads"
                        value={formData.monthlyLeads}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <p className="block text-gray-700 font-medium mb-3">Products You Want To Sell *</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {commissionPlans.map((plan) => (
                          <label key={plan.key} className="flex items-start gap-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.productsInterested.includes(plan.product)}
                              onChange={() => handleProductToggle(plan.product)}
                              className="mt-1"
                            />
                            <span className="text-gray-800 font-medium">{plan.product}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Additional Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                        placeholder="Tell us about your audience, industry focus, or previous reseller experience."
                      />
                    </div>

                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <span className="text-gray-700">
                        I confirm that the information provided is accurate and I agree to be contacted by CloudNet Softwares regarding this reseller application.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                      <span>{loading ? 'Submitting...' : 'Submit Registration'}</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="hidden lg:block lg:col-span-3 space-y-6">
                {rightInfoCards.map((card) => (
                  <div key={card.title} className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5">
                    <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                    <ul className="space-y-3">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 size={16} className="text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FreelancerResellerProgram