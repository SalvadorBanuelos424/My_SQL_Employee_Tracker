/*data for department table*/
INSERT INTO department (name)
VALUES
    ('Human Resource'),
    ('Programming'),
    ('Quality Assurance'),
    ('Floor Technician');

/*data for roles table*/
INSERT INTO role (title, salary, department_id)
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
    ('Elizabeth', 'Einstein', 4, 3),
    ('Frank', 'Further', 4, 3),
    ('Gabrial', 'Gabbstone', 4, 3),
    ('Heather', 'Hung', 4, 3),
    ('Isabelle', 'Inome', 4, 3),
    ('Javier', 'Julios', 5, NULL),
    ('Kenny', 'Kruzinsky', 6, 10),
    ('Lucy', 'Lawller', 6, 10),
    ('Monica', 'Moore', 6, 10),
    ('Nadia', 'Nottinhouse', 7, NULL),
    ('Oprah', 'Oneil', 8, 14),
    ('Prince', 'Pricket', 8, 14),
    ('Rick', 'Rubios', 8, 14);