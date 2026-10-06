// Idempotent migration: npm run migrate (uses DB_* from backend/.env)
const pool = require('../src/db')
const config = require('../src/config')

const COLUMNS = [
  ['business_type', 'VARCHAR(100) DEFAULT NULL AFTER whatsapp'],
  ['software_interested', 'VARCHAR(100) DEFAULT NULL AFTER business_type'],
  ['lead_stage', "VARCHAR(30) NOT NULL DEFAULT 'new'"],
  ['next_follow_up', 'DATE DEFAULT NULL']
]

const FOLLOW_UPS = `CREATE TABLE IF NOT EXISTS follow_ups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  staff_id INT NOT NULL,
  stage VARCHAR(30) NOT NULL,
  note TEXT NOT NULL,
  next_follow_up DATE DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_followups_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  CONSTRAINT fk_followups_staff FOREIGN KEY (staff_id) REFERENCES staff(id),
  INDEX idx_followups_customer (customer_id)
) ENGINE=InnoDB`

;(async () => {
  console.log(`Migrating ${config.db.user}@${config.db.host}:${config.db.port}/${config.db.database}`)
  const [existing] = await pool.query(
    'SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
    [config.db.database, 'customers']
  )
  const have = new Set(existing.map((r) => r.COLUMN_NAME))
  for (const [name, def] of COLUMNS) {
    if (have.has(name)) { console.log(`- customers.${name} exists`); continue }
    await pool.query(`ALTER TABLE customers ADD COLUMN ${name} ${def}`)
    console.log(`+ added customers.${name}`)
  }
  await pool.query(FOLLOW_UPS)
  console.log('+ follow_ups table ready')
  await pool.end()
})().catch((e) => { console.error('Migration failed:', e.message); process.exit(1) })
