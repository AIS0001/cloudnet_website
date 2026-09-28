require('dotenv').config()

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  return value
}

module.exports = {
  port: Number(process.env.PORT) || 4000,
  frontendOrigins: (process.env.FRONTEND_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '12h',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'website_db'
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false', // true for port 465, false for 587/STARTTLS
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  },
  mailFrom: process.env.MAIL_FROM,
  mailTo: process.env.MAIL_TO
}
