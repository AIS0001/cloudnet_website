const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
const TOKEN_KEY = 'cloudnet_staff_token'

export function getStaffToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

// remember = true keeps the session across browser restarts (localStorage);
// remember = false keeps it only for the current tab session (sessionStorage).
export function setStaffToken(token, remember = true) {
  try {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    if (token) {
      (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token)
    }
  } catch {
    // Storage may be unavailable (private browsing) — auth just won't persist.
  }
}

export async function apiFetch(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getStaffToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  const result = await response.json().catch(() => null)

  if (!response.ok || !result?.success) {
    const error = new Error(result?.error || 'Something went wrong. Please try again.')
    error.status = response.status
    throw error
  }

  return result
}
