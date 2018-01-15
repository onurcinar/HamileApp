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
exports.getUser = function (req, res) {
    var sql = "select * from users where email='"+req.body.email+"'";
    //console.log(sql);
     connection.query(sql, function (err, result) {
        if (err) {
           // console.log("error ocurred", err);
            res.send({
                "code": 400,
                "msg": "There is no user with this email"
            })
        } else {
          // console.log('The user is: ', JSON.stringify(result));
          // console.log('Regle ='+result[0].regleValue);
            res.send({
                "code": 200,
                "msg": "user got sucessfully",
                "user":result[0]
            });
        }
    });
}