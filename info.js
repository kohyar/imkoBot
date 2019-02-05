////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';

const info = {
  setup() {
    Object.keys(info.globals).forEach((name) => {
      if (Object.prototype.hasOwnProperty.call(info.globals, name)) {
        global[name] = info.globals[name];
      }
    });
  },

  globals: {
    info: {
      botName: 'imko',
      footer: '\n\n' + '@imko_telebot',
      generalInfoCode: '\u{1F4DC}',
      downloadCode: '\u{1F4E5}',
      clickNext: 'Please select one of these options:',
      errorCommand: 'Command Not Found',
      fileNotFound: 'Sorry, this file is not available!!!',
      underConstruction: 'This part of bot is under construction.' + '   ' + '\u{1F6A7}\u{1F6A7}\u{1F6A7}',
    }
  }
};
//1F4CE atach   ok
//1F4DC text ok for general info
//1F5BC frame ok
//1F4CB text
//2139 info
//1F393 uni
//1F4E5 download
//1F6A7 construction


module.exports = info;
