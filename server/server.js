var express = require("express");
var login = require('./routes/loginroutes');
var table =require('./routes/tableroutes');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});


//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/protected', login.protected);
router.post('/step2', login.step2);
router.post('/getWorkStates',table.getWorkStates);
router.post('/getWorkAndSchoolStates',table.getWorkAndSchoolStates);

app.use('/api', router);
app.listen(5000);