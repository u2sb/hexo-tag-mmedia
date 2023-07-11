class XiguaTag extends BaseTag {
  config: XiguaConfig;

  constructor(hexo: any, config: XiguaConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
  }

  x_parse(options: { [key: string]: any }) {
    let xigua: any = {};
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "xid":
            xigua.xid = options[val];
            break;
          case "id":
            xigua.id = options[val];
            break;
          case "autoplay":
            xigua.autoplay = options[val];
            break;
          case "startTime":
            xigua.danmaku = options[val];
            break;
          case "allowfullscreen":
            xigua.allowfullscreen = options[val];
            break;
          case "sandbox":
            xigua.sandbox = options[val];
            break;
          case "width":
            xigua.width = options[val];
            break;
          case "max_width":
            xigua.max_width = options[val];
            break;
          case "margin":
            xigua.margin = options[val];
            break;
        }
      }
    }
    return xigua;
  }
  generate(): string {
    let xigua_data = merge(this.config.data, this.contents);
    let data = this.x_parse(xigua_data);
    this.result += `<style>.xgplayer{width: ${data.width}; max-width: ${data.max_width}; margin: ${data.margin}}</style>`;
    this.result += `<div class="xgplayer"><iframe class="xgplayer" id="${
      this.tag_id
    }" src="https://www.ixigua.com/iframe/${data.xid}?${
      data.id ? "id=" + data.id + "&" : ""
    }autoplay=${data.autoplay == "true" ? 1 : 0}&startTime=${
      data.startTime
    }" allowfullscreen="${
      data.allowfullscreen == "allowfullscreen" ||
      data.allowfullscreen == "true"
        ? "allowfullscreen"
        : "no"
    }" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="${
      data.sandbox
    }"></iframe></div>`;
    let script_autowidth = `document.getElementById("${this.tag_id}").style.height=document.getElementById("${this.tag_id}").scrollWidth\*0.7+"px";
    window.onresize = function(){
      document.getElementById("${this.tag_id}").style.height=document.getElementById("${this.tag_id}").scrollWidth\*0.7+"px";
    };`;
    this.result += `<script> ${script_autowidth} </script>`;
    return this.result;
  }
}
