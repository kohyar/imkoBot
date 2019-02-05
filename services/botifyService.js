////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';

module.exports = {


  keyboard(bot, msg, KeyList, text) {
    let menu = [['\u{2B05}', '\u{1F3DB}']];
    KeyList = menu.concat(KeyList);
    let markup = bot.keyboard(KeyList, { resize: true });
    return bot.sendMessage(msg.from.id, text + info.footer, { markup, parse: 'html' });
  },

  keyboardWhitoutTopMenu(bot, msg, KeyList, text) {
    let markup = bot.keyboard(KeyList, { resize: true });
    return bot.sendMessage(msg.from.id, text, { markup, parse: 'html' });
  },

  generalInfoKeyboard(bot, msg, KeyList, text) {
    let list = [];
    for (let i = 0; i < KeyList.length; i++) {
      list.push(['\u{1F4DC}' + KeyList[i]]);
    }
    let menu = [['\u{2B05}', '\u{1F3DB}']];
    list = menu.concat(list);
    let markup = bot.keyboard(list, { resize: true });
    return bot.sendMessage(msg.from.id, text, { markup, parse: 'html' });

  },

  sendMessage(bot, msg, text) {
    return bot.sendMessage(msg.from.id, text, { parse: 'html' });
  },

  sendFile(bot, msg, fileName, type) {
   
    const fs = require('fs');
    let path = 'files\\forDownload\\' + fileName + '.' + type;
   
    fs.exists('files\\' + fileName + '.' + type, function (exists) {
      if (exists) {
        return bot.sendDocument(msg.from.id, 'files\\a.docx');
      }
      else {
        botifyService.sendMessage(bot, msg, info.fileNotFound);
      }
    });
  },

  sendCover(bot, msg, fileName, notification) {
    const fs = require('fs');
    let path = 'covers\\' + fileName + '.jpg';
    fs.exists('covers\\' + fileName + '.jpg', function (exists) {
      if (exists) {
        bot.sendPhoto(msg.from.id, path).then(() => {
          return botifyService.sendMessage(bot, msg, notification);
        });
      }
      else {
        botifyService.sendMessage(bot, msg, info.fileNotFound);
      }
    });
  },


  sendGeneralInfo(bot, msg, generalInfoCode) {
    let splitedText = msg.text.split(generalInfoCode)[1];
    if (splitedText) {
      routeService.findGeneralInfo(msg, splitedText).then((res) => {
        res = res[0];
        if (res) {
          let imagePath = 'files/generalInfo/' + res.imagePath + '.jpeg';
          let filePath = 'files/generalInfo/' + res.filePath + '.docx';
          fs.exists(imagePath, function (exists) {
            if (exists) {
              bot.sendPhoto(msg.from.id, imagePath, { caption: info.footer }).then(() => {
                fs.exists(filePath, function (docExists) {
                  if (docExists) {
                    mammoth.extractRawText({ path: filePath })
                      .then((result) => {
                        let text = `<b>${splitedText}</b>` + '\n\n' + result.value + info.footer;
                        return botifyService.sendMessage(bot, msg, text, { parse: 'html' });
                      });
                  }
                });
              });
            }
            else {
              fs.exists(filePath, function (docExists) {
                if (docExists) {
                  mammoth.extractRawText({ path: filePath })
                    .then((result) => {
                      let text = `<b>${splitedText}</b>` + '\n\n' + result.value + info.footer;
                      return botifyService.sendMessage(bot, msg, text, { parse: 'html' });
                    });
                }
              });
            }
          });
        }

      });
    }

  },

  download(bot, msg, generalInfoCode) {
    let splitedText = msg.text.split(generalInfoCode)[1];
    if (splitedText) {
      routeService.findGeneralInfo(msg, splitedText).then((res) => {
        res = res[0];
        if (res) {
          let filePath = 'files/forDownload/' + res.filePath;
          fs.exists(filePath, function (docExists) {
            if (docExists) {
              return bot.sendDocument(msg.from.id, filePath).catch((err)=>{
                console.log(err)
              });
            }else{
              return botifyService.sendMessage(bot, msg, info.fileNotFound, { parse: 'html' });
            }
          });
        }else{
          return botifyService.sendMessage(bot, msg, info.fileNotFound, { parse: 'html' });
        }
      });
    }
  }
};
