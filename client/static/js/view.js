/**
 * view.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window, document: false*/
(function (W, App, undefined) {
  'use strict';

  function View() {
    this.rowTemplate = document.getElementById('rowTemplate').innerHTML;
    this.table = document.querySelector('#container table');
    this.tbody = this.table.querySelector('tbody');

    this.bindEvents();
  }

  View.prototype = new W.App.Events();

  // Methods
  View.prototype.render = function (data) {
    var _this = this,
        content = '';

    data.forEach(function (rowItem) {
      content += App.templates(_this.rowTemplate, rowItem);
    });

    _this.tbody.innerHTML = content;
  };

  View.prototype.bindEvents = function () {
    var _this = this;

    _this.table.addEventListener('click', function (e) {
      var target = e.target,
          eventName;

      if (target.nodeType === 1 && target.nodeName === 'A') {
        if ((eventName = target.getAttribute('data-eventname'))) {
          _this.trigger(eventName);
        }
      }

      e.stopPropagation();
      e.preventDefault();
      return false;
    }, false);
  };

  View.prototype.update = function (data) {
    console.log('Updating with data...', data);
  };

  // define constructor to View itself
  View.prototype.constructor = View;

  App.View = View;
}(window, (window.App || (window.App = {}))));
