CREATE DATABASE IF NOT EXISTS website_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE website_db;

CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  company_name VARCHAR(150) DEFAULT NULL,
  phone VARCHAR(40) DEFAULT NULL,
  email VARCHAR(200) DEFAULT NULL,
  line_id VARCHAR(100) DEFAULT NULL,
  whatsapp VARCHAR(40) DEFAULT NULL,
  business_type VARCHAR(100) DEFAULT NULL,
  software_interested VARCHAR(100) DEFAULT NULL,
  lead_stage VARCHAR(30) NOT NULL DEFAULT 'new',
  next_follow_up DATE DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  collected_by INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_customers_staff FOREIGN KEY (collected_by) REFERENCES staff(id),
  INDEX idx_customers_phone (phone),
  INDEX idx_customers_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS follow_ups (
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
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  staff_id INT NOT NULL,
  status ENUM('new', 'contacted', 'confirmed', 'closed') NOT NULL DEFAULT 'new',
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id),
  CONSTRAINT fk_orders_staff FOREIGN KEY (staff_id) REFERENCES staff(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  notes VARCHAR(300) DEFAULT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;
