### 打包多页面配置导致的内存溢出问题

````
ERROR  Failed to compile with 1 errors                                                                                                                                                                                                                                                              15:20:37

  RangeError: Maximum call stack size exceeded

  - Array.join

  - loader.js:228 Function.Module._findPath
    internal/modules/cjs/loader.js:228:56

  - loader.js:591 Function.Module._resolveFilename
    internal/modules/cjs/loader.js:591:25

  - loader.js:520 Function.Module._load
    internal/modules/cjs/loader.js:520:25

  - loader.js:650 Module.require
    internal/modules/cjs/loader.js:650:17

  - helpers.js:20 require
    internal/modules/cjs/helpers.js:20:18

  - extract-chunks.js:35 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:35:22

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21

  - extract-chunks.js:44 getNames
    [vue-cli3]/[@vue]/preload-webpack-plugin/src/lib/extract-chunks.js:44:21
    ```
````

- [解决方法 https://github.com/ChangLCS/tips/blob/master/Linux.md](https://github.com/ChangLCS/tips/blob/master/Linux.md)
