exports.APLAYER_TAG_OPTION = {
    title: '', author: '', url: '', pic: '',
    narrow: false, autoplay: false, width: '',
    lrcOption: false, lrcPath: ''
};

exports.METING_TAG_OPTION = {
    id: '', server: '', type: '',
    autoplay: false, mutex: true, listmaxheight: '340px',
    preload: 'auto', theme: '#ad7a86'
};

exports.METING_TAG_OPTION_AUTO = {
    auto: '', mode: 'circulation',
    autoplay: false, mutex: true, listmaxheight: '340px',
    preload: 'auto', theme: '#ad7a86'
};

exports.DPLAYER_TAG_OPTION = {
    url: '', pic: '', thumbnails: '', type: 'auto',
    id: '', api: 'https://api.prprpr.me/dplayer/v3/', addition: [], token: '', maximum: '10000', user: 'DIYgod', bottom: '15%', unlimited: true,
    suburl: '', subtype: 'webvtt', subbottom: '40px', subcolor: '#fff', subfontSize: '20px',
    autoplay: false, loop: false, screenshot: false, theme: '#b7daff', lang: '', hotkey: true, preload: 'auto', logo: '', volume: 0.7, mutex: true, highlight: [],
    contextmenu: [],
    code: 'dp.on("fullscreen", function () { if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { screen.orientation.lock("landscape"); }});'
};

exports.BILIBILI_TAG_OPTION = {
    aid: '', page: 1, quality: 'low', danmaku: false, allowfullscreen: 'allowfullscreen', width: '100%', height: '500px', margin: 'auto'
};
