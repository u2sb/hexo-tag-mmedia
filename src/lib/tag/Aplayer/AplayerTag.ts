class AplayerTag extends BaseTag {
  result: string;
  config: AplayerConfig;

  constructor(config: AplayerConfig) {
    super(config);
    this.config = config;
    this.result = "";
  }

  generate(): string {
    let data = this.config.data;
    let audio_config = `<audio id="${this.tag_id}" ${this.parse(data)}></audio>`;
    this.result += audio_config;
    return this.result;
  }
}
