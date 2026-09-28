const express = require('express')
const cors = require('cors')
const config = require('./config')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const authRoutes = require('./routes/auth.routes')
const customersRoutes = require('./routes/customers.routes')
const ordersRoutes = require('./routes/orders.routes')
const staffRoutes = require('./routes/staff.routes')
const enquiriesRoutes = require('./routes/enquiries.routes')

const app = express()

app.use(cors({
  origin: config.frontendOrigins,
  credentials: true
}))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }))

app.use('/api', enquiriesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/customers', customersRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/staff', staffRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`CloudNet backend listening on port ${config.port}`)
})
