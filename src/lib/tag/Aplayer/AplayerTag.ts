class AplayerTag extends BaseTag {
  result: string;
  config: AplayerConfig;

  constructor(hexo: any, config: AplayerConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
    this.result = "";
    this.contents = contents;
  }

  a_parse(options: { [key: string]: any }) {
    let aplayer_options: any = {};
    let audio: { [key: string]: any } = {};
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "name":
            audio.name = options[val];
            break;
          case "artist":
            audio.artist = options[val];
            break;
          case "url":
            audio.url = options[val];
            break;
          case "cover":
            audio.cover = options[val];
            break;
          case "lrc":
            audio.lrc = options[val];
            break;
          case "theme":
            audio.theme = options[val];
            break;
          case "type":
            audio.type = options[val];
            break;
          case "autoplay":
            aplayer_options.autoplay = options[val] == "false" ? false : true;
            break;
          case "loop":
            aplayer_options.loop = options[val];
            break;
          case "order":
            aplayer_options.order = options[val];
            break;
          case "volume":
            aplayer_options.volume = Number(options[val]);
            break;
          case "tlistMaxHeight":
            aplayer_options.listMaxHeight = Number(options[val]);
            break;
          default:
            break;
        }
      }
    }
    aplayer_options.audio = [audio];
    return aplayer_options;
  }

  generate(): string {
    this.result += `<link rel="stylesheet" href="${this.config.aplayer_css}">`;
    this.result += `<script src="${this.config.aplayer_js}"></script>`;
    this.result += `<div id="${this.tag_id}"></div>`;
    let data = this.config.data;
    let aplayer_options = utils.assign({}, [
      data.contents,
      this.a_parse(data),
      this.contents,
    ]);

    let aplayer_script = `var ${
      this.mmedia_id
    }_options = JSON.parse('${JSON.stringify(aplayer_options).replace(
      /"([^"]*)"/g,
      '\\"$1\\"'
    )}'); ${this.mmedia_id}_options.container = document.getElementById("${
      this.tag_id
    }"); `;
    aplayer_script += `const ap_${this.mmedia_id} = new APlayer(${this.mmedia_id}_options);`;
    this.result += `<script> ${aplayer_script} </script>`;
    return this.result;
  }
}
