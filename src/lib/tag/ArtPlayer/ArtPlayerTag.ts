class ArtPlayerTag extends BaseTag {
  result: string;
  config: ArtPlayerConfig;

  constructor(hexo: any, config: ArtPlayerConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
    this.result = "";
  }

  art_parse(options: { [key: string]: any }) {
    let artplayer_options: any = {};
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "url":
            artplayer_options.url = options[val];
            break;
          case "title":
            artplayer_options.title = options[val];
            break;
          case "poster":
            artplayer_options.poster = options[val];
            break;
          case "autoplay":
            artplayer_options.autoplay = options[val] == "false" ? false : true;
            break;
          case "loop":
            artplayer_options.loop = options[val] == "false" ? false : true;
            break;
          case "volume":
            artplayer_options.volume = Number(options[val]);
            break;
          case "style":
            artplayer_options.style = options[val];
            break;
          default:
            break;
        }
      }
    }
    return artplayer_options;
  }

  art_js(options: { [key: string]: any }): string[] {
    let art_js_path: string[] = [];

    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "hls":
            art_js_path.push(options[val] || this.config.hls_js);
            break;
          case "dash":
            art_js_path.push(options[val] || this.config.dash_js);
            break;
          case "shaka_dash":
            art_js_path.push(options[val] || this.config.shaka_dash_js);
            break;
          case "flv":
            art_js_path.push(options[val] || this.config.flv_js);
            break;
          case "webtorrent":
            art_js_path.push(options[val] || this.config.webtorrent_js);
            break;
          default:
            break;
        }
      }
    }
    return art_js_path;
  }

  generate(): string {
    this.result += `<script src="${this.config.artplayer_js}"></script>`;

    let data = this.config.data;
    let artplayer_options = utils.assign(this.art_parse(data), this.contents);
    this.art_js(data).forEach((item) => {
      if (item && item != "" && item != null) {
        this.result += `<script src="${item}"></script>`;
      }
    });

    this.result += `<div id="${this.tag_id}" style="${artplayer_options.style}"></div>`;

    let artplayer_script = `var ${
      this.mmedia_id
    }_options = JSON.parse('${JSON.stringify(artplayer_options).replace(
      /"([^"]*)"/g,
      '\\"$1\\"'
    )}'); ${this.mmedia_id}_options.container = "#${this.tag_id}"; `;
    artplayer_script += `const art_${this.mmedia_id} = new Artplayer(${this.mmedia_id}_options);`;
    this.result += `<script> ${artplayer_script} </script>`;
    return this.result;
  }
}
