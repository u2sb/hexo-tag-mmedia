class AplayerConfig extends BaseConfig {
  aplayer_css: string = config_default.aplayer.css;
  aplayer_js: string = config_default.aplayer.js;
  data: { [key: string]: string | number | boolean | JSON } = config_default.aplayer.default || {};
}
