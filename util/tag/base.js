const generateRandomString = require("../util").generateRandomString;

const Config = require("../config"),
  throwError = require("../util").throwError;

class BaseTag {
  constructor(hexo, args) {
    this.hexo = hexo;
    this.config = new Config(hexo);
    this.tagId = `mmedia-${generateRandomString(8)}`;
  }

  parse() {
    throwError("Unimplemented method: parse");
  }

  generate() {
    throwError("Unimplemented method: generate");
  }
}

module.exports = BaseTag;
