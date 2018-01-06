var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
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
app.use(passport.initialize());
// JWT configration
var options = {}
//options.jwtFromRequest = ExtractJwt.fromAuthHeader();
options.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');
options.secretOrKey = '7x0jhxt"9(thpX6'
// Configure Passport to use local strategy for initial authentication.
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        console.log("local1");
        User.loadOne({ email: email }).then(function (user) {
            if (!user || !user.authenticate(password)) {
                console.log("local2");
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            console.log("local3");
            done(null, user);
        });
    })
);

// Configure Passport to use JWT strategy to look up Users.
passport.use('jwt', new JwtStrategy(options, function (jwt_payload, done) {
    console.log("jwt1");
    User.findOne({
        _id: jwt_payload.id
    }, function (err, user) {
        if (err) {
            console.log("jwt2");
            return done(err, false);
        }
        if (user) {
            console.log("jwt3");
            done(null, user);
        } else {
            console.log("jwt4");
            done(null, false);
        }
    })
}));
//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/protected', login.protected);

app.use('/api', router);
app.listen(5000);