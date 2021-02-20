const config_default_source = require("../config/config_default")
  .config_default;
const config_default = require("../config/config_default").config_default;

const clone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

class Config {
  hexo: any;
  root: any;
  config_default: any;
  constructor(hexo: any) {
    this.hexo = hexo;
    this.root = hexo.config.root ? hexo.config.root : "/";
    this.config_default = config_default;
    if (hexo.config.mmedia) {
      this._parse(clone(hexo.config.mmedia));
    }
  }

  _parse(source: any) {
    if (source.aplayer) {
      this.set("aplayer", source.aplayer);
    }
    if (source.meting) {
      this.set("meting", source.meting);
    }
    if (source.dplayer) {
      this.set("dplayer", source.dplayer);
    }
    if (source.bilibili) {
      this.set("bilibili", source.bilibili);
    }
    //覆盖空值
  }

  get(name: string) {
    return this.config_default[name];
  }

  set(name: string, value: any) {
    this.config_default[name] = value;
  }
}
