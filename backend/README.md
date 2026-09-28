# CloudNet Backend

Node.js + Express + MySQL API for:
- Sending Contact page and Freelancer Reseller Program enquiries by email (via SMTP, using the `info@cloudnetsoftwares.com` mailbox)
- Staff login (JWT-based)
- Field-staff customer collection (name, company, phone, email, Line ID, WhatsApp)
- Field-staff "Place Order" flow (customer + product items, e.g. paper roll, POS machine)

## 1. Prerequisites

- Node.js 18+
- A running MySQL server (tested against the local instance: host `localhost`, user `root`)

## 2. Create the database

```bash
mysql -u root -p < sql/schema.sql
```

This creates the `website_db` database and the `staff`, `customers`, `orders`, `order_items` tables.

## 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:
- `DB_PASSWORD` — your MySQL password
- `JWT_SECRET` — generate one: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` — from your hosting control panel's Email Accounts page (usually `mail.yourdomain.com`, port `465`, secure `true`; use port `587` and `SMTP_SECURE=false` if your host requires STARTTLS instead)
- `SMTP_USER` / `SMTP_PASSWORD` — the `info@cloudnetsoftwares.com` mailbox login and its password
- `MAIL_FROM` — the display name + sender address (`info@cloudnetsoftwares.com`)
- `MAIL_TO` — where enquiries land (`cloudnetsoftwares@gmail.com`)
- `FRONTEND_ORIGIN` — the site's URL (comma-separate multiple, e.g. local + production)

## 4. Install & run

```bash
npm install
npm run dev     # auto-restarts on changes
# or
npm start
```

Server listens on `PORT` (default `4000`).

## 5. Create the first staff login

There is no public sign-up — accounts are created by an admin. Bootstrap the first admin account from the command line:

```bash
npm run create-admin -- jdoe "a-strong-password" "John Doe"
```

Once logged in as admin, more staff/admin accounts can be created from the site's `/staff/team` page (or via `POST /api/staff`).

## API overview

| Method | Path                        | Auth        | Purpose |
|--------|-----------------------------|-------------|---------|
| POST   | /api/contact                | public      | Contact page enquiry email |
| POST   | /api/reseller-application   | public      | Freelancer Reseller Program email |
| POST   | /api/auth/login             | public      | Staff login → JWT |
| GET    | /api/auth/me                | staff       | Current logged-in staff |
| POST   | /api/customers               | staff       | Create a customer record |
| GET    | /api/customers               | staff       | List/search customers |
| POST   | /api/orders                  | staff       | Create an order (+ new or existing customer) |
| GET    | /api/orders                  | staff       | List orders with items |
| GET    | /api/staff                   | admin       | List staff accounts |
| POST   | /api/staff                   | admin       | Create a staff account |
| PATCH  | /api/staff/:id               | admin       | Update role / active state / password |

All authenticated routes expect `Authorization: Bearer <token>`.

## Notes

- Passwords are hashed with bcrypt; nothing is ever stored in plain text.
- Contact/reseller endpoints have a honeypot field (`website`) and per-IP rate limiting.
- `.env` is git-ignored — never commit real credentials.
