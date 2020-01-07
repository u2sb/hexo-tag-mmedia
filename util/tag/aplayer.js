const BaseTag = require('./base'),
    Constant = require('../constant'),
    extractOptionValue = require('../util').extractOptionValue,
    throwError = require('../util').throwError,
    APLAYER_TAG_OPTION = Constant.APLAYER_TAG_OPTION

class AplayerTag extends BaseTag {
    constructor(hexo, args) {
        super(hexo, args);
        this.settings = this.parse(args);
        this.aplayerConfig = this.config.get('aplayer');
    }

    parse(options) {
        let settings = Object.assign({}, APLAYER_TAG_OPTION);
        ([settings.title, settings.author, settings.url] = options)
        const optionalArgs = options.slice(3);
        optionalArgs.forEach((option, index) => {
            switch(true) {
                case option === 'narrow':
                    settings.narrow = true;
                    break;
                case option === 'autoplay':
                    settings.autoplay = true;
                    break;
                case option.startsWith('lrc:'):
                    settings.lrcOption = 3;
                    settings.lrcPath = extractOptionValue(option);
                    break;
                case option.startsWith('width'):
                    settings.width = extractOptionValue(option) + ';';
                    break;
                case index === 0:
                    settings.pic = option;
                    break;
                default:
                    throwError(`Unrecognized tag argument(${index+1}): ${value}`);
            }
        });
        settings.width =  settings.narrow ? '' : settings.width;
        return settings;
    }

    generate() {
        let {title, author, url, narrow, pic,
            autoplay, lrcOption, lrcPath, width} = this.settings;
        return `
            <link rel="stylesheet" href="${this.aplayerConfig.style_cdn}">
            <script src="${this.aplayerConfig.cdn}"></script>
            <div id="aplayer" style="margin-bottom: 20px;${width}"></div>
        <script>
          var ap = new APlayer({
            element: document.getElementById("aplayer"),
            narrow: ${narrow},
            autoplay: ${autoplay},
            showlrc: ${lrcOption},
            music: {
              title: "${title}",
              author: "${author}",
              url: "${url}",
              pic: "${pic}",
              lrc: "${lrcPath}"
            }
          });
          window.aplayers || (window.aplayers = []);
          window.aplayers.push(ap);
        </script>`;
    }

}

module.exports = AplayerTag;
