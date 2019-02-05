////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
const Schema = mongoose.Schema;

let teleModel = new Schema({
  key: String,
  name: String,
  route: String,
  prevRoute: String,
  keyBoard: Schema.Types.Mixed,
  type: String
})
mongoose.model('teleModel', teleModel);

let TelegramUser = new Schema({
  telegramId: String,
  phoneNumber: String,
  name: String,
  lastName: String,
  userName: String,
  route: String,
  data: String
})
mongoose.model('TelegramUser', TelegramUser);

let GeneralInfo = new Schema({
  name: String,
  imagePath: String,
  filePath: String,
  content: String,
})
mongoose.model('GeneralInfo', GeneralInfo);

const configs = {
  setup() {
    Object.keys(configs.globals).forEach((propertyName) => {
      if (Object.prototype.hasOwnProperty.call(configs.globals, propertyName)) {
        global[propertyName] = configs.globals[propertyName];
      }
    });
  },


  globals: {
    TelegramUser: mongoose.model('TelegramUser'),
    GeneralInfo: mongoose.model('GeneralInfo'),
    teleModel: mongoose.model('teleModel')
  }
};

module.exports = configs;
