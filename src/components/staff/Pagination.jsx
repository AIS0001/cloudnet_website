import { ChevronLeft, ChevronRight } from 'lucide-react'

const btn = 'inline-flex items-center gap-1 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200'

const Pagination = ({ page, pageSize, total, onChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (total <= 0) return null
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
      <p className="text-sm text-gray-500">Showing {start}–{end} of {total}</p>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)}>
          <ChevronLeft size={16} /> Prev
        </button>
        <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
        <button type="button" className={btn} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
