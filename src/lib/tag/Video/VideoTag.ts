class VideoTag extends BaseTag {
  result: string;
  config: VideoConfig;

  constructor(config: VideoConfig) {
    super(config);
    this.config = config;
    this.result = "";
  }

  generate(): string {
    let video_data = this.config.data;
    let video_config = `<video id="${this.tag_id}" ${this.parse(video_data)}></video>`;
    this.result += video_config;
    return this.result;
  }
}
