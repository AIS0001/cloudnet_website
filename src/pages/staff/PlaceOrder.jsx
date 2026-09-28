import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Search, CheckCircle2, Send } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import { apiFetch } from '../../lib/apiClient'

const PRODUCT_SUGGESTIONS = [
  'Paper Roll',
  'POS Machine',
  'Restaurant POS',
  'ERP Solution',
  'Printer',
  'Kiosk Machine',
  'Access Gate System',
  'CloudScreen',
  'CloudEye',
  'Other'
]

const emptyNewCustomer = { name: '', companyName: '', phone: '', email: '', lineId: '', whatsapp: '' }
const emptyItem = { productName: '', quantity: 1, notes: '' }

const PlaceOrder = () => {
  const navigate = useNavigate()
  const [customerMode, setCustomerMode] = useState('search') // 'search' | 'new'

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [newCustomer, setNewCustomer] = useState(emptyNewCustomer)
  const [items, setItems] = useState([{ ...emptyItem }])
  const [orderNotes, setOrderNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setSearching(true)
    setError('')
    try {
      const result = await apiFetch(`/customers?search=${encodeURIComponent(search)}`, { auth: true })
      setSearchResults(result.customers)
    } catch (err) {
      setError(err.message || 'Search failed.')
    } finally {
      setSearching(false)
    }
  }

  const updateItem = (index, field, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }])
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index))

  const resetForm = () => {
    setCustomerMode('search')
    setSearch('')
    setSearchResults([])
    setSelectedCustomer(null)
    setNewCustomer(emptyNewCustomer)
    setItems([{ ...emptyItem }])
    setOrderNotes('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (customerMode === 'search' && !selectedCustomer) {
      setError('Please search and select an existing customer, or switch to "New Customer".')
      return
    }

    setLoading(true)
    try {
      const body = {
        items,
        notes: orderNotes,
        ...(customerMode === 'search'
          ? { customerId: selectedCustomer.id }
          : { customer: newCustomer })
      }
      await apiFetch('/orders', { method: 'POST', body, auth: true })
      setSubmitted(true)
      resetForm()
    } catch (err) {
      setError(err.message || 'Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StaffLayout title="Place Order">
      <div className="max-w-3xl bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-5 sm:p-8">
        {submitted && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-700 font-semibold">Order placed.</p>
              <button type="button" onClick={() => navigate('/staff/orders')} className="text-sm text-green-700 underline">
                View orders
              </button>
            </div>
          </div>
        )}

        {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setCustomerMode('search')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${customerMode === 'search' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Existing Customer
              </button>
              <button
                type="button"
                onClick={() => setCustomerMode('new')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${customerMode === 'new' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                New Customer
              </button>
            </div>

            {customerMode === 'search' ? (
              <div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, phone, company..."
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary-600 text-white px-4 rounded-lg transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </div>

                {selectedCustomer ? (
                  <div className="border-2 border-primary rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{selectedCustomer.name}</p>
                      <p className="text-sm text-gray-600">{selectedCustomer.phone} {selectedCustomer.companyName ? `· ${selectedCustomer.companyName}` : ''}</p>
                    </div>
                    <button type="button" onClick={() => setSelectedCustomer(null)} className="text-sm text-red-600">Change</button>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="border-2 border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
                    {searchResults.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => { setSelectedCustomer(c); setSearchResults([]) }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-gray-600">{c.phone} {c.companyName ? `· ${c.companyName}` : ''}</p>
                      </button>
                    ))}
                  </div>
                ) : searching ? (
                  <p className="text-sm text-gray-500">Searching...</p>
                ) : null}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Customer Name *" value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} required
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <input
                  type="text" placeholder="Company Name" value={newCustomer.companyName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <input
                  type="tel" placeholder="Phone Number *" value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} required
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <input
                  type="email" placeholder="Email ID" value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <input
                  type="text" placeholder="Line ID" value={newCustomer.lineId}
                  onChange={(e) => setNewCustomer({ ...newCustomer, lineId: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <input
                  type="tel" placeholder="WhatsApp Number" value={newCustomer.whatsapp}
                  onChange={(e) => setNewCustomer({ ...newCustomer, whatsapp: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Products Interested</h3>
              <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                <Plus size={16} /> Add item
              </button>
            </div>
            <datalist id="product-suggestions">
              {PRODUCT_SUGGESTIONS.map((p) => <option key={p} value={p} />)}
            </datalist>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="border-2 border-gray-100 rounded-lg p-3 sm:p-0 sm:border-0 sm:rounded-none">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:items-start">
                    <input
                      type="text" list="product-suggestions" placeholder="Product (e.g. Paper Roll)"
                      value={item.productName} onChange={(e) => updateItem(index, 'productName', e.target.value)} required
                      className="sm:col-span-6 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    />
                    <div className="grid grid-cols-[1fr_1fr_auto] sm:contents gap-2">
                      <input
                        type="number" min={1} placeholder="Qty"
                        value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="sm:col-span-2 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text" placeholder="Notes"
                        value={item.notes} onChange={(e) => updateItem(index, 'notes', e.target.value)}
                        className="sm:col-span-3 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button" onClick={() => removeItem(index)} disabled={items.length === 1}
                        className="sm:col-span-1 flex items-center justify-center text-red-500 disabled:opacity-30 px-3 border-2 border-gray-200 sm:border-0 rounded-lg sm:h-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Order Notes</label>
            <textarea
              value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none"
              placeholder="Delivery preferences, follow-up date, etc."
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Send size={18} />
            <span>{loading ? 'Placing order...' : 'Place Order'}</span>
          </button>
        </form>
      </div>
    </StaffLayout>
  )
}

export default PlaceOrder
