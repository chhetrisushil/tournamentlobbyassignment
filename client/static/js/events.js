/**
 * events.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window: false*/
(function (W, App, undefined) {
  'use strict';

  /**
    * @constructor
    */
  function Events() {}

  Events.prototype = {
    __handlersList__: null,
    __uidPrefix__: 'Handler_UID_',
    __uid__: 1,
    constructor: Events,

    bind: function (eventName, handler) {
      var listener, list;

      if (!(eventName && App.isString(eventName))) {
        throw new TypeError('Non-empty and String type event name expected!');
      }

      if (!(handler && App.isFunction(handler))) {
        throw new TypeError('Non-empty and Function type event handler expected!');
      }

      listener = {
        type: eventName,
        handler: handler,
        id: this.__uidPrefix__ + (this.__uid__++)
      };

      !this.__handlersList__ && (this.__handlersList__ = {});
      !(list = this.__handlersList__[eventName]) && (this.__handlersList__[eventName] = list = []);
      list.push(listener);

      return listener.id;
    },

    unbind: function (eventName, handlerReference) {
      var list, accessor;

      if (!(eventName && App.isString(eventName))) {
        throw new TypeError('Non-empty and String type event name expected!');
      }

      if (!(this.__handlersList__ && (list = this.__handlersList__[eventName]))) {
        return;
      }

      if (!handlerReference) {
        delete this.__handlersList__[eventName];

        return;
      }

      accessor = App.isString(handlerReference) ? 'id' : 'handler';

      this.__handlersList__[eventName] = list.filter(function (item) {
        return item[accessor] !== handlerReference;
      });

      if (!this.__handlersList__[eventName].length) {
        delete this.__handlersList__[eventName];
      }
    },

    trigger: function (eventName/*, args...*/) {
      var _this = this,
          list, args;

      if (!(eventName && App.isString(eventName))) {
        throw new TypeError('Non-empty and String type event name expected!');
      }

      if (!(this.__handlersList__ && (list = this.__handlersList__[eventName]))) {
        return;
      }

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments, 1);
      }

      list.forEach(function (item) {
        try {
          item.handler.apply(_this, args);
        } catch (e) {
          throw new Error('Exception ' + e + ' occured in listener call for event' + eventName);
        }
      });
    }
  };

  App.Events = Events;
}(window, (window.App || (window.App = {}))));
