### weex iconfont 图标引用的时候，有个很恶心的问题

下面是 weex-ui 的源码

```
  const dom = weex.requireModule('dom');
  dom.addRule('fontFace', {
    'fontFamily': "weexUiIconFont",
    'src': "url('https://at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')"
  });
```

由于我的 esLint 配置，Object 的 key 一般情况下没有'，且 value 默认用'；所有，真正正确的写法应该是

```
  const dom = weex.requireModule('dom');
  dom.addRule('fontFace', {
    fontFamily: 'iconFont',
    src: 'url(\'//at.alicdn.com/t/font_538141_32qx5vz6idw.ttf\')',
  });
```

**<font color="red">不能用"，得用\\'才能加载成功，反正没搞明白为什么。。。</font>**
