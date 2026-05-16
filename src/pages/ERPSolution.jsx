import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Database, TrendingUp, BarChart3, Users, Zap, Lock, Cloud, CheckCircle2, ArrowRight, ShoppingCart, Grid, MessageSquare, Download, Mail, Phone, MapPin, Package, FileText, X, Building2, DollarSign, Truck, Settings } from 'lucide-react'
import cloudnetQR from '../assets/img/cloudnetid.jpeg'

const ERPSolution = () => {
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
    { id: 'overview', label: 'Overview', icon: <Building2 size={20} /> },
    { id: 'modules', label: 'Modules', icon: <Grid size={20} /> },
    { id: 'download', label: 'Download Catalog', icon: <Download size={20} /> },
    { id: 'contact', label: 'Contact Us', icon: <MessageSquare size={20} /> }
  ]

  const modules = [
    {
      icon: <Package className="w-12 h-12" />,
      title: 'Inventory Management',
      description: 'Complete inventory control with real-time tracking, automated reordering, and multi-location warehouse management.',
      features: [
        'Real-time stock tracking across multiple warehouses',
        'Automated low-stock alerts and reorder points',
        'Barcode and RFID integration for accurate tracking',
        'Batch and serial number tracking',
        'Stock transfer between locations',
        'Comprehensive inventory reports and analytics',
        'Cycle counting and physical inventory management',
        'Multi-unit of measure support'
      ]
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: 'Financial Planning & Analysis',
      description: 'Advanced financial management with real-time reporting, budgeting, forecasting, and comprehensive accounting features.',
      features: [
        'Complete general ledger and chart of accounts',
        'Accounts payable and receivable management',
        'Multi-currency support with auto exchange rates',
        'Real-time financial statements and reports',
        'Budget planning and variance analysis',
        'Cash flow forecasting and management',
        'Fixed asset management and depreciation',
        'Tax calculation and compliance reporting'
      ]
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Supply Chain Management',
      description: 'End-to-end supply chain visibility with procurement, vendor management, and logistics optimization.',
      features: [
        'Purchase order management and approval workflows',
        'Vendor performance tracking and evaluation',
        'Supplier relationship management (SRM)',
        'Demand forecasting and planning',
        'Logistics and shipment tracking',
        'Quality control and inspection management',
        'Contract management and compliance',
        'Automated procurement and sourcing'
      ]
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: 'Cloud Infrastructure',
      description: 'Secure, scalable cloud-based ERP solution accessible anywhere, anytime with enterprise-grade security and reliability.',
      features: [
        '99.9% uptime guarantee with redundancy',
        'Automatic backups and disaster recovery',
        'Scalable infrastructure grows with your business',
        'Global access from any device or location',
        'Enterprise-grade security and encryption',
        'Regular updates and feature enhancements',
        'Zero hardware maintenance required',
        'API integration with third-party systems'
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Analytics & Reporting',
      description: 'Powerful business intelligence tools with customizable dashboards, real-time insights, and predictive analytics.',
      features: [
        'Real-time business intelligence dashboards',
        'Customizable reports and KPI tracking',
        'Advanced data visualization tools',
        'Predictive analytics and forecasting',
        'Drill-down capabilities for detailed analysis',
        'Scheduled report generation and distribution',
        'Export to Excel, PDF, and other formats',
        'Role-based access to reports and data'
      ]
    },
    {
      icon: <Lock className="w-12 h-12" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with role-based access control, data encryption, and compliance with international standards.',
      features: [
        'Multi-level role-based access control',
        'End-to-end data encryption (in transit & at rest)',
        'Comprehensive audit trails and logging',
        'GDPR and data privacy compliance',
        'Two-factor authentication (2FA)',
        'Regular security audits and penetration testing',
        'IP whitelisting and access restrictions',
        'Compliance with ISO 27001 standards'
      ]
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete ERP Solution for Modern Businesses
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Transform your business operations with our comprehensive cloud-based ERP system. Streamline processes, improve efficiency, and gain real-time visibility across your entire organization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Operations</h3>
                    <p className="text-gray-600">
                      Integrate all business processes - finance, inventory, supply chain, HR, and more - into one powerful platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Data</h3>
                    <p className="text-gray-600">
                      Access live business insights and analytics to make informed decisions instantly from anywhere.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Reduction</h3>
                    <p className="text-gray-600">
                      Eliminate redundancies, optimize resources, and reduce operational costs by up to 30% with automated workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Cloud className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Scalability</h3>
                    <p className="text-gray-600">
                      Cloud-based architecture that grows with your business - from startups to enterprises with multiple locations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose CloudNet ERP?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quick Implementation</h4>
                    <p className="text-gray-700 text-sm">Go live in weeks, not months with our proven methodology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                    <p className="text-gray-700 text-sm">Round-the-clock technical support and training</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Customizable</h4>
                    <p className="text-gray-700 text-sm">Tailored to your specific industry and business needs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <span>Schedule a Demo</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )

      case 'modules':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive ERP Modules
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our ERP solution includes all essential modules to manage your entire business operations efficiently and effectively.
              </p>
            </div>

            <div className="grid gap-6">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-orange-100 p-4 rounded-xl text-orange-600 flex-shrink-0">
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{module.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{module.description}</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {module.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <span>Request Module Demo</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )

      case 'download':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Download Resources
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get detailed information about our ERP solution, implementation process, and pricing options.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <FileText className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Product Brochure</h3>
                      <p className="text-gray-600 mb-4">
                        Comprehensive overview of all ERP modules, features, and benefits. Learn how CloudNet ERP can transform your business operations.
                      </p>
                      <div className="text-sm text-gray-500">PDF • 15 pages • 5.2 MB</div>
                    </div>
                  </div>
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2 ml-4">
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <Settings className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Implementation Guide</h3>
                      <p className="text-gray-600 mb-4">
                        Step-by-step guide to implementing CloudNet ERP in your organization. Includes timeline, best practices, and success factors.
                      </p>
                      <div className="text-sm text-gray-500">PDF • 25 pages • 8.7 MB</div>
                    </div>
                  </div>
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2 ml-4">
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <DollarSign className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pricing & Plans</h3>
                      <p className="text-gray-600 mb-4">
                        Detailed pricing information for different ERP packages and modules. Find the plan that best fits your business size and needs.
                      </p>
                      <div className="text-sm text-gray-500">PDF • 10 pages • 3.1 MB</div>
                    </div>
                  </div>
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2 ml-4">
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-8 rounded-xl border-2 border-orange-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Quote?</h3>
                <p className="text-gray-600 mb-6">
                  Contact our sales team for personalized pricing based on your specific requirements
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Contact Sales</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our ERP solution? Our team is here to help you find the perfect solution for your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="mailto:info@cloudnetsoftwares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">info@cloudnetsoftwares.com</p>
                  </div>
                </div>
              </a>

              <a
                href="tel:+6694871235"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">+66-94871235</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect on WhatsApp</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/66948712350"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">+66-948712350</div>
                      <div className="text-sm text-gray-600">English Support</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </a>

                <a
                  href="https://wa.me/66952477020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">+66-952477020</div>
                      <div className="text-sm text-gray-600">Thai Support</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">CloudNet Line Official</h3>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={cloudnetQR}
                    alt="CloudNet Line QR Code"
                    className="w-48 h-48 rounded-lg border-4 border-orange-200"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-600 mb-4">
                    Scan the QR code to add us on Line for quick responses and support
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-lg">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">@cloudnetsoftwares</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Schedule a Demo Meeting</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>CloudNet ERP Solution - Enterprise Resource Planning System</title>
        <meta name="description" content="CloudNet ERP - Comprehensive cloud-based enterprise resource planning system with inventory management, financial planning, supply chain, and real-time analytics." />
        <meta name="keywords" content="ERP system, enterprise resource planning, inventory management, financial management, supply chain, business software, cloud ERP" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/erp-solution" />
        <meta property="og:title" content="CloudNet ERP - Enterprise Resource Planning Solution" />
        <meta property="og:description" content="Professional cloud-based ERP system for complete business management and operational efficiency." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/erp-solution" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CloudNet ERP Solution
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-50">
              Transform Your Business with Intelligent Enterprise Resource Planning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Schedule a Demo</span>
                <ArrowRight size={20} />
              </button>
              <Link
                to="/contact"
                className="bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-900 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Contact Sales</span>
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-orange-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-gray-50 rounded-2xl p-8">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Scheduling Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setIsModalOpen(false)
                setSubmitted(false)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Demo</h3>
            <p className="text-gray-600 mb-6">
              Fill out the form below and our team will contact you to schedule a personalized demo of CloudNet ERP.
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-800 px-6 py-4 rounded-lg mb-4">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Request Submitted Successfully!</p>
                  <p className="text-sm mt-2">We'll contact you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={demoFormData.name}
                    onChange={handleDemoFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={demoFormData.contact}
                    onChange={handleDemoFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={demoFormData.description}
                    onChange={handleDemoFormChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your business needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Businesses Choose CloudNet ERP
              </h2>
              <p className="text-xl text-gray-600">
                Experience the benefits of a modern, cloud-based ERP solution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Faster Processes</h3>
                <p className="text-gray-600">Automate workflows and reduce manual tasks by 70%</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Increased Revenue</h3>
                <p className="text-gray-600">Improve sales and revenue by 25% on average</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Better Collaboration</h3>
                <p className="text-gray-600">Connect teams and departments seamlessly</p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
                <p className="text-gray-600">Make informed decisions with real-time analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-orange-50">
              Join hundreds of businesses that have already streamlined their operations with CloudNet ERP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Get Started Today</span>
                <ArrowRight size={20} />
              </button>
              <Link
                to="/contact"
                className="bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-900 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Contact Us</span>
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ERPSolution
