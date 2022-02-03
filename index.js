const inquirer = require('inquirer');
const databaseManagement = require('./dbManager')



//The questions used to navigate around the main menu
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
                promptQuestions(mainMenu);

            });
        } else if (answers.mainMenu == 'View Roles') {
            databaseManagement.getTableData('roles').then(results =>{
                console.table(results);
                promptQuestions(mainMenu);

            });
        }else if (answers.mainMenu == 'View Employees') {
            databaseManagement.getTableData('employees').then(results =>{
                console.table(results);
                promptQuestions(mainMenu);
            });
        } else if (answers.mainMenu == 'Add a department') {
            inquirer.prompt([
                {   
                    type: 'input',
                    name: 'name',
                    message: 'What is your department name?'
                }
            ]).then(answers => 
                databaseManagement.updateTable('departments', answers)).then(results =>{
                    promptQuestions(mainMenu);

                }
            );
        } else if (answers.mainMenu == 'Add a role') {
            inquirer.prompt([
                {   
                    type: 'input',
                    name: 'title',
                    message: 'What is the role title?'
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
                databaseManagement.updateTable('roles', answers)).then(results =>{
                    promptQuestions(mainMenu);

                }
            );
        } else if (answers.mainMenu == 'Add an employee') {
            databaseManagement.getSpecificData("employees", "first_name").then(results => {
            inquirer.prompt([
                {   
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employees first name?'
                },
                {   
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employees last name?'
                },
                {   
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is their manager?',
                    choices: results
                },
                {   
                    type: 'number',
                    name: 'role_id',
                    message: 'Corresponding role ID?'
                }
            ]).then(answers => {
                databaseManagement.addEmployee('employees', answers)}).then(results =>{
                    promptQuestions(mainMenu);

                }
            )})

        } else if (answers.mainMenu == 'Update an employee role') {
            inquirer.prompt([
            {
                type: 'number',
                name: 'role_id',
                message: "What is the ID of the new role?"
            },
            {
                type: 'number',
                name: 'id',
                message: "What is the ID of the employee to update?"
            }]).then(results =>{
                databaseManagement.updateEmployeeRole(results)}).then(results =>{
                    promptQuestions(mainMenu);
            })
        } else if (answers.mainMenu == 'Exit'){
            process.exit(0);
        }
    })
}


promptQuestions(mainMenu);