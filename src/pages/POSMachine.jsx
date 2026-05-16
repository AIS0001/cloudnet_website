import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, Zap, Package, Phone, Monitor, Cpu, Wifi, Smartphone, Coffee, MapPin, ChevronDown, Download, Info, Cog } from 'lucide-react'
import ShareSection from '../components/ShareSection'
import p1dpImg1 from '../assets/img/POS Machine/P1DP/P1DP.jpg'
import p1dpImg2 from '../assets/img/POS Machine/P1DP/P1DP (2).jpg'
import p1dpImg3 from '../assets/img/POS Machine/P1DP/P1DP (3).jpg'
import p1dpImg4 from '../assets/img/POS Machine/P1DP/P1DP (4).jpg'
import p1spImg1 from '../assets/img/POS Machine/P1SP/1.jpg'
import p1spImg2 from '../assets/img/POS Machine/P1SP/2.jpg'
import p1spImg3 from '../assets/img/POS Machine/P1SP/3.jpg'
import a10Img1 from '../assets/img/POS Machine/A10/A10.jpg'
import a10Img2 from '../assets/img/POS Machine/A10/A10 (2).jpg'
import a10Img3 from '../assets/img/POS Machine/A10/a10 (1).png'
import a10Img4 from '../assets/img/POS Machine/A10/a10 (2).png'
import appMobilePos from '../assets/img/Applications/Mobile POS and tablet ordering.jpg'
import appPopupStores from '../assets/img/Applications/Pop-up stores and kiosks.png'
import appRestaurantReceipts from '../assets/img/Applications/Restaurant counter receipts.webp'
import appRetailCheckout from '../assets/img/Applications/Retail checkout counters.jpg'

