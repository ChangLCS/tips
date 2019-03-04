# Linux 安装 mysql 并配置帐号密码且远程访问

### 1、下载并安装 MySQL 官方的 Yum Repository

```
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

- 使用上面的命令直接安装 Yum Repository

```
yum -y install mysql57-community-release-el7-10.noarch.rpm
```

- 安装 MySQL 服务器

```
yum -y install mysql-community-server
```

### 2、MySQL 数据库设置

- 启动 MySQL，查看 mysql 运行情况

```
systemctl start mysqld.service
systemctl status mysqld.service
```

- 此时 MySQL 已经开始正常运行，需要找出 root 的密码

```
grep "password" /var/log/mysqld.log
```

- 如下命令登录 mysql

```
mysql -uroot -p
```

- 输入初始密码，此时不能做任何事情，因为 MYSQL 默认必须修改密码才能正常使用，使用以下方法修改 mysql 密码

- 里面输入新的密码，如果密码太简单会报错，请设置复杂点的

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

- 如果嫌麻烦可以修改密码策略

```
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
```

- 之后，还有一个问题就是 Yum Repository,以后每次 yum 操作都会自动更新，需要把这个卸载掉

```
yum -y remove mysql57-community-release-el7-10.noarch
```

- 配置远程访问权限

```
# 任何主机
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;

# 指定主机
mysql> GRANT ALL PRIVILEGES ON *.* TO 'jack'@’10.10.50.127’ IDENTIFIED BY '654321' WITH GRANT OPTION;

# 然后刷新权限
mysql> flush privileges;
```

- 修改 mysql 数据库总的 user 表使相的用户能从某一主机登录

```
mysql> use mysql;
mysql> update user set host = '%' where user = 'root';
mysql> select host, user from user;
```

### 3、客户端提供 MYSQL 的环境，但是不支持中文，通过以下命令可以查看 mysql 的字符集

```
mysql> show variables like 'character_set%';
```

- 为了让 MySQL 支持中文，需要把字符集改成 UTF-8，方法如下

```
vim /etc/mycnf
```

- 改成如下内容

```
[client]
port=3306
socket=/var/lib/mysql/mysql.sock
default-character-set=utf8

[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
character-set-server=utf8

[mysql]
no-auto-rehash
default-character-set=utf8

[mysqld_safe]
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

- 重启 mysql 服务

```
service mysql restart
```

- 重新查看数据库编码

```
mysql> show variables like 'character_set%';
```

### PS：流程就这么跑的，如果中间遇到问题，多找度娘
