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
               'View roles',
               'View employees',
               'Add Department',
               'Add role',
               'Add employee',
               'Delete Department',
               'Delete role',
               'Delete employee',
               'Update Employee role',
            ] 
        }
    ]).then((res => {
        console.log(res);
        switch (res.choices) {
            case 'View Departments':
                viewDepartments();
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
        }
    })
}

init();

