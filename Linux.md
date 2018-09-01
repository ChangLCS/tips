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

### docker

[docker 安装教程](http://www.runoob.com/docker/centos-docker-install.html) 安装完成之后要创建一个 **`container(容器)`** 跟 **`image(镜像)`**，需要用到 **`Dockerfile`**，进入到一个自己定义的目录，像我就随便新增了个目录，然后在里面新增了一个 **`Dockerfile`** 文件，内容如下：

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

结果如下图所示 ![docker build -t web-yinda .](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-build.png) 之后执行以下命令，如图所示

```
docker run -p [主机端口]:[image端口] -d [镜像名称]
```

![docker run -p 8081:80 -d web-yinda:latest](https://raw.githubusercontent.com/ChangLCS/tips/master/image/docker-run.png) 此时镜像已经启动成功，将 _image 端口_ 映射到 _主机端口_ ，直接在页面就能访问了

### git runner

先在服务器上安装 **`gitlab-ci-multi-runner`** 安装方法在 [https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)

安装完成之后，前往项目如下配置获取 token ![gitlab-token.png](https://raw.githubusercontent.com/ChangLCS/tips/master/image/gitlab-token.png) 然后在服务器中执行以下命令注册 **`gitlab-runner`**

```
gitlab-ci-multi-runner register
```
