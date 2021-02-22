class Dplayer extends BaseMmedia {
  dplayer_config: DplayerConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.dplayer_config = new DplayerConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.dplayer_config.data[a[0]] = a[1];
      }
    });

    return new DplayerTag(
      this.hexo,
      this.dplayer_config,
      this.contents
    ).generate();
  }
}
