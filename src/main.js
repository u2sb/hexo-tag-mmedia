const mmedia = require("./lib/mmedia");

hexo.extend.tag.register(
  "mmedia",
  function (args, contents) {
    return mmedia(hexo, args, contents);
  },
  {
    async: true,
  }
);

hexo.extend.tag.register(
  "mmedias",
  function (args, contents) {
    return mmedia(hexo, args, contents);
  },
  {
    ends: true,
    async: true,
  }
);
