/**
 * helper.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window, XMLHttpRequest: false*/
(function (W) {
  'use strict';

  /**
    * @private
    * @description does type checking
    * @param
    *  type {!String}: type to be checked
    */
  function check(type) {
    var toString = Object.prototype.toString;

    return function (val) {
      return toString.call(val) === type;
    };
  }

  /**
    * @description Type checkers
    */
  var isString = check('[object String]'),
      isFunction = check('[object Function]');

  /**
    *  @description Template compiler
    *  @param
    *    str {!String}: template string
    *    obj {!Object}: value list with which the template is compiled
    */
  function templates(str, obj) {
    return str.replace(/\{\{(.+?)\}\}/g, function (match, $1) {
      return obj[$1];
    });
  }

  /**
    * @description no operation stud
    *
    */
  var noop = function noop() {};

  function ajax(config) {
    var error, success,
        xhr = new XMLHttpRequest();

    if (!config.url) {
      throw new ReferenceError('URL is not defined!');
    }

    config.method = (config.method || 'GET').toUpperCase();

    success = config.success && App.isFunction(config.success) ?
                config.success : noop;
    error = config.error && App.isFunction(config.error) ?
                config.error : noop;

    xhr.onreadystatechange = function (e) {
      var responseData;
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          //treat every response as JSON for now
          try {
            responseData = JSON.parse(xhr.responseText);
          } catch (e) {
            responseData = xhr.responseText;
          }
          success.call(this, responseData, xhr);
        } else {
          //for now consider very other status as error
          error.call(this, xhr);
        }
      }
    };

    xhr.onerror = function (e) {
      error.call(this, xhr);
    };

    xhr.open(config.method, config.url, true);

    xhr.send(config.data);

    return xhr;
  }

  function Helper() {}

  Helper.prototype = {
    isString: isString,
    isFunction: isFunction,
    templates: templates,
    ajax: ajax,
    noop: noop
  };

  W.App = new Helper();
}(window));
