var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const bcrypt = require('bcryptjs');


// Set up default mongoose connection
const mongoDB = "mongodb+srv://SkyWing:Lalala75@cluster0.ecd282o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/signup');
var signInRouter = require('./routes/signin');
var memberRouter = require('./routes/member');
var messageRouter = require('./routes/messages');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  console.log("here", req.user);
  console.log("and", res.locals.currentUser);
  
  next();
});


app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/member', memberRouter);
app.use('/message', messageRouter);
app.use('/admin', adminRouter);
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
      if (err) {
          return next(err);
      }
      res.redirect("/");
      });
  });

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

console.log("goodjob you'are doing fine ✔️✔️✔️");


module.exports = app;
