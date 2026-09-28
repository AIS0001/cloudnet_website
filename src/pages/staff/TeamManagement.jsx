import { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import { apiFetch } from '../../lib/apiClient'

const emptyForm = { username: '', password: '', fullName: '', role: 'staff' }

const TeamManagement = () => {
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    apiFetch('/staff', { auth: true })
      .then((result) => setStaffList(result.staff))
      .catch((err) => setError(err.message || 'Failed to load team.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      await apiFetch('/staff', { method: 'POST', body: formData, auth: true })
      setFormData(emptyForm)
      load()
    } catch (err) {
      setFormError(err.message || 'Failed to create account.')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (member) => {
    try {
      await apiFetch(`/staff/${member.id}`, { method: 'PATCH', body: { isActive: !member.isActive }, auth: true })
      load()
    } catch (err) {
      setError(err.message || 'Failed to update account.')
    }
  }

  return (
    <StaffLayout title="Team">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}

          {loading ? (
            <p className="text-gray-500 text-center py-6">Loading...</p>
          ) : (
            <>
              {/* Mobile: card list */}
              <div className="space-y-3 md:hidden">
                {staffList.map((member) => (
                  <div key={member.id} className="bg-white rounded-xl shadow border-2 border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold">{member.username}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${member.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {member.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{member.fullName}</p>
                    <p className="text-sm text-gray-500 capitalize mb-2">{member.role}</p>
                    <button onClick={() => toggleActive(member)} className="text-sm text-primary font-semibold">
                      {member.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop / tablet: table */}
              <div className="hidden md:block bg-white rounded-xl shadow border-2 border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Username</th>
                      <th className="px-4 py-3">Full Name</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.map((member) => (
                      <tr key={member.id} className="border-t border-gray-100">
                        <td className="px-4 py-3 font-medium">{member.username}</td>
                        <td className="px-4 py-3">{member.fullName}</td>
                        <td className="px-4 py-3 capitalize">{member.role}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${member.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                            {member.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleActive(member)} className="text-sm text-primary font-semibold">
                            {member.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow border-2 border-gray-100 p-6 h-fit">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><UserPlus size={18} /> Create Staff Account</h3>
          {formError && <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 mb-4 text-sm text-red-700">{formError}</div>}
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text" placeholder="Username" value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} required
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
            <input
              type="text" placeholder="Full Name" value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
            <input
              type="password" placeholder="Password (min 8 chars)" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={8}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
            <select
              value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-50">
              {saving ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </StaffLayout>
  )
}

export default TeamManagement
