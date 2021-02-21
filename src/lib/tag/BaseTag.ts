abstract class BaseTag {
  mmedia_id: string;
  tag_id: string;
  protected abstract config: BaseConfig;
  constructor(config: BaseConfig) {
    this.mmedia_id = utils.randomString(12);
    this.tag_id = `mmedia-${this.mmedia_id}`;
  }
  parse(options: { [key: string]: string }): string {
    let data = "";
    for (let val in options) {
      if (val != "" && val != null) {
        if (options[val]) {
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
}
