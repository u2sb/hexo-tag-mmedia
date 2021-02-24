class VideoTag extends BaseTag {
  result: string;
  config: VideoConfig;

  constructor(hexo: any, config: VideoConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
    this.result = "";
  }

  generate(): string {
    let video_data = merge(this.config.data, this.contents);
    let video_config = `<video id="${this.tag_id}" ${this.parse(
      video_data
    )}></video>`;
    this.result += video_config;
    return this.result;
  }
}
