abstract class BaseMmedia {
  hexo: any;
  config: Config;
  args: string[];
  constructor(hexo: any, args: string[], contents: any) {
    this.hexo = hexo;
    this.args = args;    
    this.config = new Config(hexo);
    
  }

  generate(): string {
    return "";
  }

  extractOption(pair: string) {
    let a = pair.indexOf(":");
    let b = pair.indexOf("=");

    if (a > b) {
      return [
        pair.slice(0, pair.indexOf(":")),
        pair.slice(pair.indexOf(":") + 1),
      ];
    } else if (a < b) {
      return [
        pair.slice(0, pair.indexOf("=")),
        pair.slice(pair.indexOf("=") + 1),
      ];
    }

    return undefined;
  }
}
