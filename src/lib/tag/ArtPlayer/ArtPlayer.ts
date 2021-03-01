class ArtPlayer extends BaseMmedia {
  artplayer_config: ArtPlayerConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.artplayer_config = new ArtPlayerConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.artplayer_config.data[a[0]] = a[1];
      }
    });

    return new ArtPlayerTag(
      this.hexo,
      this.artplayer_config,
      this.contents
    ).generate();
  }
}
