////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
const options = {
  setup() {
    Object.keys(options.globals).forEach((propertyName) => {
      if (Object.prototype.hasOwnProperty.call(options.globals, propertyName)) {
        global[propertyName] = options.globals[propertyName];
      }
    });
  },


  globals: {
    _: require('lodash'),
    mammoth : require("mammoth"),
    async: require('async'),
    TeleBot: require('telebot'),
    mongoose: require('mongoose'),
    fs : require('fs'),
    connections: {
      dataConnection: {
        url: 'mongodb://192.168.0.35:27017/castellan',
        options: {
          enabled: true,
          useMongoClient: true
        }
      }
    },
    BOT_TOKEN: process.env.BOT_TOKEN || 'botToken',
    BOT_OPTION: { // Optional. Use polling.
      interval: 1000, // Optional. How often check updates (in ms).
      timeout: 0, // Optional. Update polling timeout (0 - short polling).
      limit: 1000, // Optional. Limits the number of updates to be retrieved.
      retryTimeout: 5000 // Optional. Reconnecting timeout (in ms).
    },
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://user:password@dbAddress:port/databasename',
    DB_OPTIONS: {
      useMongoClient: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
    },

  }
};

module.exports = options;
