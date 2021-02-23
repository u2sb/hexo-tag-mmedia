class DplayerTag extends BaseTag {
  result: string;
  config: DplayerConfig;
  contents: JSON;

  constructor(hexo: any, config: DplayerConfig, contents: JSON) {
    super(hexo, config);
    this.config = config;
    this.result = "";
    this.contents = contents;
  }

  d_parse(options: { [key: string]: any }) {
    let dplayer_options: any = {
      video: {},
    };
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "url":
            dplayer_options.video.url = options[val];
            break;
          case "pic":
            dplayer_options.video.pic = options[val];
            break;
          case "thumbnails":
            dplayer_options.video.thumbnails = options[val];
            break;
          case "type":
            dplayer_options.video.type = options[val];
            break;
          case "autoplay":
            dplayer_options.autoplay = options[val] == "false" ? false : true;
            break;
          case "loop":
            dplayer_options.loop = options[val] == "false" ? false : true;
            break;
          case "logo":
            dplayer_options.logo = options[val];
            break;
          case "volume":
            dplayer_options.volume = Number(options[val]);
            break;
          case "screenshot":
            dplayer_options.listMaxHeight =
              options[val] == "false" ? false : true;
            break;
          case "id":
            dplayer_options.danmaku.id = options[val];
          default:
            break;
        }
      }
    }
    return dplayer_options;
  }

  d_js(options: { [key: string]: any }): string[] {
    let d_js_path: string[] = [];

    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "hls":
            d_js_path.push(options[val] || this.config.hls_js);
            break;
          case "dash":
            d_js_path.push(options[val] || this.config.dash_js);
            break;
          case "shaka_dash":
            d_js_path.push(options[val] || this.config.shaka_dash_js);
            break;
          case "flv":
            d_js_path.push(options[val] || this.config.flv_js);
            break;
          case "webtorrent":
            d_js_path.push(options[val] || this.config.webtorrent_js);
            break;
          default:
            break;
        }
      }
    }
    return d_js_path;
  }

  generate(): string {
    this.result += `<script src="${this.config.dplayer_js}"></script>`;

    let data = this.config.data;
    let dplayer_options = utils.assign(this.d_parse(data), this.contents);
    this.d_js(data).forEach((item) => {
      if (item && item != "" && item != null) {
        this.result += `<script src="${item}"></script>`;
      }
    });

    this.result += `<div id="${this.tag_id}"></div>`;

    let dplayer_script = `var ${
      this.mmedia_id
    }_options = JSON5.parse('${JSON5.stringify(dplayer_options).replace(
      /"([^"]*)"/g,
      '\\"$1\\"'
    )}'); ${this.mmedia_id}_options.container = document.getElementById("${
      this.tag_id
    }"); `;
    dplayer_script += `const dp_${this.mmedia_id} = new DPlayer(${this.mmedia_id}_options);`;
    this.result += `<script> ${dplayer_script} </script>`;
    return this.result;
  }
}
