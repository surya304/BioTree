require('dotenv').config();

var express = require('express');
var methodOverride = require('method-override');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var app = express();
var multer = require('multer');
var https = require('https');
var fs = require('fs');
var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var request = require('request');
var helmet = require('helmet')
var querystring = require('querystring');
var router = express.Router();

// setup route middlewares
var csrfProtection = csrf({
    cookie: true
});

var parseForm = bodyParser.urlencoded({
    extended: false
});



var User = require('./models/user');
app.set('view engine', 'ejs');
app.use(session({
    cookieName: 'session',
    secret: 'PIGINNL&&89001998&*9090dhhu4873edbybjcvm',
    duration: 30 * 60 * 1000,
    activeDuration: 60 * 60 * 1000,
    httpOnly: true
}));

var port = 3000;


app.listen(process.env.PORT || port);

console.log('Running on Port - ' + port);

app.use('/adminui', express.static(__dirname + '/adminui/'));
app.use('/userui', express.static(__dirname + '/userui/'));
app.use(helmet())
app.use(methodOverride('_method'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());




// mongoose.connect(url_Data).catch((error) => {
//     console.log(error, "ASGXGSABXGU");
// });


var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;




    var dburl='mongodb+srv://'+ username +':'+ password +'@cluster0.7utgfxb.mongodb.net/tapshort?retryWrites=true&w=majority'


    mongoose.connect(dburl, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }, function(error, db) {
        if (!error) {
            console.log("Connected to database");
        } else {
            console.log("Error connecting to database", error);
        }

    });






app.use(require("./controllers/userController"));
app.use(require("./controllers/shorturlController"));


function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin/login');
    } else {
        next();
    }
};

const logger = require('morgan');

app.use(logger('dev'));

function requireClientLogin(req, res, next) {
    if (!req.session.client) {
        res.redirect('/login');
    } else {
        next();
    }
};


// Email Related Stuff






app.get('*', csrfProtection, function(req, res) {


    console.log(req.session.client, "req.session.clien")



    if (!req.session.client) {
        res.redirect('/login')
    } else {
        res.redirect('/dashboard')

    }


});




app.use(bodyParser.urlencoded({ extended: true }))
    // app.get(endpoint, callback)






router.get('/', requireClientLogin, function(req, res) {


    res.redirect('/login');


});


function requireClientLogin(req, res, next) {
    if (!req.session.client) {
        res.redirect('/login');
    } else {
        next();
    }
};

app.get('/login', function(req, res) {



    res.render('login')


})




app.get('/forgotpwd', function(req, res) {
    res.render('forgotPassword')
})


app.get('/resetpwd', function(req, res) {
    res.render('resetPassword')
})






function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    let token = req.headers.authorization.split(' ')[1];


    if (token === null) {
        return res.status(401).send('Unauthorized Request');
    }

    let payload = jwt.verify(token, 'rahasyam#18');


    if (!payload) {

        return res.status(401).send('Unauthorized Request');
    }

    req.userID = payload.subject;

    next();

}