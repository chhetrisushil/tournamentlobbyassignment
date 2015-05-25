/**
 * apis.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
var Apis = function () {
  var express = require('express'),
      ApiRouter = express.Router();

  ApiRouter.get('/tournaments', function (req, res) {
    var responseJSON = [{
      name: 'Test',
      decks: '2',
      pointValue: '10',
      minEntry: '800',
      status: 'seating',
      sitting: '1/2'
    }, {
      name: 'Testing',
      decks: '2',
      pointValue: '10',
      minEntry: '800',
      status: 'seating',
      sitting: '1/2'
    }];

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(responseJSON));
  });

  return ApiRouter;
};

module.exports = Apis;
