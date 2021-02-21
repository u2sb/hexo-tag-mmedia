class Aplayer extends BaseMmedia {
  aplayer_config: AplayerConfig;

  constructor(hexo: any, args: string[], contents: any) {
    super(hexo, args, contents);
    this.aplayer_config = new AplayerConfig();
  }

  generate(): string {
    this.args.forEach((val) => {
      let a = this.extractOption(val);
      if (a) {
        this.aplayer_config.data[a[0]] = a[1];
      }
    });
    return new AplayerTag(this.aplayer_config).generate();
  }
}
