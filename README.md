# hexo-tag-mmedia

hexo媒体插入插件

## 支持平台

- [Aplayer](https://github.com/DIYgod/APlayer)
- [Meting](https://github.com/metowolf/MetingJS)
- [Dplayer](https://github.com/DIYgod/DPlayer)
- [BiliBili](https://www.bilibili.com/)
- 更多平台后续会有更新...

## 演示

[https://doc.video.xwhite.studio/mmedia/show.html](https://doc.video.xwhite.studio/mmedia/show.html)

## 使用方法

### 安装

```
npm install hexo-tag-mmedia --save
```

如安装hexo-tag-dplayer和hexo-tag-aplayer请先卸载

```
npm uninstall hexo-tag-dplayer

npm uninstall hexo-tag-aplayer
```

### _config.yml

```
mmedia:
  aplayer: 
    cdn: https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js
    style_cdn: https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css
    default: 
  meting:
    cdn: https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js
    api: 
    default: 
  dplayer:
    cdn: https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.js
    style_cdn: https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.css
    hls_cdn: https://cdn.jsdelivr.net/npm/hls.j/dist/hls.min.js
    dash_cdn: https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js
    shaka_dash_cdn: https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js
    flv_cdn: https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js
    webtorrent_cdn: https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js
    default: 
  artplayer:
    cdn: https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js
    style_cdn: https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.css
    hls_cdn: https://cdn.jsdelivr.net/npm/hls.j/dist/hls.min.js
    dash_cdn: https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js
    shaka_dash_cdn: https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js
    flv_cdn: https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js
    webtorrent_cdn: https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js
    default: 
  bilibili:
    default: 
```

default项下可配置默认选项，例如：
```
  meting:
    cdn: https://cdn.jsdelivr.net/npm/meting/dist/Meting.min.js
    api: 
    default: 
      order: random
```

### MetingJS

```
{% meting "001Mf4Ic1aNYYK" "tencent" "album" "order:random" "listmaxheight:180px" %}

{% meting "auto:https://y.qq.com/n/yqq/song/001RGrEX3ija5X.html" "autoplay" %}
```

参数：

基本兼容hexo-tag-aplayer，绝大部分可以直接从hexo-tag-aplayer迁移

- `id` : `string` 音乐的id，第一个参数
- `server`: `string` 音乐平台，第二个参数，可选：`netease`, `tencent`, `kugou`, `xiami`, `baidu`
- `type` : `string` 音乐类型，第三个参数，可选：`song`, `playlist`, `album` `search`, `artist`
- `auto` : `string` 自动，含有auto选项时前面参数不需要填写，否则为必填，例如：`"auto:https://y.qq.com/n/yqq/song/001RGrEX3ija5X.html"`
- `autoplay`,`fixed`,`mini`,`listfolded` : 带有这些参数表示`true`，没有表示`false`
- 其他参数同[MetingJS](https://github.com/metowolf/MetingJS)一致（无“-”，带有“-”的参数删掉“-”）

后端服务器可以使用官方后端，也可以使用我自己写的后端服务器 [MetingJS.Server](https://github.com/MonoLogueChi/MetingJS.Server)。

### Aplayer

**Aplayer目前测试不够完善，如果遇到问题可以反馈给我**

```
{% aplayer "Caffeine" "Jeff Williams" "caffeine.mp3" "picture.jpg" "lrc:caffeine.txt" %}


{% aplayerlrc "title" "author" "url" "autoplay" %}
[00:00.00]lrc here
{% endaplayerlrc %}


{% aplayerlist %}
{
    "narrow": false,                          // Optional, narrow style
    "autoplay": true,                         // Optional, autoplay song(s), not supported by mobile browsers
    "mode": "random",                         // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
    "showlrc": 3,                             // Optional, show lrc, can be 1, 2, 3
    "mutex": true,                            // Optional, pause other players when this player playing
    "theme": "#e6d0b2",	                      // Optional, theme color, default: #b7daff
    "preload": "metadata",                    // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
    "listmaxheight": "513px",                 // Optional, max height of play list
    "music": [
        {
            "title": "CoCo",
            "author": "Jeff Williams",
            "url": "caffeine.mp3",
            "pic": "caffeine.jpeg",
            "lrc": "caffeine.txt"
        },
        {
            "title": "アイロニ",
            "author": "鹿乃",
            "url": "irony.mp3",
            "pic": "irony.jpg"
        }
    ]
}
{% endaplayerlist %}
```

基本兼容hexo-tag-aplayer，绝大部分可以直接从hexo-tag-aplayer迁移，**此部分测试不够充分**，如果遇到问题请提[issue](https://github.com/MonoLogueChi/hexo-tag-mmedia/issues)

参数与 [hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 一致

```
{% aplayer title author url [picture_url, narrow, autoplay, width:xxx, lrc:xxx] %}
```

- `title` : 曲目标题
- `author`: 曲目作者
- `url`: 音乐文件 URL 地址
- `picture_url`: (可选) 音乐对应的图片地址
- `narrow`: （可选）播放器袖珍风格
- `autoplay`:  (可选) 自动播放，移动端浏览器暂时不支持此功能
- `width:xxx`: (可选) 播放器宽度 (默认: 100%)
- `lrc:xxx`: （可选）歌词文件 URL 地址

### Dplayer

```
{% dplayer "url:KeyCastOW.mp4" "id:DDEC4F882C0B66FAD" "addition:addition0" "addition:addition1" "addition:addition2" "volume:0.5"%} 
```

参数：

不兼容 hexo-tag-dplayer，不能直接迁移，需要将"="替换为":"

- `url` : `string` 视频地址，必填
- `pic` : `string` 封面
- `thumbnails` : `thumbnails` 缩略图地址
- `type` : `string` 可选`auto` `hls` `dash` `shakaDash` `flv` `webtorrent`
- `id` : `string` 弹幕id，不懂不要填
- `api` : `string` 弹幕api，不懂不要填
- `token` : `string` 弹幕token，不懂不要填
- `maximum` : `int` 最大弹幕数，不懂不要填
- `user` : `string` 弹幕发送用户名，不懂不要填
- `bottom` : `string` 弹幕底端距离，不懂不要填
- `unlimited` : `bool` 带有此参数表示true，不带表示false，不懂不要填
- `addition` : `string` 额外弹幕，可有多个叠加
- `suburl` : `string` 字幕地址
- `subtype` : `string` 字幕类型，可选`webvtt` `ass`
- `subbottom` : `string` 字幕距底端距离，默认`40px`
- `subfontSize` : `string` 字幕字体大小
- `subcolor` : `string` 字幕字体颜色
- `autoplay` : `bool` 自动播放，带有此参数表示true，不带表示false
- `loop` : `bool` 循环，带有此参数表示true，不带表示false
- `screenshot` : `bool` 截屏，带有此参数表示true，不带表示false，此参数会造成跨域
- `hotkey` : `bool` 热键控制，带有此参数表示true，不带表示false
- `mutex` : `bool` 互斥，带有此参数表示true，不带表示false
- `theme` : `string` 主题
- `lang` : `string` 语言，不填会根据浏览器环境自动识别
- `preload` : `string` 预加载，可选`none` `metadata` `auto`，不懂不要填
- `logo` : `string` logo地址
- `volume` : `float` 音量 0-1
- `contextmenu` : `string` 自定义菜单，可多个叠加
- `highlight` : `string` 高光点，可叠加，例如`"highlight:{time: 20, text: '这是第 20 秒'}"`
- `code` : `string` 额外代码，不懂不要填，需要写的请参考源码

弹幕可以使用官方提供弹幕服务器，也可以使用我开发的弹幕服务器自己搭建 [Dplayer.Danmaku](https://github.com/MonoLogueChi/Dplayer.Danmaku)。

### BiliBili

```
{% bilibili "aid:60016166" "quality:high" "danmaku" "allowfullscreen" %}
```

参数：

- `aid` : `string` 视频av号
- `av` : `string` 视频链接地址，不要带分P信息，与aid同时填写会被覆盖
- `page` : `int` 分P
- `quality` : `string` 视频质量，可选 `high` `low`
- `danmaku` : `bool` 开启弹幕，默认false，带有此参数表示true，不带表示false
- `allowfullscreen` : `bool` 是否允许全屏，默认true，带有此参数表示true，不带表示false
- `width` : `string` 宽度，`px` `%`
- `height` : `string` `px` `%`
- `margin` : `string` 位置，css属性，例：`"margin:auto"` `"margin:0 0 0 auto"`

## 参考

[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)  
[hexo-tag-dplayer](https://github.com/MoePlayer/hexo-tag-dplayer)  

## 反馈

如果有什么问题吗，请尽可能详细写在[issue](https://github.com/MonoLogueChi/hexo-tag-mmedia/issues)中。

> 不会写JS，有问题也不一定能解决。

## QQ群

159891059

![](https://s2.ax1x.com/2020/02/14/1jAh1U.png)