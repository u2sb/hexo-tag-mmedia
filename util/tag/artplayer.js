const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  throwError = require("../util").throwError,
  ARTPLATER_TAG_OPTION = Constant.ARTPLATER_TAG_OPTION;

class ArtPlayerTag extends BaseTag {
  constructor(hexo, args) {
    super(hexo, args);
    this.artplayerConfig = this.config.get("artplayer");
    this.settings = this.parse(args);
  }

  parse(options) {
    let settings = Object.assign(
      {},
      ARTPLATER_TAG_OPTION,
      this.artplayerConfig.default
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
        case option === "unlimited":
          settings.unlimited = true;
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
        case option === "hotkey":
          settings.hotkey = true;
          break;
        case option === "mutex":
          settings.mutex = true;
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
          throwError(`Unrecognized tag argument(${index + 1}): ${value}`);
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
    } = this.settings;

    let customType,
      dankamu,
      subtitle = "";

    let tag = "";
    tag += `<link rel="stylesheet" href="${this.artplayerConfig.style_cdn}">`;
    tag += `<div id="artplayer-app"></div>`;
    tag += `<script src="${this.artplayerConfig.cdn}"></script>`;
    switch (type) {
      case "hls":
        tag += `<script src="${this.dplayerConfig.hls_cdn}"></script>`;
        customType = `customType: {
          m3u8: function(video, url) {
            var hls = new Hls(); hls.loadSource(url);
            hls.attachMedia(video); 
          }}`;
        break;
      case "dash":
        tag += `<script src="${this.dplayerConfig.dash_cdn}"></script>`;
        customType = `customType: {
          mpd: function(video, url) {
            var player = dashjs.MediaPlayer().create();
            player.initialize(video, url, true);
          }}`;
        break;
      case "shakaDash":
        tag += `<script src="${this.dplayerConfig.shaka_dash_cdn}"></script>`;
        customType = `customType: {
          mpd: function(video, url) {
            shaka.polyfill.installAll();
            var player = new shaka.Player(video);
            player.load(url);
          }},`;
        break;
      case "flv":
        tag += `<script src="${this.dplayerConfig.flv_cdn}"></script>`;
        customType = `customType: {
          flv: function(video, url) {
            const flvPlayer = flvjs.createPlayer({
              type: 'flv',
                url: url,
              });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          }}`;
        break;
      case "webtorrent":
        tag += `<script src="${this.dplayerConfig.webtorrent_cdn}"></script>`;
        customType = `customType: {
          torrent: function(video, url, art) {
            var client = new WebTorrent();
            art.loading.show = true;
            client.add(url, function(torrent) {
              var file = torrent.files[0];
              file.renderTo(video, {
                autoplay: true,
              });
            });
          }}`;
        break;
    }

    subtitle =
      suburl == null || suburl == ""
        ? ""
        : `subtitle: { url: '${suburl}', type: '${subtype}', fontSize: '${subfontSize}', bottom: '${subbottom}', color: '${subcolor}'},`;
    dankamu =
      id == null || id == ""
        ? "{}"
        : `danmaku: {id: '${id}', api: '${api}', token: '${token}', maximum: '${maximum}', addition: ${JSON.stringify(
            addition
          )}, user: '${user}', bottom: '${bottom}', unlimited: '${unlimited}'},`;
    tag += `
        <script>
        var art = new Artplayer({
            container: '#artplayer-app',
            url: ${url},
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
            ${customType}
            ${subtitle}
            ${dankamu}
            contextmenu: ${
              contextmenu.length > 0
                ? JSON.stringify(contextmenu)
                : "[{text: 'hexo-tag-mmedia', link: 'https://github.com/MonoLogueChi/hexo-tag-mmedia'}]"
            },
            highlight: ${
              highlight.length > 0 ? JSON.stringify(highlight) : "[]"
            }
        });
        ${code}
        </script>
        `;

    return tag;
  }
}

module.exports = ArtPlayerTag;
