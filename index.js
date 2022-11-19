// require('dotenv').config();
// process.env.DB_NAME

const inquirer = require('inquirer');

// questions
const menuQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuQuestion',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
        // add quit choice
    }
]

// Add Department //
const addDepartmentQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDepartment'
    }
]

function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestion)
        .then((data) => {
            console.log('Added ' + data.addDepartment + ' to the database')
        })
        .then(() => askMenu())
}
// Add Department //

// Add Role //
const addRoleQuestion = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'roleSalary'
    },
    {
        type: 'input',
        message: 'Which department does the role belong to?',
        name: 'roleDepartment'
    }
]

function addRole() {
    inquirer
    .prompt(addRoleQuestion)
    .then((data) => {
        console.log('Added ' + data.roleName + ' to the database')
    })
    .then(() => askMenu())
}
// Add Role //

// add employee
// What is the employee's first name?
// What is the employee's last name?
// What is the employee's role?
// Who is the employee's manager? (with none option)
// log added 'employee' to the database

// update employee role
// Which employee's role do you want to update?
// Which role do you want to assign to the selected employee?
// log updated employee's role


function askMenu() {
    inquirer
        .prompt(menuQuestion)
        .then((data) => {
            if (data.menuQuestion === 'View All Employees') {
                console.log('View All Employees')
                // viewAllEmployees()
            }
            if (data.menuQuestion === 'Add Employee') {
                console.log('Add Employee')
                // addEmployee()
            }
            if (data.menuQuestion === 'Update Employee Role') {
                console.log('Update Employee Role')
                // updateEmployeeRole()
            }
            if (data.menuQuestion === 'View All Roles') {
                console.log('View All Roles')
                // viewAllRoles()
            }
            if (data.menuQuestion === 'Add Role') {
                console.log('Add Role')
                addRole()
            }
            if (data.menuQuestion === 'View All Departments') {
                console.log('View All Departments')
                // viewAllDepartments()
            }
            if (data.menuQuestion === 'Add Department') {
                console.log('Add Department')
                addDepartment()
            }
        })//.then(() => askMenu())

}


function init() {
    askMenu()
}

init()