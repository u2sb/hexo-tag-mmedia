class Xigua extends BaseMmedia {
  xigua_config: XiguaConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.xigua_config = new XiguaConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.xigua_config.data[a[0]] = a[1];
      }
    });
    return new XiguaTag(this.hexo, this.xigua_config, this.contents).generate();
  }
}
