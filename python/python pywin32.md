# python pywin32 接口模块

```
import win32gui
import win32api
import win32con
```

\*

* 找到所有开着的窗口进程

`win32gui.EnumWindows(callback, data)`

> callback： 每找一个回调一次
>
> > 窗口进程的唯一标识 id
> >
> > 之前传进去的参数 data

\*

* 拿窗口的进程名称

`win32gui.GetClassName(id)`

> id：窗口进程的唯一标识

\*

* 拿窗口的窗口名称

`win32gui.GetWindowText(id)`

> id：窗口进程的唯一标识

\*

* 找到某一个窗口进程唯一标识 id

`win32gui.FindWindow(className, windowText)`

> className 进程名称
>
> windowText 窗口名称
>
> > 返回一个窗口进程的对象
