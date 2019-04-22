### 前端升级 elementUI 2.0

- 先把文件从原来改好的拷过去
- 配置`vue.config.js`
- 调整`theme/index.css`，注意颜色配置与字体大小，之后把`assest`文件夹的 css 拷贝过去，还有`index.html`
- 修改路由写法

- - 匹配原来路由写法的正则

```
const([^()=]*)([^']*)'([^']*)'[^']*'([^']*)'
```

- - 替换成 ES6 写法的正则

```
const $1 = () => import(/* webpackChunkName: "$4" */ "$3"
```

#### （格式化过的路由文件）

- - 匹配原来路由写法的正则

```
const([^()=]*)([^'"]*)\n[^*']*'([^']*)'[^']*'([^']*)'.*\n?[^/]*;(.*)
```

- - 替换成 ES6 写法的正则

```
const $1 = () => import(/* webpackChunkName: "$4" */ "$3");$5
```

- `npm run lint` 查看是否有需要格式化的地方
- `history.back();` 改成 `this.$router.back();`
- 表格中的`scope="scope"` 改成 `slot-scope="scope"`
- `location` 改成 `window.location`
- `isNaN` 改成 `Number.isNaN`
- `<el-switch></el-switch>`组件的 `on-text`、`off-text` 之类属性，改成 `active-text`、`inactive-text`，宽度`:width="60"`，具体多少看情况
- `Find`组件 `el-input`去掉 click 事件，`icon`改成`suffix-icon`
- `<el-dialog></el-dialog>`把`size`改成`width`，根据宽度来走，`DialogList`组件先改，参考其它交易 width，并使用正则`<el-dialog.*size`查出所有需要调整的地方

```
switch (this.options.dialogSize) {
  case 'tiny':
    width = '30%';
    break;
  case 'small':
    width = '50%';
    break;
  case 'large':
    width = '85%';
    break;
  case 'full':
    width = '100%';
    break;
  default:
    break;
}
```

- 顺手把`./src/views/`里面 eslint 报错给处理一下
- `YUploadEdit` oldUrl oldUid
- `Find` 把日期段查询改成 2.0 版本的查询，具体参考 _东莞交易_ 已经改好的，还有要调节一下样式，去掉`el-select-dropdown__item`的样式，并加上

```
/* element2.0 dateRange */
.find .daterange {
  .el-date-editor {
    width: auto;
    padding: 2px 0 2px 5px;
    height: 30px;
  }
  .el-range-input {
    font-size: 12px;
  }
}
```

- 关于`el-date-picker`，如果报错，要看看日期段是不是数组，已经空值须为''
- `src/config.js`，`NODE_ENV`改成`VUE_APP_ENV`

- <font color="#f00">_修改的时候要自己做好对比，免得改错_</font>
