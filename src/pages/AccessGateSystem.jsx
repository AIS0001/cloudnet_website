import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ShareSection from '../components/ShareSection'
import {
  ScanFace,
  CreditCard,
  QrCode,
  Cloud,
  ShieldCheck,
  Network,
  TrendingUp,
  Settings,
  Activity,
  Users,
  Lock,
  FileText,
  ArrowRight,
  CheckCircle2,
  Wifi
} from 'lucide-react'

const AccessGateSystem = () => {
  const solutions = [
    {
      icon: <ScanFace size={36} />,
      title: 'Face Recognition',
      description: 'Fast and accurate contactless access using AI-powered facial recognition for staff, members, and visitors.'
    },
    {
      icon: <CreditCard size={36} />,
      title: 'RFID Card Access',
      description: 'Secure and quick card-based entry for employees, members, and guests with instant verification.'
    },
    {
      icon: <QrCode size={36} />,
      title: 'QR Code Access',
      description: 'Easy and hygienic entry with QR code scanning for tickets, bookings, and temporary visitor passes.'
    },
    {
      icon: <Cloud size={36} />,
      title: 'Cloud Centralized',
      description: 'Manage multiple gates and locations from a single cloud dashboard, accessible from anywhere.'
    }
  ]

  const dashboardFeatures = [
    {
      icon: <Activity size={24} />,
      title: 'Real-time Monitoring',
      description: 'Monitor all gates in real-time from a central dashboard with live entry and exit logs.'
    },
    {
      icon: <Users size={24} />,
      title: 'User Management',
      description: 'Add, edit, or remove users and access rights instantly from any device.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Access Control',
      description: 'Allow or deny access based on rules, time schedules, or user groups for complete control.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Detailed Reports',
      description: 'Get insightful entry/exit reports and activity logs to support better business decisions.'
    }
  ]

  const benefits = [
    {
      icon: <ShieldCheck size={28} />,
      title: 'Enhanced Security',
      description: 'Prevent unauthorized access and ensure the safety of your premises, staff, and visitors.'
    },
    {
      icon: <Network size={28} />,
      title: 'Centralised Control',
      description: 'Control gates across multiple locations and branches from one unified platform.'
    },
    {
      icon: <Cloud size={28} />,
      title: 'Cloud Technology',
      description: 'Access your gate access system from anywhere, anytime, on any internet-connected device.'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Scalable Solution',
      description: 'Suitable for any size of organization, from a single gate to large multi-site operations.'
    },
    {
      icon: <Settings size={28} />,
      title: 'Easy Integration',
      description: 'Seamlessly integrates with existing security systems, POS, and membership platforms.'
    },
    {
      icon: <Wifi size={28} />,
      title: 'Real-Time Sync',
      description: 'All gates, devices, and the central dashboard stay synchronized in real time over the cloud.'
    }
  ]

  const workflowSteps = [
    {
      step: '1',
      title: 'RFID Check-In',
      description: 'Guests or members check in at the welcome desk and receive an RFID wristband or card linked to their account.'
    },
    {
      step: '2',
      title: 'Pay Across Departments',
      description: 'The same RFID wristband/card is used to pay at the restaurant, bar & snack bar, gym, spa, golf simulator, and swimming pool - all synced to the cloud in real time.'
    },
    {
      step: '3',
      title: 'Checkout & Billing',
      description: 'At checkout, the RFID wristband is scanned to retrieve all transactions, generate the final bill, and process payment with an instant invoice/receipt.'
    },
    {
      step: '4',
      title: 'System Reset',
      description: 'After payment is complete, the RFID record is cleared automatically and the wristband/card is ready for the next guest.'
    }
  ]

  const departments = [
    'Restaurant - Pay with RFID',
    'Bar & Snack Bar - Pay with RFID',
    'Gym Classes - Pay with RFID',
    'Spa Treatments - Pay with RFID',
    'Golf Simulator - Pay with RFID',
    'Swimming Pool - Pay with RFID'
  ]

  return (
    <div>
      <Helmet>
        <title>Access Gate System - Smart Entry/Exit & RFID Access Control | CloudNet Softwares</title>
        <meta
          name="description"
          content="CloudNet Access Gate System - cloud-based, centralized entry/exit gate access control with face recognition, RFID card access, QR code access, and RFID-based sports club management."
        />
        <meta
          name="keywords"
          content="access gate system, entry exit gate, smart gate access, face recognition gate, RFID access control, turnstile gate, RFID sports club management, cloud access control"
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/access-gate-system" />
        <meta property="og:title" content="Access Gate System - Smart Entry/Exit & RFID Access Control" />
        <meta
          property="og:description"
          content="Cloud-based, centralized entry/exit gate access control with face recognition, RFID, and QR code access, plus RFID sports club management."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/access-gate-system" />
      </Helmet>

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
                Cloud Based &middot; Centralized &middot; Secure
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Smart <span className="text-orange-600">Gate Access</span>
              </h1>
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                Secure. Smart. Connected.
              </p>
              <span className="inline-block bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                Cloud Based Centralised Access Control
              </span>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Manage, monitor, and control all your entry and exit gates from anywhere, anytime with CloudNet's
                Access Gate System. Combine face recognition, RFID cards, and QR codes with a centralized cloud
                dashboard for complete visibility and control over your premises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                  <span>Contact Us for Demo & Enquiry</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/img/access-gate/banner.png"
                  alt="CloudNet Smart Gate Access - Cloud Based Centralised Access Control"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gate Access Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Our Gate Access <span className="text-primary">Solutions</span>
            </h2>
            <p className="section-subtitle">
              Multiple ways to identify and authorize entry, all managed from one platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl border-2 border-transparent hover:border-orange-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-orange-600 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnstile Product Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="section-title">
                Tripod Turnstile with <span className="text-primary">Face Recognition</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                CloudNet's tripod turnstile gates pair a sturdy stainless steel barrier with a smart face
                recognition and access control terminal. Each unit verifies identity in milliseconds and only
                releases the tripod arm for authorized users, giving you a reliable physical barrier backed by
                intelligent, cloud-connected access control.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'AI face recognition with mask detection',
                  'Built-in RFID and QR code reader',
                  'Stainless steel tripod arm mechanism',
                  'Anti-pinch safety with auto-reset',
                  'Indoor and outdoor installation options',
                  'Real-time sync with cloud dashboard'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary inline-flex items-center space-x-2">
                <span>Request a Quote</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-4">
                <img
                  src="/img/access-gate/turnstile.png"
                  alt="CloudNet Tripod Turnstile Gate with Face Recognition Access Control"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Centralized <span className="text-primary">Dashboard</span>
            </h2>
            <p className="section-subtitle">
              Manage every gate, user, and access rule from one cloud-based control panel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dashboardFeatures.map((item, index) => (
              <div key={index} className="flex flex-col items-start bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100">
                <div className="text-primary mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFID Sports Club Management System */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">
              RFID Sports Club <span className="text-primary">Management System</span>
            </h2>
            <p className="section-subtitle">
              Cloud-Based &middot; Real-Time &middot; Smart &middot; Secure
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Extend gate access to a full club or resort experience. A single RFID wristband or card lets guests
              and members move through every department - check-in, dining, bar, fitness, spa, golf simulator, and
              pool - while every transaction syncs to one cloud dashboard for real-time analytics and billing.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-4 mb-12 max-w-4xl mx-auto">
            <img
              src="/img/access-gate/rfid-sports-club.png"
              alt="RFID Sports Club Management System - Cloud-Based Check-in, Multi-Department Billing and Reporting"
              className="w-full h-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">How It Works</h3>
              <div className="space-y-6">
                {workflowSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Departments Connected via RFID</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{dept}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Cloud Dashboard Highlights</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Cloud Sync - real-time synchronization across all departments</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Real-Time Analytics - live reports and insights on sales and visits</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Multi-Department - all facilities integrated into one system</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Transaction History - complete record of all member/guest activity</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>POS Billing - seamless billing integration with checkout</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Invoice Printing - instant invoice and receipt generation</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Choose CloudNet <span className="text-primary">Access Gate System?</span>
            </h2>
            <p className="section-subtitle">
              Secure your premises. Simplify your operations. Empower your control.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border-l-4 border-primary hover:shadow-lg transition-all duration-300">
                <div className="text-primary mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <ShareSection productName="Access Gate System" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Premises?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Talk to our team about face recognition, RFID, and QR code gate access systems tailored to your
            business - from a single gate to a full RFID-powered sports club or resort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center space-x-2">
              <span>Contact Us for Demo & Enquiry</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/products" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Explore Other Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccessGateSystem
