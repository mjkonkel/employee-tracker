require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

db.connect(function (err) {
    if (err) throw err
})

class Query {
    constructor(db) {
        this.db = db
    }

    viewAllEmployees() {
        return this.db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;')
    }

    viewAllDepartments() {
        return this.db.promise().query('SELECT * FROM department')
    }

    viewAllRoles() {
        return this.db.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id=department.id ')
    }

    viewAllManagers() {
        return this.db.promise().query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee')
    }

    insertDepartment(department) {
        // console.log(department)
        return this.db.promise().query('INSERT INTO department SET ?', department)
    }

    insertRole(role) {
        // console.log(role)
        return this.db.promise().query('INSERT INTO role SET ?', role)
    }

    insertEmployee(employee) {
        // console.log(employee)
        return this.db.promise().query('INSERT INTO employee SET ?', employee)
    }
}

module.exports = new Query(db)