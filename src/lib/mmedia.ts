const utils = require("utility");
const fs = require("hexo-fs");

module.exports = function (hexo: any, args: string[], contents: any) {
  switch (args[0]) {
    case "audio":
      return new Audio0(hexo, args, contents).generate();
    case "video":
      return new Video(hexo, args, contents).generate();
    case "meting":
      return new Meting(hexo, args, contents).generate();
    default:
      break;
  }
};
