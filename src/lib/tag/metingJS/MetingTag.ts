class MetingTag extends BaseTag {
  config: MetingConfig;

  constructor(hexo: any, config: MetingConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
  }

  generate(): string {
    this.result += `<div id="${this.tag_id}"></div>`;

    if (
      this.config.meting_api &&
      this.config.meting_api != "" &&
      this.config.meting_api != null
    ) {
      let apistr = `var meting_api='${this.config.meting_api}?server=:server&type=:type&id=:id&auth=:auth&r=:r';`;
      this.result += `<script> ${apistr} </script>`;
    }

    let meting_data = {
      id: this.tag_id,
      data: merge(this.config.data, this.contents),
    };
    let meting_script = `var ${
      this.mmedia_id
    }_options = JSON.parse('${JSON.stringify(meting_data).replace(
      /"([^"]*)"/g,
      '\\"$1\\"'
    )}'); `;

    meting_script += `HEXO_MMEDIA_DATA.css.push("${this.config.aplayer_css}");`;
    meting_script += `HEXO_MMEDIA_DATA.js.push("${this.config.aplayer_js}");`;
    meting_script += `HEXO_MMEDIA_DATA.js.push("${this.config.meting_js}");`;

    meting_script += `HEXO_MMEDIA_DATA.metingData.push(${this.mmedia_id}_options);`;

    this.result += `<script> ${meting_script} </script>`;

    return this.result;
  }
}
