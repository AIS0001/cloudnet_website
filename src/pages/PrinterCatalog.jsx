import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, Zap, Package, Phone, ShoppingBag, UtensilsCrossed, Warehouse, HeartPulse, FileText, Smartphone, Store, Truck } from 'lucide-react'
import ShareSection from '../components/ShareSection'
import printerImg1 from '../assets/img/reciept printer/1.jpg'
import printerImg2 from '../assets/img/reciept printer/2.jpg'
import printerImg3 from '../assets/img/reciept printer/3.jpg'
import printerImg4 from '../assets/img/reciept printer/4.jpg'
import an802Img1 from '../assets/img/reciept printer/AN802/an8021.jpg'
import an802Img2 from '../assets/img/reciept printer/AN802/an8022.jpg'
import an802Img3 from '../assets/img/reciept printer/AN802/an8023.jpg'
import appMobilePOS from '../assets/img/reciept printer/Mobile POS and tablet ordering.jpg'
import appPopupStores from '../assets/img/reciept printer/Pop-up stores and kiosks.png'
import appRestaurant from '../assets/img/reciept printer/Restaurant counter receipts.webp'
import appRetail from '../assets/img/reciept printer/Retail checkout counters.jpg'

const PrinterCatalog = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const printers = [
    {
      id: 'yhd-8390',
      name: '80mm Desktop Direct Thermal Receipt Printer',
      model: 'YHD-8390',
      pricing: 'Contact for pricing',
      images: [printerImg1, printerImg2, printerImg3, printerImg4],
      highlights: [
        'ESC/POS command compatible for easy integration',
        'Fast printing up to 200-220 mm/sec with auto cutter',
        'Durable design with anti-oil and anti-dust structure',
        'Supports Windows, Linux, Android, and iOS',
        'Logo and graphics printing with 1D/2D barcode support',
        'Multiple interface options for flexible deployment'
      ],
      applications: [
        { text: 'Retail and supermarket receipts', icon: ShoppingBag, image: appRetail },
        { text: 'Restaurant billing and kitchen orders', icon: UtensilsCrossed, image: appRestaurant },
        { text: 'Warehousing and logistics labels', icon: Warehouse, image: appPopupStores },
        { text: 'Healthcare receipts and queue tickets', icon: HeartPulse, image: appMobilePOS },
        { text: 'Parcel post and office documentation', icon: FileText, image: appRetail }
      ],
      specs: [
        { label: 'Print method', value: 'Thermal line printing' },
        { label: 'Print speed', value: '200-220 mm/sec' },
        { label: 'Resolution', value: '576 dots/line' },
        { label: 'Print width', value: '80 mm' },
        { label: 'Command set', value: 'ESC/POS' },
        { label: 'Interface options', value: 'USB / USB+LAN / USB+BT / USB+LAN+BT+WiFi / USB+WiFi' },
        { label: 'Auto cutter', value: 'Full or partial cut' },
        { label: 'Paper width', value: '79.5 ± 0.5 mm' },
        { label: 'Roll diameter', value: '83 mm' },
        { label: 'Paper thickness', value: '0.06-0.08 mm' },
        { label: 'Power adapter', value: 'Input AC 100-240V 50-60Hz; Output DC 24V/1.5A' },
        { label: 'Cash drawer', value: '12V/1A' },
        { label: 'Cutter life', value: '1.5 million cuts' },
        { label: 'Print head reliability', value: '100 km' },
        { label: 'OS support', value: 'Windows, Linux, Android, iOS' },
        { label: 'Operating temperature', value: '-10 to 45 C' },
        { label: 'Storage temperature', value: '-20 to 60 C' },
        { label: 'Humidity', value: '10-90%' },
        { label: 'Warranty', value: '12 months' },
        { label: 'Dimensions', value: '130 x 160 x 122 mm (D x W x H)' },
        { label: 'Weight', value: '0.8 kg' }
      ],
      packaging: [
        'Standard list: Printer x1, USB cable x1, Power cable and plug x1, Manual x1, Test paper x1, Paper roller supporter x1',
        'Single package size: 204 x 170 x 130 mm',
        'Single gross weight: 1.25 kg',
        'Carton: 12 pcs, 62 x 36 x 29 cm, G.W. 14.5 kg'
      ]
    },
    {
      id: 'an802',
      name: '3-Inch Thermal Receipt Printer',
      model: 'AN802',
      pricing: 'Contact for pricing',
      images: [an802Img1, an802Img2, an802Img3],
      highlights: [
        'Bluetooth and WiFi connectivity for flexible pairing',
        'Built-in order reminder function for uncollected prints',
        'Automatic paper cutting with 1.5 million cut life',
        'Durable thermal print head (30 km warranty, 50 km lifetime)',
        'Designed for catering and retail workflows'
      ],
      applications: [
        { text: 'Mobile POS and tablet ordering', icon: Smartphone, image: appMobilePOS },
        { text: 'Restaurant counter receipts', icon: UtensilsCrossed, image: appRestaurant },
        { text: 'Retail checkout counters', icon: ShoppingBag, image: appRetail },
        { text: 'Pop-up stores and kiosks', icon: Store, image: appPopupStores },
        { text: 'Delivery and takeaway receipts', icon: Truck, image: appMobilePOS }
      ],
      specs: null,
      packaging: null
    }
  ]

  const printer = printers[selectedPrinter]

  return (
    <div>
      <Helmet>
        <title>Printer Catalog - 80mm Thermal Receipt Printer | CloudNet Softwares</title>
        <meta
          name="description"
          content="80mm desktop thermal receipt printer catalog with specifications, interfaces, and applications. Fast printing, auto cutter, and ESC/POS support."
        />
        <meta
          name="keywords"
          content="80mm thermal printer, receipt printer, ESC/POS printer, desktop thermal printer, auto cutter"
        />
        <link rel="canonical" href="https://www.cloudnetsoftwares.com/products/printer" />
        <meta property="og:title" content="Printer Catalog - 80mm Thermal Receipt Printer" />
        <meta
          property="og:description"
          content="Explore specifications and features of the 80mm desktop thermal receipt printer."
        />
        <meta property="og:url" content="https://www.cloudnetsoftwares.com/products/printer" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Printer <span className="text-orange-600">Catalog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable 80mm thermal receipt printer built for speed, clarity, and daily operational use.
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Printer Models</h3>
                {printers.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedPrinter(idx)
                      setCurrentImageIndex(0)
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedPrinter === idx
                        ? 'bg-orange-600 text-white border-orange-600 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-sm md:text-base">{item.model}</div>
                    <div className={`text-xs mt-1 ${selectedPrinter === idx ? 'text-orange-100' : 'text-gray-500'}`}>
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Image Slider */}
                <div className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-6">
                  <div className="relative group flex items-center justify-center min-h-[520px]">
                    <img
                      src={printer.images[currentImageIndex]}
                      alt={`${printer.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? printer.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === printer.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {printer.images.map((_, idx) => (
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{printer.name}</h2>
                    <p className="text-lg text-gray-600 mb-2">Model: {printer.model}</p>
                    <p className="text-2xl font-bold text-orange-600">{printer.pricing}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {printer.highlights.map((item, idx) => (
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

              {printer.specs && (
                <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200">
                  <div className="border-b px-6 py-4 flex items-center gap-2">
                    <Package className="text-orange-600" size={20} />
                    <h3 className="text-xl font-bold text-gray-900">Product Specifications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 p-6">
                    {printer.specs.map((item) => (
                      <div key={item.label} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">{item.label}</span>
                        <span className="text-gray-900 font-semibold text-right max-w-[60%]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Applications</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {printer.applications.map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div key={idx} className="bg-white rounded-xl overflow-hidden border-2 border-orange-200 hover:shadow-lg transition-all duration-300 group">
                          <div className="relative h-40 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.text}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 bg-orange-600 p-2 rounded-lg">
                              <Icon size={20} className="text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-800 text-sm font-semibold leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {printer.packaging && (
                <div className="grid md:grid-cols-1 gap-8 mt-8">
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Packaging Details</h3>
                    <ul className="space-y-2">
                      {printer.packaging.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle size={16} className="text-orange-600 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <ShareSection productName="Printer" />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Choose Your Printer?</h2>
            <p className="text-xl mb-8 text-orange-50">
              Contact our sales team for detailed specifications and special pricing
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

export default PrinterCatalog