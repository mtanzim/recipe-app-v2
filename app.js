
var express = require('express');
var routes = require('./app/routes/');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var util = require('util');
var favicon = require('serve-favicon');
var path = require ('path');
var morgan = require('morgan');

require('dotenv').load();
require('./app/config/passport')(passport);

var app = express();


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// mongoose connection
let mongoosAddr = undefined;
if (process.env.NODE_ENV === 'production') mongoosAddr = process.env.MONGO_URI;
else mongoosAddr = process.env.MONGO_URI_LOC;
mongoose.Promise = global.Promise;
mongoose.createConnection(mongoosAddr, { useMongoClient: true }).then(
  () => { util.log(`connect to mongo successfully on ${mongoosAddr}`); },
  err => { util.log(`error on connect on ${mongoosAddr}  mongodb:${err}`); }
);

app.use(favicon(path.join(__dirname, 'client','build', 'favicon.ico')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes(passport));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var error = new Error('Not found!');
  next(error);
});

//provide err argument before req to tell Express it's an error handling function
app.use((err, req, res, next) => {
  // console.log(err);
  console.error(err.stack);
  //example of setting the status, and then sending the response body
  res.status(500).send(`Error found: ${err.message}`);
})


module.exports = app;

