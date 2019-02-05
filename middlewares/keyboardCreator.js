////////////////////////////////////////////////
///////// Author: Iman Kohyarnejadfard /////////
////////////////////////////////////////////////
'use strict';
module.exports = {
  index(msg, bot) {
    return routeService.getTeleModels().then((res) => {
      var keyBoards = []
      var keywords=[];
      res.forEach(element => {
        let mykeyboard = {};
        mykeyboard.name = element.route;
        mykeyboard.prevRoute= element.prevRoute;
        mykeyboard.key=element.key;
        mykeyboard.keys = [];
        element.keyBoard.forEach((item) => {
          if (item.type === 'information') {
            mykeyboard.keys.push([info.generalInfoCode + item.name]);
            keywords.push({name:item.name,value:item.keyword});
          }
          else if (item.type === 'download') {
            mykeyboard.keys.push([info.downloadCode + item.name]);
            keywords.push({name:item.name,value:item.keyword});
          }
          else {
            mykeyboard.keys.push([item.name]);
          }

        });
        keyBoards.push(mykeyboard);
      });
      msg.generalInfo=keywords;
      msg.keyBoards = keyBoards;
    }).catch((err) => {
    });
  }
};