import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Grid, MessageSquare, Download, Mail, Phone, MapPin, CheckCircle2, Zap, ArrowRight, Lock, Globe, TrendingUp, X, BarChart3, Crown, Building2, Music2, Smartphone, BrainCircuit, LineChart, ShieldAlert, MessagesSquare, PlayCircle, Clock, Printer, User, Bell, Lightbulb, Flame, Sparkles, ChefHat, Warehouse, PackageCheck, ClipboardList, AlertTriangle, CalendarDays, CalendarClock, BellRing, FileText, Megaphone, Rocket, MessageCircle, Star, Users, Send, History, Package } from 'lucide-react'
import cloudnetQR from '../assets/img/cloudnetid.jpeg'
import planImage from '../assets/download/plan.jpg'
import ScrollReveal from '../components/animations/ScrollReveal'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'
import ProductJourney from '../components/cloudnet/ProductJourney'
import AIEngineConnect from '../components/cloudnet/AIEngineConnect'
import PhoneMockup from '../components/cloudnet/PhoneMockup'
import screenItemWise from '../assets/img/nightpulse-app/screen-1.webp'
import screenDayWise from '../assets/img/nightpulse-app/screen-2.webp'
import screenPOS from '../assets/img/nightpulse-app/screen-3.webp'
import screenSelectTable from '../assets/img/nightpulse-app/screen-4.webp'
import screenBillHistory from '../assets/img/nightpulse-app/screen-5.webp'
import screenCheckBill from '../assets/img/nightpulse-app/screen-6.webp'

const APP_SCREENS = [
  {
    src: screenItemWise,
    title: 'Item Wise Summary',
    desc: 'See exactly what sold - quantity, discounts, and total per item - searchable and filterable by date.'
  },
  {
    src: screenDayWise,
    title: 'Day Wise Reports',
    desc: 'Daily sales broken down by cash, card, QR, and entertainment, with day-close status at a glance.'
  },
  {
    src: screenPOS,
    title: 'Fast Point of Sale',
    desc: 'Category-based ordering for food and drinks, with photos for every item and instant table/bill switching.'
  },
  {
    src: screenSelectTable,
    title: 'Table & Room Status',
    desc: 'A visual table map showing which tables and VIP rooms are free or busy, updated in real time.'
  },
  {
    src: screenBillHistory,
    title: 'Bill History',
    desc: 'Search and filter every past bill by date, table, or status - active or cancelled - in seconds.'
  },
  {
    src: screenCheckBill,
    title: 'Check Bill & Checkout',
    desc: 'Review items, apply discounts, calculate change, and save the bill - all from one screen.'
  }
]

const AI_BENEFITS = [
  { icon: LineChart, title: 'Predictive Sales Forecasting', desc: 'Anticipate busy nights and staff, stock, and rooms accordingly.' },
  { icon: BrainCircuit, title: 'Smart Inventory Reordering', desc: 'AI recommends restock levels for drinks and bar items automatically.' },
  { icon: ShieldAlert, title: 'Anomaly & Commission Checks', desc: 'Flags unusual discounts, voids, or Kayotee commission patterns.' },
  { icon: MessagesSquare, title: 'AI Chat Insights', desc: 'Ask questions about your reports and get instant, plain-language answers.' }
]

const COAL_CHANGE_FEATURES = [
  { icon: Clock, title: 'Customizable Timing', desc: 'Set coal change interval every 20-30 minutes or as per your preference.' },
  { icon: Printer, title: 'Auto Trigger & Print', desc: 'System auto-triggers and prints a reminder KOT without any manual action.' },
  { icon: User, title: 'No Manual Effort', desc: 'No need for staff to manually trigger - system takes care of it automatically.' },
  { icon: Bell, title: 'Better Service Experience', desc: 'Timely coal changes ensure a better shisha experience for your customers.' }
]

const QUOTATION_FEATURES = [
  { icon: Zap, title: 'Quick & Easy Creation', desc: 'Pick the customer, event type and guest count - line totals calculate themselves.' },
  { icon: Package, title: 'Custom Packages & Pricing', desc: 'Combine buffet, beverage and setup packages with your own per-guest pricing.' },
  { icon: FileText, title: 'Professional PDF Format', desc: 'Print or export a branded quotation ready to send to your customer.' },
  { icon: History, title: 'Track & Manage All Quotations', desc: 'View, reprint, export or remove past quotations from one history screen.' }
]

