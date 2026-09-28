const express = require('express')
const pool = require('../db')
const { requireAuth } = require('../middleware/auth')
const { buildDateRangeCondition } = require('../utils/dateRange')

const router = express.Router()
router.use(requireAuth)

const STATUSES = ['new', 'contacted', 'confirmed', 'closed']

function validateItems(items) {
  if (!Array.isArray(items) || !items.length) {
    return { errors: ['At least one product item is required.'], value: [] }
  }
  const errors = []
  const value = items.map((item) => {
    const productName = String(item?.productName || '').trim()
    const quantity = Math.max(1, Math.min(100000, Number(item?.quantity) || 1))
    const notes = String(item?.notes || '').trim()
    if (!productName || productName.length > 150) errors.push('Each item needs a valid product name.')
    if (notes.length > 300) errors.push('Item notes are too long.')
    return { productName, quantity, notes }
  })
  return { errors, value }
}

router.post('/', async (req, res, next) => {
  const connection = await pool.getConnection()
  try {
    const body = req.body || {}
    const { errors: itemErrors, value: items } = validateItems(body.items)
    const notes = String(body.notes || '').trim()
    const status = STATUSES.includes(body.status) ? body.status : 'new'

    let customerId = Number(body.customerId) || null
    let newCustomer = null

    if (!customerId) {
      const c = body.customer || {}
      const name = String(c.name || '').trim()
      const phone = String(c.phone || '').trim()
      if (!name) itemErrors.push('Customer name is required.')
      if (!phone) itemErrors.push('Customer phone number is required.')
      newCustomer = {
        name,
        companyName: String(c.companyName || '').trim(),
        phone,
        email: String(c.email || '').trim(),
        lineId: String(c.lineId || '').trim(),
        whatsapp: String(c.whatsapp || '').trim()
      }
    }

    if (itemErrors.length) {
      return res.status(400).json({ success: false, error: itemErrors.join(' ') })
    }

    await connection.beginTransaction()

    if (!customerId) {
      const [result] = await connection.query(
        `INSERT INTO customers (name, company_name, phone, email, line_id, whatsapp, collected_by)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [newCustomer.name, newCustomer.companyName || null, newCustomer.phone, newCustomer.email || null, newCustomer.lineId || null, newCustomer.whatsapp || null, req.staff.id]
      )
      customerId = result.insertId
    } else {
      const [existing] = await connection.query('SELECT id FROM customers WHERE id = ?', [customerId])
      if (!existing.length) {
        await connection.rollback()
        return res.status(404).json({ success: false, error: 'Selected customer was not found.' })
      }
    }

    const [orderResult] = await connection.query(
      `INSERT INTO orders (customer_id, staff_id, status, notes) VALUES (?, ?, ?, ?)`,
      [customerId, req.staff.id, status, notes || null]
    )
    const orderId = orderResult.insertId

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_name, quantity, notes) VALUES (?, ?, ?, ?)`,
        [orderId, item.productName, item.quantity, item.notes || null]
      )
    }

    await connection.commit()
    res.status(201).json({ success: true, orderId, customerId })
  } catch (err) {
    await connection.rollback()
    next(err)
  } finally {
    connection.release()
  }
})

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 25))
    const offset = (page - 1) * pageSize
    const ownOnly = req.staff.role !== 'admin'

    const conditions = []
    const params = []
    if (ownOnly) {
      conditions.push('o.staff_id = ?')
      params.push(req.staff.id)
    }
    const dateRange = buildDateRangeCondition('o.created_at', req.query.from, req.query.to)
    conditions.push(...dateRange.conditions)
    params.push(...dateRange.params)
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [orders] = await pool.query(
      `SELECT o.id, o.status, o.notes, o.created_at AS createdAt,
              c.id AS customerId, c.name AS customerName, c.company_name AS companyName,
              c.phone, c.email, s.full_name AS staffName
       FROM orders o
       JOIN customers c ON c.id = o.customer_id
       JOIN staff s ON s.id = o.staff_id
       ${where}
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    )

    if (orders.length) {
      const ids = orders.map((o) => o.id)
      const [items] = await pool.query(
        `SELECT order_id AS orderId, product_name AS productName, quantity, notes
         FROM order_items WHERE order_id IN (?)`,
        [ids]
      )
      const itemsByOrder = items.reduce((acc, item) => {
        (acc[item.orderId] ||= []).push(item)
        return acc
      }, {})
      orders.forEach((o) => { o.items = itemsByOrder[o.id] || [] })
    }

    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM orders o ${where}`, params)

    res.json({ success: true, orders, total, page, pageSize })
  } catch (err) {
    next(err)
  }
})

module.exports = router
