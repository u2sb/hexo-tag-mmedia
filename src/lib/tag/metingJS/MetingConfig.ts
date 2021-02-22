class MetingConfig extends BaseConfig {
  aplayer_css: string = config_default.aplayer.css;
  aplayer_js: string = config_default.aplayer.js;
  meting_js: string = config_default.meting.js;
  meting_api: string = "";
  data: { [key: string]: string | number | boolean | JSON } = config_default.meting.default || {};
}
