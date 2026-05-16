import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ShoppingCart, Zap, Cloud, TrendingUp, ArrowRight } from 'lucide-react'

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
        <title>Products - CloudNet Softwares | POS & ERP Solutions</title>
        <meta name="description" content="Explore CloudNet Softwares products including ChefMate POS for restaurants and CloudNet ERP for enterprise resource planning." />
        <meta name="keywords" content="POS system, ERP software, restaurant POS, inventory management, business solutions, ChefMate, cloud-based" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products" />
        <meta property="og:title" content="Our Products - CloudNet Softwares" />
        <meta property="og:description" content="Professional business software solutions for restaurants and enterprises." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive software solutions designed specifically for food and beverage businesses to maximize efficiency and growth.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <div 
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Color Header */}
                <div className={`h-32 bg-gradient-to-r ${product.color} flex items-center justify-center text-white`}>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
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
                    className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Explore {product.title}</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Why CloudNet <span className="text-primary">Products?</span>
            </h2>
            <p className="section-subtitle">
              Industry-Leading Solutions for Modern Businesses
            </p>
          </div>

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
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-primary">Business?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the product that fits your business needs and start your digital transformation journey today.
          </p>
          <Link to="/contact" className="btn-primary">
            Schedule a Demo
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Products
