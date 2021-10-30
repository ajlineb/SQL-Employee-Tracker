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
                'Update Employee Role',
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
        };

        if (mainQuestion === 'Update Employee Role') {
            //Sends to the Questions about adding an employee
            askUpdateEmployeeRole(questions);
        };

        if (mainQuestion === 'View All Roles') {
            //Sends to the Questions about adding an employee
            build.viewAllRoles();
            askQuestionMain(questions);
        };

        if (mainQuestion === 'Add Role') {
            //Sends to the Questions about adding an employee
            askAddRole(questions);
        };
        if (mainQuestion === 'View All Departments') {
            //Sends to the Questions about adding an employee
            build.viewAllDepartments();
            askQuestionMain(questions);
        };

        if (mainQuestion === 'Add Department') {
            //Sends to the Questions about adding an employee
            askAddDepartment(questions);
        };

        if (mainQuestion === 'Quit') {
            //Sends to the Questions about adding an employee
            console.log(
                art({
                    name: 'GOODBY!',
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
            process.exit();
        };
    })
};

const askAddingEmployee = async (data) => {
    const roles = await db.query('SELECT * FROM role');
    const roleList = roles.map(({ title, id }) => ({ name: title, value: id }));
    const manager = await db.query('SELECT * FROM employee');
    const managerList = manager.map(({ first_name, last_name, id }) => ({ name: `${first_name}, ${last_name}`, value: `${id}` }));
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
        //console.log(answer);
        const { firstName, lastName, roles, managerName } = answer;
        build.addEmployee(firstName, lastName, roles, managerName);
        build.viewAllEmployees();
        askQuestionMain(questions);
    })
};

const askUpdateEmployeeRole = async (data) => {
    const empList = await db.query('SELECT * FROM employee');
    const employee = empList.map(({first_name, last_name, id }) => ({name: `${first_name}, ${last_name}`, value: id }));
    const roles = await db.query('SELECT * FROM role');
    const roleList = roles.map(({ title, id }) => ({ name: title, value: id }));
    prompt([
        {
            type: 'list',
            message: data[9],
            name: 'employee',
            choices: employee
        },
        {
            type: 'list',
            message: data[10],
            name: 'role',
            choices: roleList
        }
    ])
    .then(async (answer) => {
        const { employee, role } = answer;
        console.log(employee, role);
        build.updateRole(employee, role);
        build.viewAllEmployees();
        askQuestionMain(questions);
    });
};

const askAddRole = async (data) => {
    const departments = await db.query('SELECT * FROM department');
    const department = departments.map(({department_name, id}) => ({name: department_name, value: id}));
    prompt([
        {
            type: 'list',
            message: data[4],
            name: 'department',
            choices: department
        },
        {
            type: 'input',
            message: data[2],
            name: 'roleName'
        },
        {
            type: 'input',
            message: data[3],
            name: 'salary'
        },
    ])
    .then(async (answer) => {
        const { department, roleName, salary } = answer;
        console.log(department, roleName, salary);
        build.addRole(department, roleName, salary);
        build.viewAllRoles();
        askQuestionMain(questions);
    });
};

const askAddDepartment = async (data) => {
    prompt([
        {
            type: 'input',
            message: data[1],
            name: 'department'
        }
    ])
    .then(async (answer) => {
        const { department } = answer;
        build.addDepartment(department);
        build.viewAllDepartments();
        askQuestionMain(questions);
    });
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