// Usage: npm run create-admin -- <username> <password> "<full name>"
require('dotenv').config()
const bcrypt = require('bcryptjs')
const pool = require('../src/db')

async function main() {
  const [username, password, fullName] = process.argv.slice(2)

  if (!username || !password || !fullName) {
    console.error('Usage: npm run create-admin -- <username> <password> "<full name>"')
    process.exit(1)
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  try {
    await pool.query(
      `INSERT INTO staff (username, password_hash, full_name, role, is_active)
       VALUES (?, ?, ?, 'admin', 1)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), full_name = VALUES(full_name), role = 'admin', is_active = 1`,
      [username, passwordHash, fullName]
    )
    console.log(`Admin account ready: ${username}`)
  } catch (err) {
    console.error('Failed to create admin account:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()
