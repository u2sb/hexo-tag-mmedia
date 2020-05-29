const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  extractOptionKey = require("../util").extractOptionKey,
  throwError = require("../util").throwError,
  METING_TAG_OPTION = Constant.METING_TAG_OPTION,
  METING_TAG_OPTION_AUTO = Constant.METING_TAG_OPTION_AUTO;

class MetingTag extends BaseTag {
  constructor(hexo, args) {
    super(hexo, args);
    this.metingConfig = this.config.get("meting");
    this.aplayerConfig = this.config.get("aplayer");
    this.settings = this.parse(args);
  }

  parse(options) {
    let reg = /^auto:http/;
    if (reg.test(options)) {
      let settings = Object.assign(
        {},
        METING_TAG_OPTION_AUTO,
        this.metingConfig.default
      );
      [settings.auto] = options;
      settings.auto = extractOptionValue(settings.auto);
      let settings2 = this.optionsSwitch(options, 1);
      settings = Object.assign(settings, settings2);
      return settings;
    } else {
      let settings = Object.assign(
        {},
        METING_TAG_OPTION,
        this.metingConfig.default
      );
      [settings.id, settings.server, settings.type] = options;
      let settings2 = this.optionsSwitch(options, 3);
      settings = Object.assign(settings, settings2);
      return settings;
    }
  }

  optionsSwitch(options, i) {
    let optionalArgs = options.slice(i);
    let settings = {};
    optionalArgs.forEach((option, index) => {
      switch (true) {
        case option === "autoplay":
          settings.autoplay = true;
          break;
        case option === "fixed":
          settings.fixed = true;
          break;
        case option === "mini":
          settings.mini = true;
          break;
        case option.startsWith("loop:"):
          settings.loop = extractOptionValue(option);
          break;
        case option.startsWith("order:"):
          settings.order = extractOptionValue(option);
          break;
        case option.startsWith("volume:"):
          settings.volume = extractOptionValue(option);
          break;
        case option.startsWith("lrctype:"):
          settings.lrctype = extractOptionValue(option);
          break;
        case option === "listfolded":
          settings.listfolded = true;
          break;
        case option.startsWith("storagename:"):
          settings.storagename = extractOptionValue(option);
          break;
        case option.startsWith("mutex:"):
          settings.mutex = extractOptionValue(option) === "true";
          break;
        case option.startsWith("listmaxheight:"):
          settings.listmaxheight = extractOptionValue(option);
          break;
        case option.startsWith("preload:"):
          settings.preload = extractOptionValue(option);
          break;
        case option.startsWith("theme:"):
          settings.theme = extractOptionValue(option);
          break;
        default:
          settings[extractOptionKey(option)] = extractOptionValue(option);
      }
    });
    return settings;
  }

  generate() {
    let settingLiteral = "";
    Object.entries(this.settings).forEach(([key, value]) => {
      settingLiteral += ` ${key}="${value}"`;
    });

    let result =
      this.metingConfig.api != null && this.metingConfig.api.length > 0
        ? `<script>var meting_api='${this.metingConfig.api}?server=:server&type=:type&id=:id&auth=:auth&r=:r';</script>`
        : "";
    result += `
            <link rel="stylesheet" href="${this.aplayerConfig.style_cdn}">
            <script src="${this.aplayerConfig.cdn}"></script>
            <script src="${this.metingConfig.cdn}"></script>
            <meting-js${settingLiteral}></meting-js>`;
    return result;
  }
}

module.exports = MetingTag;
