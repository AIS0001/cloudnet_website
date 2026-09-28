const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')
const pool = require('../db')
const config = require('../config')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please try again later.' }
})

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const username = String(req.body?.username || '').trim()
    const password = String(req.body?.password || '')

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' })
    }

    const [rows] = await pool.query(
      'SELECT id, username, password_hash, full_name, role, is_active FROM staff WHERE username = ? LIMIT 1',
      [username]
    )
    const staff = rows[0]

    if (!staff || !staff.is_active) {
      return res.status(401).json({ success: false, error: 'Invalid username or password.' })
    }

    const valid = await bcrypt.compare(password, staff.password_hash)
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid username or password.' })
    }

    const payload = { id: staff.id, username: staff.username, full_name: staff.full_name, role: staff.role }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn })

    res.json({ success: true, token, staff: payload })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, staff: req.staff })
})

router.post('/change-password', requireAuth, async (req, res, next) => {
  try {
    const currentPassword = String(req.body?.currentPassword || '')
    const newPassword = String(req.body?.newPassword || '')

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Current and new password are required.' })
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, error: 'New password must be at least 8 characters.' })
    }

    const [rows] = await pool.query('SELECT password_hash FROM staff WHERE id = ? LIMIT 1', [req.staff.id])
    const staff = rows[0]
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Account not found.' })
    }

    const valid = await bcrypt.compare(currentPassword, staff.password_hash)
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect.' })
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)
    await pool.query('UPDATE staff SET password_hash = ? WHERE id = ?', [passwordHash, req.staff.id])

    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = router
