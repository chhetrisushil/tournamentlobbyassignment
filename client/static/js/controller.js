/**
 * controller.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window: false*/
(function (W, App, undefined) {
  'use strict';

  function Controller(view, model) {
    this.view = view;
    this.model = model;

    this.init();
  }

  Controller.prototype = {
    constructor: Controller,

    init: function () {
      var _this = this;

      this.model.load(function (data) {
        _this.view.render(data);
      });

      this.view.bind('joinRoom', function () {
        _this.joinRoom();
      });

      this.model.track(function (data) {
        _this.view.update(data);
      });
    },

    joinRoom: function () {
      var _this = this;

      console.log('joining room', _this);
    }
  };

  App.Controller = Controller;
}(window, (window.App || (window.App = {}))));
