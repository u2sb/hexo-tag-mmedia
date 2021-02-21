class AudioTag extends BaseTag {
  result: string;
  config: AudioConfig;

  constructor(config: AudioConfig) {
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
