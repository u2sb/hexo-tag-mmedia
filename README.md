# hexo-tag-aplayer-scripts

使用脚本插入[Aplayer](https://github.com/MoePlayer/APlayer)标签。

因为[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)太久没更新了，就自己造轮子，感觉实用性还可以，就打算开源再完善一下。

## 存在的问题

因为以前是使用[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)，所以计划是要完全兼容，但是在设计的时候发现hexo-tag-aplayer本身也不是那么完美，正在考虑是否要做成完全兼容的，还是进一步改进，所以有一部分现在还没做，只实现了我自己用的那一部分。

使用metingJS的话，能完美兼容，无痛迁移，但是使用aplayer的话，目前还没做好，有些参数会失效（还没想好怎么设计），如果使用aplayer的话，暂时先不要上生产环境。

## 使用方法

下载`hexo-tag-aplayer.js`到hexo根目录的`scripts`文件夹。详细请看[Hexo文档](https://hexo.io/zh-cn/docs/plugins#%E8%84%9A%E6%9C%AC%EF%BC%88Scripts%EF%BC%89)。

### _config.yml

可以完全继承hexo-tag-aplayer：

```yaml
aplayer:
  cdn: https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js  # 引用 APlayer.js CDN 地址 (默认不需要填写)
  style_cdn: https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css  # 引用 APlayer.css CDN 地址 (默认不需要填写)
  meting_cdn: https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js  # 引用 metingJS CDN 地址 (默认不需要填写)
  meting_api: https://api.i-meto.com/meting/api  # 引用 metingJS api 地址 (默认不需要填写)
```

### MetingJS(推荐)

```
{% meting "60198" "netease" "playlist" %}

{% meting "auto:https://y.qq.com/n/yqq/song/001RGrEX3ija5X.html" %}

{% meting "60198" "netease" "playlist" "autoplay:false" "mutex:false" "listmaxheight:340px" "preload:none" "theme:#ad7a86"%}
```

其他参数见：[MetingJS参数](https://github.com/metowolf/MetingJS#option)，所有参数均可写为`key:value`形式

### Aplayer

目前兼容还不完美（主要是我自己不怎么用，没有什么动力去搞）。具体兼容情况还没测试，而且以后肯定要改，这部分文档先不写了。

## 反馈

如果有什么问题吗，请尽可能详细写在issue中。

> 不会写JS，有问题也不一定能解决。
