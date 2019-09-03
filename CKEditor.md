## CKEditor5 Vue 使用，vue-cli3.0 配置

### 直接使用 CKEditor 源代码编辑

- 安装依赖基础依赖

```
npm install --save @ckeditor/ckeditor5-vue
npm install --save @ckeditor/ckeditor5-dev-webpack-plugin
npm install --save @ckeditor/ckeditor5-dev-utils
npm install --save postcss-loader@3
npm install --save raw-loader@0.5.1
```

- 配置 vue.config.js

```
const path = require( 'path' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
    /*
      ckeditor的源被封装在ES6模块中。
      默认情况下，代码从node_modules目录中不会出现
      因此必须明确指出在所有ckeditor5-*模块中查找javascript文件的CLI工具
    */
    transpileDependencies: [
        /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
    ],
    configureWebpack: {
        plugins: [
            // 配置语言
            new CKEditorWebpackPlugin( {
                // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'zh-cn'
            } )
        ]
    },


    /*
      vue cli通常使用自己的加载程序加载.svg和.css文件，然而
      1、必须使用原始加载程序加载ckeditor使用的图标，
      2、ckeditor使用的css必须使用postcss发回以正确加载。
    */
    chainWebpack: config => {
        // (1.) To handle editor icons, get the default rule for *.svg files first:
        const svgRule = config.module.rule( 'svg' );

        // Then you can either:
        //
        // * clear all loaders for existing 'svg' rule:
        //
        //		svgRule.uses.clear();
        //
        // * or exclude ckeditor directory from node_modules:
        svgRule.exclude.add( path.join( __dirname, 'node_modules', '@ckeditor' ) );

        // Add an entry for *.svg files belonging to CKEditor. You can either:
        //
        // * modify the existing 'svg' rule:
        //
        //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
        //
        // * or add a new one:
        config.module
            .rule( 'cke-svg' )
            .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
            .use( 'raw-loader' )
            .loader( 'raw-loader' );

        // (2.) Transpile the .css files imported by the editor using PostCSS.
        // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
        config.module
            .rule( 'cke-css' )
            .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
            .use( 'postcss-loader' )
            .loader( 'postcss-loader' )
            .tap( () => {
                return styles.getPostCssConfig( {
                    themeImporter: {
                        themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
                    },
                    minify: true
                } );
            } );
    }
};
```

- 安装基础组件与自己要引用的插件 plugin

```
npm install --save @ckeditor/ckeditor5-editor-classic
```

```
npm install --save @ckeditor/ckeditor5-essentials
npm install --save @ckeditor/ckeditor5-basic-styles
npm install --save @ckeditor/ckeditor5-link
npm install --save @ckeditor/ckeditor5-paragraph
npm install --save @ckeditor/ckeditor5-theme-lark
```

- 在 Vue 的入口文件处引用

```
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );  //  全局使用
```

- 新建一个 vue 文件

```
<template>
    <div id="app">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
    //  因为我们是从源代码构建ckeditor，所以我们使用classiceditor的源代码版本。
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

    export default {
        name: 'app',
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    plugins: [
                        EssentialsPlugin,
                        BoldPlugin,
                        ItalicPlugin,
                        LinkPlugin,
                        ParagraphPlugin
                    ],

                    toolbar: {
                        items: [
                            'bold',
                            'italic',
                            'link',
                            'undo',
                            'redo'
                        ]
                    }
                }
            };
        }
    };
</script>
```

- 参考文档

> [CKEditor 官方文档](https://ckeditor.com/docs/index.html)

> [CKEditor Vue 使用官方文档](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html)
