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
