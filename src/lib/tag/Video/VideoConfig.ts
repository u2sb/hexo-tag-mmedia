class VideoConfig extends BaseConfig {
  data: { [key: string]: string | number | boolean | JSON } = config_default.video.default || {};
}
