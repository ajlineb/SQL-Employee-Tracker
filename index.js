const mysql = require('mysql2');
const { prompt } = require('inquirer');
const Query = require('./utils/constructor.js');


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
    'Please choose an option below... ',                    //0
    'What is the name of the Department?',                  //2
    'What is the name of the Role?',
    'What is the salary of the Role?',
    'Which department does the role belong to?',
    'What is the employee\'s first name?',
    'What is the employee\'s last name?',
    'What is the employee\'s role?',
    'Who is the employee\'s manager?',
    'Which employee\'s role do you want to update?',
    'Which role do you want to assign the selected employee?',
    
];

