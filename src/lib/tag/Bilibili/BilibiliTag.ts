class BilibiliTag extends BaseTag {
  config: BilibiliConfig;

  constructor(hexo: any, config: BilibiliConfig, contents: JSON) {
    super(hexo, config, contents);
    this.config = config;
  }

  b_parse(options: { [key: string]: any }) {
    let bilibili: any = {};
    for (let val in options) {
      if (val != "" && val != null) {
        switch (val) {
          case "aid":
            bilibili.aid = options[val];
            break;
          case "bvid":
            bilibili.bvid = options[val];
            break;
          case "page":
            bilibili.page = options[val];
            break;
          case "danmaku":
            bilibili.danmaku = options[val];
            break;
          case "allowfullscreen":
            bilibili.allowfullscreen = options[val];
            break;
          case "sandbox":
            bilibili.sandbox = options[val];
            break;
          case "width":
            bilibili.width = options[val];
            break;
          case "max_width":
            bilibili.max_width = options[val];
            break;
          case "margin":
            bilibili.margin = options[val];
            break;
          case "autoplay":
            bilibili.autoplay = options[val];
            break;
        }
      }
    }
    return bilibili;
  }
  generate(): string {
    let bilibili_data = merge(this.config.data, this.contents);
    let data = this.b_parse(bilibili_data);
    this.result += `<style>.bbplayer{width: ${data.width}; max-width: ${data.max_width}; margin: ${data.margin}}</style>`;
    this.result += `<div class="bbplayer"><iframe class="bbplayer" id="${
      this.tag_id
    }" src="https://player.bilibili.com/player.html?${
      data.bvid ? "bvid=" + data.bvid : "aid=" + data.aid
    }&page=${data.page}&high_quality=1&danmaku=${data.danmaku}&autoplay=${
      data.autoplay == "false" || data.autoplay == "0" ? 0 : 1
    }" allowfullscreen="${
      data.allowfullscreen == "allowfullscreen" ||
      data.allowfullscreen == "true"
        ? "allowfullscreen"
        : "no"
    }" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="${
      data.sandbox
    }"></iframe></div>`;
    let script_autowidth = `document.getElementById("${this.tag_id}").style.height=document.getElementById("${this.tag_id}").scrollWidth\*0.76+"px";
    window.onresize = function(){
      document.getElementById("${this.tag_id}").style.height=document.getElementById("${this.tag_id}").scrollWidth\*0.76+"px";
    };`;
    this.result += `<script> ${script_autowidth} </script>`;
    return this.result;
  }
}
