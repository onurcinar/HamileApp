var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hamapp'
});
var bCrypt = require('bcrypt-nodejs');
var secret = '7x0jhxt"9(thpX6';
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});


////getWorkStates
exports.getWorkStates = function (req, res) {
    var sql = "select id,name from workstate";
    //console.log(sql);
     connection.query(sql, function (err, result) {
        if (err) {
           // console.log("error ocurred", err);
            res.send({
                "code": 400,
                "msg": "error ocurred"
            })
        } else {
           // console.log('The workstates are: ', JSON.stringify(result));
            res.send({
                "code": 200,
                "msg": "user registered sucessfully",
                "results":result
            });
        }
    });
}


////getSchoolStates
exports.getWorkAndSchoolStates = function (req, res) {
    var workStates=null;
    var schoolStates=null;
    var sql = "select id,name from schoolstate";
    //console.log(sql);
     connection.query(sql, function (err, result) {
        if (err) {
            //console.log("error ocurred", err);
            res.send({
                "code": 400,
                "msg": "error ocurred"
            })
        } else {
            schoolStates=result;
            sql = "select id,name from workstate";
    //console.log(sql);
     connection.query(sql, function (err2, result2) {
        if (err2) {
           // console.log("error ocurred", err);
            res.send({
                "code": 400,
                "msg": "error ocurred"
            })
        } else {
            workStates=result2;
            res.send({
                "code": 200,
                "msg": "user registered sucessfully",
                "workStates":workStates,
                "schoolStates":schoolStates
            });
        }
        });
    }
    });
}

