"use strict";

const MetingTag = require("./util/tag/meting"),
  AplayerTag = require("./util/tag/aplayer"),
  AplayerLrcTag = require("./util/tag/aplayerLyric"),
  AplayerListTag = require("./util/tag/aplayerList"),
  DplayerTag = require("./util/tag/dplayer"),
  IXiGuaTag = require("./util/tag/ixigua"),
  BilibiliTag = require("./util/tag/bilibili");

hexo.extend.tag.register("meting", function (args) {
  try {
    let meting = new MetingTag(hexo, args);
    return meting.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register("aplayer", function (args) {
  try {
    let aplayer = new AplayerTag(hexo, args);
    return aplayer.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register(
  "aplayerlrc",
  function (args, content) {
    try {
      let aplayer = new AplayerLrcTag(hexo, args, content);
      return aplayer.generate();
    } catch (e) {
      console.error(e);
      return `
			<script>
				console.error("${e}");
			</script>`;
    }
  },
  { ends: true }
);

hexo.extend.tag.register(
  "aplayerlist",
  function (args, content) {
    try {
      let aplayer = new AplayerListTag(hexo, content);
      return aplayer.generate();
    } catch (e) {
      console.error(e);
      return `
			<script>
				console.error("${e}");
			</script>`;
    }
  },
  { ends: true }
);

hexo.extend.tag.register("dplayer", function (args) {
  try {
    let dplayer = new DplayerTag(hexo, args);
    return dplayer.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register("bilibili", function (args) {
  try {
    let bplayer = new BilibiliTag(hexo, args);
    return bplayer.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register("ixigua", function (args) {
  try {
    let xplayer = new IXiGuaTag(hexo, args);
    return xplayer.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});