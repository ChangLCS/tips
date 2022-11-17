### Linux 配置全局变量

```sh
vim /etc/profile
```

如图所示，编辑 ![Linux 配置全局变量](https://raw.githubusercontent.com/ChangLCS/tips/master/image/linux-export.png)<br> 完成之后，输入一下命令重置权限，测试行不行

```sh
source /etc/profile
```

### 如果不小心改了 `/etc/profile` 导致所有命令失效

```sh
export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

该命令能使所有的 PATH 全局变量先变回来，然后再修改回原来的配置

### tar 解压

```sh
tar -xzvf .tar.gz
```

### 查看 liunx 进程

```sh
ps -ef | grep *
```

例如现在想看 nginx 的进程

```sh
ps -ef | grep nginx
```

### docker

[docker 安装教程](http://www.runoob.com/docker/centos-docker-install.html)<br> 安装完成之后要创建一个 **`container(容器)`** 跟 **`image(镜像)`**，需要用到 **`Dockerfile`**，进入到一个自己定义的目录，像我就随便新增了个目录，然后在里面新增了一个 **`Dockerfile`** 文件，内容如下：

```docker
FROM nginx:alpine

MAINTAINER ChangLCS<584911924@qq.com>

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
```

保存之后执行

```sh
docker build -t [image名称] [Docker所在目录]
```

结果如下图所示 ![docker build -t web-yinda .](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-build.png) <br>之后执行以下命令，如图所示

```sh
docker run -p [主机端口]:[image端口] -d [镜像名称]
```

![docker run -p 8081:80 -d web-yinda:latest](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-run.png) <br>此时镜像已经启动成功，将 _image 端口_ 映射到 _主机端口_ ，直接在页面就能访问了

### git runner

先在服务器上安装 **`gitlab-ci-multi-runner`** 安装方法在 <br>[https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)<br>

安装完成之后，前往项目如下配置获取 token <br> ![gitlab-token.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-token.png) <br> 然后在服务器中执行以下命令注册 **`gitlab-runner`**

```sh
gitlab-ci-multi-runner register
```

会出现下面的问题让你填

```
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
# 如果是在 gitlab.com 上的runner，直接照上面填，git私服就填自己的git地址

Please enter the gitlab-ci token for this runner:
# gitlab-ci token，就上面复制的那个

Please enter the gitlab-ci description for this runner:
# 描述，爱填不填

Please enter the gitlab-ci tags for this runner (comma separated):
# 运行的tags，可以随便填一个，之后可以直接在 gitlab 的页面修改

Please enter the executor: docker, parallels, ssh, virtualbox, kubernetes, docker-ssh, shell, docker+machine, docker-ssh+machine:
# 填写 gitlab-runner 执行的命令，我也不懂，直接选择的shell，然后都用命令行来跑，其它的方法得往后试一下

Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

```sh
gitlab-ci-multi-runner start           # gitLab-runner后台运行
```

![gitlab-register.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-register.png) <br> 这是我填的内容，可以参考一下。<br> 现在这样就算成功了，直接进去 gitlab 上的 _Setting > CI/CD_ 页面，可以看到 ![gitlab-runner.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-runner.png) <br> 之后只要在自己的项目根目录编辑好 _.gitlab-ci.yml_ ，往线上推就行了，我写了一个很随便的，里面都是用命令的，很好上手，下面是最简单的演示 ![gitlab-ci.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-ci.png)

### tips

经常遇到 gitlab-runner 权限不够，可以直接通过

```sh
vim /etc/passwd
```

改变 gitlab-runner 的权限变成 root 权限，这样文件的创建就没有任何问题了（个人做法，慎用） ![gitlab-ci-root.jpg](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-runner-root.jpg)

如果还是不行，则在root用户中，将文件夹权限赋予`gitlab-runner`用户，如下，建议创建一个公共的打包文件夹，进行权限赋予
```sh
chown -R 用户名 文件夹路径
```

### root 用户安装 node-sass 总是失败，提示权限问题

```sh
npm config set unsafe-perm=true
```

这是 npm 的权限设置，root 用户默认是 false，其它用户是 true，将其改成 true，用

```sh
npm config list
```

确认一下是否修改成功

![npm-unsafe-perm=true.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/npm-unsafe-perm=true.png) <br> 之后再安装应该就可以了

### cross-env

用 5.0.2 的版本，不然在 liunx 服务器会报错

### git

- 前往 [https://mirrors.edge.kernel.org/pub/software/scm/git/](https://mirrors.edge.kernel.org/pub/software/scm/git/)，下载最新的 git，或者自己找个版本，找 _.tar.gz_ 后缀的

```sh
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.18.0.tar.gz
```

- 解压

```sh
tar -zxvf git-2.18.0.tar.gz
```

- 进入解压出来的 git 文件夹

```sh
make configure
```

- - 如果报错了 `/bin/sh: autoconf: command not found`
- 安装 autoconf automake libtool

```sh
yum install autoconf automake libtool
```

- 打印出现 `GEN configure` 即正常，然后进行编译

```sh
./configure --prefix=/usr/local/git --with-iconv --with-curl --with-expat=/usr/local/lib
```

```sh
make && make install
make prefix=/usr all doc info
make prefix=/usr install install-doc install-html install-info
```

- - 如果报错 `cache.h:19:18: fatal error: zlib.h: No such file or directory` 安装 zlib，zlib-devel 后再执行 `make && make install`

```sh
yum install zlib
yum install zlib-devel
```

- - 如果报错 `/bin/sh: line 1: asciidoc: command not found` 安装 `asciidoc` (最好是安装 git 之前先把这些全做一遍)

```sh
wget https://nchc.dl.sourceforge.net/project/asciidoc/asciidoc/8.6.9/asciidoc-8.6.9.tar.gz
cd asciidoc-8.6.9
./configure
make install
yum install xmlto
```

- - 如果报错 `/bin/sh: line 1: docbook2x-texi: command not found`，安装

```sh
yum install docbook2X
cd /usr/bin/
ln -s db2x_docbook2texi docbook2x-texi
ln -s db2x_docbook2man docbook2x-man
```

- 装完了之后要配置全局变量

```sh
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/git/bin
```

- 重置全局变量

```sh
source /etc/bashrc
```

- 最后用 `git -v` 看一下命令是否出来了

### git fatal: Unable to find remote helper for 'https'

```sh
yum install curl-devel
```

- 然后前往 git 安装好的目录，如

```sh
cd /usr/local/src/git-2.18.0/
./configure --prefix=/usr/local/git -with-curl=/usr
make && make install
```

### 命令行头部加颜色、日期、绝对路径

- 前往 `~` 进入 `cd .bash_profile`，以下代码复制到最后一行，如下

```sh
export PS1="\e[36m\u\e[0m@\e[32m\h \e[0m \d \t \e[43\e[0m:\e[34m\w \e[0m\$ "
```

![. .bash_profile](https://raw.githubusercontent.com/ChangLCS/tips/master/image/bash_profile.png)

- 在执行下方命令另配置生效

```sh
. .bash_profile
```

- 结果如图所示 <br> ![bash_profile-return](https://raw.githubusercontent.com/ChangLCS/tips/master/image/bash_profile-return.png)
- 可前往 [漂亮的 Linux 命令提示符](https://www.cnblogs.com/cofear/p/PS1.html) 参考

### Linux 安装 nvm 以控制 nodejs 版本

- 前往 [git 地址](https://github.com/creationix/nvm/releases) 找到 `nvm` 安装包版本，然后输入命令，如下，将版本号换成自己想要的

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

- 重置全局变量，再查看是否安装成功或者直接安装需要版本的 nodejs

```sh
source ~/.bashrc
nvm install node
```

如果其它用户要使用，记得`vim /etc/profile`，将`$NVM_DIR`配置到全局变量，如图 ![nvm-path.jpg](https://raw.githubusercontent.com/ChangLCS/tips/master/image/nvm-path.jpg)

### pm2 监控 node

正常使用，只要用几个基本，需要其它另外使用 `pm2 -h` 查看程序帮助，这个里面已经很详细了，学好英文还是很重要的

```sh
pm2 start app.js -n app --watch
app.js        # 启动程序的路径
-n app        # pm2中启动程序的名称，最好要配置，方便管理
--watch       # 监听启动的程序，一旦文件改动自动重启

pm2 list      # 查看当前启动的所有程序
pm2 monit     # 实时监控所有程序的运行状态
pm2 stop [name|id]      # 暂停某一个程序的运行
pm2 stop all            # 暂停所有程序的运行
pm2 del [name|id]       # 删除某一个程序
pm2 kill                # 删除所有程序
# stop 跟 del|kill 的概念不一样的，试一下就知道了
```

###### 使用 pm2-logrotate 分割日志

```sh
pm2 install pm2-logrotate     # 安装
pm2 set pm2-logrotate:max_size 4096K      # 配置只要日志文件大于 4096K 则进行切割
```

```sh
pm2 log --lines 1000    # 查看最近的1000条日志
```

### linux 传输文件到本地

```sh
sz [filename|文件名称]
```

### 杀死进程（httpd 举例）

先查看目前所有的 httpd 进程

```sh
ps aux | grep httpd
```

如下所示

```sh
root      2091  0.0  0.1   5488  2832 ?        Ss   17:19   0:00 /web/apache//bin/httpd -k restart
daemon    2475  0.0  0.1 283220  2256 ?        Sl   17:45   0:00 /web/apache//bin/httpd -k restart
daemon    2476  0.0  0.1 283220  2260 ?        Sl   17:45   0:00 /web/apache//bin/httpd -k restart
daemon    2477  0.0  0.1 283220  2260 ?        Sl   17:45   0:00 /web/apache//bin/httpd -k restart
root      2738  0.0  0.0   5500   736 pts/0    S+   17:56   0:00 grep httpd
```

杀死进程，root 的留着

```sh
kill -9 2091
kill -9 2475
kill -9 2476
kill -9 2477
```

### 配置 openVPN

- 1.使用 [openVPN 安装脚本](https://github.com/ChangLCS/auto-openvpn-install-for-centos-debian-ubuntu) 该方法进行 openVPN 安装

- 2 安装完成后，修改 conf

```sh
vim /etc/openvpn/server.conf
```

![openvpn-01](https://raw.githubusercontent.com/ChangLCS/tips/master/image/openvpn/openvpn-01.png)<br> 加`;`是注释当前代码，使得不会当前上网不通过 vpn 通过，并加入一句

```sh
push "route 你的内网ip段 255.255.0.0"
```

查看内网 ip 段方法如下所示，输入`ip addr` <br>![openvpn-02](https://raw.githubusercontent.com/ChangLCS/tips/master/image/openvpn/openvpn-02.png)<br>

- 重启 openvpn

```sh
systemctl restart openvpn@server.service
```

- - tips：一定要开启防火墙

### 服务启动、开机启动、重启

- 启动

```sh
systemctl start firewalld（防火墙，也可以添加其它的服务）
```

- 开机启动

```sh
systemctl enable firewalld（防火墙，也可以添加其它的服务）
```

- 重启

```sh
systemctl restart firewalld（防火墙，也可以添加其它的服务）
```

### Centos 防火墙配置 firewall

- 查看 firewall 服务状态

```sh
systemctl status firewalld
```

- 查看 firewall 的状态

```sh
firewall-cmd --state
```

- 开启、重启、关闭、firewalld.service 服务

```sh
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop
```

- 查看防火墙规则

```sh
firewall-cmd --list-all
```

- 查询、开放、关闭端口

```sh
# 查询端口是否开放
firewall-cmd --query-port=8080/tcp
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp
# 移除端口
firewall-cmd --permanent --remove-port=8080/tcp


#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload

# 参数解释
# 1、firwall-cmd：是Linux提供的操作firewall的一个工具；
# 2、--permanent：表示设置为持久；
# 3、--add-port：标识添加的端口；
```

- - tips：如果各项配置没有问题，但访问不了线上，检查防火墙端口配置
