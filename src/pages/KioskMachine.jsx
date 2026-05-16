import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, Zap, Phone, Monitor, Package, Download, Info, Cog } from 'lucide-react'
import ShareSection from '../components/ShareSection'
import kioskImg1 from '../assets/img/kiosk/kiosk1.avif'
import kioskImg2 from '../assets/img/kiosk/kiosk2.avif'
import appMobilePos from '../assets/img/Applications/Mobile POS and tablet ordering.jpg'
import appPopupStores from '../assets/img/Applications/Pop-up stores and kiosks.png'
import appRestaurantReceipts from '../assets/img/Applications/Restaurant counter receipts.webp'
import appRetailCheckout from '../assets/img/Applications/Retail checkout counters.jpg'

const KioskMachine = () => {
  const [selectedModel, setSelectedModel] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedTab, setExpandedTab] = useState('detail')

  const kioskMachines = [
    {
      id: 'k1-floor',
      name: '32" Self-Order Touch Kiosk',
      model: 'K32-Floor',
      pricing: 'Contact for pricing',
      images: [kioskImg1, kioskImg2],
      highlights: [
        '32-inch full HD display for clear self-order workflow',
        '10-point capacitive touch with fast response',
        'Supports QR, card, and e-wallet payment integration',
        'Built-in 80mm thermal printer for receipts and queue tokens',
        'Optional 1D/2D scanner, NFC, camera, and POS modules',
        'Commercial-grade housing for high-traffic environments'
      ],
      specifications: {
        Display: '32" TFT LCD, 1920x1080 (Full HD)',
        'Touch Panel': 'Projected capacitive, 10-point multi-touch',
        CPU: 'Android RK3568 / RK3288 or Intel i3/i5/i7 (optional)',
        Memory: '4GB / 8GB (configurable)',
        Storage: '32GB / 64GB / 128GB SSD or eMMC',
        Printer: 'Built-in 80mm thermal printer with auto-cutter',
        Scanner: 'Optional 1D/2D barcode and QR scanner',
        Camera: 'Optional front camera for verification',
        Speaker: 'Built-in stereo speakers',
        Payment: 'Optional POS, NFC, QR, and card terminal integration',
        Connectivity: 'LAN, WiFi, Bluetooth, optional 4G',
        'I/O Ports': 'USB, RJ45, audio, HDMI/VGA (varies by board)',
        Power: 'AC 110V-240V, 50/60Hz',
        'Mount Type': 'Floor stand',
        'Operating System': 'Android / Windows / Linux (optional)',
        Management: 'Cloud-based content, menu, and campaign updates'
      },
      applications: [
        { text: 'Quick-service restaurant self-ordering', image: appRestaurantReceipts },
        { text: 'Mall food court ordering kiosks', image: appPopupStores },
        { text: 'Cinema and entertainment venue ticket counters', image: appRetailCheckout },
        { text: 'Retail self-checkout and payment station', image: appRetailCheckout },
        { text: 'Hotel lobby service request kiosk', image: appMobilePos },
        { text: 'Events and pop-up store ordering', image: appPopupStores }
      ],
      tabs: [
        { id: 'detail', label: 'Product Detail', icon: Info },
        { id: 'configuration', label: 'Product Configuration', icon: Cog },
        { id: 'download', label: 'Download', icon: Download },
        { id: 'description', label: 'Product Description', icon: Monitor }
      ],
      tabContent: {
        detail: {
          title: 'K32 Floor Kiosk Features Overview',
          items: [
            '32-inch display provides better visibility for menus, combos, and upselling',
            '10-point touch panel supports quick and accurate ordering interactions',
            'Integrated receipt printer and optional scanner for full self-service flow',
            'Supports payment integration including QR, NFC, and external card terminals',
            'Industrial housing designed for continuous operation in busy locations',
            'Centralized cloud dashboard helps manage multiple branches efficiently'
          ]
        },
        configuration: {
          title: 'Standard Package Includes',
          items: [
            'K1 Floor Kiosk unit x1',
            'Touch display module x1',
            'Built-in thermal printer x1',
            'Power adapter and cables x1 set',
            'Network setup guide x1',
            'Software onboarding and admin access x1'
          ]
        },
        download: {
          title: 'Available Downloads',
          items: [
            'Kiosk user manual',
            'Admin panel quick-start guide',
            'Payment integration checklist',
            'Printer and scanner setup reference',
            'Troubleshooting and support guide'
          ]
        },
        description: {
          title: 'Complete Product Description',
          items: [
            'The K32 Floor is a 32-inch self-order kiosk designed for restaurants, retail stores, hotels, and entertainment venues.',
            'Its large touch screen improves readability and makes ordering easier for all customer types.',
            'The kiosk can include printer, scanner, payment, camera, and NFC modules depending on business requirements.',
            'It supports integration with POS, KDS, PMS, and custom software APIs for complete workflow automation.',
            'K32 Floor helps businesses reduce queues, improve order accuracy, and increase service throughput during peak hours.'
          ]
        }
      }
    },
    {
      id: 'k1-counter',
      name: 'K1 Counter / Wall Kiosk Terminal',
      model: 'K1-Counter',
      pricing: 'Contact for pricing',
      images: [kioskImg2, kioskImg1],
      highlights: [
        'Compact kiosk terminal for limited spaces',
        'Wall-mount or counter-mount deployment',
        'Touch-first self-order and service check-in workflows',
        'Optional QR scanner and customer display support',
        'Ideal for cafés, clinics, and hotel reception points',
        'Works with custom kiosk software modules'
      ],
      specifications: {
        Display: '15.6" full HD touch screen',
        Processor: 'N97 / N100 / Core i3 (configurable)',
        Memory: '4GB / 8GB',
        Storage: '128GB / 256GB SSD',
        Printer: 'Optional external or built-in thermal printer',
        Scanner: 'Optional 2D QR / barcode scanner',
        Connectivity: 'USB, LAN, WiFi',
        'Mount Type': 'Counter stand or wall mount',
        'Operating System': 'Windows / Android',
        Audio: 'Built-in speaker for user prompts'
      },
      applications: [
        { text: 'Restaurant pickup and self-order point', image: appRestaurantReceipts },
        { text: 'Hotel self-check-in and concierge requests', image: appMobilePos },
        { text: 'Clinic and service center queue registration', image: appRetailCheckout },
        { text: 'Retail membership sign-up and product lookup', image: appRetailCheckout },
        { text: 'Venue booking and ticket collection', image: appPopupStores },
        { text: 'Custom workflow kiosks for enterprise operations', image: appPopupStores }
      ],
      tabs: [
        { id: 'detail', label: 'Product Detail', icon: Info },
        { id: 'configuration', label: 'Product Configuration', icon: Cog },
        { id: 'download', label: 'Download', icon: Download },
        { id: 'description', label: 'Product Description', icon: Monitor }
      ],
      tabContent: {
        detail: {
          title: 'K1 Counter Kiosk Features Overview',
          items: [
            'Compact kiosk hardware designed for front-desk and counter use',
            'Smooth touch interaction for ordering, booking, and registration tasks',
            'Flexible mounting options for different store layouts',
            'Can run kiosk web apps or native business software',
            'Integrates with cloud POS, PMS, and custom APIs',
            'A practical option for fast deployment and lower hardware footprint'
          ]
        },
        configuration: {
          title: 'Standard Package Includes',
          items: [
            'K1 Counter kiosk terminal x1',
            'Mounting kit (counter/wall) x1',
            'Power adapter x1',
            'Setup and installation guide x1',
            'Admin onboarding and access credentials x1',
            'Support and warranty information x1'
          ]
        },
        download: {
          title: 'Available Downloads',
          items: [
            'Kiosk setup quick guide',
            'Device driver and compatibility sheet',
            'UI branding and theme guide',
            'Integration and API notes',
            'Support and maintenance checklist'
          ]
        },
        description: {
          title: 'Complete Product Description',
          items: [
            'The K1 Counter is a compact self-service kiosk terminal built for businesses that need digital customer interaction in smaller spaces.',
            'It supports check-in, ordering, queue registration, and service requests through a simple touch interface.',
            'With optional scanner and printer accessories, it can be customized for many business workflows.',
            'K1 Counter is suitable for hospitality, healthcare, retail, and entertainment locations that need a modern customer experience.'
          ]
        }
      }
    }
  ]

  const kioskMachine = kioskMachines[selectedModel]
  const hasImages = kioskMachine.images && kioskMachine.images.length > 0

  return (
    <div>
      <Helmet>
        <title>Kiosk Machine - CloudNet Softwares | Self-Service Kiosk Solutions</title>
        <meta
          name="description"
          content="Self-service kiosk machine solutions for restaurants, hotels, entertainment venues, and retail. Improve customer experience with smart kiosk applications."
        />
        <meta
          name="keywords"
          content="kiosk machine, self-service kiosk, restaurant kiosk, hotel kiosk, digital kiosk solution, touch kiosk"
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/kiosk-machine" />
        <meta property="og:title" content="Kiosk Machine - Self-Service Kiosk Solutions" />
        <meta
          property="og:description"
          content="Explore CloudNet kiosk machines and real-world application usage for modern business operations."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/kiosk-machine" />
      </Helmet>

      <section className="pt-32 pb-10 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Kiosk <span className="text-orange-600">Machine</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Smart self-service kiosk machines designed for ordering, check-in, queue management, and digital customer engagement.
          </p>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kiosk Models</h3>
                {kioskMachines.map((item, idx) => (
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

            <div className="lg:col-span-3">
              {hasImages ? (
                <div className="grid lg:grid-cols-2 gap-10">
                  <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6">
                    <div className="relative group flex items-center justify-center min-h-[520px]">
                      <img
                        src={kioskMachine.images[currentImageIndex]}
                        alt={`${kioskMachine.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? kioskMachine.images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === kioskMachine.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {kioskMachine.images.map((_, idx) => (
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

                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-8">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{kioskMachine.name}</h2>
                      <p className="text-lg text-gray-600 mb-2">Model: {kioskMachine.model}</p>
                      <p className="text-2xl font-bold text-orange-600">{kioskMachine.pricing}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {kioskMachine.highlights.map((item, idx) => (
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{kioskMachine.name}</h3>
                  <p className="text-lg text-gray-600 mb-6">Model: {kioskMachine.model}</p>
                  <p className="text-xl font-bold text-orange-600 mb-8">{kioskMachine.pricing}</p>

                  <div className="space-y-3 mb-8 text-left max-w-xl mx-auto">
                    {kioskMachine.highlights.map((item, idx) => (
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

              {kioskMachine.specifications && (
                <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200">
                  <div className="border-b px-6 py-4 flex items-center gap-2">
                    <Monitor className="text-orange-600" size={20} />
                    <h3 className="text-xl font-bold text-gray-900">Specifications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 p-6">
                    {Object.entries(kioskMachine.specifications).map(([label, value]) => (
                      <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">{label}</span>
                        <span className="text-gray-900 font-semibold text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {kioskMachine.tabs && (
                <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200">
                  <div className="flex flex-wrap border-b">
                    {kioskMachine.tabs.map((tab) => {
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

                  <div className="p-8">
                    {kioskMachine.tabContent && expandedTab in kioskMachine.tabContent && (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          {kioskMachine.tabContent[expandedTab].title}
                        </h3>
                        <ul className="space-y-3">
                          {kioskMachine.tabContent[expandedTab].items.map((item, idx) => (
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

              {kioskMachine.applications && (
                <div className="mt-10">
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Applications & Usage</h3>
                    <p className="text-gray-600 mb-6">See where kiosk machines improve speed, order accuracy, and customer convenience.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {kioskMachine.applications.map((item, idx) => (
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

      <ShareSection productName="Kiosk Machine" />

      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need the <span className="text-orange-600">Right Kiosk Setup?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team helps you choose the right kiosk hardware and software for your business workflow.
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

export default KioskMachine
