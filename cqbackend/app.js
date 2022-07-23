require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var studentRouter = require('./routes/student');
var bookRouter = require('./routes/book');

var app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(logger('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/student', studentRouter);
app.use('/book', bookRouter, noContent);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const isDev = req.app.get('env') === 'development';
  isDev && console.log(err.status, err);
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};

  res.status(err.status || 500);
  res.send(err.message || 'BADREQUEST::ERROR');
});

function noContent(req, res, next) {
  res.status(422);
  res.send('Unprocessable Entity!');
}

module.exports = app;