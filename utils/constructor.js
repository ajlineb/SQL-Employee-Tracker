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
    constructor(something1, something2) {
        this.something1 = something1;
        this.something2 = something2;
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
    }

    addDepartment() {

    }

    addEmployee() {

    }

    updateRole() {

    }
};

module.exports = QueryBuilder;