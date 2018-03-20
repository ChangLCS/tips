# 关于 python import 自定义模块的问题

> python 的 import 与 js 有点类似，不过，关于路径的问题

* 假设文档目录是以下的样子

  * > run
  * > > doing.py
  * > main
  * > > main.py
  * > config.py

* 这个时候 **doing.py** 想引用 **config.py** ，如下代码

```
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(__file__, '../..')))

import config
```

> 重点就在第三行

`__file__`

> 当前文件的地址

`os.path.join(__file__, '../..')`

> 将地址返回到 config 所在的目录，`..`返回一层，具体要返回多少层就自己算吧

`os.path.abspath(os.path.join(__file__, '../..'))`

> 会将得到的地址，按从左到右的顺序，转成绝对路径，无论在什么环境下

`sys.path`

> 是 python 引入模块所找寻的地址，插在第一个是为了让其第一个找到

* 如果 **main.py** 想引用 **doing.py** 呢？

> 只要在**run**文件夹里面新建一个空的文件`__init__.py`

> 然后如下代码：

```
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(__file__, '../..')))

from run import doing
```

> or

```
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(__file__, '../..', run)))

import doing
```

* tips
  > 由于 python 没有花括号，完全通过缩进来控制`if..else`，`for`，`while`之类的判断或循环，所以，不要吝啬`pass`，这样看起来会方便点，加不加还有在哪里加就看个人习惯了
