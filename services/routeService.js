////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
const Promise = require('bluebird');
const request = require('request');

module.exports = {
  findKeyboard(msg, name) {
    return new Promise(((resolve, reject) => {
      msg.keyBoards.forEach(element => {
        if (element.name === name) {
          return resolve(element.keys);
        }
      });
    }));
  },
  getTeleModels() {
    return new Promise(((resolve, reject) => {
      teleModel.find({
      }).then((res) => {
        return resolve(res);
      }).catch(() => {
        return reject(new Error('didnt find TeleModels!!!'));
      });
    }));
  },

  setRoute(userChatId, routePath, routeData) {
    return new Promise(((resolve, reject) => {
      TelegramUser.update(
        {
          telegramId: userChatId
        },
        {
          $set:
            {
              route: routePath,
              data: routeData
            }
        }).then(() => {
          return resolve();
        }).catch(() => {
          return reject(new Error('UpdateRouteDataError'));
        })
    }));
  },

  checkNextRoute(newRoutPath, bot) {
    return new Promise(((resolve, reject) => {
      let routes = bot.routes;
      Object.keys(routes).forEach((routeKey) => {
        if (routeKey === newRoutPath) {
          return resolve(routes[routeKey].value);
        }
      });
      return reject(new Error('FindingRoutPathError'));
    }));
  },

  findNextRoute(msg) {
    return new Promise(((resolve, reject) => {
      msg.keyBoards.forEach(element => {
        if (element.key === msg.text) {
          return resolve(element.name);
        }
      });
      return resolve('NotDefined');
    }));
  },

  findPreviousRoute(msg) {
    return new Promise(((resolve, reject) => {
      msg.keyBoards.forEach(element => {
        if (element.name === msg.user.route) {
          return resolve(element.prevRoute);
        }
      });
    }));
  },

  findGeneralInfo(msg, text) {
    return new Promise(((resolve, reject) => {
      let key = '';
      msg.generalInfo.forEach(element => {
        
        if (element.name === text) {
          GeneralInfo.find({
            name: element.value
          }).then((res) => {
            return resolve(res);
          }).catch(() => {
            return reject(new Error('didnt find this key!!!'));
          });
        }
      });
    }));
  },

};
