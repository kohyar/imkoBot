////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
module.exports = {
  setup(botl) {
    const bot = botl;
    const path = require('path');

    bot.controllers = require('include-all')({
      dirname: path.join(__dirname, 'controllers'),
      filter: /(.+Controller)\.js$/
    });
  }
};
