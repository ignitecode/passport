var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require("connect-flash");


// A little tricky here but basically we initialize passport and provide it the package we installed from NPM
const passport = require('./src/passport')(require('passport'));

const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const accountController = require('./routes/account_controller');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));

app.use(session({ resave: true, saveUninitialized: false, secret: 'someverysecretstring12344here' })); // Super important line!
app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));


// Setup Controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountController);

app.post('/login', passport.authenticate('local', { successRedirect: '/accounts', failureRedirect: '/login', failureFlash: true }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
