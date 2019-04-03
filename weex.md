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

### ios 真机调试

如果报错

```
app install failed
an unknown error has occurred
```

那就要在启动之前先 clean 一下，直接在菜单栏 Product => Clean

### 开发、生产证书申请

进入[苹果开发者中心](https://developer.apple.com/account/)，选择创建一个新的证书 ![weex-ios-cert-01](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-01.png) ![weex-ios-cert-02](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-02.png)![weex-ios-cert-03](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-03.png)![weex-ios-cert-04](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-04.png) 在开始上面之前，苹果电脑上要先准备好证书 ![weex-ios-cert-05](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-05.png)![weex-ios-cert-06](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-06.png)![weex-ios-cert-07](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-07.png)![weex-ios-cert-08](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-08.png)![weex-ios-cert-09](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-09.png)![weex-ios-cert-10](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-10.png)![weex-ios-cert-11](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-11.png)![weex-ios-cert-12](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-12.png)![weex-ios-cert-13](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-13.png)![weex-ios-cert-14](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-14.png)![weex-ios-cert-15](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-15.png)![weex-ios-cert-16](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-16.png)![weex-ios-cert-17](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-17.png)![weex-ios-cert-18](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-18.png)![weex-ios-cert-19](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-19.png)![weex-ios-cert-20](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-20.png)![weex-ios-cert-21](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-21.png)![weex-ios-cert-22](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-22.png)![weex-ios-cert-23](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-23.png)![weex-ios-cert-24](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-24.png)![weex-ios-cert-25](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-25.png)![weex-ios-cert-26](https://raw.githubusercontent.com/ChangLCS/tips/master/image/weex-ios-cert-26.png)

### weex-toolkit 2.0.16 安装问题

mac 环境 node v8.11.2，一样‘recognize that command’的问题，从昨天升级了 bate7 后就出现了，之后尝试了 bate8、bate9，安装前都进行了清空本地包(npm uninstall -g weex-toolkit && rm -rf ~/.wx && rm -rf ~/.weex_tmp) ，问题依旧。

然后发现

```
$ npm install -g weex-toolkit@beta
$ weex -v
2.0.0-beta.9
```

默认是没有安装任何组件的。然后就按照文档上说的系统组件一个一个安装上去

```
weex install @weex-cli/core
weex install @weex-cli/generator
weex install @weex-cli/compile
weex install @weex-cli/preview
weex install @weex-cli/debug
weex install @weex-cli/doctor
weex install @weex-cli/lint
weex install @weex-cli/device
weex install @weex-cli/run
```

组件安装完后 doctor 一下 `weex doctor`

```
$ weex -v
2.0.0-beta.9
- @weex-cli/generator : v2.0.0-beta.7
- @weex-cli/compile : v2.0.0-beta.2
- @weex-cli/preview : v2.0.0-beta.2
- @weex-cli/debug : v2.0.0-beta.9
- @weex-cli/doctor : v2.0.0-beta.9
- @weex-cli/lint : v2.0.0-beta.2
- @weex-cli/device : v2.0.0-beta.2
- @weex-cli/run : v2.0.0-beta.2
```

这下环境就好了。
