import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ChevronDown, Package, Zap, DollarSign, TrendingUp, Download, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import ShareSection from '../components/ShareSection'
import thermalImg1 from '../assets/img/thermalpaper/1.png'
import thermalImg2 from '../assets/img/thermalpaper/2.png'
import thermalImg3 from '../assets/img/thermalpaper/3.png'
import thermal8060Img1 from '../assets/img/thermalpaper/80x60/80x60-1.png'
import thermal8060Img2 from '../assets/img/thermalpaper/80x60/80x60-2.png'
import thermal8060Img3 from '../assets/img/thermalpaper/80x60/80x60-3.png'
import thermal58Img1 from '../assets/img/thermalpaper/58mm/58mm-1.png'
import thermal58Img2 from '../assets/img/thermalpaper/58mm/58mm-2.png'
import thermal58Img3 from '../assets/img/thermalpaper/58mm/58mm-3.png'

const ThermalPaper = () => {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [expandedTab, setExpandedTab] = useState('specifications')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const thermalPaperProducts = [
    {
      id: 1,
      name: '58mm Thermal Roll',
      model: 'TP-58-80',
      price: 'Coming Soon',
      image: thermal58Img1,
      images: [thermal58Img1, thermal58Img2, thermal58Img3],
      width: '58mm',
      length: '30m / 50m',
      cores: '12mm Inner Diameter',
      gsm: '60 GSM',
      shelf_life: '2 years',
      quantity_per_box: '50 rolls',
      description: 'Standard 58mm thermal rolls perfect for POS machines, receipt printers, and billing systems. High-quality thermal paper ensures clear, long-lasting prints.',
      features: [
        'High sensitivity coating for clear prints',
        'Fade-resistant for 2+ years',
        'Compatible with all 58mm printers',
        'Smooth surface for barcode scanning',
        'Individually wrapped for hygiene',
        'Eco-friendly material'
      ],
      specifications: {
        'Width': '58mm ±1mm',
        'Diameter': '80mm Standard',
        'Core': '12mm',
        'GSM': '60 GSM',
        'Coating': 'Thermal Sensitive',
        'Temperature Range': '0°C to 40°C Storage',
        'Humidity': '20-80% RH',
        'Shelf Life': '2 years when properly stored'
      },
      compatibility: ['Epson TM Series', 'Zebra Printers', 'Star Micronics', 'All Standard 58mm Printers'],
      applications: ['Retail POS', 'Restaurant Billing', 'Warehouse Labels', 'Shipping Labels', 'Parking Tickets']
    },
    {
      id: 2,
      name: '80x60mm Thermal Roll',
      model: 'TP-80-60',
      price: '฿30',
      image: thermal8060Img1,
      images: [thermal8060Img1, thermal8060Img2, thermal8060Img3],
      width: '80mm',
      length: '60m',
      cores: '16mm Inner Diameter',
      gsm: '60 GSM',
      shelf_life: '2 years',
      quantity_per_box: '30 rolls',
      description: 'Wide 80mm thermal rolls for high-volume printing. Ideal for detailed receipts, invoices, and comprehensive billing documentation.',
      features: [
        'Wider format for detailed receipts',
        'Premium thermal coating',
        'Excellent print quality and clarity',
        'Moisture-resistant coating',
        'Heavy-duty construction',
        'Cost-effective bulk pricing'
      ],
      specifications: {
        'Width': '80mm ±1mm',
        'Diameter': '100mm Standard',
        'Core': '16mm',
        'GSM': '60 GSM',
        'Coating': 'Premium Thermal Sensitive',
        'Temperature Range': '0°C to 40°C Storage',
        'Humidity': '20-80% RH',
        'Shelf Life': '2 years when properly stored'
      },
      compatibility: ['Epson TM-L100/200', 'Zebra ZT Series', 'Star Micronics SP700', 'Brother',  'All Standard 80mm Printers'],
      applications: ['Hypermarkets', 'Restaurants (A4 size)', 'Courier Labels', 'Hospital Records', 'Educational Institutions']
    },
    {
      id: 3,
      name: '80x80mm Thermal Roll',
      model: 'TP-80-80',
      price: '฿40',
      image: thermalImg1,
      images: [thermalImg1, thermalImg2, thermalImg3],
      width: '80mm',
      length: '80m',
      cores: '16mm Inner Diameter',
      gsm: '60 GSM',
      shelf_life: '2 years',
      quantity_per_box: '20 rolls',
      description: 'Extra-wide 80x80mm thermal rolls for professional printing and labeling. Ideal for detailed receipts and comprehensive documentation.',
      features: [
        'Wide 80mm format for detailed receipts',
        'Premium thermal coating',
        'Excellent print quality and clarity',
        'Moisture-resistant coating',
        'Heavy-duty construction',
        'Cost-effective pricing'
      ],
      specifications: {
        'Width': '80mm ±1mm',
        'Diameter': '80mm Standard',
        'Core': '12mm',
        'GSM': '60 GSM',
        'Coating': 'Premium Thermal Sensitive',
        'Temperature Range': '0°C to 40°C Storage',
        'Humidity': '20-80% RH',
        'Shelf Life': '2 years when properly stored'
      },
      compatibility: ['Epson TM-L100/200', 'Zebra ZT Series', 'Star Micronics SP700', 'Brother', 'All Standard 80mm Printers'],
      applications: ['Restaurants', 'Receipt Printing', 'Invoice Printing', 'Detailed Billing', 'Commercial Use']
    },
    {
      id: 4,
      name: 'Colored Thermal Roll',
      model: 'TP-58-COLOR',
      price: 'Coming Soon',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=600&fit=crop',
      width: '58mm',
      length: '30m',
      cores: '12mm Inner Diameter',
      gsm: '65 GSM',
      shelf_life: '18 months',
      quantity_per_box: '50 rolls',
      description: 'Premium colored thermal rolls in yellow, blue, red, and pink for enhanced visibility and categorization. Perfect for organized billing and organization.',
      features: [
        'Available in 4 vibrant colors',
        'Pre-colored for instant categorization',
        'High-contrast printing surface',
        'Superior color retention',
        'Eco-certif friendly colored paper',
        'Perfect for priority/urgent marking'
      ],
      specifications: {
        'Width': '58mm ±1mm',
        'Diameter': '80mm Standard',
        'Core': '12mm',
        'GSM': '65 GSM',
        'colors': ['Yellow', 'Blue', 'Red', 'Pink'],
        'Temperature Range': '0°C to 35°C Storage',
        'Humidity': '20-80% RH',
        'Shelf Life': '18 months when properly stored'
      },
      compatibility: ['All 58mm Thermal Printers', 'Epson TM Series', 'Zebra Printers', 'Star Micronics'],
      applications: ['Priority Receipts', 'Categorized Billing', 'VIP Customer Marking', 'Shift-wise Tracking', 'Department Identification']
    },
    {
      id: 5,
      name: 'Photo Grade Thermal Roll',
      model: 'TP-58-PHOTO',
      price: 'Coming Soon',
      image: 'https://images.unsplash.com/photo-1599744424109-0a7f2b4e8f5a?w=500&h=600&fit=crop',
      width: '58mm',
      length: '20m',
      cores: '12mm Inner Diameter',
      gsm: '80 GSM',
      shelf_life: '3 years',
      quantity_per_box: '20 rolls',
      description: 'Premium photo-grade thermal paper for high-quality image printing. Ideal for photography studios, event management, and professional photo receipts.',
      features: [
        'Ultra-high resolution print capability',
        'Photo-quality finish',
        'Rich color saturation (on color printers)',
        'Archival-quality 3+ year fade resistance',
        'Professional matte/glossy finish',
        'Museum-grade durability'
      ],
      specifications: {
        'Width': '58mm ±0.5mm',
        'Diameter': '80mm Premium',
        'Core': '12mm',
        'GSM': '80 GSM Premium',
        'Finish': 'Matte (Glossy optional)',
        'Temperature Range': '15°C to 25°C Storage (Optimal)',
        'Humidity': '30-60% RH (Optimal)',
        'Shelf Life': '3+ years when properly stored'
      },
      compatibility: ['Professional Thermal Color Printers', 'Epson Photo Printers', 'Premium Label Printers'],
      applications: ['Photo Printing', 'Event Photography', 'Studio Receipts', 'Premium Labels', 'Memory Keepsakes']
    }
  ]

  const tabs = [
    { id: 'specifications', label: 'Specifications', icon: '📋' },
    { id: 'features', label: 'Features & Benefits', icon: '⭐' },
    { id: 'compatibility', label: 'Compatibility', icon: '🔗' },
    { id: 'applications', label: 'Applications', icon: '📦' }
  ]

  const product = thermalPaperProducts[selectedProduct]

  return (
    <div>
      <Helmet>
        <title>Thermal Paper Rolls - CloudNet Softwares | POS & Billing Paper</title>
        <meta name="description" content="High-quality thermal paper rolls in 58mm, 80mm, and 100mm sizes. Perfect for POS machines, receipt printers, and thermal label printing." />
        <meta name="keywords" content="thermal paper, thermal rolls, POS paper, receipt paper, label paper, 58mm, 80mm, 100mm" />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/thermal-paper" />
        <meta property="og:title" content="Thermal Paper Rolls - CloudNet Softwares" />
        <meta property="og:description" content="Premium thermal paper rolls for all your printing needs." />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/thermal-paper" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Thermal <span className="text-orange-600">Paper Rolls</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium quality thermal paper for POS machines, receipt printers, and thermal label printing
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - Product Tabs */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Products</h3>
                {thermalPaperProducts.map((product, idx) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(idx)
                      setExpandedTab('specifications')
                      setCurrentImageIndex(0)
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedProduct === idx
                        ? 'bg-orange-600 text-white border-orange-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-sm md:text-base">{product.name}</div>
                    <div className={`text-xs mt-1 ${selectedProduct === idx ? 'text-orange-100' : 'text-gray-500'}`}>
                      {product.width} • {product.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border-2 border-gray-200">
                {/* Product Header */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Product Image */}
                  <div className="overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center min-h-[600px]">
                    {product.images ? (
                      <div className="relative group w-full h-full flex items-center justify-center">
                        <img
                          src={product.images[currentImageIndex]}
                          alt={`${product.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                        {/* Previous Button */}
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        {/* Next Button */}
                        <button
                          onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-label="Next image"
                        >
                          <ChevronRight size={20} />
                        </button>
                        {/* Dot Indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {product.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex ? 'bg-orange-600 w-6' : 'bg-white/60 hover:bg-white'
                              }`}
                              aria-label={`Go to image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                      <p className="text-lg text-gray-600 mb-3">{product.model}</p>
                      <p className="text-2xl font-bold text-orange-600">{product.price}</p>
                    </div>

                    {/* Quick Info Box */}
                    <div className="bg-white rounded-lg p-4 border-2 border-orange-200 mb-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-semibold">Width:</span>
                        <span className="text-gray-900 font-bold">{product.width}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 font-semibold">Length:</span>
                        <span className="text-gray-900 font-bold">{product.length}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 font-semibold">Per Box:</span>
                        <span className="text-gray-900 font-bold">{product.quantity_per_box}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 font-semibold">Shelf Life:</span>
                        <span className="text-gray-900 font-bold">{product.shelf_life}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <a href="/contact" className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                        <Phone size={18} />
                        <span>Request Quote</span>
                      </a>
                      <button className="flex-1 border-2 border-orange-600 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                        <Download size={18} />
                        <span>Download Spec</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Tabs */}
                <div className="border-t-2 pt-8">
                  {/* Tab Buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setExpandedTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          expandedTab === tab.id
                            ? 'bg-orange-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
                    {expandedTab === 'specifications' && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-3 border-b">
                              <span className="font-semibold text-gray-700">{key}:</span>
                              <span className="text-gray-900 font-medium">
                                {Array.isArray(value) ? value.join(', ') : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {expandedTab === 'features' && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Features & Benefits</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                              <span className="text-orange-600 font-bold text-lg">✓</span>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {expandedTab === 'compatibility' && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Printer Compatibility</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {product.compatibility.map((brand, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                              <span className="text-2xl">🖨️</span>
                              <span className="text-gray-900 font-semibold">{brand}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {expandedTab === 'applications' && (
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Ideal Applications</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {product.applications.map((app, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <span className="text-green-600 text-2xl">📌</span>
                              <span className="text-gray-700 font-medium">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Thermal Paper?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">High-grade thermal coating for crystal-clear prints</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Best Pricing</h3>
              <p className="text-gray-600 text-sm">Competitive rates with bulk discounts available</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick shipment across India and Southeast Asia</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Dedicated customer support for your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <ShareSection productName="Thermal Paper" />

      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-xl mb-8 text-orange-50">
              Get bulk quotes, wholesale pricing, and fast delivery to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Contact Sales Team</span>
              </a>
              <a
                href="tel:+66948712350"
                className="bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-900 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ThermalPaper
