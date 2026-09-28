const express = require('express')
const pool = require('../db')
const { requireAuth } = require('../middleware/auth')
const { buildDateRangeCondition } = require('../utils/dateRange')

const router = express.Router()
router.use(requireAuth)

function validateCustomer(data) {
  const name = String(data?.name || '').trim()
  const companyName = String(data?.companyName || '').trim()
  const phone = String(data?.phone || '').trim()
  const email = String(data?.email || '').trim()
  const lineId = String(data?.lineId || '').trim()
  const whatsapp = String(data?.whatsapp || '').trim()
  const notes = String(data?.notes || '').trim()

  const errors = []
  if (!name || name.length > 150) errors.push('A valid customer name is required.')
  if (companyName.length > 150) errors.push('Company name is too long.')
  if (!phone || phone.length > 40) errors.push('A valid phone number is required.')
  if (email && (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200)) errors.push('Email address looks invalid.')
  if (lineId.length > 100) errors.push('Line ID is too long.')
  if (whatsapp.length > 40) errors.push('WhatsApp number is too long.')
  if (notes.length > 2000) errors.push('Notes are too long.')

  return { errors, value: { name, companyName, phone, email, lineId, whatsapp, notes } }
}

router.post('/', async (req, res, next) => {
  try {
    const { errors, value } = validateCustomer(req.body)
    if (errors.length) {
      return res.status(400).json({ success: false, error: errors.join(' ') })
    }

    const [result] = await pool.query(
      `INSERT INTO customers (name, company_name, phone, email, line_id, whatsapp, notes, collected_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [value.name, value.companyName || null, value.phone, value.email || null, value.lineId || null, value.whatsapp || null, value.notes || null, req.staff.id]
    )

    res.status(201).json({ success: true, customerId: result.insertId })
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const search = String(req.query.search || '').trim()
    const page = Math.max(1, Number(req.query.page) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 25))
    const offset = (page - 1) * pageSize
    const ownOnly = req.staff.role !== 'admin'

    const conditions = []
    const params = []
    if (search) {
      conditions.push('(c.name LIKE ? OR c.company_name LIKE ? OR c.phone LIKE ? OR c.email LIKE ?)')
      params.push(...Array(4).fill(`%${search}%`))
    }
    if (ownOnly) {
      conditions.push('c.collected_by = ?')
      params.push(req.staff.id)
    }
    const dateRange = buildDateRangeCondition('c.created_at', req.query.from, req.query.to)
    conditions.push(...dateRange.conditions)
    params.push(...dateRange.params)
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.company_name AS companyName, c.phone, c.email, c.line_id AS lineId,
              c.whatsapp, c.notes, c.created_at AS createdAt, s.full_name AS collectedBy
       FROM customers c
       JOIN staff s ON s.id = c.collected_by
       ${where}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    )

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM customers c ${where}`,
      params
    )

    res.json({ success: true, customers: rows, total, page, pageSize })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.company_name AS companyName, c.phone, c.email, c.line_id AS lineId,
              c.whatsapp, c.notes, c.created_at AS createdAt, c.collected_by AS collectedById, s.full_name AS collectedBy
       FROM customers c
       JOIN staff s ON s.id = c.collected_by
       WHERE c.id = ?`,
      [req.params.id]
    )
    if (!rows.length || (req.staff.role !== 'admin' && rows[0].collectedById !== req.staff.id)) {
      return res.status(404).json({ success: false, error: 'Customer not found.' })
    }
    const { collectedById, ...customer } = rows[0]
    res.json({ success: true, customer })
  } catch (err) {
    next(err)
  }
})

module.exports = router
