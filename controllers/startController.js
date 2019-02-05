////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
module.exports = {

  index(msg, bot) {
    if (msg.text === '/start' || msg.text === 'Start' || msg.text === '\u{1F3DB}') {
      routeService.setRoute(msg.from.id, 'start', '').then(() => {
        routeService.findKeyboard(msg, 'start').then((keyboard) => {
          botifyService.keyboardWhitoutTopMenu(bot, msg, keyboard, info.clickNext);
        });
      });
    }
    else if (msg.text === '\u{2B05}') {
      routeService.findPreviousRoute(msg).then((res) => {
        msg.user.route = res;
        routeService.setRoute(msg.from.id, res, '').then(() => {
          if (res === 'start') {
            routeService.findKeyboard(msg, 'start').then((keyboard) => {
              botifyService.keyboardWhitoutTopMenu(bot, msg, keyboard, info.clickNext);
            });
          }
          else {
            routeService.findKeyboard(msg, res).then((keyboard) => {
              botifyService.keyboard(bot, msg, keyboard, info.clickNext);
            });
          }
        });
      });
    }
    else {
      if (msg.text.startsWith(info.generalInfoCode)) {
        botifyService.sendGeneralInfo(bot, msg, info.generalInfoCode)
      }
      else if (msg.text.startsWith(info.downloadCode)) {
        botifyService.download(bot, msg, info.downloadCode)
      }
      else {
        routeService.findNextRoute(msg)
          .then((nextRoute) => {
            if(nextRoute==='underConstruct'){
              botifyService.keyboard(bot, msg, [], info.underConstruction);
            }
            else if(nextRoute==='NotDefined'){
              botifyService.sendMessage(bot, msg, info.errorCommand);
            }else{
              routeService.findKeyboard(msg, nextRoute).then((keyboard) => {
                botifyService.keyboard(bot, msg, keyboard, info.clickNext);
              })
                .then(() => {
                  routeService.setRoute(msg.from.id, nextRoute, '')
                });
            }
          })
      }
    }
  }
};
