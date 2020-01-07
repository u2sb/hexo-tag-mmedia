const clone = require('./util').clone;

class Config {
  constructor(hexo) {
    this.root = hexo.config.root ? hexo.config.root : '/'
    this.config = {
      meting: {
        cdn: "https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js",
        api: null,
        default: {}
      },
      aplayer: {
        cdn: "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js",
        style_cdn: "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css",
        default: {}
      },
      dplayer: {
        cdn: "https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.js",
        style_cdn: "https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.css",
        default: {}
      },
      biliBili: {

      }
    }
    if (hexo.config.mmedia) {
      this._parse(clone(hexo.config.mmedia));
    }
  }

  _parse(source) {
    if (source.aplayer) {
      this.set('aplayer', source.aplayer);
    }
    if (source.meting) {
      this.set('meting', source.meting);
    }
    if (source.dplayer) {
      this.set('dplayer', source.dplayer);
    }
    if (source.bilibili) {
      this.set('bilibili', source.bilibili);
    }
  }

  get(name) {
    return this.config[name];
  }

  set(name, value) {
    this.config[name] = value;
  }
}

module.exports = Config;
