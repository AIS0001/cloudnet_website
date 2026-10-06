import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Save } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import { apiFetch } from '../../lib/apiClient'
import ComboField from '../../components/staff/ComboField'
import { BUSINESS_TYPES, SOFTWARE_OPTIONS } from '../../constants/customerOptions'

const emptyForm = {
  name: '',
  companyName: '',
  phone: '',
  email: '',
  lineId: '',
  whatsapp: '',
  businessType: '',
  softwareInterested: '',
  notes: ''
}

const CustomerForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await apiFetch('/customers', { method: 'POST', body: formData, auth: true })
      setSubmitted(true)
      setFormData(emptyForm)
    } catch (err) {
      setError(err.message || 'Failed to save customer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StaffLayout title="Add Customer">
      <div className="max-w-2xl bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-5 sm:p-8">
        {submitted && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-700 font-semibold">Customer saved.</p>
              <button type="button" onClick={() => navigate('/staff/customers')} className="text-sm text-green-700 underline">
                View customers
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Customer Name *</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Company Name</label>
              <input
                type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="ABC Restaurant Co."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Phone Number *</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="+66-..."
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email ID</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Line ID</label>
              <input
                type="text" name="lineId" value={formData.lineId} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="@lineid"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">WhatsApp Number</label>
              <input
                type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="+66-..."
              />
            </div>
            <ComboField
              label="Business Type" value={formData.businessType} options={BUSINESS_TYPES}
              onChange={(v) => setFormData((f) => ({ ...f, businessType: v }))} placeholder="Enter business type"
            />
            <ComboField
              label="Software Interested In" value={formData.softwareInterested} options={SOFTWARE_OPTIONS}
              onChange={(v) => setFormData((f) => ({ ...f, softwareInterested: v }))} placeholder="Enter software name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Notes</label>
            <textarea
              name="notes" value={formData.notes} onChange={handleChange} rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
              placeholder="Anything worth remembering about this lead..."
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Save size={18} />
            <span>{loading ? 'Saving...' : 'Save Customer'}</span>
          </button>
        </form>
      </div>
    </StaffLayout>
  )
}

export default CustomerForm
