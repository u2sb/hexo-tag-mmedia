class BilibiliConfig extends BaseConfig {
  data: { [key: string]: string | number | boolean | JSON } = config_default.bilibili.default || {};
}
