const inquirer = require('inquirer');
const databaseManagement = require('./dbManager')




mainMenu = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View Departments','View Roles', 'View Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }
]


function promptQuestions(questions){
    inquirer.prompt(questions).then(answers => {
        if (answers.mainMenu == 'View Departments') {
            databaseManagement.getTableData('departments').then(results =>{
                console.table(results);
                return promptQuestions(mainMenu);

            });
        } else if (answers.mainMenu == 'View Roles') {
            databaseManagement.getTableData('roles').then(results =>{
                console.table(results);
                return promptQuestions(mainMenu);

            });
        }else if (answers.mainMenu == 'View Employees') {
            databaseManagement.getTableData('employees').then(results =>{
                console.table(results);
                return promptQuestions(mainMenu);
            });
        } else if (answers.mainMenu == 'Add a department') {
            inquirer.prompt([
                {   
                    type: 'input',
                    name: 'name',
                    message: 'What is your department name?'
                }
            ]).then(answers => 
                databaseManagement.updateTableData('departments', answers)).then(results =>{
                    console.table(results);
                }
            );
        } else if (answers.mainMenu == 'Add a role') {
            inquirer.prompt([
                {   
                    type: 'input',
                    name: 'title',
                    message: 'What is your role title?'
                },
                {   
                    type: 'number',
                    name: 'salary',
                    message: 'What is the average salary for this role?'
                },
                {   
                    type: 'number',
                    name: 'department_id',
                    message: 'Corresponding department ID?'
                }
            ]).then(answers => 
                databaseManagement.updateTableData('roles', answers)).then(results =>{
                    console.table(results);
                }
            );
        } else if (answers.mainMenu == 'Add an employee') {

        } else if (answers.mainMenu == 'Update an employee role') {

        }
    })
}


promptQuestions(mainMenu);