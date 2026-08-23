/**
 * PhoneMockup
 * Wraps a screenshot in a simple phone frame so real app screenshots
 * read as "app UI" rather than a bare rectangular image.
 */
const PhoneMockup = ({ src, alt, className = '' }) => (
  <div className={`relative mx-auto w-full max-w-[260px] ${className}`}>
    <div className="rounded-[2rem] border-[6px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden">
      <div className="relative bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-b-xl z-10" />
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
    </div>
  </div>
)

export default PhoneMockup
