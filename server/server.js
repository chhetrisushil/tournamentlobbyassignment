/**
 * server.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
var express = require('express'),
    path = require('path'),
    ejs = require('ejs'),
    morgan = require('morgan'),
    pages = require('./routes.js'),
    apis = require('./apis.js'),
    server = express(),
    expressWS = require('express-ws')(server);

server.use(morgan('combined'));
server.use(express.static(path.join(__dirname, '..', '/client/static')));
server.set('views', path.join(__dirname, '..', '/client/pages'));
server.engine('html', ejs.renderFile);

server.use(pages());

server.use('/apis', apis());

server.get('/tournaments', function (req, res) {
  res.send('send data...');
});
server.ws('/tournaments', function (ws, req) {
  ws.send('send data...');
});

//unmatched routes
server.get('*', function (req, res, next) {
  var err = new Error();

  err.status = 404;
  next(err);
});

//router error handling middleware
//!!!NOTE!!!: do not write any routes after this
server.use(function (err, req, res, next) {
  if (err.status) {
    res.status(err.status);
  }

  switch (err.status) {
    case 404:
      res.send('Not Found!!!');
      return;
    case 500:
      res.send('Internal Server Error!!!');
      return;
    default:
      next();
  }
});

server.listen(3000, 'localhost', function () {
  console.log('Server started on: http://localhost:3000');
});
