import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Save, MessageCircle } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import Pagination from '../../components/staff/Pagination'
import { apiFetch } from '../../lib/apiClient'

const PAGE_SIZE = 25

const STAGES = ['new', 'contacted', 'interested', 'demo', 'negotiation', 'won', 'lost']
const STAGE_STYLE = {
  new: 'bg-gray-100 text-gray-700',
  contacted: 'bg-blue-100 text-blue-700',
  interested: 'bg-cyan-100 text-cyan-700',
  demo: 'bg-purple-100 text-purple-700',
  negotiation: 'bg-amber-100 text-amber-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700'
}
const label = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const today = () => new Date().toLocaleDateString('en-CA')
const waLink = (n) => `https://wa.me/${String(n).replace(/\D/g, '')}`
const inputClass = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white'

const StageBadge = ({ stage }) => (
  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STAGE_STYLE[stage] || STAGE_STYLE.new}`}>{label(stage)}</span>
)

const FollowUpPanel = ({ customer, onClose, onSaved }) => {
  const [history, setHistory] = useState([])
  const [stage, setStage] = useState(customer.leadStage)
  const [note, setNote] = useState('')
  const [next, setNext] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadHistory = async () => {
    try {
      const r = await apiFetch(`/follow-ups/customer/${customer.id}`, { auth: true })
      setHistory(r.followUps)
    } catch (err) { setError(err.message || 'Failed to load history.') }
  }
  useEffect(() => { loadHistory() }, [customer.id])

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await apiFetch(`/follow-ups/customer/${customer.id}`, {
        method: 'POST', auth: true, body: { stage, note, nextFollowUp: next }
      })
      setNote('')
      setNext('')
      await loadHistory()
      onSaved()
    } catch (err) {
      setError(err.message || 'Failed to save follow-up.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-full overflow-y-auto p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <p className="font-bold text-lg">{customer.name}</p>
            <p className="text-sm text-gray-500">{[customer.companyName, customer.phone].filter(Boolean).join(' · ')}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 mb-4 text-red-700 text-sm">{error}</div>}

        <form onSubmit={save} className="space-y-3 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Lead Stage</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)} className={inputClass}>
              {STAGES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Follow-up Note *</label>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)} required rows={3} maxLength={2000}
              className={`${inputClass} resize-none`} placeholder="What was discussed on this call?"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">Next Follow-up Date</label>
            <input type="date" value={next} min={today()} onChange={(e) => setNext(e.target.value)} className={inputClass} />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Add Follow-up'}
          </button>
        </form>

        <h3 className="font-semibold mb-3">History ({history.length})</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">No follow-ups yet.</p>
        ) : (
          <ol className="space-y-3 border-l-2 border-gray-200 pl-4">
            {history.map((h) => (
              <li key={h.id}>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <StageBadge stage={h.stage} />
                  <span className="text-xs text-gray-400">{new Date(h.createdAt).toLocaleString()} · {h.staffName}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{h.note}</p>
                {h.nextFollowUp && <p className="text-xs text-gray-500 mt-1">Next: {h.nextFollowUp}</p>}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

const FollowUps = () => {
  const [customers, setCustomers] = useState([])
  const [stage, setStage] = useState('')
  const [dueOnly, setDueOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [params, setParams] = useSearchParams()
  const wantedId = params.get('customer')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (stage) params.set('stage', stage)
      if (dueOnly) params.set('due', '1')
      params.set('page', String(page))
      params.set('pageSize', String(PAGE_SIZE))
      const r = await apiFetch(`/follow-ups?${params.toString()}`, { auth: true })
      const list = r.customers || []
      if (r.total == null) {
        // Older backend without server-side paging: it returns everything, so page it here.
        setTotal(list.length)
        setCustomers(list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
      } else {
        setTotal(r.total)
        setCustomers(list)
      }
      if (wantedId) {
        const match = r.customers.find((x) => String(x.id) === wantedId)
        if (match) setSelected(match)
        setParams({}, { replace: true })
      }
    } catch (err) {
      setCustomers([])
      setError(`${err.message || 'Failed to load follow-ups.'} (the server may need the latest backend deployed and the database migrated)`)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [search, stage, dueOnly, page])

  const isDue = (c) => c.nextFollowUp && c.nextFollowUp <= today()

  return (
    <StaffLayout title="Follow Ups">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <form onSubmit={(e) => { e.preventDefault(); setPage(1); setSearch(searchInput) }} className="flex gap-2 max-w-md flex-1">
          <input
            type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, company, phone..." className={`${inputClass} flex-1`}
          />
          <button type="submit" className="bg-primary hover:bg-primary-600 text-white px-4 rounded-lg"><Search size={18} /></button>
        </form>
        <select value={stage} onChange={(e) => { setPage(1); setStage(e.target.value) }} className={`${inputClass} sm:w-48`}>
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={dueOnly} onChange={(e) => { setPage(1); setDueOnly(e.target.checked) }} /> Due / overdue only
        </label>
      </div>

      {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-4 text-red-700 text-sm">{error}</div>}

      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      ) : error ? null : customers.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No customers found.</p>
      ) : (
        <div className="space-y-3">
          {customers.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow border-2 border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{c.name}</p>
                  <StageBadge stage={c.leadStage} />
                </div>
                <p className="text-sm text-gray-500">
                  {[c.companyName, c.businessType, c.softwareInterested].filter(Boolean).join(' · ') || '-'}
                </p>
                {c.lastNote && <p className="text-sm text-gray-600 mt-1 line-clamp-2">“{c.lastNote}”</p>}
                <p className="text-xs mt-1 text-gray-400">
                  {c.followUpCount} follow-up{c.followUpCount === 1 ? '' : 's'}
                  {c.nextFollowUp && (
                    <span className={isDue(c) ? 'text-red-600 font-semibold' : ''}> · Next: {c.nextFollowUp}{isDue(c) ? ' (due)' : ''}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {(c.whatsapp || c.phone) && (
                  <a
                    href={waLink(c.whatsapp || c.phone)} target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border-2 border-gray-200 text-green-600 hover:border-green-500" title="Chat on WhatsApp"
                  ><MessageCircle size={18} /></a>
                )}
                <button onClick={() => setSelected(c)} className="btn-primary text-sm !py-2 !px-4">Follow up</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />}

      {selected && <FollowUpPanel customer={selected} onClose={() => setSelected(null)} onSaved={load} />}
    </StaffLayout>
  )
}

export default FollowUps
