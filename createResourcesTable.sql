CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(255)
);

INSERT INTO resources (name, address, city, state, zip, phone, website) VALUES
('Resource 1', '123 Main St', 'Houston', 'TX', '77001', '123-456-7890', 'http://example.com'),
('Resource 2', '456 Elm St', 'Houston', 'TX', '77002', '123-456-7891', 'http://example.com');
