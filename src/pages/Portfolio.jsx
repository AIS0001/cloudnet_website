import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ChevronDown, Briefcase, TrendingUp, Users, Award, Code2, Clock, Target } from 'lucide-react'
import storehubImg1 from '../assets/img/storehub/store (1).png'
import storehubImg2 from '../assets/img/storehub/store (2).png'
import storehubImg3 from '../assets/img/storehub/store (3).png'

const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'All Cases', icon: <Briefcase size={18} /> },
    { id: 'restaurant', label: 'Restaurant & Food', icon: <Code2 size={18} /> },
    { id: 'enterprise', label: 'Enterprise', icon: <Target size={18} /> },
    { id: 'hospitality', label: 'Hospitality', icon: <Users size={18} /> },
    { id: 'retail', label: 'Retail', icon: <TrendingUp size={18} /> }
  ]

  const caseStudies = [
    {
      id: 1,
      category: 'restaurant',
      title: 'ChefMate POS Implementation',
      subtitle: 'Multi-Location Restaurant Chain',
      client: 'Urban Dining Group',
      industry: 'Food & Beverage',
      duration: '3 months',
      challenge: 'A growing restaurant chain with 15 locations was struggling with manual billing, inventory tracking, and lack of real-time visibility across all branches. They were losing revenue due to stock management issues and couldn\'t analyze sales performance effectively.',
      solution: 'We implemented ChefMate POS across all 15 locations with cloud synchronization. Automated inventory management, centralized reporting dashboard, and integrated payment processing.',
      results: [
        { metric: '40%', description: 'Increase in operational efficiency' },
        { metric: '25%', description: 'Reduction in food waste' },
        { metric: '15%', description: 'Increase in average transaction value' },
        { metric: '99.8%', description: 'System uptime' }
      ],
      technologies: ['ChefMate POS', 'Cloud Infrastructure', 'Real-time Analytics', 'Mobile Access'],
      testimonial: {
        text: 'The implementation of ChefMate POS transformed our operations. We now have complete visibility across all locations and our staff spends less time on admin tasks.',
        author: 'Rajesh Kumar',
        role: 'Operations Manager, Urban Dining Group'
      },
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561aff?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      category: 'enterprise',
      title: 'CloudNet ERP Transformation',
      subtitle: 'Manufacturing Company Digital Overhaul',
      client: 'GlobalTech Manufacturing',
      industry: 'Manufacturing',
      duration: '6 months',
      challenge: 'Legacy systems across departments - accounting, inventory, HR, and production. Data silos prevented informed decision-making. Manual processes led to delays and errors. Decision makers had no real-time visibility.',
      solution: 'Implemented CloudNet ERP system integrating all departments. Custom workflows designed for manufacturing process. Real-time dashboards for executives. Staff training and change management program.',
      results: [
        { metric: '35%', description: 'Reduction in operational costs' },
        { metric: '50%', description: 'Faster financial close process' },
        { metric: '60%', description: 'Reduction in order fulfillment time' },
        { metric: '8x', description: 'ROI in first year' }
      ],
      technologies: ['CloudNet ERP', 'Custom Integration', 'Analytics & Reporting', 'Mobile Dashboard'],
      testimonial: {
        text: 'The ERP transformation gave us the visibility we needed. We\'re making better decisions faster, and our entire team is more coordinated than ever.',
        author: 'Maria Santos',
        role: 'CFO, GlobalTech Manufacturing'
      },
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      category: 'retail',
      title: 'Omnichannel Retail Integration',
      subtitle: 'Department Store Chain Modernization',
      client: 'Premier Retail Solutions',
      industry: 'Retail',
      duration: '4 months',
      challenge: 'Physical stores and online shop were disconnected. Inventory couldn\'t be tracked across channels. Customers couldn\'t buy online and pickup in-store. High cart abandonment on website.',
      solution: 'Unified POS and e-commerce platform with real-time inventory sync. Click-and-collect service enabled. Integrated payment processing. Customer analytics across channels.',
      results: [
        { metric: '45%', description: 'Increase in online sales' },
        { metric: '30%', description: 'Improvement in inventory accuracy' },
        { metric: '22%', description: 'Reduction in cart abandonment' },
        { metric: '2.5x', description: 'Customer engagement increase' }
      ],
      technologies: ['POS System', 'E-Commerce Integration', 'Real-time Inventory', 'Customer Analytics'],
      testimonial: {
        text: 'Our customers love the flexibility of our omnichannel approach. The integration was seamless and the results exceeded our expectations.',
        author: 'David Chen',
        role: 'Marketing Director, Premier Retail Solutions'
      },
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      category: 'restaurant',
      title: 'Quick Service Restaurant Optimization',
      subtitle: 'Fast-Casual Chain Expansion',
      client: 'FreshBite Restaurants',
      industry: 'Food & Beverage',
      duration: '2.5 months',
      challenge: 'Rapid expansion of quick-service restaurants. Manual order management was slowing service. No data on best-selling items or peak hours. Inconsistent experience across locations.',
      solution: 'ChefMate POS with intuitive interface for fast operations. Kitchen display system (KDS) for efficient order management. Predictive analytics for inventory and staffing.',
      results: [
        { metric: '33%', description: 'Reduction in order processing time' },
        { metric: '28%', description: 'Increase in daily transactions' },
        { metric: '20%', description: 'Improvement in food consistency' },
        { metric: '12%', description: 'Increase in customer satisfaction' }
      ],
      technologies: ['ChefMate POS', 'Kitchen Display System', 'Predictive Analytics', 'Cloud Sync'],
      testimonial: {
        text: 'The speed and reliability of ChefMate POS enabled us to expand from 5 to 20 locations in one year without operational issues.',
        author: 'Prakash Singh',
        role: 'CEO, FreshBite Restaurants'
      },
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      category: 'retail',
      title: 'StoreHub Retail Solution',
      subtitle: 'Multi-Channel Retail Business Platform',
      client: 'RetailMax Network',
      industry: 'Retail & Commerce',
      duration: '5 months',
      challenge: 'A growing retail chain with 25 stores lacked centralized inventory management, customer loyalty programs, and unified sales analytics. Stock discrepancies across stores resulted in lost sales and poor customer experience. Multiple legacy systems caused operational chaos.',
      solution: 'Implemented StoreHub comprehensive retail solution with cloud-based inventory sync, unified POS system, customer loyalty integration, and advanced analytics dashboard. Mobile app for store managers to monitor real-time performance.',
      results: [
        { metric: '48%', description: 'Reduction in inventory discrepancies' },
        { metric: '35%', description: 'Improvement in inventory turnover' },
        { metric: '42%', description: 'Increase in customer retention' },
        { metric: '52%', description: 'Growth in average transaction value' }
      ],
      technologies: ['StoreHub Platform', 'Cloud Inventory', 'Loyalty Programs', 'Advanced Analytics', 'Mobile Management'],
      testimonial: {
        text: 'StoreHub gave us complete control over our retail operations. From inventory to customer insights, everything is now in one place. Our store managers love the mobile app and our customers appreciate the loyalty program.',
        author: 'Neha Gupta',
        role: 'CEO, RetailMax Network'
      },
      images: [storehubImg1, storehubImg2, storehubImg3]
    },
    {
      id: 6,
      category: 'restaurant',
      title: 'Kiosk by ChefMate POS',
      subtitle: 'Self-Order & Queue Management System',
      client: 'FastFood Express',
      industry: 'Food & Beverage',
      duration: '2 months',
      challenge: 'Long queues during peak hours deterred customers. High labor costs due to manual order taking and payment processing. Limited ordering channels frustrated customers. Staff overwhelmed with back-and-forth communication.',
      solution: 'Deployed Kiosk by ChefMate POS - an intelligent self-order system with queue management, multiple payment options, and integration with kitchen display system. Customers order at interactive kiosks or phones, reducing wait times and improving accuracy.',
      results: [
        { metric: '65%', description: 'Reduction in average wait time' },
        { metric: '38%', description: 'Decrease in order errors' },
        { metric: '45%', description: 'Reduction in labor costs' },
        { metric: '58%', description: 'Increase in customer throughput' }
      ],
      technologies: ['Kiosk by ChefMate', 'Self-Order System', 'Queue Management', 'Multi-Payment', 'KDS Integration'],
      testimonial: {
        text: 'The Kiosk system completely transformed our operations. Customers love the speed and convenience, and our staff can focus on quality. During rush hours, we can now handle 3x more orders than before.',
        author: 'Amit Patel',
        role: 'Franchise Owner, FastFood Express'
      },
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
    },
    {
      id: 7,
      category: 'hospitality',
      title: 'CloudNet Hotel PMS & Channel Manager',
      subtitle: 'End-to-End Hotel Property Management Platform',
      client: 'BlueWave Hospitality Group',
      industry: 'Hospitality',
      duration: '4 months',
      challenge: 'A hotel group operating city and resort properties was managing reservations, room inventory, and OTA listings on separate systems. Overbookings, delayed updates, and manual reconciliation caused revenue loss and poor guest experience.',
      solution: 'CloudNet fully developed and deployed a complete Hotel PMS + Channel Manager platform in-house. The system centralizes reservation operations, room inventory, pricing, housekeeping status, front-desk workflows, and OTA channel synchronization in one dashboard.',
      results: [
        { metric: '70%', description: 'Reduction in manual reservation work' },
        { metric: '92%', description: 'Faster OTA inventory and rate updates' },
        { metric: '35%', description: 'Decrease in overbooking incidents' },
        { metric: '28%', description: 'Increase in occupancy-driven revenue' }
      ],
      technologies: ['CloudNet Hotel PMS', 'CloudNet Channel Manager', 'OTA Integration', 'Rate & Inventory Sync', 'Front Desk Operations'],
      testimonial: {
        text: 'CloudNet delivered a complete hotel system, not just modules. Our front desk, housekeeping, and channel distribution now run on one platform and our team can manage all properties with confidence.',
        author: 'Nattapong S.',
        role: 'Operations Director, BlueWave Hospitality Group'
      },
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&h=600&fit=crop'
    }
  ]

  const filteredCases = activeTab === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === activeTab)

  const toggleExpand = (id) => {
    setExpandedCase(expandedCase === id ? null : id)
  }

  return (
    <div>
      <Helmet>
        <title>Case Studies - CloudNet Softwares | Success Stories</title>
        <meta name="description" content="Explore our case studies showcasing successful implementations of ChefMate POS and CloudNet ERP. Real results from real clients across restaurant, retail, and enterprise sectors." />
        <meta name="keywords" content="case studies, success stories, POS implementation, ERP solutions, client results, restaurant management" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/portfolio" />
        <meta property="og:title" content="Case Studies - CloudNet Softwares" />
        <meta property="og:description" content="Discover how CloudNet Softwares transformed businesses with POS and ERP solutions." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/portfolio" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Client <span className="text-orange-100">Success Stories</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-50">
              Real transformations delivered to businesses like yours. See how CloudNet solutions drive measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
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
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Case Studies (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="max-w-4xl space-y-6">
                {filteredCases.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Case Study Header - Always Visible */}
                    <button
                      onClick={() => toggleExpand(caseStudy.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all"
                    >
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                            {caseStudy.category.charAt(0).toUpperCase() + caseStudy.category.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {caseStudy.duration}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{caseStudy.title}</h3>
                        <p className="text-gray-600 mb-2">{caseStudy.subtitle}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📋 Client: <strong>{caseStudy.client}</strong></span>
                          <span>🏢 Industry: <strong>{caseStudy.industry}</strong></span>
                        </div>
                      </div>
                      <ChevronDown
                        size={28}
                        className={`text-orange-600 transition-transform duration-300 flex-shrink-0 ${
                          expandedCase === caseStudy.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expandable Content */}
                    {expandedCase === caseStudy.id && (
                      <div className="border-t-2 border-gray-100 p-6 space-y-6 bg-gradient-to-b from-orange-50 to-white">
                        
                        {/* Case Study Images */}
                        {caseStudy.images ? (
                          <div className="grid md:grid-cols-3 gap-4">
                            {caseStudy.images.map((img, idx) => (
                              <div key={idx} className="overflow-hidden rounded-lg">
                                <img
                                  src={img}
                                  alt={`${caseStudy.title} - Image ${idx + 1}`}
                                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="overflow-hidden rounded-lg">
                            <img
                              src={caseStudy.image}
                              alt={caseStudy.title}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Challenge, Solution, Results Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Challenge */}
                          <div className="bg-white p-5 rounded-lg border-l-4 border-red-500">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="text-red-500" size={20} />
                              <h4 className="font-bold text-gray-900">Challenge</h4>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{caseStudy.challenge}</p>
                          </div>

                          {/* Solution */}
                          <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-3">
                              <Code2 className="text-blue-500" size={20} />
                              <h4 className="font-bold text-gray-900">Solution</h4>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{caseStudy.solution}</p>
                          </div>

                          {/* Results */}
                          <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="text-green-500" size={20} />
                              <h4 className="font-bold text-gray-900">Results</h4>
                            </div>
                            <div className="space-y-2">
                              {caseStudy.results.slice(0, 2).map((result, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="font-bold text-green-600">{result.metric}</span>
                                  <p className="text-gray-600 text-xs">{result.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Results */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="text-orange-600" />
                            Key Metrics & Results
                          </h4>
                          <div className="grid md:grid-cols-4 gap-4">
                            {caseStudy.results.map((result, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-lg text-center border-2 border-orange-200">
                                <div className="text-3xl font-bold text-orange-600 mb-1">{result.metric}</div>
                                <p className="text-sm text-gray-600">{result.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies Used */}
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Technologies & Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold hover:bg-orange-200 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gray-900 text-white p-6 rounded-lg">
                          <p className="text-lg italic mb-4">"{caseStudy.testimonial.text}"</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold">{caseStudy.testimonial.author}</p>
                              <p className="text-gray-400 text-sm">{caseStudy.testimonial.role}</p>
                            </div>
                            <Users className="text-orange-600" size={32} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredCases.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No case studies found for this category.</p>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="space-y-6">
              {/* Related Solutions */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="text-orange-600" size={22} />
                  Our Solutions
                </h3>
                <div className="space-y-3">
                  <a href="/products/restaurant-pos" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-orange-100 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      🍽️
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-orange-600">ChefMate POS</p>
                      <p className="text-xs text-gray-600">Restaurant Management</p>
                    </div>
                    <ChevronDown size={18} className="text-orange-600 transform -rotate-90" />
                  </a>

                  <a href="/products/erp-solution" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-orange-100 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      📊
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-orange-600">CloudNet ERP</p>
                      <p className="text-xs text-gray-600">Enterprise Solutions</p>
                    </div>
                    <ChevronDown size={18} className="text-orange-600 transform -rotate-90" />
                  </a>

                  <a href="/products" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-orange-100 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      🔧
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-orange-600">All Products</p>
                      <p className="text-xs text-gray-600">Complete Product Suite</p>
                    </div>
                    <ChevronDown size={18} className="text-orange-600 transform -rotate-90" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/about" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors py-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    About CloudNet
                  </a>
                  <a href="/services" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors py-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Our Services
                  </a>
                  <a href="/products" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors py-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    View All Products
                  </a>
                  <a href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors py-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Industries We Serve */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Industries We Serve</h3>
                <div className="space-y-2">
                  {['Restaurant & Food', 'Retail & Commerce', 'Manufacturing', 'Enterprise'].map((industry, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm">✓</div>
                      <span className="text-gray-700">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Box */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Our Impact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-orange-400">4</p>
                    <p className="text-gray-300 text-sm">Successful Case Studies</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-400">50+</p>
                    <p className="text-gray-300 text-sm">Total Implementations</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-400">100%</p>
                    <p className="text-gray-300 text-sm">Client Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-3">Ready to Transform?</h3>
                <p className="text-sm mb-4 text-orange-50">Schedule a free consultation with our experts</p>
                <a href="/contact" className="block w-full bg-white text-orange-600 py-3 rounded-lg font-bold hover:bg-orange-50 transition-all">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Let's Connect <span className="text-orange-600">With You</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Phone */}
              <div className="bg-white rounded-lg p-8 text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 rounded-full p-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                <a href="tel:+66948712350" className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors">
                  +66-948712350
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg p-8 text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 rounded-full p-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-2">Reach out via email anytime</p>
                <a href="mailto:info@cloudnetsoftwares.com" className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors">
                  info@cloudnetsoftwares.com
                </a>
              </div>

              {/* Address - Main Office */}
              <div className="bg-white rounded-lg p-8 text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 rounded-full p-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Locations</h3>
                <p className="text-gray-600 mb-4">Visit us at our offices</p>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-orange-600 mb-1">🇮🇳 Main Office</p>
                    <p className="text-orange-600 font-bold mb-1">Bangalore, India</p>
                    <p className="text-xs text-gray-600">Business & Technology Hub</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-600 mb-1">🇹🇭 Regional Office</p>
                    <p className="text-orange-600 font-bold mb-1">Pattaya, Thailand</p>
                    <p className="text-xs text-gray-600">Southeast Asia Operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Details Grid */}
          <div className="grid md:grid-cols-1 gap-6 mt-8">
            {/* Bangalore Office */}
            <div className="hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🇮🇳</span>
                Bangalore, India
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">Tech Park, Sarjapur Road, Bangalore 560034</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+91-948712350" className="text-blue-600 hover:text-blue-800">+91-948712350</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@cloudnetsoftwares.com" className="text-blue-600 hover:text-blue-800">info@cloudnetsoftwares.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pattaya Office */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🇹🇭</span>
                Pattaya, Thailand
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">109, 19 Soi -14, Pattaya City, Bang Lamung District, Chon Buri 20150</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+66-948712350" className="text-purple-600 hover:text-purple-800">+66-948712350</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@cloudnetsoftwares.com" className="text-purple-600 hover:text-purple-800">info@cloudnetsoftwares.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM ICT</p>
                  </div>
                </div>
              </div>
            </div>

          {/* Quick Contact Box */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center mt-8">
            <h3 className="text-2xl font-bold mb-3">Global Support Available</h3>
            <p className="mb-6 text-orange-50">We serve clients 24/7 across multiple time zones</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="font-semibold mb-2 text-lg">🇮🇳 Bangalore Office</p>
                <p className="text-sm mb-1">Monday - Friday</p>
                <p className="font-bold text-orange-100">9:00 AM - 6:00 PM IST</p>
                <p className="text-sm mt-2">Saturday: 10:00 AM - 3:00 PM IST</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="font-semibold mb-2 text-lg">🇹🇭 Pattaya Office</p>
                <p className="text-sm mb-1">Monday - Friday</p>
                <p className="font-bold text-orange-100">9:00 AM - 6:00 PM ICT</p>
                <p className="text-sm mt-2">Saturday: 10:00 AM - 3:00 PM ICT</p>
              </div>
            </div>
            <p className="text-orange-50 text-sm mt-6">Holidays: Upon request for emergency support</p>
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready for Your Success Story?</h2>
            <p className="text-xl mb-8 text-orange-50">
              Let us help you achieve similar results. Book a free consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Get Your Consultation</span>
              </a>
              <a
                href="/products"
                className="bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-900 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Explore Our Solutions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudies
