import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane, Grid, MessageSquare, Tag, Phone, CheckCircle2, XCircle, ArrowRight, X, Crown, Building2, User, Users, Sparkles, BrainCircuit, LineChart, ShieldAlert, MessagesSquare, FileText, Map as MapIcon, CalendarCheck, Wallet, Receipt, HeartHandshake as Handshake, Store, Globe, Bell, BellRing, ShieldCheck, History, KeyRound, Hotel, Car, MapPin, Package, BarChart3, FileSpreadsheet, Coins, Clock, Percent, Smartphone } from 'lucide-react'
import cloudnetQR from '../assets/img/cloudnetid.jpeg'
import ScrollReveal from '../components/animations/ScrollReveal'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'
import ProductJourney from '../components/cloudnet/ProductJourney'
import AIEngineConnect from '../components/cloudnet/AIEngineConnect'
import PhoneMockup from '../components/cloudnet/PhoneMockup'
import navigoLogo from '../assets/img/navigo-app/navigo-logo.webp'
import navigoHero from '../assets/img/navigo-app/navigo-hero.webp'
import navigoBanner from '../assets/img/navigo-app/navigo-banner.webp'
import screenDashboard from '../assets/img/navigo-app/screen-dashboard.webp'
import screenBookings from '../assets/img/navigo-app/screen-bookings.webp'
import screenQuotations from '../assets/img/navigo-app/screen-quotations.webp'
import screenReports from '../assets/img/navigo-app/screen-reports.webp'
import screenSubscription from '../assets/img/navigo-app/screen-subscription.webp'
import screenPortalSelect from '../assets/img/navigo-app/screen-portal-select.webp'

const APP_SCREENS = [
  {
    src: screenDashboard,
    title: 'Live Dashboard',
    desc: 'Total bookings, revenue, amount collected and pending bookings at a glance, with a bookings-by-status chart and 6-month trend.'
  },
  {
    src: screenBookings,
    title: 'Bookings',
    desc: 'Search by name or booking number and filter by pending, confirmed, completed or cancelled - with paid, partial or unpaid status on every booking.'
  },
  {
    src: screenQuotations,
    title: 'Quotations',
    desc: 'Every quotation with its number, validity date and total, filtered by draft, sent, accepted or rejected.'
  },
  {
    src: screenReports,
    title: 'Reports',
    desc: 'Revenue by customer type (B2C, B2B, group), money collected by payment method, and expenses by category.'
  },
  {
    src: screenSubscription,
    title: 'Subscription',
    desc: 'See your plan, billing cycle, feature limits and usage, full payment history, and pay online in one tap.'
  },
  {
    src: screenPortalSelect,
    title: 'Staff & Agent Login',
    desc: 'One app, two doors - shop staff sign in to run the business, B2B agents and corporate accounts sign in to quote and book.'
  }
]

const TRIP_LIFECYCLE = [
  { icon: FileText, title: 'First Quotation', desc: 'Price hotels, activities, transfers and packages for the customer in minutes.' },
  { icon: MapIcon, title: 'Package Builder & Itinerary', desc: 'Build a day-by-day itinerary with hotel rooms, activities, vehicles and transfers.' },
  { icon: CalendarCheck, title: 'Confirmed Booking', desc: 'Convert an accepted quotation into a booking in one click - prices stay exactly as quoted.' },
  { icon: Wallet, title: 'Operations & Payments', desc: 'Record payments and trip expenses as they happen; payment status updates automatically.' },
  { icon: Receipt, title: 'Final Invoice', desc: 'Generate a branded PDF invoice straight from the booking.' }
]

const QUOTATION_FEATURES = [
  { icon: Package, title: 'Visual Package Builder', desc: 'Combine hotels, activities, vehicles and transfers into reusable tour packages with day-by-day itineraries.' },
  { icon: Percent, title: 'Smart Pricing Engine', desc: 'Seasons, markups, discounts, tax, service charge and commission calculated for you - with separate B2C, B2B, corporate and group pricing.' },
  { icon: Coins, title: 'Multi-Currency Support', desc: 'Quote in THB, USD, EUR, GBP, INR, AED, CNY, RUB and more, with the exchange rate saved on each quotation.' },
  { icon: FileText, title: 'Professional PDF Quotations', desc: 'Auto-numbered quotations (QT-000001) downloaded as branded PDFs, ready to send.' }
]

