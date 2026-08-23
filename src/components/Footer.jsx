import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Github, Eye, UserCheck, RefreshCw } from 'lucide-react'
import logoWhite from '../assets/img/logowhite.png'

// CounterAPI v1 (used previously) was permanently discontinued (HTTP 410).
// v2 needs a workspace + 3 counters (total, unique, repeat) created once
// in the CounterAPI dashboard (https://app.counterapi.dev) under this
// workspace slug - the API has no "create workspace" endpoint, so that
// one-time setup step can't be done from here. The key itself is already
// wired up via VITE_COUNTERAPI_KEY.
// Until the workspace/counters exist, requests 404 and the widget simply
// stays hidden - it never gets stuck on "loading…".
const COUNTER_NS = import.meta.env.VITE_COUNTERAPI_WORKSPACE || 'cloudnetsoftwares-www'
const COUNTER_KEY = import.meta.env.VITE_COUNTERAPI_KEY
const COUNTER_BASE = 'https://api.counterapi.dev/v2'
const VISITED_KEY = 'cn_v'

function useVisitorCounter() {
  const [stats, setStats] = useState({ total: null, unique: null, repeat: null })
  const [status, setStatus] = useState(COUNTER_KEY ? 'loading' : 'unconfigured')

  useEffect(() => {
    if (!COUNTER_KEY) return

    const isRepeat = !!localStorage.getItem(VISITED_KEY)
    if (!isRepeat) localStorage.setItem(VISITED_KEY, '1')

    const typeKey = isRepeat ? 'repeat' : 'unique'
    const otherKey = isRepeat ? 'unique' : 'repeat'
    const headers = { Authorization: `Bearer ${COUNTER_KEY}` }
    const getJson = (url) => fetch(url, { headers }).then(r => (r.ok ? r.json() : null))

    Promise.all([
      getJson(`${COUNTER_BASE}/${COUNTER_NS}/total/up`),
      getJson(`${COUNTER_BASE}/${COUNTER_NS}/${typeKey}/up`),
      getJson(`${COUNTER_BASE}/${COUNTER_NS}/${otherKey}`),
    ]).then(([totalData, typeData, otherData]) => {
      const get = (d) => d?.data?.up_count ?? null
      const total = get(totalData)
      setStats({
        total,
        unique: isRepeat ? get(otherData) : get(typeData),
        repeat: isRepeat ? get(typeData) : get(otherData),
      })
      setStatus(total !== null ? 'ready' : 'error')
    }).catch(() => setStatus('error'))
  }, [])

  return { stats, status }
}

function fmtCount(n) {
  if (n === null || n === undefined) return '—'
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { stats, status } = useVisitorCounter()
  const showCounter = status === 'ready'

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img
                src={logoWhite}
                alt="CloudNet Softwares"
                className="h-12 md:h-14 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Delivering innovative software solutions that transform businesses and drive digital excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/freelancer-reseller-program" className="text-gray-400 hover:text-primary transition-colors">Freelancer Reseller Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-primary mt-1" />
                <span className="text-gray-400">info@cloudnetsoftwares.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary mt-1" />
                <span className="text-gray-400">+66-948712350</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1" />
                <span className="text-gray-400">109/19, Soi 14, Pattaya, Moo 10, Nong Prue, Banglamung, Chonburi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visitor Counter - only renders once VITE_COUNTERAPI_KEY is configured */}
        {showCounter && (
          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Eye size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Total Visitors</p>
                  <p className="text-lg font-bold text-white leading-none">
                    {fmtCount(stats.total)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <UserCheck size={15} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Unique Visitors</p>
                  <p className="text-lg font-bold text-white leading-none">
                    {fmtCount(stats.unique)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <RefreshCw size={15} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Returning Visitors</p>
                  <p className="text-lg font-bold text-white leading-none">
                    {fmtCount(stats.repeat)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-gray-400">
          <p>&copy; {currentYear} CloudNet Softwares. All rights reserved.</p>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-center text-gray-600 text-xs mt-4">
          Background music: "Wallpaper" by Kevin MacLeod (
          <a href="https://incompetech.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">incompetech.com</a>
          ), licensed under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">CC BY 4.0</a>.
        </p>
      </div>
    </footer>
  )
}

export default Footer
