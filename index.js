const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();
require('console.table')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
  );

// ----Add Department---- //
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
// ----Add Department---- //

// ----Add Role---- //
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
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'roleDepartment',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales']
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
// ----Add Role---- //


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

// add employee
// What is the employee's first name?
// What is the employee's last name?
// What is the employee's role?
// Who is the employee's manager? (with none option)
// log added 'employee' to the database
function addEmployee() {
    inquirer
    .prompt(addEmployeeQuestion)
}

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

function viewAllEmployees() {
    return db.promise().query('SELECT * FROM employee')
}

function askMenu() {
    inquirer
        .prompt(menuQuestion)
        .then((data) => {
            if (data.menuQuestion === 'View All Employees') {
                // console.log('View All Employees')
                viewAllEmployees().then((employeeData) => {
                    console.table(employeeData[0])
                    // console.log(employeeData)
                    askMenu();
                })
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
                // console.log('Add Role')
                addRole()
            }
            if (data.menuQuestion === 'View All Departments') {
                console.log('View All Departments')
                // viewAllDepartments()
            }
            if (data.menuQuestion === 'Add Department') {
                // console.log('Add Department')
                addDepartment()
            }
            if (data.menuQuestion === 'Quit') {
                askMenu()
            }
        })
}

askMenu()