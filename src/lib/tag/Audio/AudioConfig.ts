class AudioConfig extends BaseConfig {
  data: { [key: string]: string | number | boolean | JSON } = config_default.audio.default || {};
}
