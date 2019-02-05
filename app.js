////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';

require('./config').setup();
require('./models').setup();
require('./info').setup();

const bot = new TeleBot({
  token: BOT_TOKEN,
  polling: BOT_OPTION
});

require('./controllers').setup(bot);
require('./services').setup(bot);
require('./middlewares').setup(bot);

mongoose.connect(DATABASE_URL, DB_OPTIONS).then(() => {
  bot.connect();
}).then(() => {
  bot.on('text', msg => {
    bot.middlewares.authenticate.index(msg, bot)
    .then(()=>{
      return bot.middlewares.keyboardCreator.index(msg, bot);
    })
    .then(() => {
      if (msg.user) {
        bot.controllers.startController.index(msg, bot);
      }
    });
  });

  bot.on('contact', (msg) => {
    TelegramUser.findOne({
      telegramId: msg.from.id
    }).then((user) => {
      if (!user) {
        var newUser = new TelegramUser({
          telegramId: msg.from.id,
          phoneNumber: msg.contact.phone_number,
          name: msg.from.first_name || '',
          lastName: msg.from.last_name || '',
          userName: msg.from.username || '',
          route: '',
          data: ''
        });

        newUser.save().then(() => {
          let markup = bot.keyboard([
            ['Start']
          ], { resize: true });
          let text = "Welcome to "
            + `<b>${info.botName}</b>`
            + ' bot'
            + ". To continue push Start.";
          return bot.sendMessage(msg.from.id, text, { markup, parse: 'html' });
        });
      }
    });
  });
}).catch((err) => {
  console.log(err);
});
