/**
 * model.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window: false*/
(function (W, App, undefined) {
  'use strict';
  var updateURI = '://localhost:3000/tournaments';

  function socketConnector(cb) {
    var ws = new WebSocket('ws'+updateURI);

    ws.addEventListener('message', function (e) {
      cb(e.data);
    }, false);
  }

  function poller(cb) {
    var _this = this;

    App.ajax({
      url: 'http'+updateURI,
      method: 'GET',
      success: function (response) {
        cb(response);
      },

      error: function (err) {
        console.log(err);
      }
    });

    W.setTimeout(function () {
      poller.call(_this, cb);
    }, 2000);
  }

  function Model() {}

  Model.prototype = {
    constructor: Model,
    url: '/apis/tournaments',

    load: function (cb) {
      var _this = this;

      App.ajax({
        method: 'GET',
        url: _this.url,
        success: function (response) {
          cb(response);
        },
        error: function (err) {
          console.log(err);
        }
      });
    },

    update: function () {},

    track: function (cb) {
      if (W.WebSocket) {
        socketConnector.call(this, cb);
      } else {
        poller.call(this, cb);
      }
    }
  };

  App.Model = Model;
}(window, (window.App || (window.App = {}))));