const BOOKING_FEATURES = [
  { icon: CalendarDays, title: 'Check Availability & Avoid Overlap', desc: 'Live capacity per date and time slot stops double bookings before they happen.' },
  { icon: Users, title: 'Manage Guest Count & Details', desc: 'Customer, company, contact, guest count, special requirements and internal notes in one record.' },
  { icon: BellRing, title: 'Automatic Reminders', desc: 'Schedule reminders days or hours ahead and let NightPulse send them for you.' },
  { icon: Star, title: 'Perfect for Gala Dinners, VIP Events & Buffets', desc: 'Also birthdays, weddings, corporate events, conferences, parties and more.' }
]

const BOOKING_EVENT_TYPES = [
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&h=600&q=80', label: 'Gala Dinner' },
  { src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&h=600&q=80', label: 'VIP Events' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&h=600&q=80', label: 'Buffet System' }
]

const REMINDER_SCHEDULE = [
  { label: '7 Days Before', note: 'Confirm final guest count' },
  { label: '3 Days Before', note: 'Lock menu & setup' },
  { label: '1 Day Before', note: 'Brief kitchen & floor' },
  { label: '12 Hours Before', note: 'Final check with customer' },
  { label: '2 Hours Before', note: 'Get the venue ready' },
  { label: 'Custom Date/Time', note: 'Any moment you choose' }
]

const REMINDER_HIGHLIGHTS = [
  { icon: CalendarClock, title: 'Set Once, Runs Automatically', desc: 'Add one or more reminders when you create the booking. The scheduler checks every minute and fires each one on time - no staff action needed.' },
  { icon: MessageCircle, title: 'In-App & WhatsApp Delivery', desc: 'Reminders arrive in the NightPulse notification bell, or go straight to WhatsApp using your own shop\'s WhatsApp Business account.' },
  { icon: Bell, title: 'Pop-Up on Login for Every Role', desc: 'Cashier, waiter, chef, store manager or manager - every user sees upcoming booking reminders as soon as they log in.' },
  { icon: ClipboardList, title: 'Full Booking Lifecycle', desc: 'Move each booking from inquiry to tentative, confirmed, paid and completed, with no-shows and cancellations tracked too.' }
]

const RAW_MATERIAL_STEPS = [
  { icon: ChefHat, role: 'Chef', title: 'Raise a Material Request', desc: 'The chef searches raw materials, adds quantities and units, and sends one request to the store.' },
  { icon: Warehouse, role: 'Store Manager', title: 'Review & Accept or Reject', desc: 'Pending chef requests land on the store dashboard. Accept with a note, or reject with a reason the chef can see.' },
  { icon: PackageCheck, role: 'Store Manager', title: 'Issue Stock to Kitchen', desc: 'Issue the full amount or a partial quantity. Store stock is deducted and every issuance is recorded.' },
  { icon: BarChart3, role: 'Chef', title: 'Track Kitchen Usage', desc: 'The Kitchen Issue Report shows what the kitchen received - grouped daily, weekly or monthly.' }
]

const RAW_MATERIAL_ROLES = [
  {
    icon: ChefHat,
    title: 'Chef Dashboard',
    points: [
      'Create new material requests in seconds',
      'Edit or cancel a request while it is still pending',
      'See store notes and rejection reasons on every request',
      'Kitchen issuances for the last 7 days at a glance',
      'Today\'s advance bookings and guest counts for prep planning'
    ]
  },
  {
    icon: Warehouse,
    title: 'Store Manager Dashboard',
    points: [
      'Queue of pending chef requests with requested quantities',
      'Accept or reject with notes for the kitchen',
      'Issue full or partial quantities against each request',
      'Low store stock alerts against minimum stock levels',
      'Complete store stock and issuance history'
    ]
  }
]

