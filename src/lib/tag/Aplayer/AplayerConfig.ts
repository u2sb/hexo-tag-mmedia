class AplayerConfig extends BaseConfig {
  aplayer_css: string = config_default.aplayer.css;
  aplayer_js: string = config_default.aplayer.js;
  meting_api: string = "";
  data: { [key: string]: string } = config_default.aplayer.default || {};
}
