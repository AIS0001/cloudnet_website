-- Run once on existing databases
ALTER TABLE customers
  ADD COLUMN business_type VARCHAR(100) DEFAULT NULL AFTER whatsapp,
  ADD COLUMN software_interested VARCHAR(100) DEFAULT NULL AFTER business_type;

ALTER TABLE customers
  ADD COLUMN lead_stage VARCHAR(30) NOT NULL DEFAULT 'new',
  ADD COLUMN next_follow_up DATE DEFAULT NULL;

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
