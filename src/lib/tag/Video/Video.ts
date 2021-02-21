class Video extends BaseMmedia {
  video_config: VideoConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.video_config = new VideoConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.video_config.data[a[0]] = a[1];
      }
    });
    return new VideoTag(this.video_config).generate();
  }
}
