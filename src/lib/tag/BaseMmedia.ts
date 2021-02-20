abstract class BaseMmedia {
  hexo: any;
  mmedia_id: string;
  tag_id: string;
  config: Config;
  args: string[];
  constructor(hexo: any, args: string[], contents: any) {
    this.hexo = hexo;
    this.args = args;
    this.mmedia_id = utils.randomString(12);
    this.config = new Config(hexo);
    this.tag_id = `mmedia-${this.mmedia_id}`;
  }

  generate(): string {
    return "";
  }

  extractOption(pair: string) {
    let a = pair.indexOf(":");
    let b = pair.indexOf("=");
    if (a != -1 || b != -1) {
      if (a > b) {
        return [
          pair.slice(0, pair.indexOf(":")),
          pair.slice(pair.indexOf(":") + 1),
        ];
      } else {
        return [
          pair.slice(0, pair.indexOf("=")),
          pair.slice(pair.indexOf("=") + 1),
        ];
      }
    }
    return undefined;
  }
}
