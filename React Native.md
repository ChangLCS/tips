## React Native 开发遇到的一点小坑

#### Adb reverse 总是执行失败

`react-native run-android`总是无法调试或者热刷新，报如下错误

```
Adb reverse tcp:8081 tcp:8081
error: cannot bind listener: Operation not permitted
```

一般是因为`adb`版本不对或者权限不够，如果权限不够，则杀死所有的 adb 进程，并执行

```
adb root
```
