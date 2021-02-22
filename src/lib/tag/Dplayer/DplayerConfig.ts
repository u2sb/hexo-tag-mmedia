class DplayerConfig extends BaseConfig {
  dplayer_js: string = config_default.dplayer.js;
  data: { [key: string]: string | number | boolean | JSON } =
    config_default.dplayer.default || {};
}
