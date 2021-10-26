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
    'second question',                                      //2
    'third question',
    'fourth question',
    'fith question'
];

