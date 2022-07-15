/*data for department table*/
INSERT INTO department (name)
VALUES
    ('Human Resource'),
    ('Programming'),
    ('Quality Assurance'),
    ('Floor Technician');

/*data for roles table*/
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Lead Human Resource', 81000, 1),
    ('Human Resources', 61000, 1),
    ('Program Manager', 120000, 2),
    ('Game Developer', 72000, 2),
    ('Software Developer', 82000, 2),
    ('Quality Assurance Supervisor', 89000, 3),
    ('Quality Inspector', 69000, 3),
    ('Auditor', 59000, 3),
    ('Art Director', 80000, 4),
    ('Design Staff', 60000, 4);

/*data for employee table*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Andrew', 'Anderson', 1, NULL),
    ('Beatriz', 'Beth', 2, 1),
    ('Carlos', 'Calhun', 3, NULL),
    ('David', 'Dokneehue', 4, 3),
    ('Elizabeth', 'Einstein', 5, 3),
    ('Frank', 'Further', 6, 3),
    ('Gabrial', 'Gabbstone', 7, 3),
    ('Heather', 'Hung', 8, 3),
    ('Isabelle', 'Inome', 9, 3),
    ('Javier', 'Julios', 10, NULL),
    ('Kenny', 'Kruzinsky', 11, 10),
    ('Lucy', 'Lawller', 12, 10),
    ('Monica', 'Moore', 13, 10),
    ('Nadia', 'Nottinhouse', 14, NULL),
    ('Oprah', 'Oneil', 15, 14),
    ('Prince', 'Pricket', 16, 14),
    ('Rick', 'Rubios', 17, 14);