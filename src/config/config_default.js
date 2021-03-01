module.exports = {
  "config_default": {
    "audio": {
      "default": null
    },
    "video": {
      "default": null
    },
    "aplayer": {
      "js": "https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js",
      "css": "https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css",
      "default": {
        "contents": null
      }
    },
    "meting": {
      "js": "https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js",
      "api": null,
      "default": null
    },
    "dplayer": {
      "js": "https://cdn.jsdelivr.net/npm/dplayer@1/dist/DPlayer.min.js",
      "hls_js": "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js",
      "dash_js": "https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js",
      "shaka_dash_js": "https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js",
      "flv_js": "https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js",
      "webtorrent_js": "https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js",
      "default": {
        "contents": null
      }
    },
    "artplayer": {
      "js": "https://cdn.jsdelivr.net/npm/artplayer@3/dist/artplayer.js",
      "hls_js": "https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js",
      "dash_js": "https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js",
      "shaka_dash_js": "https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js",
      "flv_js": "https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js",
      "webtorrent_js": "https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js",
      "default": {
        "style": "width:100%;height:650px;max-width:1200px;center",
        "contents": {
          "autoSize": true,
          "autoMini": true,
          "fullscreen": true,
          "fullscreenWeb": true
        }
      }
    },
    "bilibili": {
      "default": {
        "page": 1,
        "danmaku": true,
        "allowfullscreen": "allowfullscreen",
        "sandbox": "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
        "width": "100%",
        "max_width": "850px",
        "margin": "auto"
      }
    },
    "xigua": {
      "default": {
        "autoplay": false,
        "startTime": 0,
        "allowfullscreen": "allowfullscreen",
        "sandbox": "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
        "width": "100%",
        "max_width": "850px",
        "margin": "auto"
      }
    }
  }
};