const POSMachine = () => {
  const [selectedModel, setSelectedModel] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedTab, setExpandedTab] = useState('detail')

  const posMachines = [
    {
      id: 'p1dp',
      name: 'P1DP Dual Screen POS Terminal',
      model: 'P1DP',
      pricing: 'Contact for pricing',
      images: [p1dpImg1, p1dpImg2, p1dpImg3, p1dpImg4],
      highlights: [
        '15.6" capacitive touch main display with secondary customer display',
        'Intel Core i5 processor with 4GB DDR3 memory',
        '128GB SSD storage for reliable operation',
        'Built-in thermal printer for receipts',
        'Multi-interface support: USB, LAN, WiFi',
        'Windows-based system for easy software integration'
      ],
      specifications: {
        'Main Display': '15.6" capacitive touch screen (1366x768)',
        'Customer Display': '15.6" secondary display',
        'Processor': 'Intel J6412 / Core i3 / Core i5 (6th-12th Gen)',
        'Memory': '4GB DDR3 RAM (upgradeable)',
        'Storage': '128GB SSD',
        'Brightness': '200-250 nits',
        'Touch Panel': 'Capacitive multi-point touch',
        'Printer': 'Built-in 58/80mm thermal receipt printer',
        'Barcode Scanner': 'Built-in optional scanner',
        'Interfaces': 'USB, Ethernet, WiFi optional',
        'Operating System': 'Windows-based',
        'Power': '100-240V AC input',
        'Dimensions': 'Space-efficient all-in-one design'
      },
      applications: [
        { text: 'Restaurant POS checkout', image: appRestaurantReceipts },
        { text: 'Retail store counter', image: appRetailCheckout },
        { text: 'Mobile POS and tablet ordering', image: appMobilePos },
        { text: 'Pop-up stores and kiosks', image: appPopupStores },
        { text: 'Quick service restaurants', image: appRestaurantReceipts }
      ],
      features: [
        'Stable and reliable thermal printer integration',
        'Fast processing with high-performance CPU',
        'Clear, bright display for easy visibility',
        'Durable capacitive touch screen',
        'Easy maintenance and support',
        'Customizable software compatibility'
      ],
      tabs: [
        { id: 'detail', label: 'Product Detail', icon: Info },
        { id: 'configuration', label: 'Product Configuration', icon: Cog },
        { id: 'download', label: 'Download', icon: Download },
        { id: 'description', label: 'Product Description', icon: Monitor }
      ],
      tabContent: {
        detail: {
          title: 'P1DP Features Overview',
          items: [
            'Dual 15.6" capacitive touch displays for optimal customer experience',
            'Intel Core i5 processor ensures fast and responsive operations',
            '4GB DDR3 RAM with 128GB SSD for smooth multitasking',
            'Built-in thermal receipt printer for immediate transaction printing',
            'Multi-interface support: USB, Ethernet, WiFi connectivity',
            'Windows-based operating system with broad software compatibility',
            'Industrial-grade panel design for durability and reliability',
            'Elegant and professional appearance suitable for any retail environment'
          ]
        },
        configuration: {
          title: 'Standard Package Includes',
          items: [
            'P1DP POS Terminal x1',
            'Customer Display Screen x1',
            'Thermal Receipt Printer (Built-in) x1',
            'Power Cable and Adapter x1',
            'USB Cable for Peripherals x2',
            'Ethernet Cable x1',
            'Documentation and Quick Start Guide x1',
            'Support and Warranty Information x1'
          ]
        },
        download: {
          title: 'Available Downloads',
          items: [
            'Device Driver Package (Windows Compatible)',
            'Technical Documentation and User Manual',
            'System Setup and Configuration Guide',
            'Thermal Printer Driver Software',
            'POS System Integration Specifications',
            'Troubleshooting and Support Guide'
          ]
        },
        description: {
          title: 'Complete Product Description',
          items: [
            'The P1DP is a professional-grade POS terminal designed specifically for restaurants, retail stores, and hospitality establishments.',
            'It combines dual-screen capability with powerful internal specifications to handle high-volume transactions seamlessly.',
            'The main 15.6" capacitive touch display serves as the operator interface, while the secondary customer display shows itemized receipts and payment information.',
            'The integrated thermal receipt printer eliminates the need for external hardware connections, streamlining the setup process.',
            'Advanced Intel Core i5 processing ensures rapid transaction completion and system responsiveness even during peak business hours.',
            'The Windows-based platform provides flexibility for running various POS and back-office software applications.',
            'With multiple connectivity options including USB, Ethernet, and optional WiFi, the P1DP integrates easily with existing business infrastructure.',
            'The sleek, all-in-one design minimizes counter space while delivering professional performance that builds customer confidence.'
          ]
        }
      }
    },
    {
      id: 'p1sp',
      name: 'P1SP Single Screen POS Terminal',
      model: 'P1SP',
      pricing: 'Contact for pricing',
      images: [p1spImg1, p1spImg2, p1spImg3],
      highlights: [
        '15.6" capacitive touch display for optimized workspace',
        'Flexible processor options: Core i3/i5 configurations',
        '128GB SSD storage with smooth multitasking',
        'Built-in thermal printer for receipt generation',
        'Single-display design saves counter space',
        'Professional appearance suitable for any retail environment'
      ],
      specifications: {
        'Display': '15.6" capacitive touch screen',
        'Resolution': '1366x768',
        'Processor': 'Intel Core i3 / Core i5 (Configurable)',
        'Memory': '4GB DDR3 RAM (upgradeable)',
        'Storage': '128GB SSD',
        'Touch Panel': 'Capacitive multi-point touch',
        'Printer': 'Built-in 58/80mm thermal receipt printer',
        'Interfaces': 'USB, Ethernet',
        'Operating System': 'Windows-based',
        'Brightness': '200-250 nits',
        'Power': '100-240V AC input',
        'Dimensions': 'Compact all-in-one design',
        'Weight': 'Lightweight and portable'
      },
      applications: [
        { text: 'Single-operator retail counters', image: appRetailCheckout },
        { text: 'Small scale cafes and restaurants', image: appRestaurantReceipts },
        { text: 'Quick service points', image: appRestaurantReceipts },
        { text: 'Boutiques and specialty stores', image: appPopupStores },
        { text: 'Payment kiosks', image: appMobilePos }
      ],
      tabs: [
        { id: 'detail', label: 'Product Detail', icon: Info },
        { id: 'configuration', label: 'Product Configuration', icon: Cog },
        { id: 'download', label: 'Download', icon: Download },
        { id: 'description', label: 'Product Description', icon: Monitor }
      ],
      tabContent: {
        detail: {
          title: 'P1SP Features Overview',
          items: [
            'Single 15.6" capacitive touch display for space efficiency',
            'Flexible processor options: Intel Core i3 or Core i5',
            '4GB DDR3 RAM with 128GB SSD for reliable performance',
            'Built-in thermal receipt printer for transactions',
            'Compact design ideal for smaller retail locations',
            'Windows-based operating system with broad software support',
            'Professional aesthetic that enhances customer experience',
            'Easy integration with existing retail infrastructure'
          ]
        },
        configuration: {
          title: 'Standard Package Includes',
          items: [
            'P1SP POS Terminal x1',
            'Thermal Receipt Printer (Built-in) x1',
            'Power Cable and Adapter x1',
            'USB Cables for Peripherals x2',
            'Ethernet Cable x1',
            'Documentation and Quick Start Guide x1',
            'Technical Specifications Sheet x1',
            'Warranty and Support Information x1'
          ]
        },
        download: {
          title: 'Available Downloads',
          items: [
            'Device Driver Package (Windows Compatible)',
            'Technical Documentation and User Manual',
            'System Setup and Configuration Guide',
            'Thermal Printer Driver Software',
            'POS System Integration Specifications',
            'Troubleshooting and Support Guide'
          ]
        },
        description: {
          title: 'Complete Product Description',
          items: [
            'The P1SP is a space-efficient single-screen POS terminal perfect for small to medium-sized retail operations.',
            'Designed with single-operator retail counters, cafes, and boutiques in mind.',
            'The 15.6" capacitive touch display provides excellent responsiveness and visual clarity.',
            'Built-in thermal printer eliminates the need for external hardware setup.',
            'Flexible processor configuration allows you to choose between Core i3 and Core i5 options.',
            'Windows platform ensures compatibility with popular POS and business software.',
            'The compact design maximizes usable counter space while maintaining professional appearance.',
            'Ideal for businesses looking for a cost-effective, reliable POS solution without space constraints.'
          ]
        }
      }
    },
    {
      id: 'a10',
      name: 'A10 15.6" POS Terminal',
      model: 'A10',
      pricing: 'Contact for pricing',
      images: [a10Img1, a10Img2, a10Img3, a10Img4],
      highlights: [
        '15.6" full HD display with ultra-narrow bezel design',
        'Fanless aluminum alloy body for silent operation',
        'Flexible OS options: Windows, Linux, or Android',
        'Modular peripherals support: printer, scanner, RFID, VFD',
        'Hidden wire base for clean counter setup',
        'Optional dual screen customer display'
      ],
      specifications: {
        'Display': '15.6" TFT-LED, 1920x1080',
        'CPU Options': 'RK3568 (Android) or N5095/N97/N100/J6412/Core i3/i5/i7',
        'Operating System': 'Android 11/13, Windows 10/11, Linux',
        'Memory': '2GB/4GB/8GB (Android) or 4GB DDR4 (Windows)',
        'Storage': '32/64/128GB (Android) or 128/256/512GB SSD',
        'Optional 2nd Display': '10.1" (1280x800) or 11.6" (1366x768)',
        'Wireless': '2.4G + 5G WiFi (optional)',
        'I/O Ports': 'USB, COM, RJ45, audio, DC-in, HDMI/VGA (varies)',
        'Body': 'Aluminum alloy with hidden cable management',
        'Weight': 'Approx. 4.75 kg'
      },
      applications: [
        { text: 'Retail checkout counters', image: appRetailCheckout },
        { text: 'Restaurant counter receipts', image: appRestaurantReceipts },
        { text: 'Mobile POS and tablet ordering', image: appMobilePos },
        { text: 'Pop-up stores and kiosks', image: appPopupStores },
        { text: 'Quick service points', image: appRestaurantReceipts }
      ],
      tabs: [
        { id: 'detail', label: 'Product Detail', icon: Info },
        { id: 'configuration', label: 'Product Configuration', icon: Cog },
        { id: 'download', label: 'Download', icon: Download },
        { id: 'description', label: 'Product Description', icon: Monitor }
      ],
      tabContent: {
        detail: {
          title: 'A10 Features Overview',
          items: [
            '15.6" full HD display with slim bezel design',
            'Fanless aluminum body for silent, durable operation',
            'Flexible CPU options for Android or Windows builds',
            'Hidden cable management base keeps counters tidy',
            'Modular peripherals: scanner, printer, RFID, VFD',
            'Adjustable screen angle for ergonomic viewing',
            'Optional dual display for customer-facing use',
            'Rich I/O for peripherals without extra hubs'
          ]
        },
        configuration: {
          title: 'Standard Package Includes',
          items: [
            'A10 POS Terminal x1',
            'Power Cable and Adapter x1',
            'I/O Port Cover with hidden cable routing x1',
            'Documentation and Quick Start Guide x1',
            'Warranty and Support Information x1'
          ]
        },
        download: {
          title: 'Available Downloads',
          items: [
            'Device Driver Package (Windows/Android)',
            'Technical Documentation and User Manual',
            'System Setup and Configuration Guide',
            'Peripheral Integration Notes',
            'Troubleshooting and Support Guide'
          ]
        },
        description: {
          title: 'Complete Product Description',
          items: [
            'The A10 is a modern 15.6" POS terminal designed for small businesses and retail counters.',
            'Its fanless aluminum body and hidden wiring base create a clean, quiet, professional setup.',
            'Choose Android or Windows configurations to match your POS software and budget.',
            'Optional customer display, scanners, RFID, and VFD modules support flexible workflows.',
            'The full HD panel with adjustable viewing angle improves operator comfort and clarity.',
            'A10 delivers a compact yet powerful all-in-one solution for retail and hospitality.'
          ]
        }
      }
    }
  ]

  const posMachine = posMachines[selectedModel]
  const hasImages = posMachine.images && posMachine.images.length > 0

  return (
    <div>
      <Helmet>
        <title>POS Machine Catalog - CloudNet Softwares | Professional Point of Sale Terminals</title>
        <meta
          name="description"
          content="Professional POS Machine terminals for restaurants, retail, and hospitality. Dual screen, single screen, and smart POS solutions."
        />
        <meta
          name="keywords"
          content="POS machine, POS terminal, point of sale, restaurant POS, retail POS, dual screen, touch screen"
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/pos-machine" />
        <meta property="og:title" content="POS Machine Catalog - Professional Point of Sale Terminals" />
        <meta
          property="og:description"
          content="Explore our range of professional POS machines for business solutions."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/pos-machine" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            POS <span className="text-orange-600">Machine</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional point-of-sale terminals designed for retail, restaurants, and hospitality businesses.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Model Tabs */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">POS Models</h3>
                {posMachines.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedModel(idx)
                      setCurrentImageIndex(0)
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedModel === idx
                        ? 'bg-orange-600 text-white border-orange-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-sm md:text-base">{item.model}</div>
                    <div className={`text-xs mt-1 ${selectedModel === idx ? 'text-orange-100' : 'text-gray-500'}`}>
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3">
              {hasImages ? (
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Image Slider */}
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6">
                    <div className="relative group flex items-center justify-center min-h-[520px]">
                      <img
                        src={posMachine.images[currentImageIndex]}
                        alt={`${posMachine.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? posMachine.images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === posMachine.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {posMachine.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex ? 'bg-orange-600 w-6' : 'bg-white/70 hover:bg-white'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-8">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{posMachine.name}</h2>
                      <p className="text-lg text-gray-600 mb-2">Model: {posMachine.model}</p>
                      <p className="text-2xl font-bold text-orange-600">{posMachine.pricing}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {posMachine.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="text-orange-600 mt-1" size={18} />
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                        <Zap size={18} />
                        Request Quote
                      </a>
                      <a href="/contact" className="border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2">
                        <Phone size={18} />
                        Talk to Sales
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-12 text-center">
                  <Package size={64} className="text-orange-600 mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{posMachine.name}</h3>
                  <p className="text-lg text-gray-600 mb-6">Model: {posMachine.model}</p>
                  <p className="text-xl font-bold text-orange-600 mb-8">{posMachine.pricing}</p>
                  
                  <div className="space-y-3 mb-8 text-left max-w-xl mx-auto">
                    {posMachine.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-orange-600 mt-1 flex-shrink-0" size={18} />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                      <Zap size={18} />
                      Request Quote
                    </a>
                    <a href="/contact" className="border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2">
                      <Phone size={18} />
                      Talk to Sales
                    </a>
                  </div>
                </div>
              )}

              {posMachine.specifications && (
                <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200">
                  <div className="border-b px-6 py-4 flex items-center gap-2">
                    <Monitor className="text-orange-600" size={20} />
                    <h3 className="text-xl font-bold text-gray-900">Specifications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 p-6">
                    {Object.entries(posMachine.specifications).map(([label, value]) => (
                      <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">{label}</span>
                        <span className="text-gray-900 font-semibold text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {posMachine.tabs && (
                <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200">
                  {/* Tab Buttons */}
                  <div className="flex flex-wrap border-b">
                    {posMachine.tabs.map((tab) => {
                      const TabIcon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setExpandedTab(tab.id)}
                          className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                            expandedTab === tab.id
                              ? 'text-orange-600 border-orange-600 bg-orange-50'
                              : 'text-gray-600 border-transparent hover:text-orange-500'
                          }`}
                        >
                          <TabIcon size={18} />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Tab Content */}
                  <div className="p-8">
                    {posMachine.tabContent && expandedTab in posMachine.tabContent && (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          {posMachine.tabContent[expandedTab].title}
                        </h3>
                        <ul className="space-y-3">
                          {posMachine.tabContent[expandedTab].items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <CheckCircle size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {posMachine.applications && (
                <div className="mt-10">
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Applications</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {posMachine.applications.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-lg overflow-hidden border border-orange-200 hover:shadow-md transition-shadow group">
                          <div className="relative h-28 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.text}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                          </div>
                          <div className="p-4">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <ShareSection productName="POS Machine" />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help Choosing the <span className="text-orange-600">Right POS?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our sales team for expert guidance and custom configurations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
              <Phone size={18} />
              Contact Sales
            </a>
            <a href="/contact" className="border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2">
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default POSMachine
