const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the courses_db database.`)
  );

//Gets the entire table
function getTableData(table){
    return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM ${table}`, function (err, results){
            if(err) {
                reject(err);
            } else {
                resolve(results);
                
            }
        });
    });
}

//Allows you to get specific data from a specific table
function getSpecificData(table, data){
    return new Promise(function(resolve, reject){
        db.query(`SELECT ${data} FROM ${table}`, function (err, results){
        if(err){
            console.log(err);
            reject( err);
        }
            let result = results.map(a => a.first_name);
            resolve(result);
        });
    })
}

//Adds an employee and allows you to choose from the available managers list
function addEmployee(data){
    return new Promise(function(resolve, reject){
        db.query('SELECT id FROM employees WHERE first_name=?;',[data['manager_id']], function (err, results){
            if(err) {
                reject(err);
            } else {
                data['manager_id'] = results[0]['id'];
                resolve(data); 
            }
        })}).then( results => {
        return new Promise(function(resolve, reject){
            const keys = Object.keys(results);
            const values = Object.values(results);
            let questionMarks = '?';
            for(let i = 1; i < values.length; i++){
                questionMarks = questionMarks + ', ?';
            }
            db.query('INSERT INTO employees+('+keys+')'+' VALUES ('+ questionMarks+');',values, function (err, results){
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
            })
       })
   });
}


//When called, this function updates the employee role
function updateEmployeeRole(data){
    return new Promise(function(resolve, reject){
        const keys = Object.keys(data);
        const values = Object.values(data);
        db.query('UPDATE employees SET role_id = ? WHERE id = ?;',values, function (err, results){
        if(err) {
            reject(err);
        } else {
            resolve(results);
        }
    })
    });
}


//Allows you to update an employees manager
function updateEmployeeManager(employeeId, managerId){
    return new Promise(function(resolve, reject){
        const keys = Object.keys(data);
        const values = Object.values(data);
        db.query('UPDATE employees SET manager_id = ? WHERE id = ?;',managerId, employeeId, function (err, results){
        if(err) {
            reject(err);
        } else {
            resolve(results);
        }
    })
    });
}

//Allows you to update any table with any data set. DOES NOT ALLOW FOR FILTERING OR UPDATING INDIVIDUAL DATA
function updateTable(table, data){
    return new Promise(function(resolve, reject){
        const keys = Object.keys(data);
        const values = Object.values(data);
        let questionMarks = '?';
        for(let i = 1; i < values.length; i++){
            questionMarks = questionMarks + ', ?';
        }
        db.query(`INSERT INTO ${table}(${keys}) VALUES (`+ questionMarks+');',values, function (err, results){
        if(err) {
            reject(err);
        } else {
            resolve(results);
        }
        })
   })
}


module.exports = { getTableData, getSpecificData, addEmployee, updateEmployeeRole , updateTable , updateEmployeeManager };