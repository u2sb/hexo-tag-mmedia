const BaseTag = require('./base'),
    Constant = require('../constant'),
    extractOptionValue = require('../util').extractOptionValue,
    throwError = require('../util').throwError,
    DPLAYER_TAG_OPTION = Constant.DPLAYER_TAG_OPTION

class DplayerTag extends BaseTag {
    constructor(hexo, args) {
        super(hexo, args);
        this.settings = this.parse(args);
        this.dplayerConfig = this.config.get('dplayer');
    }



    

}

module.exports = DplayerTag;
