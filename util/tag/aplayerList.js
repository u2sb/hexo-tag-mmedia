const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  throwError = require("../util").throwError,
  APLAYER_TAG_OPTION = Constant.APLAYER_TAG_OPTION;

class AplayerListTag extends BaseTag {
  constructor(hexo, args) {
    super(hexo, args);
    this.aplayerConfig = this.config.get("aplayer");
    this.settings = this.parse(args);
  }

  parse(options) {
    let settings = Object.assign(
      {
        narrow: false,
        autoplay: false,
        showlrc: 0,
      },
      this.aplayerConfig.default,
      JSON.parse(options)
    );
    settings.music.forEach((info) => {
      info.url = info.url;
      info.pic = info.pic ? info.pic : "";
    });
    return settings;
  }

  generate() {
    const settings = JSON.stringify(this.settings);
    return `
            <link rel="stylesheet" href="${this.aplayerConfig.style_cdn}">
            <script src="${this.aplayerConfig.cdn}"></script>
            <div id="${this.tagId}" style="margin-bottom: 20px; width: ${width}"></div>
        <script>
        let options = ${settings};
        options.element = document.getElementById("${this.tagId}");
        let ap = new APlayer(options);
        window.aplayers || (window.aplayers = []);
        window.aplayers.push(ap);
        </script>`;
  }
}

module.exports = AplayerListTag;
