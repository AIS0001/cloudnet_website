import { useState } from 'react'
import { Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import { apiFetch } from '../../lib/apiClient'

const PasswordField = ({ id, label, value, onChange, autoComplete }) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
          minLength={8}
          autoComplete={autoComplete}
          className="w-full px-4 py-3 pr-11 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setLoading(true)
    try {
      await apiFetch('/auth/change-password', { method: 'POST', body: { currentPassword, newPassword }, auth: true })
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message || 'Failed to change password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StaffLayout title="Change Password">
      <div className="max-w-md bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sm:p-8">
        {success && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-semibold">Password updated.</p>
          </div>
        )}

        {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordField
            id="currentPassword"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <PasswordField
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <KeyRound size={18} />
            <span>{loading ? 'Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </StaffLayout>
  )
}

export default ChangePassword
