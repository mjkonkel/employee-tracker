const inquirer = require('inquirer');
const db = require('./db')
require('console.table')

// ----Add Department---- //
const addDepartmentQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
    }
]

function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestion)
        .then((data) => {
            db.insertDepartment(data)
            console.log('Added ' + data.name + ' to the database')
        })
        .then(() => askMenu())
}
// ----Add Department---- //

// ----Add Role---- //
function addRole() {
    db.viewAllDepartments().then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));

        inquirer
            .prompt([
                {
                    name: "title",
                    message: "What is the name of the role?",
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices,
                },
            ])
            .then((role) => {
                db.insertRole(role)
                    .then(() => console.log(`Added ${role.title} to the database`))
                    .then(() => askMenu());
            });
    });
}
// ----Add Role---- //

// ----Add Employee---- //
function addEmployee() {
    db.viewAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({id, title}) => {
            return {
                name: title,
                value: id,
            };
        })
        // console.log(roleChoices)
        db.viewAllManagers().then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({id, first_name}) => {
                return {
                    name: first_name,
                    value: id,
                }
            })
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the employee\'s first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    name: 'role_id',
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    name: 'manager_id',
                    choices: managerChoices,
                },
            ])
            .then((employee) => {
                // console.log(employee);
                db.insertEmployee(employee)
                    .then(() => console.log(`Added ${employee.first_name} to the database`))
                    .then(() => askMenu());
            });
        })
    })
};
// Who is the employee's manager? (with none option)
// log added 'employee' to the database
// ----Add Employee---- //

// update employee role
// Which employee's role do you want to update?
// Which role do you want to assign to the selected employee?
// log updated employee's role

// menu question
const menuQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuQuestion',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
]

function askMenu() {
    inquirer
        .prompt(menuQuestion)
        .then((data) => {
            if (data.menuQuestion === 'View All Employees') {
                db.viewAllEmployees().then((employeeData) => {
                    console.table(employeeData[0])

                }).then(() => askMenu())
            }
            if (data.menuQuestion === 'Add Employee') {
                addEmployee()
            }
            if (data.menuQuestion === 'Update Employee Role') {
                // console.log('Update Employee Role')
                // updateEmployeeRole()
            }
            if (data.menuQuestion === 'View All Roles') {
                db.viewAllRoles().then((roleData) => {
                    console.table(roleData[0])

                }).then(() => askMenu())
            }
            if (data.menuQuestion === 'Add Role') {
                addRole()
            }
            if (data.menuQuestion === 'View All Departments') {
                db.viewAllDepartments().then((departmentData) => {
                    console.table(departmentData[0])

                }).then(() => askMenu())
            }
            if (data.menuQuestion === 'Add Department') {
                addDepartment()
            }
            if (data.menuQuestion === 'Quit') {
                process.exit()
            }
        })
}

askMenu()