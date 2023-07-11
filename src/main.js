const mmedia = require("./lib/mmedia");
const fs = require("hexo-fs");
const path = require("path");

const mmedia_config = hexo.config.mmedia;
const loader_path =
  mmedia_config.loader_path || "/assets/mmedia/mmedia-loader.js";
const injector_layout = mmedia_config.injector_layout || ["post"];

// 复制js文件
if (!loader_path.startsWith("http")) {
  hexo.extend.generator.register("mmedia_loader", function (locals) {
    return {
      path: loader_path,
      data: function () {
        return fs.createReadStream(path.resolve(__dirname, "mmedia-loader.js"));
      },
    };
  });
}

// 注入js
injector_layout.forEach((e) => {
  hexo.extend.injector.register(
    "head_end",
    `<script> let HEXO_MMEDIA_DATA = { js: [], css: [], aplayerData: [], metingData: [], artPlayerData: [], dplayerData: []}; </script>`,
    e
  );
  hexo.extend.injector.register(
    "body_end",
    `<script src="${loader_path}"></script>`,
    e
  );
});

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
