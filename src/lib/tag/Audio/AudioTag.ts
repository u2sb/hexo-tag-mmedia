class AudioTag extends BaseTag {
  result: string;
  config: AudioConfig;

  constructor(hexo: any, config: AudioConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
    this.result = "";
  }

  generate(): string {
    let data = merge(this.config.data, this.contents);;
    let audio_config = `<audio id="${this.tag_id}" ${this.parse(data)}></audio>`;
    this.result += audio_config;
    return this.result;
  }
}