const PORTALS = [
  {
    icon: Store,
    title: 'Shop Staff',
    tag: 'Admins & Staff',
    desc: 'Run the whole business - master data, pricing, quotations, bookings, payments, invoices and reports.',
    points: ['Full dashboard & reports', 'Team roles & permissions', 'Convert quotations to bookings']
  },
  {
    icon: Handshake,
    title: 'B2B Agent Portal',
    tag: 'Travel Agents',
    desc: 'Partner agents log in to browse your packages, build their own quotations at B2B prices and track their bookings.',
    points: ['Agent-only B2B pricing', 'Own quotations & bookings', 'Commission shown per booking']
  },
  {
    icon: Building2,
    title: 'Corporate Accounts',
    tag: 'Companies',
    desc: 'Give corporate clients their own login with corporate pricing and custom credit terms.',
    points: ['Corporate-tier pricing', 'Custom credit terms', 'Same simple portal as agents']
  },
  {
    icon: Globe,
    title: 'B2C Online Storefront',
    tag: 'Travellers',
    desc: 'A public storefront where customers browse your packages, see live prices, register and book directly - including group bookings.',
    points: ['Self-registration', 'Live B2C price preview', 'Bookings land in your queue']
  }
]

const MASTER_DATA = [
  { icon: MapPin, label: 'Locations' },
  { icon: Hotel, label: 'Hotels & Rooms' },
  { icon: Sparkles, label: 'Activities & Tours' },
  { icon: Car, label: 'Vehicles & Transfers' },
  { icon: Package, label: 'Packages' },
  { icon: Clock, label: 'Seasons' }
]

const OPERATIONS_FEATURES = [
  { icon: Wallet, title: 'Payments Ledger', desc: 'Record cash, bank transfer and card payments against each booking. Status moves from unpaid to partial to paid automatically.' },
  { icon: Receipt, title: 'Trip Expenses', desc: 'Log fuel, food, accommodation, permits, tips and other costs per booking.' },
  { icon: LineChart, title: 'True Net Profit', desc: 'Every booking shows revenue minus real expenses, so you know what each trip actually earned.' },
  { icon: FileSpreadsheet, title: 'Sales Reports & Export', desc: 'Revenue and booking counts by status and customer type over any date range, exported to Excel or PDF.' }
]

const SECURITY_FEATURES = [
  { icon: KeyRound, title: 'Team Roles & Fine-Grained Permissions', desc: 'Decide exactly what each role can see and do - and override permissions for individual users.' },
  { icon: History, title: 'Full Audit Trail', desc: 'Every create, edit and delete is logged with old and new values, filterable and exportable.' },
  { icon: BellRing, title: 'Automated Booking Reminders', desc: 'Schedule reminders a set number of hours before travel starts; they appear in the notification bell on time.' },
  { icon: Bell, title: 'Instant Notifications', desc: 'New bookings, quotations, accepted or rejected quotes, and payments received - your team hears about it straight away.' }
]

const AI_BENEFITS = [
  { icon: LineChart, title: 'Booking & Revenue Forecasts', desc: 'Spot busy seasons early and plan hotels, vehicles and staff ahead.' },
  { icon: BrainCircuit, title: 'Package Performance Insights', desc: 'See which packages, destinations and agents bring in the most profit.' },
  { icon: ShieldAlert, title: 'Unpaid & Margin Alerts', desc: 'Flags overdue balances and bookings where expenses eat into profit.' },
  { icon: MessagesSquare, title: 'AI Chat Insights', desc: 'Ask questions about your bookings and reports and get plain-language answers.' }
]

const NAVIGO_BLUE = 'from-blue-600 to-sky-500'

