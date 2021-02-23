class XiguaConfig extends BaseConfig {
  data: { [key: string]: string | number | boolean | JSON } = config_default.xigua.default || {};
}
