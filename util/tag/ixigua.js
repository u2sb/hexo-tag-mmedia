const BaseTag = require("./base"),
  Constant = require("../constant"),
  extractOptionValue = require("../util").extractOptionValue,
  throwError = require("../util").throwError,
  IXIGUA_TAG_OPTION = Constant.IXIGUA_TAG_OPTION;

class IXiGuaTag extends BaseTag {
  constructor(hexo, args) {
    super(hexo, args);
    this.ixiguaConfig = this.config.get("ixigua");
    this.settings = this.parse(args);
  }

  parse(options) {
    let settings = Object.assign(
      {},
      IXIGUA_TAG_OPTION,
      this.ixiguaConfig.default
    );
    options.forEach((option, index) => {
      switch (true) {
        case option.startsWith("xid:"):
          settings.xid = extractOptionValue(option);
          break;
        case option.startsWith("id:"):
          settings.id = extractOptionValue(option);
          break;
        case option.startsWith("autoplay:"):
          settings.autoplay = extractOptionValue(option);
          break;
        case option.startsWith("startTime:"):
          settings.startTime = extractOptionValue(option);
          break;
        case option.startsWith("allowfullscreen"):
          settings.allowfullscreen = extractOptionValue(option) === "true";
          break;
        case option.startsWith("width:"):
          settings.width = extractOptionValue(option);
          break;
        case option.startsWith("max_width:"):
          settings.max_width = extractOptionValue(option);
          break;
        case option.startsWith("margin:"):
          settings.margin = extractOptionValue(option);
          break;
      }
    });
    return settings;
  }

  generate() {
    let {
      xid,
      id,
      autoplay,
      startTime,
      allowfullscreen,
      width,
      max_width,
      margin,
    } = this.settings;
    return `
        <style>.xgplayer{width: ${width}; max-width: ${max_width}; height: ${
            Math.min(width, max_width) * 0.7
        }; margin: ${margin}}</style>
        <div class="xgplayer">
        <iframe class="xgplayer" id="${
          this.tagId
        }" src="//www.ixigua.com/iframe/${xid}?${
            id == null || id == "" ? "" : "id=" + id + "&"
        }autoplay=${autoplay ? 1 : 0}&startTime=${startTime}"
            allowfullscreen="${
              allowfullscreen == "allowfullscreen" || allowfullscreen == "true"
                ? "allowfullscreen"
                : "no"
            }"
            scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups">
        </iframe>
        </div>

        <script>
            document.getElementById("${this.tagId}").style.height=document.getElementById("${this.tagId}").scrollWidth\*0.7+"px";
            window.onresize = function(){
              document.getElementById("${this.tagId}").style.height=document.getElementById("${this.tagId}").scrollWidth\*0.7+"px";
            };
        </script>
        `;
  }
}

module.exports = IXiGuaTag;
