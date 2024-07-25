CREATE DATABASE reproductive_rights_resources;

USE reproductive_rights_resources;

CREATE TABLE coverage (
  state_code VARCHAR(2) PRIMARY KEY,
  medicaid_abortion_coverage BOOLEAN,
  medicaid_exception_rape_or_incest BOOLEAN,
  medicaid_exception_life_endangerment BOOLEAN
);

INSERT INTO coverage (state_code, medicaid_abortion_coverage, medicaid_exception_rape_or_incest, medicaid_exception_life_endangerment)
VALUES
  ('CA', TRUE, TRUE, TRUE),
  ('TX', FALSE, FALSE, FALSE);
