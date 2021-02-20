const mmedia = require("./lib/mmedia");

hexo.extend.tag.register("mmedia", function (args, contents) {
  return mmedia(hexo, args, contents);
});
