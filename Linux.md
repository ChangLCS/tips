### 如果不小心改了 `/etc/profile` 导致所有命令失效

```
export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

该命令能使所有的 PATH 全局变量先变回来，然后再修改回原来的配置

### tar 解压

```
tar -xzvf .tar.gz
```

### 查看 liunx 进程

```
ps -ef | grep *
```

例如现在想看 nginx 的进程

```
ps -ef | grep nginx
```

### docker

[docker 安装教程](http://www.runoob.com/docker/centos-docker-install.html)<br> 安装完成之后要创建一个 **`container(容器)`** 跟 **`image(镜像)`**，需要用到 **`Dockerfile`**，进入到一个自己定义的目录，像我就随便新增了个目录，然后在里面新增了一个 **`Dockerfile`** 文件，内容如下：

```
FROM nginx:alpine

MAINTAINER ChangLCS<584911924@qq.com>

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
```

保存之后执行

```
docker build -t [image名称] [Docker所在目录]
```

结果如下图所示 ![docker build -t web-yinda .](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-build.png) <br>之后执行以下命令，如图所示

```
docker run -p [主机端口]:[image端口] -d [镜像名称]
```

![docker run -p 8081:80 -d web-yinda:latest](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-run.png) <br>此时镜像已经启动成功，将 _image 端口_ 映射到 _主机端口_ ，直接在页面就能访问了

### git runner

先在服务器上安装 **`gitlab-ci-multi-runner`** 安装方法在 <br>[https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)<br>

安装完成之后，前往项目如下配置获取 token <br> ![gitlab-token.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-token.png) <br> 然后在服务器中执行以下命令注册 **`gitlab-runner`**

```
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

![gitlab-register.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-register.png) <br> 这是我填的内容，可以参考一下。<br> 现在这样就算成功了，直接进去 gitlab 上的 _Setting > CI/CD_ 页面，可以看到 <br> ![gitlab-runner.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-runner.png) <br> 之后只要在自己的项目根目录编辑好 _.gitlab-ci.yml_ ，往线上推就行了，我写了一个很随便的，里面都是用命令的，很好上手，下面是最简单的演示 <br> ![gitlab-ci.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-ci.png) <br>
