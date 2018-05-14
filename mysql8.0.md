## mysql8.0 远程链接报错解决

如果出现以下错误

```
Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

则用命令行在 mysql 运行的情况下

```
USE mysql; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '831015'; FLUSH PRIVILEGES;
```

-p root 是用户名，localhost 是 ip 地址 127.0.0.1 都是特指本机，mysql_native_password 是旧的密码验证机制，831015 是密码，最后别忘了分号；

#### 怎么在命令行直接使用 mysql，不装其它软件

将 mysql 配置到环境变量，或者，进入到 mysql 的安装目录下，-h 数据库地址，-u 用户

```
mysql -h localhost -u root -p
```
