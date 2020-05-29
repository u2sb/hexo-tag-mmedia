const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  extractOptionKey = require("../util").extractOptionKey,
  throwError = require("../util").throwError,
  APLAYER_TAG_OPTION = Constant.APLAYER_TAG_OPTION;

class AplayerLyricTag extends BaseTag {
  constructor(hexo, args, lyrics) {
    super(hexo, args);
    this.aplayerConfig = this.config.get("aplayer");
    this.lyrics = lyrics;
    this.settings = this.parse(args);
  }

  parse(options) {
    let settings = Object.assign(
      {},
      APLAYER_TAG_OPTION,
      this.aplayerConfig.default
    );
    [settings.title, settings.author, settings.url] = options;
    const optionalArgs = options.slice(3);
    optionalArgs.forEach((option, index) => {
      switch (true) {
        case option === "narrow":
          settings.narrow = true;
          break;
        case option === "autoplay":
          settings.autoplay = true;
          break;
        case option.startsWith("width"):
          settings.width = extractOptionValue(option) + ";";
          break;
        case index === 0:
          settings.pic = option;
          break;
        default:
          settings.otherSettings[extractOptionKey(option)] = extractOptionValue(
            option
          );
      }
    });
    settings.width = settings.narrow ? "" : settings.width;
    return settings;
  }

  generate() {
    let {
      title,
      author,
      url,
      narrow,
      pic,
      autoplay,
      lrcOption,
      width,
      otherSettings,
    } = this.settings;

    let otherOption;
    for (let key in otherSettings) {
      if (otherSettings.hasOwnProperty(key)) {
        otherSettings += `${key}: ${otherSettings[key]}`;
      }
    }
    return `
                <link rel="stylesheet" href="${this.aplayerConfig.style_cdn}">
                <script src="${this.aplayerConfig.cdn}"></script>
                <div id="${this.tagId}" style="margin-bottom: 20px; width: ${width}">
                    <pre class="aplayer-lrc-content">${this.lyrics}</pre>
                </div>
            <script>
              let ap = new APlayer({
                element: document.getElementById("${this.tagId}"),
                narrow: ${narrow},
                autoplay: ${autoplay},
                showlrc: ${lrcOption},
                music: {
                  title: "${title}",
                  author: "${author}",
                  url: "${url}",
                  pic: "${pic}"
                },
                ${otherOption}
              });
              window.aplayers || (window.aplayers = []);
              window.aplayers.push(ap);
            </script>`;
  }
}

module.exports = AplayerLyricTag;
