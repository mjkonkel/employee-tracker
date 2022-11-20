const inquirer = require('inquirer');
// const mysql = require('mysql2');
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
        })
        .then(() => askMenu())
}
// ----Add Department---- //

// ----Add Role---- //
const addRoleQuestion = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'department_id',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales']
    }
]

function addRole() {
    inquirer
        .prompt(addRoleQuestion)
        .then((data) => {
            // console.log('Added ' + data.roleName + ' to the database')
            db.insertRole(data)
            console.log(data)
        })
        .then(() => askMenu())
}
// ----Add Role---- //

// ----Add Employee---- //
const addEmployeeQuestion =[
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'What is the employee\'s last name?',
        name: 'lastName'
    },
]

// What is the employee's role?
// Who is the employee's manager? (with none option)
// log added 'employee' to the database
// function addEmployee() {
//     inquirer
//     .prompt(addEmployeeQuestion)
// }
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
                   
                }).then(()=> askMenu())
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
                db.viewAllRoles().then((roleData) => {
                    console.table(roleData[0])
                   
                }).then(()=> askMenu())
            }
            if (data.menuQuestion === 'Add Role') {
                addRole()
            }
            if (data.menuQuestion === 'View All Departments') {
                console.log('View All Departments')
                db.viewAllDepartments().then((departmentData) => {
                    console.table(departmentData[0])
                   
                }).then(()=> askMenu())
            }
            if (data.menuQuestion === 'Add Department') {
                addDepartment()
            }
            if (data.menuQuestion === 'Quit') {
                askMenu()
            }
        })
}

askMenu()