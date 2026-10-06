const express = require('express')
const pool = require('../db')
const { requireAuth, requireAdmin } = require('../middleware/auth')
const { buildDateRangeCondition } = require('../utils/dateRange')

const router = express.Router()
router.use(requireAuth)

const STAGES = ['new', 'contacted', 'interested', 'demo', 'negotiation', 'won', 'lost']

async function canAccess(req, customerId) {
  const [rows] = await pool.query('SELECT collected_by FROM customers WHERE id = ?', [customerId])
  if (!rows.length) return false
  return req.staff.role === 'admin' || rows[0].collected_by === req.staff.id
}

// Customers with their current lead stage and latest follow-up
router.get('/', async (req, res, next) => {
  try {
    const search = String(req.query.search || '').trim()
    const stage = String(req.query.stage || '').trim()
    const conditions = []
    const params = []
    if (req.staff.role !== 'admin') { conditions.push('c.collected_by = ?'); params.push(req.staff.id) }
    if (STAGES.includes(stage)) { conditions.push('c.lead_stage = ?'); params.push(stage) }
    if (req.query.due === '1') conditions.push('c.next_follow_up IS NOT NULL AND c.next_follow_up <= CURDATE()')
    if (search) {
      conditions.push('(c.name LIKE ? OR c.company_name LIKE ? OR c.phone LIKE ?)')
      params.push(...Array(3).fill(`%${search}%`))
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.company_name AS companyName, c.phone, c.whatsapp,
              c.business_type AS businessType, c.software_interested AS softwareInterested,
              c.lead_stage AS leadStage, DATE_FORMAT(c.next_follow_up, '%Y-%m-%d') AS nextFollowUp,
              (SELECT f.note FROM follow_ups f WHERE f.customer_id = c.id ORDER BY f.id DESC LIMIT 1) AS lastNote,
              (SELECT COUNT(*) FROM follow_ups f WHERE f.customer_id = c.id) AS followUpCount
       FROM customers c
       ${where}
       ORDER BY (c.next_follow_up IS NULL), c.next_follow_up ASC, c.created_at DESC
       LIMIT 200`,
      params
    )
    res.json({ success: true, customers: rows, stages: STAGES })
  } catch (err) {
    next(err)
  }
})

// Admin report: every follow-up logged by staff, filterable. Grouping/summaries happen client-side.
router.get('/report', requireAdmin, async (req, res, next) => {
  try {
    const conditions = []
    const params = []
    const dateRange = buildDateRangeCondition('f.created_at', req.query.from, req.query.to)
    conditions.push(...dateRange.conditions)
    params.push(...dateRange.params)

    const staffId = Number(req.query.staffId)
    if (staffId) { conditions.push('f.staff_id = ?'); params.push(staffId) }
    const stage = String(req.query.stage || '').trim()
    if (STAGES.includes(stage)) { conditions.push('f.stage = ?'); params.push(stage) }
    const search = String(req.query.search || '').trim()
    if (search) {
      conditions.push('(c.name LIKE ? OR c.company_name LIKE ? OR c.phone LIKE ? OR f.note LIKE ?)')
      params.push(...Array(4).fill(`%${search}%`))
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [rows] = await pool.query(
      `SELECT f.id, f.stage, f.note, DATE_FORMAT(f.next_follow_up, '%Y-%m-%d') AS nextFollowUp,
              f.created_at AS createdAt, f.staff_id AS staffId, s.full_name AS staffName,
              c.id AS customerId, c.name AS customerName, c.company_name AS companyName, c.phone,
              c.business_type AS businessType, c.software_interested AS softwareInterested
       FROM follow_ups f
       JOIN staff s ON s.id = f.staff_id
       JOIN customers c ON c.id = f.customer_id
       ${where}
       ORDER BY f.created_at DESC
       LIMIT 10001`,
      params
    )
    const truncated = rows.length > 10000
    res.json({ success: true, followUps: truncated ? rows.slice(0, 10000) : rows, truncated, stages: STAGES })
  } catch (err) {
    next(err)
  }
})

router.get('/customer/:id', async (req, res, next) => {
  try {
    if (!(await canAccess(req, req.params.id))) {
      return res.status(404).json({ success: false, error: 'Customer not found.' })
    }
    const [rows] = await pool.query(
      `SELECT f.id, f.stage, f.note, DATE_FORMAT(f.next_follow_up, '%Y-%m-%d') AS nextFollowUp,
              f.created_at AS createdAt, s.full_name AS staffName
       FROM follow_ups f JOIN staff s ON s.id = f.staff_id
       WHERE f.customer_id = ? ORDER BY f.id DESC`,
      [req.params.id]
    )
    res.json({ success: true, followUps: rows })
  } catch (err) {
    next(err)
  }
})

router.post('/customer/:id', async (req, res, next) => {
  try {
    const stage = String(req.body?.stage || '').trim()
    const note = String(req.body?.note || '').trim()
    const next = String(req.body?.nextFollowUp || '').trim()
    if (!STAGES.includes(stage)) return res.status(400).json({ success: false, error: 'Invalid lead stage.' })
    if (!note || note.length > 2000) return res.status(400).json({ success: false, error: 'A follow-up note is required.' })
    if (next && !/^\d{4}-\d{2}-\d{2}$/.test(next)) return res.status(400).json({ success: false, error: 'Invalid next follow-up date.' })
    if (!(await canAccess(req, req.params.id))) {
      return res.status(404).json({ success: false, error: 'Customer not found.' })
    }

    await pool.query(
      'INSERT INTO follow_ups (customer_id, staff_id, stage, note, next_follow_up) VALUES (?, ?, ?, ?, ?)',
      [req.params.id, req.staff.id, stage, note, next || null]
    )
    await pool.query('UPDATE customers SET lead_stage = ?, next_follow_up = ? WHERE id = ?', [stage, next || null, req.params.id])
    res.status(201).json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = router
