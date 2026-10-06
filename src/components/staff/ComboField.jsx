import { useState } from 'react'
import { OTHER_OPTION } from '../../constants/customerOptions'

const inputClass = 'w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none'

// Dropdown with preset options plus "Other", which reveals a free-text box.
const ComboField = ({ label, value, options, onChange, placeholder }) => {
  const [otherMode, setOtherMode] = useState(false)
  const showText = otherMode || (value !== '' && !options.includes(value))
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2 text-sm">{label}</label>
      <select
        value={showText ? OTHER_OPTION : value}
        onChange={(e) => {
          if (e.target.value === OTHER_OPTION) { setOtherMode(true); onChange('') }
          else { setOtherMode(false); onChange(e.target.value) }
        }}
        className={`${inputClass} bg-white`}
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
        <option value={OTHER_OPTION}>{OTHER_OPTION}</option>
      </select>
      {showText && (
        <input
          type="text" value={value} onChange={(e) => onChange(e.target.value)} maxLength={100}
          className={`${inputClass} mt-2`} placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default ComboField
