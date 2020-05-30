const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  extractOptionKey = require("../util").extractOptionKey,
  throwError = require("../util").throwError,
  DPLAYER_TAG_OPTION = Constant.DPLAYER_TAG_OPTION;

class DplayerTag extends BaseTag {
  constructor(hexo, args) {
    super(hexo, args);
    this.dplayerConfig = this.config.get("dplayer");
    this.settings = this.parse(args);
  }

  parse(options) {
    let settings = Object.assign(
      {},
      DPLAYER_TAG_OPTION,
      this.dplayerConfig.default
    );
    options.forEach((option, index) => {
      switch (true) {
        case option.startsWith("url:"):
          settings.url = extractOptionValue(option);
          break;
        case option.startsWith("pic:"):
          settings.pic = extractOptionValue(option);
          break;
        case option.startsWith("thumbnails:"):
          settings.thumbnails = extractOptionValue(option);
          break;
        case option.startsWith("type:"):
          settings.type = extractOptionValue(option);
          break;

        case option.startsWith("id:"):
          settings.id = extractOptionValue(option);
          break;
        case option.startsWith("api:"):
          settings.api = extractOptionValue(option);
          break;
        case option.startsWith("token:"):
          settings.token = extractOptionValue(option);
          break;
        case option.startsWith("maximum:"):
          settings.maximum = extractOptionValue(option);
          break;
        case option.startsWith("user:"):
          settings.user = extractOptionValue(option);
          break;
        case option.startsWith("bottom:"):
          settings.bottom = extractOptionValue(option);
          break;
        case option.startsWith("unlimited"):
          settings.unlimited = extractOptionValue(option) === "true";
          break;
        case option.startsWith("addition:"):
          settings.addition.push(extractOptionValue(option));
          break;

        case option.startsWith("suburl:"):
          settings.suburl = extractOptionValue(option);
          break;
        case option.startsWith("subtype:"):
          settings.subtype = extractOptionValue(option);
          break;
        case option.startsWith("subbottom:"):
          settings.subbottom = extractOptionValue(option);
          break;
        case option.startsWith("subfontSize:"):
          settings.subfontSize = extractOptionValue(option);
          break;
        case option.startsWith("subcolor:"):
          settings.subcolor = extractOptionValue(option);
          break;

        case option === "autoplay":
          settings.autoplay = true;
          break;
        case option === "loop":
          settings.loop = true;
          break;
        case option === "screenshot":
          settings.screenshot = true;
          break;
        case option.startsWith("hotkey"):
          settings.hotkey = extractOptionValue(option) === "true";
          break;
        case option.startsWith("mutex"):
          settings.mutex = extractOptionValue(option) === "true";
          break;
        case option.startsWith("theme:"):
          settings.theme = extractOptionValue(option);
          break;
        case option.startsWith("lang:"):
          settings.lang = extractOptionValue(option);
          break;
        case option.startsWith("preload:"):
          settings.preload = extractOptionValue(option);
          break;
        case option.startsWith("logo:"):
          settings.logo = extractOptionValue(option);
          break;
        case option.startsWith("volume:"):
          settings.volume = extractOptionValue(option);
          break;
        case option.startsWith("contextmenu:"):
          settings.contextmenu.push(extractOptionValue(option));
          break;
        case option.startsWith("highlight:"):
          settings.highlight.push(extractOptionValue(option));
          break;

        case option.startsWith("code:"):
          settings.code = extractOptionValue(option);
          break;

        default:
          settings.otherSettings[extractOptionKey(option)] = extractOptionValue(
            option
          );
      }
    });
    return settings;
  }

  generate() {
    let {
      url,
      pic,
      thumbnails,
      type,
      id,
      api,
      addition,
      token,
      maximum,
      user,
      bottom,
      unlimited,
      suburl,
      subtype,
      subbottom,
      subcolor,
      subfontSize,
      autoplay,
      loop,
      screenshot,
      theme,
      lang,
      hotkey,
      preload,
      logo,
      volume,
      mutex,
      contextmenu,
      highlight,
      code,
      otherSettings,
    } = this.settings;

    let otherOption;
    for (let key in otherSettings) {
      if (otherSettings.hasOwnProperty(key)) {
        otherSettings += `${key}: ${otherSettings[key]},`;
      }
    }

    let video,
      dankamu,
      subtitle = "";

    let tag = "";
    tag += `<div id="${this.tagId}"></div>`;
    tag += `<script src="${this.dplayerConfig.cdn}"></script>`;
    switch (type) {
      case "hls":
        tag += `<script src="${this.dplayerConfig.hls_cdn}"></script>`;
        break;
      case "dash":
        tag += `<script src="${this.dplayerConfig.dash_cdn}"></script>`;
        break;

      case "shakaDash":
        tag += `<script src="${this.dplayerConfig.shaka_dash_cdn}"></script>`;
        break;

      case "flv":
        tag += `<script src="${this.dplayerConfig.flv_cdn}"></script>`;
        break;

      case "webtorrent":
        tag += `<script src="${this.dplayerConfig.webtorrent_cdn}"></script>`;
        break;
    }

    video = `video: { url: '${url}', pic: '${pic}', thumbnails: '${thumbnails}', type: '${type}'},`;
    subtitle =
      suburl == null || suburl == ""
        ? ""
        : `subtitle: { url: '${suburl}', type: '${subtype}', fontSize: '${subfontSize}', bottom: '${subbottom}', color: '${subcolor}'},`;
    dankamu =
      id == null || id == ""
        ? ""
        : `danmaku: {id: '${id}', api: '${api}', token: '${token}', maximum: '${maximum}', addition: ${JSON.stringify(
            addition
          )}, user: '${user}', bottom: '${bottom}', unlimited: '${unlimited}'},`;
    tag += `
        <script>
        const dp = new DPlayer({
            container: document.getElementById('${this.tagId}'),
            autoplay: ${autoplay},
            theme: '${theme}',
            loop: ${loop},
            lang: ${
              lang == null || lang == "" ? "navigator.language" : `'${lang}'`
            },
            screenshot: ${screenshot},
            hotkey: ${hotkey},
            preload: '${preload}',
            logo: '${logo}',
            volume: ${volume},
            mutex: ${mutex},
            ${video}
            ${subtitle}
            ${dankamu}
            contextmenu: ${
              contextmenu.length > 0
                ? JSON.stringify(contextmenu)
                : "[{text: 'hexo-tag-mmedia', link: 'https://github.com/MonoLogueChi/hexo-tag-mmedia'}]"
            },
            highlight: ${
              highlight.length > 0 ? JSON.stringify(highlight) : "[]"
            },
            ${otherOption}
        });
        ${code}
        </script>
        `;

    return tag;
  }
}

module.exports = DplayerTag;
