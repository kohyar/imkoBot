////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
const Promise = require('bluebird');
const request = require('request');

module.exports = {
  getUser(userChatId) {
    return new Promise(((resolve, reject) => {
      TelegramUser.findOne({
        telegramId: userChatId
      }).then((res) => {
        if (res) {
          return resolve(res);
        } else {
          return reject(new Error('TelegramIdIsNotValid'));
        }
      })
    }));
  }
};
