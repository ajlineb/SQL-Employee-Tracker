const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employee_db'
    },
    console.log('Connected to the employee database !')
);

class QueryBuilder {
    constructor(department_name, title, department_id, salary, first_name, last_name, role_id, manager_id) {
        this.department_name = department_name;
        this.title = title;
        this.department_id = department_id;
        this.salary = salary;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    };

    viewAllDepartments() {
        db.query('SELECT * FROM departments', function (err, results) {
            return results;
        });
    };

    viewAllRoles() {
        db.query('SELECT role.title AS role_title, role.department_id AS role_ID, department.department_name, role.salary FROM role LEFT JOIN department ON department.id = role.department_id', (err, result) => {
            if (err){
                console.log(err);
                return;
            };
            return result;
        });
    };

    viewAllEmployees() {
        db.query('SELECT e.id, e.first_name, e.last_name, m.first_name AS Manager, role.title, department.department_name, role.salary FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id', (err, result) => {
            if(err){
                console.log(err);
                return;
            };
            return result;
        })
    };

    addDepartment() {
        db.query(`INSERT INTO department (department_name) VALUES ("${this.department_name}")`, (err, results) => {
            if(err){
                console.log(err);
                return;
            };
            return result;
        });
    };

    addEmployee() {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${this.first_name}"), ("${this.last_name}"), ("${this.role_id}"), ("${this.manager_id}")`, (err, result) => {
            if(err){
                console.log(err);
                return;
            };
            return results;
        });
    };

    updateRole() {

    }
};

module.exports = QueryBuilder;