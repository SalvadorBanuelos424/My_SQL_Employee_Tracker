const inquirer = require('inquirer');
const db = require('./db/connection');
const mysql = require('mysql2');



// prompt the user to choose an option; view a database, add to the database, or update the employees database
const prompt = async () => {
    const userInput = await inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Pick one.',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
        }
    ]);
    switch (userInput.menu) {
        case 'view all departments':
            departments();
            break;
        case 'view all roles':
            roles();
            break;
        case 'view all employees':
            employees();
            break;
        case 'add a department':
            departmentAdd();
            break;
        case 'add a role':
            roleAdd();
            break;
        case 'add an employee':
            employeeAdd();
            break;
        case 'update an employee role':
            roleUpdate();
            break;
        default:
            break;
    }
}


// use mysql to get 'departments' table
const departments = () => {
    db.query(
        'SELECT * FROM departments;',
        (err, results) => {console.table(results);
            prompt();
        });
};


// use mysql to get 'roles' table
const roles = () => {
    db.query(
        'SELECT * FROM roles;',
        (err, results) => {console.table(results);
            prompt();
        })
};


// use mysql to get 'employees' table
const employees = () => {
    db.query(
        'SELECT id, first_name, last_name, manager_id FROM employees;',
        (err, results) => {console.table(results);
        prompt();
        })
};


// prompt user to create a new department for 'departments' table. [add name]
const departmentAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Add a department.',
            validate: dName => {
                if (dName) {
                    return true;
                } else {
                    console.log('Try again, add a department.');
                    return false;
                }
            }
        }
    ])
        .then(name => {
            db.promise().query("INSERT INTO departments SET ?", name);
            departments();
        })
}


// prompt user to create a new role for 'roles' table. [add title, salary, & department_id]
const roleAdd = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Add a role.",
            validate: tName => {
                if (tName) {
                    return true;
                } else {
                    console.log('Try again, add a role.');
                    return false;
                }
            }
        }, 
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role.",
            validate: sName => {
                if (sName) {
                    return true;
                } else {
                    console.log('Try again, input a number for salary.');
                    return false;
                }
            }
        }, 
        {
            type: "input",
            name: "department_id",
            message: "What is the department's id",
            validate: dName => {
                if (dName) {
                    return true;
                } else {
                    console.log('Try again, input a number for department id.');
                    return false;
                }
            }
        }
    ])
    .then(({ title, salary, department_id }) => {
        db.promise().query("INSERT INTO roles SET ?",
            {
                title: title, 
                salary: salary, 
                department_id: department_id
            });
        roles();
    })        
}


// prompt user to create a new employee for 'employees' table. [add first_name, last_name, role_id, & ability to add a manager_id]
const employeeAdd = () => {
    db.query('SELECT * FROM employees;',(err, results) => {
        if (err) throw err;
    inquirer.prompt([
    {
        type: "input",
        name: "first_name",
        message: "Enter first name",
        validate: fName => {
            if (fName) {
                return true;
            } else {
                console.log('Try again, enter the first name.');
                return false;
            }
        }
    }, 
    {
        type: "input",
        name: "last_name",
        message: "Enter last name",
        validate: lName => {
            if (lName) {
                return true;
            } else {
                console.log('Try again, enter the last name.');
                return false;
            }
        }
    }, 
    {
        type: "list",
        name: "role_id",
        message: "Select title role number",
        choices: results.map(roles => {
            return { name: roles.role_id, value: roles.role_id }
        })
    }, 
    {
        type: "input",
        name: "manager_id",
        message: "Enter new employees' manager_id number",
        validate: mName => {
            if (mName) {
                return true;
            } else {
                console.log('Try again, enter managers id number.');
                return false;
            }
        }
    }])
    .then(({ first_name, last_name, role_id, manager_id }) => {
        db.promise().query("INSERT INTO employees SET ?",
            {
                first_name: first_name,
                last_name: last_name,
                role_id: role_id,
                manager_id: manager_id
            });
        employees();
    })
})
};


// prompt user to change an employees 'role'. [choose role, add replacement role, & add replacement salary.]
const roleUpdate = () => {
    return db.promise().query("SELECT id, title, salary, department_id FROM roles;")
    .then(([roles]) => {
        let update = roles.map(({ id, title }) => ({ value: id, name: title }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Pick a role to update?',
                choices: update
            }
        ])
        .then(roles => {
        console.log(roles);
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter new role name.',
                validate: rName => {
                    if (rName) {
                        return true;
                    } else {
                        console.log('Try again, enter a new role name.');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter new role salary.',
                validate: sName => {
                    if (sName) {
                        return true;
                    } else {
                        console.log('Try again, salary for new role.');
                        return false;
                    }
                }
            }])
            .then(({ title, salary }) => {
                const query = db.query('UPDATE roles SET title = ?, salary = ? WHERE id = ?', [title, salary, roles.role],
                function (err, res) {
                    if (err) throw err;
                }
            )})
            .then(() => roles())
        })
    });

};
prompt();