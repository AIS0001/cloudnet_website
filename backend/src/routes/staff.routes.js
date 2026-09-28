const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../db')
const { requireAuth, requireAdmin } = require('../middleware/auth')

const router = express.Router()
router.use(requireAuth, requireAdmin)

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, full_name AS fullName, role, is_active AS isActive, created_at AS createdAt FROM staff ORDER BY created_at DESC'
    )
    res.json({ success: true, staff: rows })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const username = String(req.body?.username || '').trim()
    const password = String(req.body?.password || '')
    const fullName = String(req.body?.fullName || '').trim()
    const role = req.body?.role === 'admin' ? 'admin' : 'staff'

    const errors = []
    if (!username || username.length > 50) errors.push('A valid username is required.')
    if (!fullName || fullName.length > 150) errors.push('A valid full name is required.')
    if (!password || password.length < 8) errors.push('Password must be at least 8 characters.')

    if (errors.length) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const [existing] = await pool.query('SELECT id FROM staff WHERE username = ?', [username])
    if (existing.length) {
      return res.status(409).json({ success: false, error: 'That username is already taken.' })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const [result] = await pool.query(
      'INSERT INTO staff (username, password_hash, full_name, role) VALUES (?, ?, ?, ?)',
      [username, passwordHash, fullName, role]
    )

    res.status(201).json({ success: true, staffId: result.insertId })
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updates = []
    const params = []

    if (typeof req.body?.isActive === 'boolean') {
      updates.push('is_active = ?')
      params.push(req.body.isActive ? 1 : 0)
    }
    if (req.body?.role === 'admin' || req.body?.role === 'staff') {
      updates.push('role = ?')
      params.push(req.body.role)
    }
    if (typeof req.body?.password === 'string' && req.body.password.length >= 8) {
      updates.push('password_hash = ?')
      params.push(await bcrypt.hash(req.body.password, 12))
    }

    if (!updates.length) {
      return res.status(400).json({ success: false, error: 'Nothing to update.' })
    }

    params.push(id)
    await pool.query(`UPDATE staff SET ${updates.join(', ')} WHERE id = ?`, params)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = router
