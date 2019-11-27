const config = hexo.config.aplayer;

hexo.extend.tag.register('aplayer', function (args) {
  try {
    var tag = CreatAplayerTag(args);
    return tag;
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register('meting', function (args) {
  try {
    var tag = CreatMetingTag(args);
    return tag;
  } catch (e) {
    console.error(e)
    return `
			<script>
				console.error("${e}");
			</script>`
  }
});

function CreatAplayerTag(args) {
  var jsCdn = config.cdn != null && config.cdn.length > 0 ? config.cdn : "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js";
  var cssCdn = config.style_cdn != null && config.style_cdn.length > 0 ? config.style_cdn : "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css";
  var text = `<link rel="stylesheet" href="${cssCdn}"><script src="${jsCdn}"></script>
              <div id="aplayer"></div>`;

  //TODO: 这里有问题，以后有时间修复一下
  var name = args[0];
  var artist = args[1];
  var url = args[2];
  var cover = args.length > 3 ? args[3] : null;
  var op = GetOptions(args);
  var aplayerOptions = "";
  for (var key in op) {
    aplayerOptions += `${key}:'${op[key]}',`;
  }
  text += `
    const ap = new APlayer({
      container: document.getElementById('player'),
      ${aplayerOptions}
      audio: [
        {
          name: '${name}',
          artist: '${artist}',
          url: '${url}',
          cover: '${cover}',
          lrc: '${op["lrc"]}',
          theme: '#ebd0c2'
        }
      ]
    });`;
}


function CreatMetingTag(args) {
  var jsCdn = config.cdn != null && config.cdn.length > 0 ? config.cdn : "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js";
  var cssCdn = config.style_cdn != null && config.style_cdn.length > 0 ? config.style_cdn : "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css";
  var metingCdn = config.meting_cdn != null && config.meting_cdn.length > 0 ? config.meting_cdn : "https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js";
  var text = `<link rel="stylesheet" href="${cssCdn}"><script src="${jsCdn}"></script><script src="${metingCdn}"></script>`;
  text = (config.meting_api != null && config.meting_api.length > 0 ? `<script>var meting_api='${config.meting_api}?server=:server&type=:type&id=:id&auth=:auth&r=:r';</script>` : "") + text;
  var op = GetOptions(args);
  if (!("auto" in op) && !("id" in op)) {
    op["id"] = args[0];
    op["server"] = args[1];
    op["type"] = args[2];
  }
  var metingOptions = "";
  for (var key in op) {
    metingOptions += `${key}="${op[key]}"`;
  }
  text += `<meting-js ${metingOptions}></meting-js>`;
  return text;
}

function GetOptions(args) {
  var options = new Array;
  args.forEach((option) => {
    var d = option.indexOf(":");
    if (d != -1) {
      var key = option.substring(0, d);
      var value = option.substring(d + 1, option.length);
      options[key] = value;
    }
  });
  return options;
}