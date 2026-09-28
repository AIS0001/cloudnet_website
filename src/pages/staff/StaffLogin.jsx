import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useStaffAuth } from '../../context/StaffAuthContext'
import mainLogo from '../../assets/img/3840x2160logo-optimized.png'

const blobs = [
  { className: 'w-[26rem] h-[26rem] bg-primary/30 -top-32 -left-24', duration: 16 },
  { className: 'w-[30rem] h-[30rem] bg-blue-600/20 top-1/3 -right-40', duration: 20 },
  { className: 'w-[22rem] h-[22rem] bg-orange-500/20 bottom-[-6rem] left-1/4', duration: 18 }
]

const StaffLogin = () => {
  const { login } = useStaffAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(username, password, rememberMe)
      const redirectTo = location.state?.from?.pathname || '/staff'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-4 py-16">
      {/* Animated dark background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
      >
        <img src={mainLogo} alt="CloudNet Softwares" className="h-10 w-auto mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-2 text-center">Staff Login</h1>
        <p className="text-gray-500 text-sm text-center mb-6">CloudNet field team access</p>

        {error && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1 text-sm">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-11 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <LogIn size={18} />
            <span>{loading ? 'Logging in...' : 'Log In'}</span>
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default StaffLogin
