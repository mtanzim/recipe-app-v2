require('babel-core/register');

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var util = require('util');
var favicon = require('serve-favicon');
var path = require('path');
var morgan = require('morgan');


var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(process.cwd() + '/client/build/static'));
}


app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
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
  console.error(err.stack);
  res.status(500).send(`Error found: ${err.message}`);
})

let mongoUri = undefined;

if (process.env.NODE_ENV === 'production') mongoUri = process.env.MONGO_URI;
else mongoUri = process.env.MONGO_URI_LOC;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useMongoClient: true }).then(
  () => { util.log(`Connected to Mongo on ${mongoUri}`) },
  (err) => { throw err; }
);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  util.log('Node.js listening on port ' + port + '...');
});



module.exports = app;
