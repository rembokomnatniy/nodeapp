var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var mongoose = require('mongoose');
var session= require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb+srv://danilko:Moyo2013@cluster0-qfwzj.mongodb.net/eshop?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

require('./config/passport');

var app = express();
var PORT = process.env.PORT || 8080

// view engine setup
app.engine('.hbs', exphbs({defaukLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180*60*1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', userRoutes);
app.use('/', routes);

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

app.listen(PORT, () =>{
  console.log('Server has been started...');
})

module.exports = app;
