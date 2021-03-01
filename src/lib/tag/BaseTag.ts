abstract class BaseTag {
  mmedia_id: string;
  tag_id: string;
  hexo: any;
  css: any;
  js: any;
  contents: JSON;
  protected abstract config: BaseConfig;
  constructor(hexo: any, config: BaseConfig, contents: JSON) {
    this.mmedia_id = utils.randomString(
      16,
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    );
    this.contents = merge(config.data.contents, contents);
    this.tag_id = `mmedia-${this.mmedia_id}`;
    this.hexo = hexo;
    this.css = hexo.extend.helper.get("css").bind(hexo);
    this.js = hexo.extend.helper.get("js").bind(hexo);
  }
  parse(options: { [key: string]: any }): string {
    let data = "";
    for (let val in options) {
      if (val != "" && val != null) {
        if (options[val] != "" && options[val] != null) {
          if (
            options[val] === "true" ||
            options[val] === "false" ||
            Number(options[val]) + "" !== NaN + ""
          ) {
            data += `${val}=${options[val]} `;
          } else {
            data += `${val}="${options[val]}" `;
          }
        } else {
          data += `${val} `;
        }
      }
    }
    return data;
  }

  injector(entry: string, value: string | Function, to?: string) {
    this.hexo.extend.injector.register(entry, value, to);
  }
}
