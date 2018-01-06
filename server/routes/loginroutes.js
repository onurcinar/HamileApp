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

exports.register = function (req, res) {
    // console.log("req",req.body);
    var today = new Date();
    var generateHash = function (password) {

        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

    };
    var users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": generateHash(req.body.password),
        "created": today,
        "modified": today
    }

    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });
}
exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var isValidPassword = function (userpass, password) {

        return bCrypt.compareSync(password, userpass);

    }
    connection.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
       // console.log("email", email);
       // console.log("password-", password.toString().trim(),"-");
       // console.log("error",error);
        //console.log("fields",fields);
        if (error ) {
           //  console.log("step 1");
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } 
        else {
            console.log("step 3");
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (isValidPassword(results[0].password, password)) {
                   // var token = jwt.sign({ id: results[0].id, email: results[0].email }, secret);

                   // console.log("step 4");
                    res.send({
                        "code": 200,
                        "success": "login sucessfull",
                        "clientId": results[0].id
                    });
                }
                else {
                    //console.log("step 5");
                    //console.log("gelen result=", results[0].password.toString());
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                //console.log("step 6");
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
       // console.log("step 7");
    });

}

exports.protected = function (req, res) {
    console.log("girdi");
    var clientId = req.body.clientId;
    console.log("clientId= " + clientId);
    if (clientId != null) {
        console.log("ok");
        res.send({
            "code": 200,
            "success": "Users has logged in"
        });
    }
    else {
        console.log("client Id null");
        res.send({
            "code": 400,
            "success": "User has not logged in"
        });
    }
}