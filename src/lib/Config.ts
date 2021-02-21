const clone = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

let config_default = require("../config/config_default").config_default;

class Config {
  hexo: any;
  root: any;
  constructor(hexo: any) {
    this.hexo = hexo;
    this.root = hexo.config.root ? hexo.config.root : "/";
    if (hexo.config.mmedia) {
      this._parse(clone(hexo.config.mmedia));
    }
  }

  _parse(source: any) {
    config_default = utils.assign(config_default, source);
  }
}
