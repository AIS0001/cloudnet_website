import { X } from 'lucide-react'

const DateRangeFilter = ({ from, to, onChange }) => {
  const hasRange = Boolean(from || to)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        <label htmlFor="date-from" className="text-xs text-gray-500 font-medium">From</label>
        <input
          id="date-from"
          type="date"
          value={from}
          max={to || undefined}
          onChange={(e) => onChange({ from: e.target.value, to })}
          className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-1.5">
        <label htmlFor="date-to" className="text-xs text-gray-500 font-medium">To</label>
        <input
          id="date-to"
          type="date"
          value={to}
          min={from || undefined}
          onChange={(e) => onChange({ from, to: e.target.value })}
          className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none"
        />
      </div>
      {hasRange && (
        <button
          type="button"
          onClick={() => onChange({ from: '', to: '' })}
          aria-label="Clear date filter"
          title="Clear date filter"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 px-2 py-2"
        >
          <X size={14} /> Clear
        </button>
      )}
    </div>
  )
}

export default DateRangeFilter
