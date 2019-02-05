////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
module.exports = {
  setup(botl) {
    const bot = botl;
    const path = require('path');
    const includeAll = require('include-all');

    bot.services = includeAll({
      dirname: path.join(__dirname, 'services'),
      filter: /(.+Service)\.js$/
    });

    Object.keys(bot.services).forEach((serviceName) => {
      global[serviceName] = bot.services[serviceName];
    });
  }
};
