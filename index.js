const mysql = require('mysql2');
const { prompt } = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'employee_db'
    },
    console.log('Connected to the employee database !')
);

const questions = [
    'first question',
    'second question',
    'third question',
    'fourth question',
    'fith question'
]