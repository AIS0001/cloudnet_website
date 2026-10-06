import { useState } from 'react'
import { X, Save } from 'lucide-react'
import ComboField from './ComboField'
import { apiFetch } from '../../lib/apiClient'
import { BUSINESS_TYPES, SOFTWARE_OPTIONS } from '../../constants/customerOptions'

const inputClass = 'w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none'

const FIELDS = [
  ['name', 'Customer Name *', 'text', true],
  ['companyName', 'Company Name', 'text'],
  ['phone', 'Phone Number *', 'tel', true],
  ['email', 'Email ID', 'email'],
  ['lineId', 'Line ID', 'text'],
  ['whatsapp', 'WhatsApp Number', 'tel']
]

const EditCustomerModal = ({ customer, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: customer.name || '',
    companyName: customer.companyName || '',
    phone: customer.phone || '',
    email: customer.email || '',
    lineId: customer.lineId || '',
    whatsapp: customer.whatsapp || '',
    businessType: customer.businessType || '',
    softwareInterested: customer.softwareInterested || '',
    notes: customer.notes || ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (key, value) => { setForm((f) => ({ ...f, [key]: value })); setError('') }

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await apiFetch(`/customers/${customer.id}`, { method: 'PUT', body: form, auth: true })
      onSaved()
    } catch (err) {
      setError(err.message || 'Failed to update customer.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Edit Customer</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>
        {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 mb-4 text-red-700 text-sm">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map(([key, label, type, required]) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-1 text-sm">{label}</label>
                <input type={type} value={form[key]} required={required} onChange={(e) => set(key, e.target.value)} className={inputClass} />
              </div>
            ))}
            <ComboField label="Business Type" value={form.businessType} options={BUSINESS_TYPES} onChange={(v) => set('businessType', v)} placeholder="Enter business type" />
            <ComboField label="Software Interested In" value={form.softwareInterested} options={SOFTWARE_OPTIONS} onChange={(v) => set('softwareInterested', v)} placeholder="Enter software name" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Notes</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditCustomerModal
