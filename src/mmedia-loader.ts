interface HEXO_MMEDIA_DATA_TYPE {
  css?: Array<string>;
  js?: Array<string>;
  aplayerData?: Array<Object>;
  metingData?: Array<MetingData>;
  artPlayerData?: Array<Object>;
  dplayerData?: Array<Object>;
}

interface MetingData {
  id: string;
  data: Object;
}

const initMmedia = () => {
  // 去重
  function unique<T>(arr: Array<T>): Array<T> {
    return arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  // 加载css
  const loadCss = (url: string) =>
    new Promise<void>((resolve, reject) => {
      let head = document.getElementsByTagName("head")[0];
      let link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject();
      head.appendChild(link);
    });

  // 加载js
  const loadJs = (url: string) =>
    new Promise<void>((resolve, reject) => {
      let head = document.getElementsByTagName("head")[0];
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      head.appendChild(script);
    });

  const loadCssAndJs = (
    css: Array<string> | undefined,
    js: Array<string> | undefined
  ) =>
    new Promise<void>((resolve, reject) => {
      let a: Array<Promise<void>> = new Array();

      if (css && css.length > 0) {
        unique(css).forEach((c) => {
          a.push(loadCss(c));
        });
      }

      if (js && js.length > 0) {
        unique(js).forEach((j) => {
          a.push(loadJs(j));
        });
      }

      Promise.all(a)
        .then(() => resolve())
        .catch(() => reject());
    });

  const initPlayer = (playerData: HEXO_MMEDIA_DATA_TYPE) => {
    let { aplayerData, metingData, artPlayerData, dplayerData } = playerData;
    if (aplayerData && aplayerData.length > 0) {
      aplayerData.forEach((a) => {
        // @ts-ignore
        new APlayer(a);
      });
    }
    if (artPlayerData && artPlayerData.length > 0) {
      artPlayerData.forEach((a) => {
        // @ts-ignore
        new Artplayer(a);
      });
    }

    if (dplayerData && dplayerData.length > 0) {
      dplayerData.forEach((a) => {
        // @ts-ignore
        new DPlayer(a);
      });
    }

    // meting 比较特殊
    if (metingData && metingData.length > 0) {
      metingData.forEach((a) => {
        let meting = document.getElementById(a.id);
        let meting_js = document.createElement("meting-js");

        for (let key in a.data) {
          // @ts-ignore
          meting_js.setAttribute(key, a.data[key]);
        }
        meting?.appendChild(meting_js);
      });
    }
  };

  // @ts-ignore
  const data: HEXO_MMEDIA_DATA_TYPE | undefined = HEXO_MMEDIA_DATA || undefined;

  if (data) {
    loadCssAndJs(data.css, data.js).then(() => initPlayer(data));
  }
};

initMmedia();