const Navigo = () => {
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
      formData.append('product', 'Navigo Travel Agent Software')
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
    { id: 'overview', label: 'Overview', icon: <Plane size={20} /> },
    { id: 'modules', label: 'Modules', icon: <Grid size={20} /> },
    { id: 'pricing', label: 'Pricing Plans', icon: <Tag size={20} /> },
    { id: 'contact', label: 'Contact Us', icon: <MessageSquare size={20} /> }
  ]

  const modules = [
    {
      name: 'Master Data',
      description: 'Locations, hotels and rooms, activities, vehicles and travel types - with a one-click starter data set to get going fast.',
      features: ['Thailand location hierarchy', 'Hotels, rooms & meal plans', 'Activities & vehicles', 'Load default data']
    },
    {
      name: 'Pricing Engine',
      description: 'Seasonal price rules for hotels, activities, transfers and packages with markup, discount, tax, service charge and commission.',
      features: ['Seasons & price rules', 'B2C / B2B / corporate / group tiers', 'Currency conversion', 'Price calculator']
    },
    {
      name: 'Package Builder',
      description: 'Build tour packages with a day-by-day itinerary and flat or per-person pricing.',
      features: ['Day-by-day itinerary', 'Hotel, activity, vehicle & transfer items', 'Flat or per-pax prices', 'Reusable packages']
    },
    {
      name: 'Quotations',
      description: 'Create priced quotations whose prices are locked at the time of quoting, then send them as PDFs.',
      features: ['Auto-numbered quotations', 'Manual discount', 'Multi-currency display', 'PDF download']
    },
    {
      name: 'Booking Engine',
      description: 'Take bookings directly or convert an accepted quotation into a booking with the quoted prices unchanged.',
      features: ['Quotation to booking in one click', 'Group bookings', 'Payment ledger', 'Pending / confirmed / completed status']
    },
    {
      name: 'Expenses & Net Profit',
      description: 'Track the real cost of each trip and see profit per booking.',
      features: ['Fuel, food, accommodation & more', 'Per-booking expenses', 'Net profit per booking', 'Expenses by category report']
    },
    {
      name: 'Invoices & Documents',
      description: 'Generate invoices from bookings and download branded PDF quotations, invoices and reports.',
      features: ['Invoice snapshots', 'Branded PDFs', 'Bank details & terms', 'Void invoices']
    },
    {
      name: 'B2B Agent & Corporate Portal',
      description: 'A separate login for partner agents and corporate clients to quote and book at their own prices.',
      features: ['Agent & corporate accounts', 'Custom credit terms', 'Commission visibility', 'Own quotations & bookings']
    },
    {
      name: 'B2C Storefront',
      description: 'A public online storefront where customers register and book your packages directly.',
      features: ['Public package listing', 'Live price preview', 'Customer self-registration', 'Group booking option']
    },
    {
      name: 'Reports & Analytics',
      description: 'Dashboards and sales reports by status, customer type and payment method.',
      features: ['Revenue by customer type', 'Collections by payment method', 'Expenses by category', 'Excel & PDF export']
    },
    {
      name: 'Notifications & Reminders',
      description: 'In-app notifications for key events and scheduled reminders before each trip.',
      features: ['Booking & payment alerts', 'Quotation accepted / rejected', 'Travel reminders', 'Staff announcements']
    },
    {
      name: 'Users, Roles & Audit',
      description: 'Control who can do what and keep a full history of every change.',
      features: ['Roles & permissions', 'Per-user overrides', 'Audit log with export', 'Secure login']
    },
    {
      name: 'Navigo Mobile App',
      description: 'Run the business from your phone - dashboard, bookings, quotations, reports and subscription on Android.',
      features: ['Staff & B2B agent login', 'Live dashboard', 'Bookings & quotations', 'Reports on the go']
    }
  ]

  const pricingPlans = [
    {
      id: 'starter',
      title: 'Starter',
      subtitle: 'For new & small agencies',
      price: '฿990',
      icon: <User size={36} />,
      features: [
        { text: 'Up to 5 users', included: true },
        { text: 'Up to 100 bookings', included: true },
        { text: 'Quotations, packages & invoices', included: true },
        { text: 'Reports & mobile app', included: true },
        { text: 'B2B agent portal', included: false },
        { text: 'Corporate module', included: false }
      ]
    },
    {
      id: 'professional',
      title: 'Professional',
      subtitle: 'For growing agencies',
      price: '฿2,900',
      popular: true,
      icon: <Users size={36} />,
      features: [
        { text: 'Up to 25 users', included: true },
        { text: 'Up to 1,000 bookings', included: true },
        { text: 'Quotations, packages & invoices', included: true },
        { text: 'Reports & mobile app', included: true },
        { text: 'B2B agent portal', included: true },
        { text: 'Corporate module', included: false }
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      subtitle: 'For large operators',
      price: '฿6,900',
      icon: <Crown size={36} />,
      features: [
        { text: 'Unlimited users', included: true },
        { text: 'Unlimited bookings', included: true },
        { text: 'Quotations, packages & invoices', included: true },
        { text: 'Reports & mobile app', included: true },
        { text: 'B2B agent portal', included: true },
        { text: 'Corporate module', included: true }
      ]
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              Navigo by CloudNet Softwares is a complete cloud-based travel agent software for tour operators,
              travel agencies and destination management companies. It covers the full trip lifecycle - from the
              first quotation and package itinerary to the confirmed booking, payments, trip expenses and the final
              invoice - and serves B2C travellers, B2B agents, corporate clients and groups from one platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: MapIcon, title: 'Packages & Itineraries', desc: 'Build day-by-day tour packages from your own hotels, activities, vehicles and transfers.' },
                { icon: Percent, title: 'B2B & B2C Pricing', desc: 'The same product priced differently for travellers, agents, corporate clients and groups.' },
                { icon: Handshake, title: 'Agent & Corporate Portals', desc: 'Partners quote and book on their own login, at their own prices.' },
                { icon: LineChart, title: 'True Net Profit', desc: 'Payments and trip expenses on every booking show what each trip really earned.' },
                { icon: Coins, title: 'Multi-Currency', desc: 'Quote international customers in their own currency.' },
                { icon: Smartphone, title: 'Web & Mobile App', desc: 'Full web back office plus an Android app for staff and agents on the move.' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-100">
                    <Icon className="text-blue-600 mb-3" size={24} />
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'modules':
        return (
          <div>
            <p className="text-gray-700 mb-8">Everything a travel business needs, in one connected platform:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <div key={module.name} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold mb-3">{module.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  <div className="space-y-2">
                    {module.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <CheckCircle2 size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">
              Simple monthly plans in Thai Baht. Every plan starts with a free trial.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.id}
                  className={`relative rounded-2xl p-6 flex flex-col ${
                    plan.id === 'enterprise'
                      ? 'bg-[#0b1f44] text-white'
                      : 'bg-white border-2 ' + (plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/20' : 'border-gray-200')
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${NAVIGO_BLUE} text-white flex items-center justify-center mb-4`}>
                    {plan.icon}
                  </span>
                  <h4 className="text-2xl font-bold">{plan.title}</h4>
                  <p className={`text-sm mb-4 ${plan.id === 'enterprise' ? 'text-blue-200' : 'text-gray-500'}`}>{plan.subtitle}</p>
                  <p className={`text-4xl font-extrabold ${plan.id === 'enterprise' ? 'text-white' : 'text-blue-600'}`}>{plan.price}</p>
                  <p className={`text-sm mb-5 ${plan.id === 'enterprise' ? 'text-blue-200' : 'text-gray-500'}`}>THB / month</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-400'}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full rounded-full font-bold py-2.5 transition-all duration-300 ${
                      plan.id === 'enterprise'
                        ? 'bg-white text-blue-700 hover:bg-blue-50'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </article>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-sky-100 p-6 rounded-lg border border-blue-300">
              <p className="text-gray-700">
                <strong>Pro Tip:</strong> Start on any plan and upgrade as you grow - your data, packages and
                bookings carry over automatically.
              </p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-8">
            <p className="text-gray-700">
              Have questions about Navigo Travel Agent Software? Our team is here to help!
            </p>

            <div className="bg-white border-2 border-blue-500 rounded-lg p-8">
              <h4 className="text-2xl font-bold mb-6">CloudNet Softwares Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-lg text-blue-600 mb-2">Company Address</h5>
                    <p className="text-gray-700 leading-relaxed">
                      109/19, Soi 14, Pattaya<br />
                      Moo 10, Nong Prue, Banglamung<br />
                      Chonburi, Thailand
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-blue-600 mb-2">WhatsApp</h5>
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
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-blue-600 mb-2">Email</h5>
                    <a href="mailto:info@cloudnetsoftwares.com" className="text-blue-600 hover:text-blue-700 font-semibold block">
                      info@cloudnetsoftwares.com
                    </a>
                    <p className="text-gray-600 text-sm mt-2">We respond within 2 hours</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-lg text-blue-600 mb-2">Line ID</h5>
                    <p className="text-gray-700 font-semibold">@cloudnetsoftwares</p>
                    <p className="text-gray-600 text-sm mt-2">Connect with us on Line</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-200">
                    <img src={cloudnetQR} alt="CloudNet ID QR Code" className="w-48 h-48 object-contain" />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">Scan to connect with us</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-500 p-8 rounded-lg text-center">
              <h4 className="text-xl font-bold mb-4">Schedule a Demo</h4>
              <p className="text-gray-600 mb-6">See Navigo in action with a personalized demo for your travel business</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Schedule Demo
              </button>
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
        <title>Navigo - Travel Agent Software for B2B & B2C Travel Agencies | CloudNet</title>
        <meta name="description" content="Navigo by CloudNet - cloud-based travel agent software with package builder, day-by-day itineraries, quotations, bookings, payments, expenses and net profit reports, B2B agent portal, corporate accounts, B2C storefront and mobile app." />
        <meta name="keywords" content="Navigo, travel agent software, tour operator software, travel agency management system, B2B travel portal, B2C travel booking, itinerary builder, travel quotation software, DMC software Thailand, tour package builder" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/navigo" />
        <meta property="og:title" content="Navigo - Travel Agent Software (B2B & B2C)" />
        <meta property="og:description" content="Your complete travel business management platform - quote, build itineraries, book, collect payments and invoice from one system." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/navigo" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <img src={navigoLogo} alt="Navigo Travel Agent Software logo" className="w-64 md:w-80 mx-auto lg:mx-0 mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                Your Complete Travel Business{' '}
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Management Platform</span>
              </h1>
              <p className="text-2xl text-gray-700 mb-4 font-semibold">Book &nbsp;|&nbsp; Manage &nbsp;|&nbsp; Grow</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Navigo is an all-in-one booking and operations platform for travel agencies and tour operators.
                Build packages and itineraries, send quotations, confirm bookings, collect payments and invoice -
                for B2C travellers, B2B agents, corporate clients and groups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Schedule a Demo
                  <ArrowRight size={18} />
                </button>
                <a
                  href="#navigo-details"
                  onClick={() => setActiveTab('pricing')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  View Pricing
                </a>
              </div>
            </div>
            <motion.img
              src={navigoHero}
              alt="Navigo travel agent software on laptop and mobile"
              className="w-full rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </section>

      {/* Product Journey Strip */}
      <section className="py-8 bg-slate-950">
        <div className="container mx-auto px-4">
          <ProductJourney stages={['Quotation', 'Itinerary', 'Booking', 'Payments', 'Invoice', 'AI Insights']} />
        </div>
      </section>

      {/* Full Trip Lifecycle */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <Plane size={14} />
              Full Trip Lifecycle
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              From First Quote to <span className="text-blue-600">Final Invoice</span>
            </h2>
            <p className="text-gray-600 text-lg">
              One connected flow - nothing re-typed, nothing lost between departments.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {TRIP_LIFECYCLE.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="relative bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${NAVIGO_BLUE} text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30`}>
                    <Icon size={24} />
                  </span>
                  <span className="text-xs font-bold text-blue-600">STEP {i + 1}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  {i < TRIP_LIFECYCLE.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 text-blue-400" size={20} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* App Screens */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              See the Navigo App <span className="text-sky-400">In Action</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Real screens from the Navigo mobile app - your dashboard, bookings, quotations and reports, wherever
              you are.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {APP_SCREENS.map((screen, i) => (
              <ScrollReveal key={screen.title} delay={(i % 3) * 0.1}>
                <PhoneMockup src={screen.src} alt={`Navigo app - ${screen.title}`} className="mb-5" />
                <h3 className="text-white font-bold text-center mb-1.5">{screen.title}</h3>
                <p className="text-slate-400 text-sm text-center leading-relaxed">{screen.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quotations, Packages & Pricing */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left">
              <span className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
                <FileText size={14} className="text-sky-400" />
                Quotations & Itineraries
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                Build Packages. <span className="text-blue-600">Quote in Minutes.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Set up your hotels, activities, vehicles and transfers once. Navigo prices every item with your
                seasonal rules, so quotations are accurate every time - and locked in once sent.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {QUOTATION_FEATURES.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <span className="w-10 h-10 rounded-lg bg-slate-900 text-sky-400 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-snug">{feature.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              {/* Itinerary mock */}
              <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-6">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">QT-000012</p>
                    <p className="text-lg font-bold text-gray-900">Phuket & Phi Phi Escape</p>
                    <p className="text-xs text-gray-500">3 Days · 2 Adults · B2C</p>
                  </div>
                  <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Draft</span>
                </div>
                <div className="space-y-4">
                  {[
                    { day: 'Day 1', items: [[Car, 'Airport transfer - Phuket'], [Hotel, 'Beachfront hotel - Deluxe room']] },
                    { day: 'Day 2', items: [[Sparkles, 'Phi Phi island speedboat tour'], [Hotel, 'Beachfront hotel - Deluxe room']] },
                    { day: 'Day 3', items: [[MapPin, 'Old Town city tour'], [Car, 'Hotel to airport transfer']] }
                  ].map((d) => (
                    <div key={d.day} className="flex gap-3">
                      <span className="w-14 flex-shrink-0 text-xs font-bold text-blue-600 pt-1">{d.day}</span>
                      <div className="flex-1 space-y-1.5">
                        {d.items.map(([Icon, text]) => (
                          <div key={text} className="flex items-center gap-2 bg-blue-50/60 rounded-lg px-3 py-2 text-sm text-gray-700">
                            <Icon size={14} className="text-blue-500 flex-shrink-0" />
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 mt-5 pt-4">
                  <div className="text-xs text-gray-500">
                    <p>Total (THB)</p>
                    <p>≈ USD shown to customer</p>
                  </div>
                  <p className="text-2xl font-extrabold text-blue-600">฿24,800</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Master data chips */}
          <div className="max-w-6xl mx-auto mt-14 flex flex-wrap justify-center gap-3">
            {MASTER_DATA.map((item) => {
              const Icon = item.icon
              return (
                <span key={item.label} className="inline-flex items-center gap-2 bg-white border border-blue-100 shadow-sm rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
                  <Icon size={16} className="text-blue-600" />
                  {item.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* B2B / B2C / Corporate Portals */}
      <section className="relative py-20 bg-gradient-to-br from-[#061530] via-[#0b1f44] to-[#061530] overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-sky-400/15 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <Users size={14} />
              B2B & B2C | Agent Managed
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              One Platform, <span className="text-sky-400">Every Kind of Customer</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Each audience gets its own login and its own prices - while you manage everything from one back office.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon
              return (
                <ScrollReveal key={portal.title} delay={i * 0.08}>
                  <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-sky-400/50 transition-colors duration-300">
                    <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${NAVIGO_BLUE} text-white flex items-center justify-center mb-4`}>
                      <Icon size={22} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-sky-300">{portal.tag}</span>
                    <h3 className="text-white font-bold text-lg mt-1 mb-2">{portal.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{portal.desc}</p>
                    <ul className="space-y-1.5">
                      {portal.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={15} className="text-sky-400 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payments, Expenses & Reports */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              {/* Profit mock */}
              <div className="bg-slate-950 rounded-2xl p-6 shadow-2xl text-white">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <p className="text-xs text-slate-400">BK-000011 · Wedding Party</p>
                    <p className="font-bold">Booking Profit</p>
                  </div>
                  <span className="text-xs font-semibold bg-amber-400/15 text-amber-300 px-3 py-1 rounded-full">Partial</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    ['Revenue', '฿87,500', 'text-white'],
                    ['Expenses', '฿31,200', 'text-rose-300'],
                    ['Net Profit', '฿56,300', 'text-emerald-300']
                  ].map(([label, value, color]) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-[11px] text-slate-400">{label}</p>
                      <p className={`font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-2">Expenses by category</p>
                <div className="space-y-2">
                  {[
                    ['Accommodation', 60],
                    ['Fuel', 18],
                    ['Food', 14],
                    ['Permits & Tips', 8]
                  ].map(([label, pct], i) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>{label}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${NAVIGO_BLUE} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
                <BarChart3 size={14} className="text-sky-400" />
                Bookings & Reports
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                Know What Every Trip <span className="text-blue-600">Really Earns</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Payments and trip expenses live on the booking itself, so your reports show true net profit -
                not just revenue.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {OPERATIONS_FEATURES.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.title} className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-snug">{feature.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Operations & Security */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <ShieldCheck size={14} />
              Operations & Security
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Team, <span className="text-blue-600">Under Control</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Roles, permissions, a full audit trail and automatic reminders keep a growing team organised and accountable.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SECURITY_FEATURES.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={(i % 2) * 0.1}>
                  <div className="h-full bg-white p-6 rounded-xl border-l-4 border-blue-600 flex items-start gap-4 hover:shadow-lg transition-all duration-300">
                    <span className="w-12 h-12 rounded-lg bg-slate-900 text-sky-400 flex items-center justify-center flex-shrink-0">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-6xl mx-auto">
            <img
              src={navigoBanner}
              alt="Navigo - All-in-one booking and operations platform by CloudNet Softwares"
              className="w-full rounded-2xl shadow-2xl"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Clario AI Integration Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <AIEngineConnect product="Navigo" benefits={AI_BENEFITS} />
        </div>
      </section>

      {/* Tab System Section */}
      <section id="navigo-details" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-8">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-sky-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Grow Your Travel Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join travel agencies and tour operators using Navigo to quote faster, book more trips and see the real
            profit behind every booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center space-x-2"
            >
              <span>Schedule Your Demo</span>
              <ArrowRight size={20} />
            </button>
            <a
              href="https://wa.me/66948712350"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              <span>+66-948712350</span>
            </a>
            <Link to="/products" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
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
              Why Choose <span className="text-blue-600">Navigo?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built for travel agencies, tour operators and DMCs that sell to travellers, agents and companies
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Easy Booking', description: 'Turn an accepted quotation into a booking in one click, with prices exactly as quoted and payments tracked on the booking.' },
              { title: 'Manage Agents', description: 'Give partner agents their own portal and prices, and see the commission on every booking they bring in.' },
              { title: 'B2B & Corporate Solutions', description: 'Corporate accounts with their own pricing tier and credit terms, alongside B2C and group customers.' },
              { title: 'Reports & Analytics', description: 'Dashboards and sales reports by status, customer type and payment method, with true net profit per booking.' },
              { title: 'Secure & Reliable', description: 'Each shop\'s data is fully separated, with role-based permissions and a complete audit trail.' },
              { title: 'Local Support in Thailand', description: 'Built by CloudNet Softwares in Pattaya, with English and Thai support over WhatsApp and LINE.' }
            ].map((benefit) => (
              <div key={benefit.title} className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300">
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
                  <h2 className="text-2xl font-bold">Schedule a Navigo Demo</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
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
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="+66-948712350"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={demoFormData.description}
                      onChange={handleDemoFormChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                      rows="3"
                      placeholder="Tell us about your travel business..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
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

export default Navigo
