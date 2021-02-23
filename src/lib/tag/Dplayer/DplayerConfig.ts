class DplayerConfig extends BaseConfig {
  dplayer_js: string = config_default.dplayer.js;
  hls_js: string = config_default.dplayer.hls_js;
  dash_js: string = config_default.dplayer.dash_js;
  shaka_dash_js: string = config_default.dplayer.shaka_dash_js;
  flv_js: string = config_default.dplayer.flv_js;
  webtorrent_js: string = config_default.dplayer.webtorrent_js;
  data: { [key: string]: string | number | boolean | JSON } =
    config_default.dplayer.default || {};
}
