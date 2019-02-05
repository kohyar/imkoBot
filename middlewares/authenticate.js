////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
module.exports = {
  index(msg, bot) {
    return authService.getUser(msg.from.id).then((userProfile) => {
      msg.user = userProfile;
    }).catch((err) => {
      if (err.message === 'TelegramIdIsNotValid') {
          let replyMarkup = bot.keyboard([
            [bot.button('contact', 'Enter phone number')]
          ], { resize: true });
          bot.sendMessage(msg.from.id, 'You should register before using this Bot \u{2757}\u{2757}\u{2757}', { replyMarkup, parse: 'html' });
      }
    });
  }
};

