require('console.table');
const art = require('asciiart-logo');

const { prompt } = require('inquirer');
const db = require("./connection/connection.js");
const build = require('./utils/constructor.js');

const questions = [
    'Please choose an option below... ',                    //0
    'What is the name of the Department?',                  //1
    'What is the name of the Role?',                        //2
    'What is the salary of the Role?',                      //3
    'Which department does the role belong to?',            //4
    'What is the employee\'s first name?',                  //5
    'What is the employee\'s last name?',                   //6
    'What is the employee\'s role?',                        //7
    'Who is the employee\'s manager?',                      //8
    'Which employee\'s role do you want to update?',        //9
    'Which role do you want to assign the selected employee?',  //10
];

const askQuestionMain = (data) => {
    prompt([
        {
            type: 'list',
            message: data[0],
            name: 'mainQuestion',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ],
        },
    ])
    .then(async (answer) => {
        const { mainQuestion } = answer;
        console.log(mainQuestion);
        if (mainQuestion === 'View All Employees') {
            //Shows All Employees
            build.viewAllEmployees();
            //console.table(allEmployees.viewAllEmployees());
            askQuestionMain(questions);
        };

        if (mainQuestion === 'Add Employee') {
            //Sends to the Questions about adding an employee
            askAddingEmployee(questions);
        }
    })
};

const askAddingEmployee = async (data) => {
    const roles = await db.query('SELECT * FROM role');
    const roleList = roles.map(({ title, id }) => ({ name: title, value: id }));
    console.log(roles);
    console.log(roleList);
    const manager = await db.query('SELECT * FROM employee');
    const managerList = manager.map(({ first_name, last_name, id }) => ({ name: `${first_name}, ${last_name}`, value: `${id}` }));
    console.log(manager);
    console.log(managerList);
    prompt([
        {
            type: 'input',
            message: data[5],
            name: 'firstName'
        },
        {
            type: 'input',
            message: data[6],
            name: 'lastName'
        },
        {
            type: 'list',
            message: data[7],
            name: 'roles',
            choices: roleList
        },
        {
            type: 'list',
            message: data[8],
            name: 'managerName',
            choices: managerList
        },
    ])
    .then(async (answer) => {
        console.log(answer);
        const { firstName, lastName, roles, managerName } = answer;
        console.log(firstName, lastName, roles, managerName);
        build.addEmployee(firstName, lastName, roles, managerName);
        build.viewAllEmployees();
        askQuestionMain(questions);
    })
};

function init() {
    console.log(
        art({
            name: 'EMPLOYEE MANAGER',
            font: 'soft',
            lineChars:  8,
            padding: 2,
            borderColor: 'purple',
            logoColor: 'bold-green',
            textColor: 'purple',
        })
        .emptyLine()
        .right('version 3.7.123')
        .render()
    );
    console.log("\x1b[35m%s\x1b[0m", "\nEmployee Manager\n");
    askQuestionMain(questions);
};

init();