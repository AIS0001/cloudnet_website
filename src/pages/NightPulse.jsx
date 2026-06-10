import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Grid, MessageSquare, Download, Mail, Phone, MapPin, CheckCircle2, Zap, ArrowRight, Lock, Globe, TrendingUp, X, BarChart3, Crown, Building2, Music2, Smartphone } from 'lucide-react'
import cloudnetQR from '../assets/img/cloudnetid.jpeg'
import planImage from '../assets/download/plan.jpg'

const NightPulse = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    contact: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDemoFormChange = (e) => {
    setDemoFormData({
      ...demoFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('name', demoFormData.name)
      formData.append('contact', demoFormData.contact)
      formData.append('description', demoFormData.description || 'No description provided')
      formData.append('_captcha', 'false')

      const response = await fetch('https://formsubmit.co/info@cloudnetsoftwares.com', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSubmitted(true)
        setDemoFormData({ name: '', contact: '', description: '' })
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitted(false)
        }, 2000)
      } else {
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <ShoppingCart size={20} /> },
    { id: 'modules', label: 'Modules', icon: <Grid size={20} /> },
    { id: 'download', label: 'Download Catalog', icon: <Download size={20} /> },
    { id: 'contact', label: 'Contact Us', icon: <MessageSquare size={20} /> }
  ]

  const modules = [
    {
      name: 'POS Billing by Cashier',
      plan: 'Starter',
      description: 'Complete billing and checkout system with multiple payment methods, split bills, and real-time transaction tracking.',
      features: ['Multi-payment methods', 'Split billing', 'Receipt printing', 'Customer tracking']
    },
    {
      name: 'Inventory Module',
      plan: 'Advanced',
      description: 'Manage stock levels for drinks, snacks, and bar items across multiple locations with real-time updates and automated alerts.',
      features: ['Real-time stock tracking', 'Multi-location support', 'Low stock alerts', 'Supplier management']
    },
    {
      name: 'Items Management',
      plan: 'Standard',
      description: 'Create and manage menu and bar items with variants, pricing, and package information.',
      features: ['Item variants', 'Dynamic pricing', 'Package tags', 'Item images']
    },
    {
      name: 'Rooms & Tables Management',
      plan: 'Standard',
      description: 'Optimize room and table management with floor plans, reservations, and wait time tracking for your venue.',
      features: ['Digital floor plan', 'Room reservations', 'Room/table status tracking', 'Wait list management']
    },
    {
      name: 'Reports (20+ Types)',
      plan: 'Pro',
      description: 'Comprehensive reporting with sales, inventory, staff, and customer analytics.',
      features: ['Sales reports', 'Inventory reports', 'Staff performance', 'Customer insights', 'Custom reports']
    },
    {
      name: 'Categories & Subcategories',
      plan: 'Standard',
      description: 'Organize products with unlimited categories and subcategories for better management.',
      features: ['Unlimited categories', 'Custom ordering', 'Image support', 'Quick access']
    },
    {
      name: 'Loyalty Program',
      plan: 'Pro',
      description: 'Build repeat business with points, rewards, and member-exclusive offers integrated into billing.',
      features: ['Points accumulation', 'Reward redemption', 'Member tiers', 'Targeted promotions']
    },
    {
      name: 'Kayotee Commission Management',
      plan: 'Pro',
      description: 'Track and manage commissions for Kayotee staff on every bill, with automatic calculation and settlement.',
      features: ['Per-bill commission tracking', 'Configurable commission rates', 'Daily/monthly settlement', 'Commission payout history']
    },
    {
      name: 'Kayotee Management & Reports',
      plan: 'Pro',
      description: 'Manage Kayotee profiles, attendance, and room assignments with dedicated performance and earnings reports.',
      features: ['Kayotee profile management', 'Attendance & assignment tracking', 'Earnings reports', 'Top performer insights']
    },
    {
      name: 'Manager App',
      plan: 'Enterprise',
      description: 'A dedicated mobile app for managers to monitor sales, rooms, staff, and Kayotee activity on the go.',
      features: ['Live sales dashboard', 'Room status overview', 'Staff & Kayotee monitoring', 'Approve discounts & voids remotely']
    },
    {
      name: 'POS App for Quick Actions',
      plan: 'Enterprise',
      description: 'Lightweight mobile POS app for fast order taking, billing, and room handover during peak hours.',
      features: ['Quick order entry', 'Mobile billing & payments', 'Room/table handover', 'Offline-ready quick actions']
    }
  ]

  const pricingPackages = [
    {
      id: 'basic',
      title: 'Basic',
      subtitle: 'Perfect for Small Venues',
      price: '฿500',
      period: '/month',
      billed: 'Billed Annually',
      icon: <BarChart3 size={42} />,
      downloadName: 'nightpulse-basic-plan.jpg',
      features: [
        'One Cashier account',
        'One Manager Account',
        'Basic Sale Report - Bill Wise',
        'Up to 20 rooms/tables accessible',
        'Menu setup by our team',
        '24/7 helpline support',
        'Extra 200 baht per user account',
        'Extra 200 baht/month for kitchen printer'
      ]
    },
    {
      id: 'premium',
      title: 'Premium',
      subtitle: 'For Established Venues',
      price: '฿1000',
      period: '/month',
      billed: 'Billed Annually',
      icon: <Crown size={42} />,
      downloadName: 'nightpulse-premium-plan.jpg',
      features: [
        'Includes all basic features',
        'Advanced level inventory included',
        'Item-wise sale report',
        'All types of inventory reports',
        'Export report PDF/Excel',
        'Up to 50 rooms/tables accessible',
        'Kayotee commission management',
        'Split/Merge room or table'
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      subtitle: 'For Large Scale Venues',
      price: '฿1500',
      period: '/month',
      billed: 'Billed Annually',
      icon: <Building2 size={42} />,
      downloadName: 'nightpulse-enterprise-plan.jpg',
      features: [
        'Includes all premium features',
        'Unlimited user accounts',
        'Admin ID for software management',
        'Unlimited item uploads',
        'Unlimited room/table management',
        'Kayotee management & reports',
        'Manager and POS app access',
        'Free visit to outlet'
      ]
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              CloudNet NightPulse is a comprehensive cloud-based point of sale system designed specifically for bars,
              clubs, and karaoke (Kayotee) venues. With 20+ integrated modules including Kayotee commission management
              and dedicated Manager and POS apps, manage every aspect of your venue from a single platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <Zap className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Lightning Fast Performance</h4>
                <p className="text-gray-600 text-sm">Cloud-based architecture ensures instant response times and 99.9% uptime.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <Lock className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Enterprise Security</h4>
                <p className="text-gray-600 text-sm">Bank-level encryption and compliance with PCI-DSS standards for complete protection.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <Globe className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Multi-Location Support</h4>
                <p className="text-gray-600 text-sm">Manage unlimited locations with centralized control and real-time synchronization.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <TrendingUp className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Advanced Analytics</h4>
                <p className="text-gray-600 text-sm">Real-time dashboards with 20+ customizable reports for data-driven decisions.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <Music2 className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Kayotee Commission Management</h4>
                <p className="text-gray-600 text-sm">Automatically calculate, track, and settle Kayotee commissions on every bill.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <Smartphone className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Manager & POS Apps</h4>
                <p className="text-gray-600 text-sm">Dedicated mobile apps for managers to monitor operations and for staff to take quick actions.</p>
              </div>
            </div>
          </div>
        )

      case 'modules':
        return (
          <div>
            <p className="text-gray-700 mb-8">All the modules you need, available in different plans:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold flex-1">{module.name}</h4>
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {module.plan}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  <div className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle2 size={16} className="text-primary mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-8">
            <p className="text-gray-700">
              Have questions about NightPulse POS? Our team is here to help!
            </p>

            {/* Contact Information Grid */}
            <div className="bg-white border-2 border-primary rounded-lg p-8">
              <h4 className="text-2xl font-bold mb-6">CloudNet Softwares Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Contact Info */}
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-lg text-primary mb-2">Company Address</h5>
                    <p className="text-gray-700 leading-relaxed">
                      109/19, Soi 14, Pattaya<br />
                      Moo 10, Nong Prue, Banglamung<br />
                      Chonburi, Thailand
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-primary mb-2">WhatsApp</h5>
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <a
                          href="https://wa.me/66948712350"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-fit"
                        >
                          <Phone size={18} />
                          <span>+66-948712350</span>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">For English Support</p>
                      </div>
                      <div className="flex flex-col">
                        <a
                          href="https://wa.me/66952477020"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 w-fit"
                        >
                          <Phone size={18} />
                          <span>+66-952477020</span>
                        </a>
                        <p className="text-gray-600 text-xs mt-1 ml-4">For Thai Support</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">Chat with us on WhatsApp</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-primary mb-2">Email</h5>
                    <a href="mailto:info@cloudnetsoftwares.com" className="text-primary hover:text-primary-600 font-semibold block">
                      info@cloudnetsoftwares.com
                    </a>
                    <p className="text-gray-600 text-sm mt-2">We respond within 2 hours</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-primary mb-2">Line ID</h5>
                    <p className="text-gray-700 font-semibold">@cloudnetsoftwares</p>
                    <p className="text-gray-600 text-sm mt-2">Connect with us on Line</p>
                  </div>
                </div>

                {/* Right Column - QR Code */}
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
                    <img
                      src={cloudnetQR}
                      alt="CloudNet ID QR Code"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">Scan to connect with us</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-primary p-8 rounded-lg text-center">
              <h4 className="text-xl font-bold mb-4">Schedule a Demo</h4>
              <p className="text-gray-600 mb-6">See NightPulse POS in action with a personalized demo for your venue</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        )

      case 'download':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              Choose your package and click Get Started to download the pricing plan image.
            </p>

            <div className="bg-[radial-gradient(circle_at_20%_20%,#2a2a2a_0%,#0f0f0f_45%,#050505_100%)] p-4 md:p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPackages.map((pkg) => (
                  <article key={pkg.id} className="bg-[#ececec] rounded-[2rem] border-[5px] border-primary overflow-hidden shadow-2xl">
                    <div className="bg-black text-white rounded-b-[2rem] px-6 pt-4 pb-12 text-center">
                      <h4 className="text-4xl font-extrabold uppercase tracking-wide">{pkg.title}</h4>
                      <p className="text-orange-300 font-semibold text-sm mt-1">{pkg.subtitle}</p>
                    </div>

                    <div className="-mt-9 flex justify-center">
                      <div className="w-[96px] h-[96px] bg-black text-white rounded-full border-4 border-primary flex items-center justify-center">
                        {pkg.icon}
                      </div>
                    </div>

                    <div className="px-6 pb-5 pt-4">
                      <div className="text-center border-b border-primary/50 pb-3 mb-4">
                        <p className="text-4xl font-extrabold text-gray-900">
                          {pkg.price}<span className="text-3xl text-gray-700">{pkg.period}</span>
                        </p>
                        <p className="font-bold text-gray-900">{pkg.billed}</p>
                      </div>

                      <ul className="space-y-2 min-h-[260px]">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-800 leading-snug">
                            <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={planImage}
                        download={pkg.downloadName}
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary hover:bg-primary-600 text-white font-extrabold text-2xl py-2.5 transition-all duration-300"
                      >
                        GET STARTED
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-orange-100 p-6 rounded-lg border border-primary">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> Request a free trial to experience NightPulse POS firsthand with your team.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      <Helmet>
        <title>NightPulse POS - Bar, Club & Karaoke (Kayotee) Management System</title>
        <meta name="description" content="NightPulse POS by CloudNet - Cloud-based POS system for bars, clubs, and karaoke venues with billing, inventory, room management, Kayotee commission management, and Manager/POS apps." />
        <meta name="keywords" content="NightPulse, karaoke POS, kayotee commission management, bar POS, club management software, nightlife POS, cloud-based POS" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/nightpulse" />
        <meta property="og:title" content="NightPulse POS - Bar, Club & Karaoke Management System" />
        <meta property="og:description" content="Professional cloud-based POS system designed for bars, clubs, and karaoke venues to streamline operations and maximize profitability." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/nightpulse" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              NightPulse <span className="text-primary">POS Systems</span>
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-semibold">
              The Complete Cloud-Based POS for Bars, Clubs & Karaoke (Kayotee) Venues
            </p>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline operations, manage Kayotee commissions, and drive revenue growth with CloudNet's comprehensive
              nightlife POS platform. Manage billing, inventory, rooms, staff, and analytics all in one place,
              with dedicated Manager and POS apps for quick actions.
            </p>
          </div>
        </div>
      </section>

      {/* Tab System Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Left Sidebar - Tab Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="md:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Venue?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join venues using NightPulse POS to streamline operations, manage Kayotee commissions, and enhance customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center space-x-2">
              <span>Schedule Your Demo</span>
              <ArrowRight size={20} />
            </button>
            <Link to="/products" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Explore Other Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose NightPulse <span className="text-primary">POS?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built for bars, clubs, and karaoke venues with all the features you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Real-Time Synchronization',
                description: 'All your locations, devices, and staff are perfectly synchronized in real-time, ensuring consistency across your entire operation.'
              },
              {
                title: 'Kayotee Commission Management',
                description: 'Automatically calculate and track Kayotee commissions per bill, with daily and monthly settlement reports.'
              },
              {
                title: 'Kayotee Management & Reports',
                description: 'Manage Kayotee profiles, attendance, and room assignments with dedicated performance and earnings reports.'
              },
              {
                title: 'Manager & POS Apps',
                description: 'Give managers a live view of sales and operations on mobile, while staff use the POS app for quick order and billing actions.'
              },
              {
                title: 'Comprehensive Analytics',
                description: 'Access 20+ customizable reports with real-time dashboards to monitor sales, inventory, staff performance, and customer behavior.'
              },
              {
                title: 'Multi-Location Management',
                description: 'Manage unlimited venue locations from a single dashboard with centralized control and per-location customization.'
              },
              {
                title: '24/7 Global Support',
                description: 'Our dedicated support team is available round-the-clock to ensure your venue operations never skip a beat.'
              },
              {
                title: 'Enterprise-Grade Security',
                description: 'Bank-level encryption, PCI-DSS compliance, and automatic backups protect your data and your customers\' information.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Scheduling Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {submitted ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Success!</h3>
                <p className="text-gray-600">Thank you! We've received your demo request. Our team will contact you soon.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold">Schedule a Demo</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleDemoSubmit} className="p-8 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={demoFormData.name}
                      onChange={handleDemoFormChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      name="contact"
                      value={demoFormData.contact}
                      onChange={handleDemoFormChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="+66-948712350"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={demoFormData.description}
                      onChange={handleDemoFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                      rows="3"
                      placeholder="Tell us about your venue and requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Request Demo'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NightPulse
