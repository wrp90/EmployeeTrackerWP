const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Qazwsx1213765',
    database: 'database_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});


function init() {
    inquirer.prompt([
        {
           type: 'list',
           message: 'Please select one of the following options.',
           name: 'choices',
           choices: [
               'View Departments',
               'View Roles',
               'View Employees',
               'Add Department',
               'Add Role',
               'Add Employee',
               'Delete Department',
               'Delete Role',
               'Delete Employee',
               'Update Employee role',
            ] 
        }
    ]).then((res => {
        // console.log(res);
        switch (res.choices) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
        }
    }))
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            throw err;
        } else {
            console.table(res);
            init();
        }
    })
}

function viewRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) {
            throw err;
        } else {
            console.table(res);
            init();
        }
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            throw err;
        } else {
            console.table(res);
            init();
        }
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the Department.',
            name: 'add',
        }
    ]).then((res) => {
        // console.log(res);
        connection.query('INSERT INTO department SET ?', { Name: res.add }, (err, res) => {
            if (err) {
                throw err;
            } else {
                console.log('Department added.');
                init();
            }
        })
    })
}

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        var deptNames = res.map(function(dataPacket) {
            console.log(dataPacket)
            return {
                name: dataPacket.Name,
                value: dataPacket.ID,
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter a Role.',
                name: 'roleName'

            },
            {
                type: 'input',
                message: 'Please enter a salary.',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Please select a Department',
                name: 'select',
                choices: deptNames
            },
        ]).then((res) => {
            connection.query('INSERT INTO role SET ?', { Title: res.roleName, Salary: res.roleSalary, Department_ID: res.select }, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Role updated.');
                    init();
                }
            });
        })
    })
}

init();