const nightclubImage ='https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&h=1200&q=80'
const barCounterImage = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&h=900&q=80'
const karaokeMicImage = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&h=900&q=80'
const crowdImage = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&h=900&q=80'
const cafeImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&h=900&q=80'
const restaurantImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&h=1200&q=80'
const restaurantChainImage = 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&h=900&q=80'
const NIGHTPULSE_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.cloudnet.nightpulse&hl=en'

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
      name: 'Raw Material Inventory (Store Manager & Chef)',
      plan: 'New',
      description: 'Dedicated Store Manager and Chef roles for kitchen raw materials - chefs request, the store reviews and issues, and every issuance is tracked.',
      features: ['Chef material requests', 'Accept / reject with notes', 'Full or partial stock issue', 'Kitchen issue reports', 'Low store stock alerts']
    },
    {
      name: 'Quotation Master',
      plan: 'New',
      description: 'Create professional quotations for events, parties and special occasions with custom packages and per-guest pricing.',
      features: ['Package-based line items', 'Automatic totals', 'Print & PDF export', 'Quotation history']
    },
    {
      name: 'Advance Booking System',
      plan: 'New',
      description: 'Take advance bookings for gala dinners, VIP events and buffets with real-time availability and guest count management.',
      features: ['Booking calendar', 'Capacity & overlap checks', 'Booking status lifecycle', 'Customer booking history']
    },
    {
      name: 'Booking Reminder Scheduler',
      plan: 'New',
      description: 'Automatic reminders for every advance booking, delivered in-app or on WhatsApp at the time you choose.',
      features: ['7 days to 2 hours before', 'Custom date & time', 'In-app & WhatsApp delivery', 'Login reminder pop-up']
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
              CloudNet NightPulse is a comprehensive cloud-based point of sale system built for cafes, restaurants,
              bars, clubs, and karaoke (Kayotee) venues alike - whether you run a single small outlet or a large
              multi-location restaurant chain. With 20+ integrated modules including Kayotee commission management
              and dedicated Manager and POS apps, manage every aspect of your business from a single platform.
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
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <ChefHat className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Raw Material Inventory</h4>
                <p className="text-gray-600 text-sm">Store Manager and Chef roles handle kitchen material requests, stock issues, and usage reports.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-100">
                <CalendarClock className="text-primary mb-3" size={24} />
                <h4 className="font-bold text-lg mb-2">Advance Booking & Quotations</h4>
                <p className="text-gray-600 text-sm">Quote events, take advance bookings, and send automatic reminders before every event.</p>
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
        <title>NightPulse POS - Cafe, Restaurant, Bar, Club & Karaoke (Kayotee) Management System</title>
        <meta name="description" content="NightPulse POS by CloudNet - Cloud-based POS system for cafes, restaurants (single outlets to multi-location chains), bars, clubs, and karaoke venues, with billing, inventory, room/table management, Kayotee commission management, and Manager/POS apps." />
        <meta name="keywords" content="NightPulse, cafe POS, restaurant POS, multi-location restaurant chain software, karaoke POS, kayotee commission management, bar POS, club management software, nightlife POS, cloud-based POS, raw material inventory, kitchen requisition, store manager, chef app, quotation software, advance booking system, gala dinner booking, booking reminder" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/nightpulse" />
        <meta property="og:title" content="NightPulse POS - Cafe, Restaurant, Bar, Club & Karaoke Management System" />
        <meta property="og:description" content="Professional cloud-based POS system for cafes, restaurants of any size - including multi-location chains - bars, clubs, and karaoke venues, built to streamline operations and maximize profitability." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/nightpulse" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                NightPulse <span className="text-primary">POS Systems</span>
              </h1>
              <p className="text-2xl text-gray-700 mb-4 font-semibold">
                The Complete Cloud-Based POS for Cafes, Restaurants, Bars, Clubs & Karaoke (Kayotee) Venues
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From a small neighborhood cafe to a multi-location restaurant chain, and from bars and clubs to
                karaoke (Kayotee) venues, NightPulse scales with your business. Manage billing, inventory, tables
                or rooms, staff, and analytics all in one place, with dedicated Manager and POS apps for quick actions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={NIGHTPULSE_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <PlayCircle size={22} />
                  <span>
                    Get it on <span className="font-bold">Google Play</span>
                  </span>
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Schedule a Demo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={restaurantImage}
                alt="Restaurant dining floor managed by NightPulse POS"
                className="col-span-2 w-full h-56 md:h-64 object-cover rounded-2xl shadow-xl"
              />
              <img
                src={cafeImage}
                alt="Cafe using NightPulse POS for billing and orders"
                className="w-full h-36 md:h-44 object-cover rounded-2xl shadow-xl"
              />
              <img
                src={nightclubImage}
                alt="Nightclub with vibrant lighting also managed by NightPulse POS"
                className="w-full h-36 md:h-44 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Journey Strip */}
      <section className="py-8 bg-slate-950">
        <div className="container mx-auto px-4">
          <ProductJourney stages={['Billing', 'Tables & Rooms', 'Events', 'Sales', 'Customer Data', 'AI Insights']} />
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">One POS for Every Kind of Food, Drink & Entertainment Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              NightPulse isn't just for nightlife - cafes, single-outlet restaurants, and large multi-location
              restaurant chains run on it too, alongside bars, clubs, and karaoke (Kayotee) rooms.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { src: cafeImage, label: 'Cafes' },
              { src: restaurantImage, label: 'Restaurants' },
              { src: restaurantChainImage, label: 'Multi-Location Chains' },
              { src: barCounterImage, label: 'Bars & Lounges' },
              { src: karaokeMicImage, label: 'Karaoke (Kayotee) Rooms' },
              { src: crowdImage, label: 'Clubs & Live Events' }
            ].map((item, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white font-semibold text-sm md:text-base">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Screens */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              See NightPulse POS <span className="text-primary">In Action</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Real screens from the NightPulse app - billing, reports, tables, and more, all built for speed
              on a busy floor.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {APP_SCREENS.map((screen, i) => (
              <ScrollReveal key={screen.title} delay={(i % 3) * 0.1}>
                <PhoneMockup src={screen.src} alt={`NightPulse POS - ${screen.title}`} className="mb-5" />
                <h3 className="text-white font-bold text-center mb-1.5">{screen.title}</h3>
                <p className="text-slate-400 text-sm text-center leading-relaxed">{screen.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Feature: Shisha Timing - Auto Coal Change KOT */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
                <Sparkles size={14} className="text-primary" />
                New Feature at NightPulse POS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                Shisha Timing <span className="text-primary">Auto Coal Change KOT</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Never miss a coal change again! NightPulse POS now automatically triggers and prints a
                reminder KOT to change coal.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {COAL_CHANGE_FEATURES.map((feature, i) => {
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
                      <span className="w-10 h-10 rounded-lg bg-slate-900 text-primary flex items-center justify-center flex-shrink-0">
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
            <ScrollReveal direction="right" className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative bg-white border-2 border-orange-100 rounded-2xl shadow-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mx-auto mb-5">
                    <Flame className="text-white" size={30} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">Coal Change</p>
                  <p className="text-primary font-semibold mb-6">Every 20-30 min</p>
                  <div className="flex items-start gap-3 bg-orange-50 border border-dashed border-primary/40 rounded-lg p-4 text-left">
                    <Lightbulb className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Smart Automation for Smarter Operations</p>
                      <p className="text-gray-600 text-xs mt-1">Let NightPulse POS handle the reminders, so you can focus on delivering great experiences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Features: Quotation Master & Advance Booking System */}
      <section className="relative py-20 bg-[#0b0718] overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 border-2 border-amber-400/70 text-amber-300 text-xs md:text-sm font-extrabold uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              <Megaphone size={16} />
              New Features Now Available
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              More Control. More Bookings.{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">More Business.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Quote events in minutes and let customers book in advance - with live availability,
              guest count management and automatic reminders built right into NightPulse POS.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Quotation Master */}
            <ScrollReveal direction="left">
              <article className="h-full rounded-3xl border-2 border-purple-500/60 bg-gradient-to-b from-purple-950/70 to-slate-950/80 p-6 md:p-8 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]">
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="text-white" size={30} />
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Quotation Master</h3>
                    <p className="text-purple-200">Create Professional Quotations in Minutes</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Easily create, manage and send quotations to your customers for events, parties, and special occasions.
                </p>

                {/* Quotation mock */}
                <div className="bg-white rounded-xl p-4 md:p-5 shadow-2xl mb-7 text-gray-800">
                  <div className="flex justify-between items-start border-b border-gray-200 pb-3 mb-3">
                    <div>
                      <p className="text-purple-600 font-bold text-sm">NightPulse</p>
                      <p className="text-lg font-extrabold tracking-wide">QUOTATION</p>
                    </div>
                    <div className="text-right text-[11px] text-gray-500 leading-relaxed">
                      <p>To: ABC Events Co.</p>
                      <p>Event: Gala Dinner</p>
                      <p>Guest Count: 500</p>
                    </div>
                  </div>
                  <table className="w-full text-[11px] md:text-xs">
                    <thead>
                      <tr className="text-gray-500 text-left">
                        <th className="font-semibold pb-1.5">Description</th>
                        <th className="font-semibold pb-1.5 text-right">Qty</th>
                        <th className="font-semibold pb-1.5 text-right">Price</th>
                        <th className="font-semibold pb-1.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Buffet Package', '500', '฿1,200', '฿600,000'],
                        ['Beverage Package', '500', '฿250', '฿125,000'],
                        ['Setup & Decoration', '1', '฿50,000', '฿50,000']
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-gray-100">
                          <td className="py-1.5">{row[0]}</td>
                          <td className="py-1.5 text-right">{row[1]}</td>
                          <td className="py-1.5 text-right">{row[2]}</td>
                          <td className="py-1.5 text-right">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center border-t-2 border-gray-200 mt-2 pt-2">
                    <span className="text-xs font-semibold text-gray-500">Total (THB)</span>
                    <span className="font-extrabold text-purple-700">฿775,000</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {QUOTATION_FEATURES.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.title} className="flex items-start gap-3">
                        <span className="w-10 h-10 rounded-full border-2 border-purple-400/70 text-purple-300 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} />
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">{feature.title}</h4>
                          <p className="text-slate-400 text-sm leading-snug">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            </ScrollReveal>

            {/* Advance Booking System */}
            <ScrollReveal direction="right">
              <article className="h-full rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/40 to-slate-950/80 p-6 md:p-8 shadow-[0_0_40px_-10px_rgba(251,191,36,0.4)]">
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="text-slate-900" size={30} />
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Advance Booking System</h3>
                    <p className="text-amber-200">Gala Dinner &nbsp;|&nbsp; VIP Events &nbsp;|&nbsp; Buffet System</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Let your customers book in advance for special events, with real-time availability, guest
                  count management and reminder alerts.
                </p>

                {/* Booking + reminder mock */}
                <div className="relative mb-7">
                  <div className="bg-white rounded-xl p-4 shadow-2xl text-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-bold text-sm">Advance Booking</p>
                      <p className="text-xs text-gray-500">September 2025</p>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-gray-400 mb-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <span key={d}>{d}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[10px]">
                      {Array.from({ length: 21 }, (_, i) => {
                        const events = {
                          2: ['Gala Dinner', '500 pax', 'bg-rose-400'],
                          5: ['VIP Event', '200 pax', 'bg-cyan-500'],
                          8: ['Buffet', '300 pax', 'bg-indigo-500'],
                          12: ['Gala Dinner', '600 pax', 'bg-purple-500'],
                          17: ['VIP Event', '150 pax', 'bg-emerald-500']
                        }
                        const ev = events[i]
                        return (
                          <div key={i} className={`h-10 rounded ${ev ? `${ev[2]} text-white` : 'bg-gray-50'} p-0.5 leading-tight flex flex-col items-center justify-center`}>
                            {ev && (
                              <>
                                <span className="font-semibold truncate w-full text-center">{ev[0]}</span>
                                <span className="opacity-90">{ev[1]}</span>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <motion.div
                    className="absolute -bottom-6 -right-2 md:-right-4 w-56 bg-slate-900/95 border border-amber-400/50 rounded-xl p-3 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span
                        animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5 }}
                      >
                        <BellRing className="text-amber-400" size={16} />
                      </motion.span>
                      <span className="text-white text-xs font-bold">NightPulse</span>
                      <span className="text-slate-500 text-[10px] ml-auto">10:00 AM</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">
                      Reminder: ABC Events Co. - 500 guests - Gala Dinner on 20 Sep 2025, 18:00
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-7">
                  {BOOKING_EVENT_TYPES.map((item) => (
                    <div key={item.label} className="relative rounded-lg overflow-hidden border border-amber-400/40">
                      <img src={item.src} alt={`${item.label} booked with NightPulse POS`} className="w-full h-20 md:h-24 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-1.5 left-0 right-0 text-center text-white text-xs font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {BOOKING_FEATURES.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.title} className="flex items-start gap-3">
                        <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} />
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">{feature.title}</h4>
                          <p className="text-slate-400 text-sm leading-snug">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            </ScrollReveal>
          </div>

          <div className="mt-10 max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-purple-700 via-purple-900 to-amber-600 p-[2px]">
            <div className="rounded-2xl bg-slate-950/90 px-6 py-5 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
              <Rocket className="text-amber-400" size={24} />
              <p className="text-white font-semibold text-lg">
                Upgrade Your <span className="text-purple-400">NightPulse</span> Experience
                <span className="text-amber-300"> - Book More Events, Serve More Guests!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advance Booking Reminder Scheduler */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <BellRing size={14} className="text-primary" />
              Advance Booking
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Reminder <span className="text-primary">Scheduler</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Never forget an event again. Attach reminders to any advance booking and NightPulse delivers
              them automatically - so your team and your customers are always ready on the day.
            </p>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            {/* Timeline */}
            <div className="relative mb-16">
              <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-1 bg-gradient-to-r from-orange-200 via-primary to-orange-600 rounded-full" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {REMINDER_SCHEDULE.map((step, i) => (
                  <motion.div
                    key={step.label}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <span className="relative z-10 w-12 h-12 mx-auto rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center mb-3 shadow-md">
                      {i === REMINDER_SCHEDULE.length - 1 ? <CalendarClock size={18} /> : <Bell size={18} />}
                    </span>
                    <p className="font-bold text-gray-900 text-sm">{step.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{step.note}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <span className="inline-flex items-center gap-2 bg-orange-50 border border-primary/30 text-gray-800 text-sm font-semibold px-5 py-2 rounded-full">
                  <Star size={16} className="text-primary" />
                  Event Day - you are fully prepared
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {REMINDER_HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.title} delay={(i % 2) * 0.1}>
                    <div className="h-full bg-gray-50 p-6 rounded-xl border-l-4 border-primary flex items-start gap-4 hover:shadow-lg transition-all duration-300">
                      <span className="w-12 h-12 rounded-lg bg-slate-900 text-primary flex items-center justify-center flex-shrink-0">
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
        </div>
      </section>

      {/* Raw Material Inventory - Store Manager & Chef */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <Sparkles size={14} />
              New Feature at NightPulse POS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Raw Material <span className="text-primary">Inventory System</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Two new user roles - <strong className="text-white">Store Manager</strong> and{' '}
              <strong className="text-white">Chef</strong> - keep kitchen raw materials under control. Every
              request, approval and stock issue is recorded, so you always know what went into the kitchen.
            </p>
          </ScrollReveal>

          {/* Workflow */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
            {RAW_MATERIAL_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 text-white flex items-center justify-center">
                      <Icon size={22} />
                    </span>
                    <span className="text-4xl font-extrabold text-white/10">0{i + 1}</span>
                  </div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wide text-primary mb-1">{step.role}</span>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  {i < RAW_MATERIAL_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 text-primary/60" size={20} />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Role dashboards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {RAW_MATERIAL_ROLES.map((role, i) => {
              const Icon = role.icon
              return (
                <ScrollReveal key={role.title} direction={i === 0 ? 'left' : 'right'}>
                  <div className="h-full bg-white rounded-2xl p-7 shadow-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-12 h-12 rounded-full bg-orange-50 border-2 border-primary text-primary flex items-center justify-center">
                        <Icon size={22} />
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {role.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <div className="mt-10 max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
            {[
              { icon: Send, text: 'Requests go straight from kitchen to store' },
              { icon: AlertTriangle, text: 'Low stock flagged before you run out' },
              { icon: History, text: 'Complete audit trail of every issue' }
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Icon className="text-primary flex-shrink-0" size={20} />
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CloudNet AI Engine Integration Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative">
          <AIEngineConnect product="NightPulse" benefits={AI_BENEFITS} />
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
            Join cafes, restaurants, multi-location chains, bars, clubs, and karaoke venues using NightPulse POS to streamline operations, manage Kayotee commissions, and enhance customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center space-x-2">
              <span>Schedule Your Demo</span>
              <ArrowRight size={20} />
            </button>
            <a
              href={NIGHTPULSE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <PlayCircle size={20} />
              <span>Download on Google Play</span>
            </a>
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
              Purpose-built for cafes, restaurants, bars, clubs, and karaoke venues - from single small outlets to large multi-location chains - with all the features you need
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
