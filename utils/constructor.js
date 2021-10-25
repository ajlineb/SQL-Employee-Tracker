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
        db.query('SELECT role.title, role.department_id, department.department_name, role.salary FROM role LEFT JOIN department ON department.id = role.department_id', (err, result) => {
            if (err){
                console.log(err);
                return;
            };
            return result;
        });
    };

    viewAllEmployees() {

    }

    addDepartment() {

    }

    addEmployee() {

    }

    updateRole() {

    }
};

module.exports = QueryBuilder;