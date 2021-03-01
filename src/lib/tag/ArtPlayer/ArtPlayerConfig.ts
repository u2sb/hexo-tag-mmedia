class ArtPlayerConfig extends BaseConfig {
  artplayer_js: string = config_default.artplayer.js;
  hls_js: string = config_default.artplayer.hls_js;
  dash_js: string = config_default.artplayer.dash_js;
  shaka_dash_js: string = config_default.artplayer.shaka_dash_js;
  flv_js: string = config_default.artplayer.flv_js;
  webtorrent_js: string = config_default.artplayer.webtorrent_js;
  data: { [key: string]: string | number | boolean | JSON } =
    config_default.artplayer.default || {};
}
