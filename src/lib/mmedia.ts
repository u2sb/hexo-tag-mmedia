const utils = require("utility");

module.exports = function (hexo: any, args: string[], contents: any) {
  switch (args[0]) {
    case "meting":
      return new Meting(hexo, args, contents).generate();
    default:
      break;
  }
};
