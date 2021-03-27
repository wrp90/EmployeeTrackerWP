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
               'Update Employee Role',
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
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
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
            connection.query('INSERT INTO role SET ?', 
            { Title: res.roleName, Salary: res.roleSalary, Department_ID: res.select }, (err, res) => {
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

function addEmployee() {
    connection.query('SELECT * FROM role', (err, res) => {
        var roleNames = res.map(function(dataPacket) {
            return {
                name: dataPacket.Title,
                value: dataPacket.ID,
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the Employee first name.',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Please enter the Employee last name',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'Please select an Employee role.',
                name: 'empRole',
                choices: roleNames,
            }
        ]).then((res) => {
            connection.query('INSERT INTO Employee SET ?', 
            { First_Name: res.firstName, Last_Name: res.lastName, Role_ID: res.empRole }, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Employee added.');
                    init();
                }
            });
        })
    })
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM employee', async (err, res) => {
        var empData = res.map(function(dataPacket) {
            return {
                name: dataPacket.Last_Name,
                value: dataPacket.ID,
            }
        })
        inquirer.prompt([
            {
                type: 'list',
                message: 'Please select the Employee.',
                name: 'empList',
                choices: empData,
            },
            {
                type: 'list',
                message: 'Please select the role you wish to update.',
                name: 'roleUpdate',
                choices: await getRole(),
            }
        ])
    })
}


const getRole = function() {
    return connection.query('SELECT * FROM role', (err, res) => {
        res.map(function(dataPacket) {
            return {
                name: dataPacket.Title,
                value: dataPacket.ID,
            }
        })
    })
}



init();
// getRole();


