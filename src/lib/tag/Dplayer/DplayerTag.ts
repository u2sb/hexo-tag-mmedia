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

  a_parse(options: { [key: string]: any }) {
    let dplayer_options: any = {};
    let video: { [key: string]: any } = {};
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "url":
            video.url = options[val];
            break;
          case "pic":
            video.pic = options[val];
            break;
          case "thumbnails":
            video.thumbnails = options[val];
            break;
          case "type":
            video.type = options[val];
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
          default:
            break;
        }
      }
    }
    dplayer_options.audio = [video];
    return dplayer_options;
  }

  generate(): string {
    this.result += `<script src="${this.config.dplayer_js}"></script>`;
    this.result += `<div id="${this.tag_id}"></div>`;
    let data = this.config.data;
    let aplayer_options = utils.assign(this.a_parse(data), this.contents);

    let aplayer_script = `var ${
      this.mmedia_id
    }_options = JSON.parse('${JSON.stringify(aplayer_options).replace(
      /"([^"]*)"/g,
      '\\"$1\\"'
    )}'); ${this.mmedia_id}_options.container = document.getElementById("${
      this.tag_id
    }"); `;
    aplayer_script += `const ap = new APlayer(${this.mmedia_id}_options);`;
    this.result += `<script> ${aplayer_script} </script>`;
    return this.result;
  }
}
