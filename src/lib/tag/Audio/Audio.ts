class Audio0 extends BaseMmedia {
  audio_config: AudioConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.audio_config = new AudioConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.audio_config.data[a[0]] = a[1];
      }
    });
    return new AudioTag(this.hexo, this.audio_config, this.contents).generate();
  }
}
