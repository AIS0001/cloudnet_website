import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ShoppingCart, Zap, Cloud, TrendingUp, ArrowRight, Music2, Lock, CreditCard, Sparkles, MonitorPlay, ScanEye } from 'lucide-react'
import ScrollReveal from '../components/animations/ScrollReveal'
import CloudNetworkBackground from '../components/cloudnet/CloudNetworkBackground'

const Products = () => {
  const products = [
    {
      icon: <ShoppingCart size={60} />,
      title: "Restaurant POS",
      description: "The world's leading cloud-based restaurant point of sale system. Build to support restaurants grow and scale with flexibility and security.",
      features: [
        "Cloud-based open API framework",
        "200+ integration partners",
        "Real-time information at fingertips",
        "Intuitive ordering interface",
        "Instant kitchen communication"
      ],
      link: "/products/restaurant-pos",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: <Music2 size={60} />,
      title: "NightPulse",
      description: "Cloud-based POS built for cafes, restaurants, bars, clubs, and karaoke (Kayotee) venues - from a single small outlet to a multi-location chain.",
      features: [
        "Billing, inventory & room/table management",
        "Kayotee commission management",
        "20+ report types with real-time dashboards",
        "Dedicated Manager and POS mobile apps",
        "Multi-location, centralized control"
      ],
      link: "/products/nightpulse",
      color: "from-fuchsia-500 to-purple-700"
    },
    {
      icon: <Cloud size={60} />,
      title: "ERP Solution",
      description: "Comprehensive enterprise resource planning system designed for food & beverage operations. Streamline your entire business processes.",
      features: [
        "Unified business operations",
        "Inventory management",
        "Financial planning & analysis",
        "Supply chain optimization",
        "Real-time analytics & reporting"
      ],
      link: "/products/erp-solution",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <Lock size={60} />,
      title: "Access Gate System",
      description: "Cloud-based, centralized entry and exit gate access control with face recognition, RFID cards, and QR code entry, managed from one dashboard.",
      features: [
        "Face recognition & contactless access",
        "RFID card and QR code entry",
        "Centralized cloud dashboard",
        "Manage every gate from anywhere",
        "Real-time access logs & reporting"
      ],
      link: "/products/access-gate-system",
      color: "from-teal-400 to-emerald-600"
    },
    {
      icon: <CreditCard size={60} />,
      title: "POS Machine",
      description: "Professional point-of-sale terminals - dual screen, single screen, and mobile models - built for retail, restaurant, and hospitality counters.",
      features: [
        "Dual and single screen terminal options",
        "Built-in thermal receipt printer",
        "Handheld and tablet POS models",
        "NFC, 4G/WiFi connectivity options",
        "Durable, business-grade hardware"
      ],
      link: "/products/pos-machine",
      color: "from-slate-500 to-slate-700"
    },
    {
      icon: <MonitorPlay size={60} />,
      title: "CloudScreen",
      description: "Digital advertising displays and LED screen management - sell time slots, run event packages, and manage every screen remotely from the cloud.",
      features: [
        "Standard advertising time slots",
        "Event & special occasion packages",
        "Remote, cloud-based screen management",
        "Targeted audience reach",
        "Affordable, flexible packages"
      ],
      link: "/products/cloudscreen",
      color: "from-purple-500 to-orange-500"
    },
    {
      icon: <ScanEye size={60} />,
      title: "CloudEye",
      description: "AI-powered people and vehicle traffic counting from your live camera streams - turn footfall into real marketing and business analysis.",
      features: [
        "Live multi-camera monitoring",
        "People & vehicle detection",
        "De-duplicated unique visitor counts",
        "Real-time alerts",
        "Marketing-ready traffic reports"
      ],
      link: "/products/cloudeye",
      color: "from-orange-500 to-emerald-600"
    },
    {
      icon: <ShoppingCart size={60} />,
      title: "Kiosk Machine",
      description: "Self-service kiosk solution for restaurants, hotels, retail, and entertainment venues. Improve ordering speed and customer experience.",
      features: [
        "Self-ordering and digital check-in",
        "Queue and token workflow support",
        "Cloud-based menu and content updates",
        "Payment integration options",
        "Custom software workflow modules"
      ],
      link: "/products/kiosk-machine",
      color: "from-emerald-400 to-emerald-600"
    }
  ]

  return (
    <div>
      <Helmet>
        <title>Products - CloudNet Softwares | POS, ERP & Access Solutions</title>
        <meta name="description" content="Explore CloudNet Softwares products including Restaurant POS, NightPulse, CloudNet ERP, Access Gate System, POS Machine, and Kiosk Machine - one connected ecosystem." />
        <meta name="keywords" content="POS system, ERP software, restaurant POS, NightPulse, access gate system, POS machine, kiosk machine, inventory management, business solutions, cloud-based" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products" />
        <meta property="og:title" content="Our Products - CloudNet Softwares" />
        <meta property="og:description" content="Professional business software and hardware solutions, all connected on one CloudNet platform." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One connected ecosystem of software and hardware, built to maximize efficiency and growth for
            businesses of every size.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <ScrollReveal
                key={index}
                delay={(index % 3) * 0.1}
              >
                <div className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Color Header */}
                  <div className={`h-32 bg-gradient-to-r ${product.color} flex items-center justify-center text-white`}>
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {product.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8 flex-1">
                      <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <Zap size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link
                      to={product.link}
                      className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 w-fit"
                    >
                      <span>Explore {product.title}</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="section-title">
              Why CloudNet <span className="text-primary">Products?</span>
            </h2>
            <p className="section-subtitle">
              Industry-Leading Solutions for Modern Businesses
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap size={40} />,
                title: "Lightning Fast",
                description: "Cloud-based infrastructure ensures optimal performance and speed"
              },
              {
                icon: <Cloud size={40} />,
                title: "Scalable",
                description: "Grow your business without worrying about technology limitations"
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Growth Focused",
                description: "Designed to support your business expansion and evolution"
              },
              {
                icon: <ShoppingCart size={40} />,
                title: "Easy Integration",
                description: "Seamlessly integrate with 200+ partners and existing systems"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clario AI Teaser */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <CloudNetworkBackground density="low" />
        <div className="container mx-auto px-4 relative text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              <Sparkles size={16} />
              The Intelligence Engine Behind CloudNet
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Every Product, <span className="text-primary">One AI Assistant</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Clario AI connects with all of the products above - ask about your business in plain language
              and get answers from your real data, plus automation that handles the busywork for you.
            </p>
            <Link
              to="/clario-ai"
              className="inline-flex bg-white text-slate-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Meet Clario AI
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-primary">Business?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the product that fits your business needs and start your digital transformation journey today.
          </p>
          <Link to="/contact" className="btn-primary">
            Schedule a Demo
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}

export default Products
