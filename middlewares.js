////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';

const orderedMiddlewareList = [
  'authenticate',
];

module.exports = {
  setup(botl) {
    const bot = botl;
    const path = require('path');
    const includeAll = require('include-all');

    bot.middlewares = includeAll({
      dirname: path.join(__dirname, 'middlewares'),
      filter: /(.+)\.js$/
    });

    bot.orderedMiddlewareList = orderedMiddlewareList;
  }
};
