### 如果不小心改了 `/etc/profile` 导致所有命令失效

```
# export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

该命令能使所有的 PATH 全局变量先变回来，然后再修改回原来的配置

### tar 解压

```
# tar -xzvf .tar.gz
```

### 查看 liunx 进程

```
ps -ef | grep *
```

例如现在想看 nginx 的进程

```
ps -ef | grep nginx
```

### docker ###
[docker安装教程](http://www.runoob.com/docker/centos-docker-install.html)
安装完成之后要创建一个 **`container(容器)`** 跟 **`image(镜像)`**，需要用到 **`Dockerfile`**，进入到一个自己定义的目录，像我就随便新增了个目录，然后在里面新增了一个 **`Dockerfile`** 文件，内容如下：
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
结果如下图所示
![docker build -t web-yinda .](https://raw.githubusercontent.com/ChangLCS/tips/develop/image/docker-build.png)

### git runner
先在服务器上安装 **`gitlab-ci-multi-runner`**
安装方法在 [https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)

安装完成之后，前往项目如下配置获取token
![gitlab-token.png](https://raw.githubusercontent.com/ChangLCS/tips/develop/image/gitlab-token.png)
然后在服务器中执行以下命令注册 **`gitlab-runner`**
```
gitlab-ci-multi-runner register
```