import { useState, useEffect, useRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'

// Site-wide translation is powered by the Google Translate element, driven
// by our own flag menu instead of Google's widget. The chosen language is
// stored in the `googtrans` cookie, which Google reads on every page load,
// so the choice persists across pages and visits.

const FlagGB = () => {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm shrink-0" aria-hidden="true">
      <clipPath id={`s${id}`}><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id={`t${id}`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath={`url(#s${id})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#t${id})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

const FlagTH = () => (
  <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0" aria-hidden="true">
    <rect width="30" height="20" fill="#A51931" />
    <rect y="3.33" width="30" height="13.33" fill="#F4F5F8" />
    <rect y="6.67" width="30" height="6.67" fill="#2D2A4A" />
  </svg>
)

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', Flag: FlagGB },
  { code: 'th', label: 'ไทย', short: 'TH', Flag: FlagTH },
]

export const readLanguage = () => {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)
  const code = match ? decodeURIComponent(match[1]) : 'en'
  return LANGUAGES.some((l) => l.code === code) ? code : 'en'
}

const setCookie = (value, expires) => {
  const base = `googtrans=${value}; path=/; expires=${expires}`
  document.cookie = base
  // Google may also set the cookie on the parent domain, so write both.
  const host = window.location.hostname
  if (host.includes('.')) {
    document.cookie = `${base}; domain=.${host.replace(/^www\./, '')}`
  }
}

const loadGoogleTranslate = () => {
  if (document.getElementById('google-translate-script')) return
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: LANGUAGES.map((l) => l.code).join(','),
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }
  const script = document.createElement('script')
  script.id = 'google-translate-script'
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}

const LANGUAGE_EVENT = 'site-language-change'

// Current language, for components that show hand-written translations
// (marked translate="no" so Google leaves them alone).
export const useLanguage = () => {
  const [language, setLanguage] = useState(readLanguage)
  useEffect(() => {
    const update = (e) => setLanguage(e.detail)
    window.addEventListener(LANGUAGE_EVENT, update)
    return () => window.removeEventListener(LANGUAGE_EVENT, update)
  }, [])
  return language
}

const applyLanguage = (code) => {
  if (code === 'en') {
    // Restoring the original text in place is unreliable with React, so
    // clear the cookie and reload the untranslated page.
    setCookie('', 'Thu, 01 Jan 1970 00:00:00 GMT')
    window.location.reload()
    return
  }

  setCookie(`/en/${code}`, 'Fri, 31 Dec 2099 23:59:59 GMT')
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: code }))
  const combo = document.querySelector('.goog-te-combo')
  if (combo) {
    combo.value = code
    combo.dispatchEvent(new Event('change'))
  } else {
    // The script reads the cookie on init and translates the page.
    loadGoogleTranslate()
  }
}

const LanguageSwitcher = ({ variant = 'dark' }) => {
  const language = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (readLanguage() !== 'en') loadGoogleTranslate()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [isOpen])

  const select = (code) => {
    setIsOpen(false)
    if (code === language) return
    applyLanguage(code)
  }

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]
  const buttonColors = variant === 'dark'
    ? 'text-white border-white/20 hover:border-primary hover:text-primary'
    : 'text-gray-700 border-gray-200 hover:border-primary hover:text-primary'

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-colors ${buttonColors}`}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <current.Flag />
        <span className="text-sm font-semibold">{current.short}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 z-50"
        >
          {LANGUAGES.map(({ code, label, Flag }) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === language}
                onClick={() => select(code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-orange-50 hover:text-primary transition-colors ${
                  code === language ? 'text-primary font-semibold' : 'text-gray-700'
                }`}
              >
                <Flag />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
