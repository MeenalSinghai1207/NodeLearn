const mysql = require('mysql');
const express = require('express');

var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'EmployeeDB',
        multipleStatements: true
    }

);


mysqlConnection.connect((err)=> {
if(!err)
    console.log('Success');
else
    console.log('failed'+ JSON.stringify(err, undefined, 2));
}
);


app.listen(3000,()=>console.log('Express server is running at 3000'));

//Get all employees from the database
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM EMPLOYEE',(err,rows,fields)=>{
        if(!err)
   // console.log(rows[0].EmpID);
        res.send(rows);
else
    console.log(err);
    });
});



//Get  employee by employee ID  from the database
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM EMPLOYEE WHERE EmpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
   // console.log(rows[0].EmpID);
        res.send(rows);
else
    console.log(err);
    });
});


//Get  employee by employee ID  from the database
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM EMPLOYEE WHERE EmpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
   // console.log(rows[0].EmpID);
        res.send(rows);
else
    console.log(err);
    });
});



//Delete an  employee ID  from the database
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM EMPLOYEE WHERE EmpId = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
   // console.log(rows[0].EmpID);
        res.send('Deleted successfully');
else
    console.log(err);
    });
});



//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            // rows.forEach(element => {
            //     if(element.constructor == Array)
            //     res.send('Inserted employee id : '+element[0].EmpID);
            // });
            res.send(rows);
        else
            console.log(err);
    })
});


//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

