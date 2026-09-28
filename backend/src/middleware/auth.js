const jwt = require('jsonwebtoken')
const config = require('../config')

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ success: false, error: 'Login required.' })
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret)
    req.staff = payload
    next()
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' })
  }
}

function requireAdmin(req, res, next) {
  if (req.staff?.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin access required.' })
  }
  next()
}

module.exports = { requireAuth, requireAdmin }
