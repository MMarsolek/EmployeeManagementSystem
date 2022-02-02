INSERT INTO departments(name)
VALUES('Legal'),
('IT'),
('Engineering'),
('Janitorial'),
('Customer Service');


INSERT INTO roles(title, salary, department_id)
VALUES('SRE', 165000.00, 3),
('Lead', 50000.00, 4),
('CSA', 25000.00, 5),
('Lawyer', 185000.00, 1),
('Manager', 85000.00, 2);


INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES('John', 'Smith', 2, 5),
('Peter', 'Merk', 5, 4),
('Mike', 'Webster', 2, 2),
('Lisa', 'Haile', 1, 1),
('Marshal', 'Lang',NULL ,3),
('Rebecca', 'Salmi', 9, 1),
('Tami', 'Questad', 6, 4),
('Nicolai', 'Reid', 9, 3),
('Lousia', 'Martinez', 5, 2);
