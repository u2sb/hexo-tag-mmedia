class MetingTag extends BaseTag {
  result: string;
  config: MetingConfig;

  constructor(hexo: any, config: MetingConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
    this.result = "";
  }

  generate(): string {
    this.result += `<link rel="stylesheet" href="${this.config.aplayer_css}">`;
    this.result += `<script src="${this.config.aplayer_js}"></script>`;
    this.result += `<script src="${this.config.meting_js}"></script>`;
    // this.injector("head_end", () => {
    //   return this.css(this.config.aplayer_css);
    // });
    // this.injector(
    //   "head_end",
    //   `<script src="${this.config.aplayer_js}"></script>`
    // );
    // this.injector("head_end", () => {
    //   return this.js(this.config.meting_js);
    // });
    if (this.config.meting_api != "") {
      let apistr = `var meting_api='${this.config.meting_api}?server=:server&type=:type&id=:id&auth=:auth&r=:r';`;
      this.result += `<script> ${apistr} </script>`;
    }
    let meting_data = merge(this.config.data, this.contents);
    let meting_js_config = `<meting-js ${this.parse(meting_data)}></meting-js>`;
    this.result += meting_js_config;
    return this.result;
  }
}
