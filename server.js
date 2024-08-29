const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const mongoose = require('mongoose');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    cookieName: 'session',
    secret: 'PIGINNL&&89001998&*9090dhhu4873edbybjcvm',
    duration: 30 * 60 * 1000,
    activeDuration: 60 * 60 * 1000,
    httpOnly: true
}));

// Static files
app.use('/adminui', express.static(path.join(__dirname, 'adminui')));
app.use('/userui', express.static(path.join(__dirname, 'userui')));

const cors = require('cors');

app.use(cors({
    origin: 'https://bio-tree-orpin.vercel.app', // Replace with your frontend domain
    credentials: true
}));

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Database connection
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log("Connected to database");
    } else {
        console.log("Error connecting to database", error);
    }
});

// Routes
app.use(require("./controllers/userController"));
app.use(require("./controllers/shorturlController"));

// Default route
app.get('*', csrfProtection, (req, res) => {
    if (!req.session.client) {
        res.redirect('/login');
    } else {
        res.redirect('/dashboard');
    }
});

// Start server
app.listen(port, () => {
    console.log('Running on Port - ' + port);
});