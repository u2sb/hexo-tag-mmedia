class Meting extends BaseMmedia {
  meting_config: MetingConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.meting_config = new MetingConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.meting_config.data[a[0]] = a[1];
      }
    });
    return new MetingTag(this.hexo, this.meting_config).generate();
  }
}
