import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { apiFetch, getStaffToken, setStaffToken } from '../lib/apiClient'

const StaffAuthContext = createContext(null)

export function StaffAuthProvider({ children }) {
  const [staff, setStaff] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getStaffToken()
    if (!token) {
      setLoading(false)
      return
    }
    apiFetch('/auth/me', { auth: true })
      .then((result) => setStaff(result.staff))
      .catch(() => setStaffToken(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username, password, remember = true) => {
    const result = await apiFetch('/auth/login', { method: 'POST', body: { username, password } })
    setStaffToken(result.token, remember)
    setStaff(result.staff)
    return result.staff
  }, [])

  const logout = useCallback(() => {
    setStaffToken(null)
    setStaff(null)
  }, [])

  return (
    <StaffAuthContext.Provider value={{ staff, loading, login, logout }}>
      {children}
    </StaffAuthContext.Provider>
  )
}

export function useStaffAuth() {
  const ctx = useContext(StaffAuthContext)
  if (!ctx) throw new Error('useStaffAuth must be used within StaffAuthProvider')
  return ctx
}
