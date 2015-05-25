/**
 * routes.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
var Routes = function () {
  var express = require('express'),
      PageRouter = express.Router();

  PageRouter.get('/', function (req, res) {
    res.render('index.html');
  });

  return PageRouter;
};

 module.exports = Routes;
