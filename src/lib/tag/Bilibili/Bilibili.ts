class Bilibili extends BaseMmedia {
  bilibili_config: BilibiliConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.bilibili_config = new BilibiliConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.bilibili_config.data[a[0]] = a[1];
      }
    });
    return new BilibiliTag(this.hexo, this.bilibili_config).generate();
  }
}
