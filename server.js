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

// node/common.js style 

var email_username = 'adzetsind@gmail.com';
var email_apikey = '8f635dec-f537-43b4-9c19-3a80c0f53c03';
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
// app.use(multer({dest:__dirname+'/file/uploads/'}).any());
app.use(cookieParser());

// var uri = 'mongodb://admin:admin@cluster0-shard-00-00-4f03b.mongodb.net:27017,cluster0-shard-00-01-4f03b.mongodb.net:27017,cluster0-shard-00-02-4f03b.mongodb.net:27017/VDC?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

// var uri = 'mongodb+srv://tapshort:tapBeer@tapshortTesting-nt34k.mongodb.net/Tapshort?retryWrites=true&w=majority';
var url_Data='mongodb+srv://ksaisurya304:vTqVDvn4WZyM02t9@cluster0.7utgfxb.mongodb.net/tapshort?retryWrites=true&w=majority'

// let testingUrl = "mongodb://" + username + ":" + password + "@testingcluster-shard-00-00-jecty.mongodb.net:27017,testingcluster-shard-00-01-jecty.mongodb.net:27017,testingcluster-shard-00-02-jecty.mongodb.net:27017/vidlead_test?ssl=true&replicaSet=TestingCluster-shard-0&authSource=admin&w=majority";

mongoose.connect(url_Data).catch((error) => {
    console.log(error, "ASGXGSABXGU");
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

function sendEmail(fromName, fromEmail, toEmail, subject, contentHtml) {

    var post_data = querystring.stringify({
        'username': email_username,
        'api_key': email_apikey,
        'from': fromEmail,
        'from_name': fromName,
        'to': toEmail,
        'subject': subject,
        'body_html': contentHtml,
        'body_text': ''
    });

    // Object of options.
    var post_options = {
        host: 'api.elasticemail.com',
        path: '/mailer/send',
        port: '443',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var result = '';

    // Create the request object.
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            result = chunk;

        });
        res.on('error', function(e) {
            result = 'Error: ' + e.message;

        });
    });

    // Post to Elastic Email
    post_req.write(post_data);
    post_req.end();

}





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