import { Facebook, Instagram, MessageCircle } from 'lucide-react'

const ShareSection = ({ productName = 'product' }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share This {productName}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={20} />
              <span>Share on Facebook</span>
            </a>
            <a
              href={`https://www.instagram.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              aria-label="Share on Instagram"
            >
              <Instagram size={20} />
              <span>Share on Instagram</span>
            </a>
            <a
              href={`https://wa.me/?text=Check out this ${productName.toLowerCase()} from CloudNet: ${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle size={20} />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShareSection
