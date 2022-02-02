const mysql = require('mysql2');
const table =  require('console.table');

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

function updateTableData(table, data){
    return new Promise(function(resolve, reject){
        const keys = Object.keys(data);
        const values = Object.values(data);
        let questionMarks = '?';
        for(let i = 1; i < values.length; i++){
            questionMarks = questionMarks + ', ?';
        }
        db.query(`INSERT INTO `+ table+'('+keys+')'+' VALUES ('+ questionMarks+');',values, function (err, results){
        if(err) {
            reject(err);
        } else {
            resolve(getTableData(table));
        }
    })
    });
}

function updateEmployeeRole(employeeId, roleId){
    return new Promise(function(resolve, reject){
        const keys = Object.keys(data);
        const values = Object.values(data);
        db.query('UPDATE employees SET role_id = ? WHERE id = ?;',roleId, employeeId, function (err, results){
        if(err) {
            reject(err);
        } else {
            resolve(getTableData(table));
        }
    })
    });
}


module.exports = { getTableData , updateTableData, updateEmployeeRole };