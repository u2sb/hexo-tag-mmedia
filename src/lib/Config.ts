const clone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

let config_default = require("../config/config_default").config_default;
const path = require("path");
const fs = require("hexo-fs");

class Config {
  hexo: any;
  root: string;
  public_dir: string;

  constructor(hexo: any) {
    this.hexo = hexo;
    this.root = hexo.config.root ? hexo.config.root : "/";
    this.public_dir = hexo.config.public_dir
      ? hexo.config.public_dir
      : "public";
    if (hexo.config.mmedia) {
      this._parse(clone(hexo.config.mmedia));
    }
    this.copyFile();
  }

  copyFile() {
    //拷贝文件
    let js_dir = path.join(
      this.public_dir,
      this.root,
      config_default.assets.js
    );
    let css_dir = path.join(
      this.public_dir,
      this.root,
      config_default.assets.css
    );

    let access_files = [
      [
        path.join(path.dirname(require.resolve("dplayer")), "DPlayer.min.js"),
        path.join(js_dir, "DPlayer.min.js"),
      ],
      [
        path.join(path.dirname(require.resolve("aplayer")), "APlayer.min.js"),
        path.join(js_dir, "APlayer.min.js"),
      ],
      [
        path.join(path.dirname(require.resolve("aplayer")), "APlayer.min.css"),
        path.join(css_dir, "APlayer.min.css"),
      ],
      [
        path.join(__dirname, "../../node_modules/meting/dist", "Meting.min.js"),
        path.join(js_dir, "Meting.min.js"),
      ],
    ];

    access_files.forEach((item) => {
      fs.copyFile(item[0], item[1]);
    });
  }

  _parse(source: any) {
    config_default = utils.assign(config_default, source);

    config_default.meting.js = config_default.meting.js ?? config_default.assets.js + "Meting.min.js",
    config_default.aplayer.js = config_default.aplayer.js ?? config_default.assets.js + "APlayer.min.js",
    config_default.aplayer.css = config_default.aplayer.css ?? config_default.assets.css + "APlayer.min.css",    
    config_default.dplayer.js = config_default.dplayer.js ?? config_default.assets.js + "DPlayer.min.js"
  }
}
