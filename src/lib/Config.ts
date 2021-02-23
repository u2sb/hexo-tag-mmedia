const merge = require("deepmerge");
const config_default_source = require("../config/config_default")
  .config_default;
let config_default = require("../config/config_default").config_default;

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
      this._parse(this.clone(hexo.config.mmedia));
    }
  }

  clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

  _parse(source: any) {
    config_default = merge(config_default_source, source);
  }
}
