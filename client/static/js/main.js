/**
 * main.js
 * Copyright (C) 2015 chhetrisushil <chhetrisushil@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
/*global window, App, document: false*/
(function (W, App, undefined) {
  'use strict';

  function TournamentLobby() {
    var model = this.model = new App.Model();
    var view = this.view = new App.View();
    this.controller = new App.Controller(view, model);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var tournamentLobby = new TournamentLobby();
  });
}(window, (window.App || (window.App = {}))));
