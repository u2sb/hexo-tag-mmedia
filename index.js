'use strict';

const MetingTag = require('./util/tag/meting'),
  AplayerTag = require('./util/tag/aplayer'),
  AplayerLrcTag = require('./util/tag/aplayerLyric'),
  APlayerListTag = require('./util/tag/aplayerList');


hexo.extend.tag.register('meting', function(args) {
  try {
    let meting = new MetingTag(hexo, args);
    return meting.generate();
  } catch (e) {
    console.error(e)
    return `
			<script>
				console.error("${e}");
			</script>`
  }
});

hexo.extend.tag.register('aplayer', function (args) {
  try {
    let aplayer = new AplayerTag(hexo, args);
    return aplayer.generate();
  } catch (e) {
    console.error(e);
    return `
			<script>
				console.error("${e}");
			</script>`;
  }
});

hexo.extend.tag.register('aplayerlrc', function(args, content) {
  try {
    let aplayer = new AplayerLrcTag(hexo, args, content);
    return aplayer.generate();
  } catch (e) {
    console.error(e);
    return  `
			<script>
				console.error("${e}");
			</script>`
  }
}, {ends: true});

hexo.extend.tag.register('aplayerlist', function(args, content) {
  try {
    let aplayer = new AplayerLrcTag(hexo, content);
    return aplayer.generate();
  } catch (e) {
    console.error(e)
    return  `
			<script>
				console.error("${e}");
			</script>`
  }
}, {ends: true});


