const mysql = require('mysql2');
const utility = require('util');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employee_db'
    },
    console.log('Connected to the employee database !')
);

db.query = utility.promisify(db.query);

module.exports = db;