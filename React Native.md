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

#### apk 打包

###### 生成一个签名密钥

你可以用 `keytool` 命令生成一个私有密钥。在 Windows 上 `keytool` 命令放在 `JDK` 的 `bin` 目录中（比如 `C:\Program Files\Java\jdkx.x.x_x\bin`），你可能需要在命令行中先进入那个目录才能执行此命令。

```
keytool -genkeypair -v -keystore app-react-native.develop.keystore -alias app-react-native-develop -keyalg RSA -keysize 2048 -validity 50000
```

填写情况借鉴以下填写<br> ![react-native/img-01](https://raw.githubusercontent.com/ChangLCS/tips/master/image/react-native/img-01.png)

之后参考 [React Native 中文网](https://reactnative.cn/docs/signed-apk-android/)
