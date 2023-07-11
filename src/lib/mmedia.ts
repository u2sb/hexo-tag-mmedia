const utils = require("utility");

module.exports = function (hexo: any, args: string[], contents: any) {
  switch (args[0]) {
    case "audio":
      return new Audio0(hexo, args, contents).generate();
    case "video":
      return new Video(hexo, args, contents).generate();
    case "meting":
      return new Meting(hexo, args, contents).generate();
    case "aplayer":
      return new Aplayer(hexo, args, contents).generate();
    case "dplayer":
      return new Dplayer(hexo, args, contents).generate();
    case "bilibili":
      return new Bilibili(hexo, args, contents).generate();
    case "xigua":
      return new Xigua(hexo, args, contents).generate();
    case "artplayer":
      return new ArtPlayer(hexo, args, contents).generate();
    default:
      break;
  }
};
