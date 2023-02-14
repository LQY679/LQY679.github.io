---
title: Docker
date: 2020-04-12 18:57:32
categories: 
- 运维
---



# Docker

> 参考文档:[💻 Docker 快速安装软件 - Docker 快速入门 - 易文档 (easydoc.net)](https://docker.easydoc.net/doc/81170005/cCewZWoN/AWOEX9XM)
>
> 官方文档:[Docker Documentation](https://docs.docker.com/)
>
> 官网:[Docker](https://www.docker.com/)

## 常见问题解决:

> [(61条消息) 【已解决】Error: Failed to download metadata for repo ‘appstream‘: Cannot prepare internal mirrorlist_ReadThroughLife的博客-CSDN博客](https://blog.csdn.net/weixin_43252521/article/details/124409151)
>
> 或:[(61条消息) CentOSyum安装报错“Error: Failed to download metadata for repo ‘AppStream‘: xxxx”_Indra_ran的博客-CSDN博客](https://blog.csdn.net/Indra_ran/article/details/123817631?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-123817631-blog-124409151.pc_relevant_landingrelevant&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-2-123817631-blog-124409151.pc_relevant_landingrelevant&utm_relevant_index=3)

```sh
# 容器 bash 没有 clear命令
dnf install ncurses -y
# 查看容器CentOS 系统版本
cat /etc/redhat-release
# 无法下载东西,容器需要配置镜像源
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

yum makecache # 建立yum缓存
# an'zhung
yum update -y
yum -y install vim
yum -y install net-tools
```

也可以通过Dockerfile打包镜像,Dockerfile内容如下:

```dockerfile
FROM centos
ENV mypath /tmp
WORKDIR $mypath
RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum makecache
RUN yum update -y
RUN yum -y install vim
RUN yum -y install net-tools
EXPOSE 80
CMD echo 'to be not success running'
CMD echo 'success------ok'
CMD /bin/bash
```





## 简介

**Docker 是什么**

Docker 是一个应用打包、分发、部署的工具
你也可以把它理解为一个轻量的虚拟机，它只虚拟你软件需要的运行环境，多余的一点都不要，
而普通虚拟机则是一个完整而庞大的系统，包含各种不管你要不要的软件。

### 跟普通虚拟机的对比

| 特性   | 普通虚拟机                                                   | Docker                                               |
| ------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| 跨平台 | 通常只能在桌面级系统运行，例如 Windows/Mac，无法在不带图形界面的服务器上运行 | 支持的系统非常多，各类 windows 和 Linux 都支持       |
| 性能   | 性能损耗大，内存占用高，因为是把整个完整系统都虚拟出来了     | 性能好，只虚拟软件所需运行环境，最大化减少没用的配置 |
| 自动化 | 需要手动安装所有东西                                         | 一个命令就可以自动部署好所需环境                     |
| 稳定性 | 稳定性不高，不同系统差异大                                   | 稳定性好，不同系统都一样部署方式                     |

### 打包、分发、部署

**打包**：就是把你软件运行所需的依赖、第三方库、软件打包到一起，变成一个安装包
**分发**：你可以把你打包好的“安装包”上传到一个镜像仓库，其他人可以非常方便的获取和安装
**部署**：拿着“安装包”就可以一个命令运行起来你的应用，自动模拟出一摸一样的运行环境，不管是在 Windows/Mac/Linux。
![image.png](Docker.assets/kv7rlicu.png)

### 部署的优势

常规应用开发部署方式：自己在 Windows 上开发、测试 --> 到 Linux 服务器配置运行环境部署。

> 问题：我机器上跑都没问题，怎么到服务器就各种问题了

用 Docker 开发部署流程：自己在 Windows 上开发、测试 --> 打包为 Docker 镜像（可以理解为软件安装包） --> 各种服务器上只需要一个命令部署好

> 优点：确保了不同机器上跑都是一致的运行环境，不会出现我机器上跑正常，你机器跑就有问题的情况。

例如 [易文档](https://easydoc.net/)，[SVNBucket](https://svnbucket.com/) 的私有化部署就是用 Docker，轻松应对客户的各种服务器。

### 通常用来做什么

- 应用分发、部署，方便传播给他人安装。特别是开源软件和提供私有部署的应用
- 快速安装测试/学习软件，用完就丢（类似小程序），不把时间浪费在安装软件上。例如 Redis / MongoDB / ElasticSearch / ELK
- 多个版本软件共存，不污染系统，例如 Python2、Python3，Redis4.0，Redis5.0
- Windows 上体验/学习各种 Linux 系统

### 重要概念：镜像、容器

**镜像**：可以理解为软件安装包，可以方便的进行传播和安装。
**容器**：软件安装后的状态，每个软件运行环境都是独立的、隔离的，称之为容器。



## 原理以及架构(待学)

### Docker的三个概念

1. **镜像（Image）**：类似于虚拟机中的镜像，是一个包含有文件系统的面向Docker引擎的只读模板。任何应用程序运行都需要环境，而镜像就是用来提供这种运行环境的。例如一个Ubuntu镜像就是一个包含Ubuntu操作系统环境的模板，同理在该镜像上装上Apache软件，就可以称为Apache镜像。
2. **容器（Container）**：类似于一个轻量级的沙盒，可以将其看作一个极简的Linux系统环境（包括root权限、[进程空间](https://www.zhihu.com/search?q=进程空间&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"23599229"})、用户空间和网络空间等），以及运行在其中的应用程序。Docker引擎利用容器来运行、隔离各个应用。容器是镜像创建的应用实例，可以创建、启动、停止、删除容器，各个容器之间是是相互隔离的，互不影响。注意：镜像本身是只读的，容器从镜像启动时，Docker在镜像的上层创建一个[可写层](https://www.zhihu.com/search?q=可写层&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"23599229"})，镜像本身不变。
3. **仓库（Repository）**：类似于代码仓库，这里是镜像仓库，是Docker用来集中存放[镜像文件](https://www.zhihu.com/search?q=镜像文件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"23599229"})的地方。注意与[注册服务器](https://www.zhihu.com/search?q=注册服务器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"23599229"})（Registry）的区别：注册服务器是存放仓库的地方，一般会有多个仓库；而仓库是存放镜像的地方，一般每个仓库存放一类镜像，每个镜像利用tag进行区分，比如Ubuntu仓库存放有多个版本（12.04、14.04等）的Ubuntu镜像。

![image-20221216085921561](Docker.assets/image-20221216085921561.png)



## 安装

### 在Window中安装

桌面版：https://www.docker.com/products/docker-desktop
服务器版：https://docs.docker.com/engine/install/#server

#### 配置镜像加速源

![img](https://sjwx.easydoc.xyz/46901064/files/l25jdwrn.png)



| 镜像加速器          | 镜像加速器地址                          |
| ------------------- | --------------------------------------- |
| Docker 中国官方镜像 | https://registry.docker-cn.com          |
| DaoCloud 镜像站     | http://f1361db2.m.daocloud.io           |
| Azure 中国镜像      | https://dockerhub.azk8s.cn              |
| 科大镜像站          | https://docker.mirrors.ustc.edu.cn      |
| 阿里云              | https://<your_code>.mirror.aliyuncs.com |
| 七牛云              | https://reg-mirror.qiniu.com            |
| 网易云              | https://hub-mirror.c.163.com            |
| 腾讯云              | https://mirror.ccs.tencentyun.com       |



### 在Linux中安装(重点):

> 视频教程:[哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Md4y1t7xS?p=4&vd_source=a67b19bba4b2eebaa16b72d8dfcfc061)
>
> 官方文档: https://docs.docker.com/engine/install/centos/

#### 准备工作:

##### **关闭防火墙:**

```sh
#关闭防火墙(临时关闭)
systemctl stop firewalld
#永久关闭防火墙
systemctl disable firewalld
#查看防火墙状态
systemctl status firewalld
```

##### **关闭Selinux:**

```sh
#打开配置文件:
vim /etc/selinux/config
#找到设置项并设置为: SELINUX=disable
```

##### **安装wget**

`wget`命令是Linux系统用于从Web下载文件的命令行工具，支持 HTTP、HTTPS及FTP协议下载文而且wget还提供了很多选项，例如下载多个文件、后台下载，使用代理等等，使用非常方便。

```sh
yum install wget -y 
```

##### **更换yum镜像源**

```sh
#进入下载源配置目录
cd /etc/yum.repos.d/
#创建一个备份文件夹
mkdir repo-bk
#将原来的配置源文件移动到备份文件夹中
mv *.repo repo-bk/
#下载镜像源
wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
#清空并重新更新一下缓存
yum clean all
yum makecache fast
```

##### **安装一些工具**

```sh
#(按需安装) 安装vim编辑器和查询网卡的工具
yum install -y vim net-tools.x86_64
yum -y install gcc
yum -y install gcc-c++
#工具包
yum install -y yum-utils
#更新缓存
yum makecache fast
```

##### 设置stable镜像仓库

需要设置是因为yum软件源是没有docker

```sh
#docker官网(不推荐)
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
#推荐使用阿里云镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast #更新软件源索引
```



#### 安装docker

```sh
#安装docker
yum -y install docker-ce docker-ce-cli containerd.io
#启动
systemctl start docker
#设置开机自启
systemctl enable docker 
#测试docker是否安装成功
docker version  #查看版本与信息
docker info
#测试(第一次过程需要从仓库拉取有些慢,需要耐心等待)
docker run hello-world
```

**普通用户免root运行docker**

```sh
#在普通用户在
su #切换到root用户
#添加组
groupadd docker
#修改普通用户所属组
usermod -aG docker 普通用户名
#重启docker
systemctl restart docker
#重启使用修改生效
reboot
```

**配置阿里云镜像加速**

> [容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

需要到阿里云登陆账号:

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://eh05r18s.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



## 镜像命令

![image-20221216091015101](Docker.assets/image-20221216091015101.png)



### 常用命令:

注: [options] 表示可选命令参数, tag代表镜像的版本

可以通过[hub.docker ](https://hub.docker.com/)查看详细的镜像以及版本号

```sh
docker images #查看本地镜像列表
docker search [options] 镜像名 #查找仓库中镜像,命令参数:  -limit n 指定列出的镜像数,默认25
docker pull 镜像名[:tag]    #从仓库中下载镜像到本地,可以在镜像名后追加标签号指定版本,不加是最新版
docker push 镜像名  #上传镜像到仓库
docker rmi [options] 镜像名或镜像id #删除指定的镜像,添加命令参数-f,可以通过镜像id删除或者删除多个
#删除多个: docker rmi 镜像id 镜像id
#删除全部镜像:docker rmi `docker images -q`
# 重命名镜像
docker image tag fb583c3ac45d  my_docker/test:latest
```



## 容器命令

![image-20221216094432646](Docker.assets/image-20221216094432646.png)

注意: 以下所说的容器名其实写容器id也可以,不过多赘述

**有镜像才能创建容器,这是前提**

以下例子	用Nginx和CentOS演示:

```sh
docker pull nginx #从仓库下载一个Nginx镜像
docker pull centos
```

#### 创建容器与配置

`docker run [OPTIONS] image [COMMAND] [ARG...]`

**OPTIONS说明（常用）**：有些是一个减号，有些是两个减号:

`-i`：以交互模式运行容器，**通常与 -t 同时使用；**

`-t`：为容器重新分配一个伪输入终端

上面两个**一般配合使用,并且大部分情况下是必须的**

`-d`: **后台运行容器并返回容器ID**，也即启动守护式容器(后台运行),在**大多数情况下,我们是希望Docker服务后台运行的**

`--name` "容器名字"  给容器定义个名字,不写则随机生成

`-p`: **指定**端口映射，小写p  

`-P`: **随机**端口映射，大写P

![image-20221216104902663](Docker.assets/image-20221216104902663.png)

例子:

```sh
#前台启动Nginx,开启端口映射
docker run -it --name nginxContainer -p 8080:80 nginx
#在Docker中启动一个CentOS虚拟机
docker run -it --name centosContainer centos
```

tips:

![image-20221216163024810](Docker.assets/image-20221216163024810.png)



`-v`命令参数涉及到容器卷的概念:

##### 容器卷

即将容器内部的文件路径与宿主机文件路径进行关联,(即每当容器或者宿主机关联的文件进行关联,修改其中一个,另一个也会改变)

我们将其操作称之为**容器卷挂载**

```sh
docker run -it -v /宿主机绝对路径目录:/容器内目录 镜像名
```

查看数据卷是否挂载成功,通过`docker inspect 容器ID`查看容器细节

![image-20221216203118412](Docker.assets/image-20221216203118412.png)

**补充**:

读写映射规则设置:

```sh
#默认rw
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录:rw

#容器实例内部被限制，只能读取不能写
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录:ro 镜像名
```

###### 卷的继承和共享:

![image-20221216204523681](Docker.assets/image-20221216204523681.png)

**实现:**

`docker run -it --privileged=true --volumes-from 父类容器 --name 容器名 镜像`

参数说明:

`--privileged=true` 用于解决文件权限问题

`--volumes-from`指定继承的父类容器



#### 容器交互命令

##### 退出容器

==当使用run进入容器后:==

使用快捷键:`ctrl+p+q 或 ctrl +p ctrl q`退出，**容器不停止**

输入命令: `exit`退出，**容器停止**

##### 进入后台容器

```sh
docker exec -it 容器ID bash #推荐使用
docker attach 容器ID
```

上述两者的区别:

`exec` 是在容器中打开新的终端，并且可以启动新的进程,**用exit退出，不会导致容器的停止**

`attach` 直接进入容器启动命令的终端，不会启动新的进程,**用exit退出，会导致容器的停止**。



##### 容器与宿主机通信

容器->宿主机

`docker cp 容器ID:容器内路径 目的主机路径`

宿主机->容器

`docker cp 宿主机路径 容器ID:容器内路径`

#### 更多命令

```sh
docker ps [options] #查看正在运行的容器
#options命令参数: -a 查看所有的参数, -q 只查看容器id
docker start 容器ID或者容器名  #启动已停止的容器
docker restart 容器ID或者容器名  #重启容器
docker stop 容器ID或者容器名  #停止容器
docker kill 容器ID或容器名  # 强制停止容器
docker rm 容器ID  #删除已经停止的容器
#补充: 删除全部容器docker rm `docker ps -a -q`

docker logs 容器ID  #查看容器的日志
docker top 容器ID   #查看容器运行的进程
docker inspect 容器ID  #查看容器内部细节
```

##### 容器导出与导入:

我们可以将自己的**容器打包成一个镜像**了,也可**引入打包好的容器文件为作为一个镜像(包含被包的容器的所有数据)**

`docker export 容器ID > 文件名.tar`

`docker import 文件名.tar 镜像名:镜像版本号` 



## 部署常用软件

> 搜索镜像:https://hub.docker.com/

总体分二步:

1. **搜索拉取镜像**
2. **创建容器**

### 安装mysql

> 参考:[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

拉取好镜像后,启动mysql服务

```sh
docker run -itd --name some-mysql -e MYSQL_ROOT_PASSWORD=设置的密码 -p 3306:3306  mysql:tag
```

不过上述方案存在一个问题:**即删除容器会导致数据丢失**

#### 实战部署

通过**挂载mysql容器卷**来实现数据解决上述问题

```sh
docker run -d -p 3306:3306 --privileged=true -v /opt/mysql/log:/var/log/mysql -v /opt/mysql/data:/var/lib/mysql -v /opt/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456  --name mysql mysql:5.7
```



### 安装Tomcat

跟上述同理,不过最新版有个bug,无法正常进入首页,把webapps..dist目录命名为webapps即可



### 安装Redis

1. 首先,创建一个存放配置文件的目录: `mkdir -p /opt/redis`
2. **redis.conf文件用xftp传输到/opt/redis目录下**
3. /opt/redis目录下修改redis.conf文件

![image-20221216220526846](Docker.assets/image-20221216220526846.png)

![image-20221216220603794](Docker.assets/image-20221216220603794.png)

![image-20221216220623731](Docker.assets/image-20221216220623731.png)

**最后挂载容器卷创建运行容器**

```sh
docker run  -p 6379:6379 --name redis --privileged=true -v /opt/redis/redis.conf:/etc/redis/redis.conf -v /opt/redis/data:/data -d redis:6.0.8 redis-server /etc/redis/redis.conf
```



## Dockerfile

Dockerfile是用来构建Docker镜像的文本文件，是由**一条条构建镜像所需的指令和参数构成的脚本。**

### 构建:

三个步骤:

1.编写Dockerfile文件 

2.`docker build`命令构建镜像 

3.docker run依镜像运行容器实例

#### 构建过程解析

每条保留字指令都**必须为大写字母**且后面要**跟随至少一个参数**

指令按照从上到下，顺序执行

\#表示注释

**每条指令都会创建一个新的镜像层并对镜像进行提交**



### 常用保留字

![image-20221216223048722](Docker.assets/image-20221216223048722.png)

### 案例:

下面的案例将构建一个带有Java环境和`ifconfig`命令的CentOS系统

#### 准备好需要打包的文件

即jdk , **注意jdk需要放到与Dockerfile文件同级目录下**

```sh
#创建一个存放构建镜像的目录
mkdir /opt/centos
#新建并编写一个Dockerfile文件, 注意D一定要是大写 (内容在后面)
vim Dockerfile
```

`Dockerfile`文件内容

```dockerfile
#基础镜像,即从什么镜像开始构建
FROM centos:latest

#设置最新yum镜像仓库地址
RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum makecache

#设置镜像默认工作路径,即进入容器后会默认来到这个目录 
WORKDIR /usr/local

#安装ifconfig网络工具
RUN yum -y install net-tools

#安装 Java8依赖库
RUN yum -y install glibc.i686

#创建java的路径
RUN mkdir /usr/local/java

#将java安装包添加到容器中
ADD jdk-8u171-linux-x64.tar.gz /usr/local/java

#设置Java环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_171
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV PATH $JAVA_HOME/bin:$PATH

CMD echo "success......ok"
CMD /bin/bash
```

#### 打包构建

在准备好文件和Dockerfile后就可以使用命令打包了

```sh
docker build -t 镜像名:TAG(版本号) . #注意后面有个. 千万不能漏,代表当前目录

#可以查看镜像的构建历史日志
docker history 镜像名
```

随后用此镜像创建运行centos容器就可以执行`ifconfig` 和`java`相关的命令





## 微服务部署

假设已经有开发好的SpringBoot应用jar包

我们需要打包构建一个镜像,并用如下的`Dockerfile`脚本进行构建镜像

```dockerfile
#根据java8构建镜像
FROM java:8
#默认工作目录
WORKDIR /opt/java
#添加jar包
ADD docker-springboot-1.0-SNAPSHOT.jar /opt/java
#暴露端口
EXPOSE 6002
#执行命令(不会被覆盖)
ENTRYPOINT ["java","-jar"]
CMD ["/opt/java/docker-springboot-1.0-SNAPSHOT.jar"] 
#当执行docker run 时的 bash默认参数,可被命令参数覆盖,即不写默认执行:
#docker run -itd --name 容器名 java -jar /opt/java/docker-springboot-1.0-SNAPSHOT.jar
#写了就会将其替换为:
#docker run -itd --name 容器名 java -jar 自己写的参数
```

随后构建微服务的镜像:

```sh
docker build -t 镜像名:TAG(版本号) .
```

然后`docker run ...` 即可启动服务



## Docker-Compose

Docker-Compose是Docker官方的开源项目，**负责实现对Docker容器集群的快速编排。**

```sh
#安装
yum install -y docker-compose-plugin
#检查是否安装成功
docker compose version
```



### Compose使用的三个步骤

1. 编写`Dockerfile`定义各个微服务应用并**构建出对应的镜像文件**
2. 使用 `docker-compose.yml`，定义一个完整业务单元，**安排好整体应用中的各个容器服务执行顺序**。
3. 最后，执行`docker compose up`命令 来**启动并运行整个应用程序，完成一键部署上线**

### 案例

下面将演示一个简单的SpringBoot应用依赖于MySQL和redisf服务的部署过程

即 **要先启动MySQL 和 redis 服务后,再启动Springboot服务**

首先编写`Dockerfile`定义各个微服务应用并**构建出对应的镜像文件**

`Dockerfile`内容

```dockerfile
FROM java:8

WORKDIR /opt/java

ADD docker-springboot-1.0-SNAPSHOT.jar /opt/java

EXPOSE 6002

ENTRYPOINT ["java","-jar"]
CMD ["/opt/java/docker-springboot-1.0-SNAPSHOT.jar"]
```

随后构建镜像: `docker build -t 镜像名:版本号`

> yaml文件语法: [yaml语法](https://blog.csdn.net/weixin_43340943/article/details/105953673?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-105953673-blog-100577740.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-105953673-blog-100577740.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=2)

然后编写`docker-compose.yml`文件

```yaml
#compose版本
version: "3"
#compose需要组合编排的服务: springboot应用,mysql,redis
services:
  #springboot服务的相关配置
  docker-springboot:
    image: docker-springboot:latest   #用哪个镜像docker run容器
    container_name: docker-springboot  #定义创建的容器名
    ports:  #暴漏端口: 相当于 docker run -p 6001:6001
      - "6001:6001"
    networks:  #所属compose创建的局域网
      - ptu202180 
    depends_on:   #依赖的服务,即只有依赖的服务启动后,才会启动该服务
      - redis 
      - mysql
      
  #redis服务的相关配置
  redis:
    image: redis:6.0.8
    ports:
      - "6379:6379"
    volumes: #相当于 docker run -v 的挂载容器卷
      - /opt/redis/redis.conf:/etc/redis/redis.conf
      - /opt/redis/data:/data
    networks: 
      - ptu202180
    #使用配置文件启动redis命令  
    command: redis-server /etc/redis/redis.conf

  mysql:
    image: mysql:5.7
    #设置mysql登陆密码,数据库等
    environment:
      MYSQL_ROOT_PASSWORD: '123456'
      MYSQL_ALLOW_EMPTY_PASSWORD: 'no'
      MYSQL_DATABASE: 'ptu'
    ports:
       - "3306:3306"
    volumes:
       - /opt/mysql/data:/var/lib/mysql
       - /opt/mysql/conf/my.cnf:/etc/my.cnf
       - /opt/mysql/init:/docker-entrypoint-initdb.d
       - /opt/mysql/log:/var/log/mysql
    networks:
      - ptu202180
    command: --default-authentication-plugin=mysql_native_password #解决外部无法访问
#组件局域网,名为ptu202180    
networks: 
   ptu202180: 
```

最后组合创建并执行排编好的微服务,注意**执行` docker compose up`命令目录必须与docker-compose.yml一致**

也可以使用 `-d `命令参数后台运行

#### 补充:

`docker-compose.yml`文件中的`networks`配置项用于在一个compose编排的微服务中**构建一个内部共享的局域网,即:其内部的各个服务(springboot,mysql,redis)处于同一局域网下可以互相访问** ***(注: 详细原理请看docker 网络的自定义网络)***

那么我们的springboot的mysql等数据库的连接配置就不必写成:

`jdbc:mysql://IP地址:3306/bike_db?serverTimezone=Asia/Shanghai`

而是**可以用服务名代替**,即:

`jdbc:mysql://服务名(本例中是:mysql):3306/bike_db?serverTimezone=Asia/Shanghai`



### Compose常用命令:

```sh
docker compose up                           # 启动所有docker-compose服务
docker compose up -d                        # 启动所有docker-compose服务并后台运行
docker compose down                         # 停止并删除容器、网络、卷、镜像。
docker compose stop      # 停止服务
docker compose restart   # 重启服务
docker compose start     # 启动服务
docker compose -h   #查看帮助   
```



## Docker网络

总体介绍:

| 网络模式                 | 介绍                                         |
| ------------------------ | -------------------------------------------- |
| bridge模式**(默认模式)** | 使用`--network bridge`指定，默认使用docker0  |
| host模式                 | 使用`--network host`指定                     |
| container模式：          | 使用`--network container:NAME`或者容器ID指定 |
| none模式                 | 使用-`-network none`指定                     |

### Bridge模式

Docker使用Linux桥接，**在宿主机虚拟一个Docker容器网桥(docker0)**，Docker**启动一个容器时会根据Docker网桥的网段分配给容器一个IP地址**，称为Container-IP，同时**Docker网桥是每个容器的默认网关。因为在同一宿主机内的容器都接入同一个网桥，这样==容器之间就能够通过容器的Container-IP直接通信==。**

`docker run` 的时候，**没有指定network的话默认使用的网桥模式就是bridge**，使用的就是docker0。在宿主机`ifconfig`,就可以看到docker0和自己create的network(后面讲)eth0，eth1，eth2……代表网卡一，网卡二，网卡三……，lo代表127.0.0.1，即localhost，inet addr用来表示网卡的IP地址

**网桥docker0创建一对对等虚拟设备接口一个叫veth，另一个叫eth0，成对匹配。**

1. **整个宿主机的网桥模式都是docker0**，类似一个交换机有一堆接口，**每个接口叫veth，在本地主机和容器内分别创建一个虚拟接口，并让他们彼此联通（这样一对接口叫veth pair）**；

2. **每个容器实例内部也有一块网卡，每个接口叫eth0**；

3. **docker0上面的每个veth匹配某个容器实例内部的eth0，两两配对，一一匹配。**

 通过上述，将宿主机上的所有容器都连接到这个内部网络上，两个容器在同一个网络下,会从这个网关下各自拿到分配的ip，此时两个容器的网络是互通的。

![image-20221217110542073](Docker.assets/image-20221217110542073.png)

Docker 服务默认会创建一个 docker0 网桥（其上有一个 docker0 内部接口），该桥接网络的名称为docker0，它在内核层连通了其他的物理或虚拟网卡，这就将所有容器和本地主机都放到同一个物理网络。**Docker 默认指定了 docker0 接口 的 IP 地址和子网掩码，让宿主机和容器之间可以通过网桥相互通信。**

```sh
# 查看 bridge 网络的详细信息，并通过 grep 获取名称项
docker network inspect bridge | grep name
#查看网卡信息
ifconfig
```

![image-20221217110941949](Docker.assets/image-20221217110941949.png)

#### 案例:

**结论: IP地址随容器顺序递增且动态分配**

1 先启动两个ubuntu容器实例

![image-20221217113713903](Docker.assets/image-20221217113713903.png)

2 `docker inspect 容器ID or 容器名字`

![image-20221217113737706](Docker.assets/image-20221217113737706.png)

![image-20221217113749785](Docker.assets/image-20221217113749785.png)

3 关闭u2实例

![image-20221217113817848](Docker.assets/image-20221217113817848.png)

4 新建u3，查看ip变化

![image-20221217113838378](Docker.assets/image-20221217113838378.png)





### host模式

**直接使用宿主机的 IP 地址与外界进行通信**，不再需要额外进行NAT 转换。

容器将**不会获得一个独立的Network Namespace**， 而是和宿主机共用一个Network Namespace。容器将**不会虚拟出自己的网卡而是使用宿主机的IP和端口。**

![image-20221217113411614](Docker.assets/image-20221217113411614.png)

问题：

![image-20221217113456800](Docker.assets/image-20221217113456800.png)

   docke启动时总是遇见标题中的警告

原因：

  docker启动时指定`--network host或-net=host`，如果**还指定了-p映射端口，那这个时候就会有此警告**，

并且**通过`-p`设置的参数将不会起到任何作用，端口号会以主机端口号为主**，**重复时则递增**。

解决:

  解决的办法就是**使用docker的其他网络模式**，例如`--network=bridge`，这样就可以解决问题，或者直接无视。



### none模式

在none模式下，并**不为Docker容器进行任何网络配置(禁用网络功能)**。 也就是说，这个Docker容器没有网卡、IP、路由等信息，只有一个lo

需要我们自己为Docker容器添加网卡、配置IP等。

```sh
docker run -d -p 8084:8080 --network none --name 容器名 镜像名
```



### container模式

**新建的容器和已经存在的一个容器共享一个网络ip配置**而不是和宿主机共享。**新创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围等**。同样，两个容器**除了网络方面，其他的如文件系统、进程列表等还是隔离的。**

![image-20221218000138880](Docker.assets/image-20221218000138880.png)

```sh
# 创建容器2,并且与已经存在的容器1共享网卡,同时也无法与宿主机进行端口映射
docker run -it --network container:容器1 --name 容器2 镜像名 bash
```



### 自定义网络

我们可以通过`docker network create 网络名`自定义**创建一个局部网来实现容器名(服务名)与其容器的IP地址绑定**,即可以使用服务名来代表该服务容器的ip地址,自定义网络默认使用的是桥接(Bridge)模式

#### 相关命令:

```sh
docker network ls #查看所有的网络(列表)
docker network create 网络名 #创建网络
```

#### 案例:

![image-20221218002108621](Docker.assets/image-20221218002108621.png)

![image-20221218002129091](Docker.assets/image-20221218002129091.png)





## Harbor私有镜像仓库搭建

**硬件要求:**

![image-20221218004121846](Docker.assets/image-20221218004121846.png)

### 安装Harbor

1.在opt下创建文件夹harbor

2.上传安装包到harbor文件夹下

3.上传安装包到harbor文件夹下

```sh
#在/opt/harbor目录下执行!
cp harbor.yml.tmpl  harbor.yml
mkdir -p /opt/harbor/data     #用于存放harbor的持久化数据
```

### 修改配置文件

**harbor.yml配置文件主要修改参数如下：**

![image-20221218004651207](Docker.assets/image-20221218004651207.png)

设置内容:

```yaml
#设置主机地址，可以使用ip、域名，不可以设置为127.0.0.1或localhost。默认情况下，harbor使用的端口是80
hostname: 192.168.0.8

#http配置
http:
# port for http, default is 80. If https enabled, this port will redirect to https port
port: 9999
#https配置（如不需要可不配置,注释掉）

# https related config

#https:
# https port for harbor, default is 443
 #port: 443
# The path of cert and key files for nginx
 #certificate: /your/certificate/path
 #private_key: /your/private/key/path
#external_url: https://reg.mydomain.com:8433      //如果要启用外部代理,比如外层的NGINX、LB等，请取消注释external_url,当它启用时，hostname将不再使用。
```

![image-20221218004855003](Docker.assets/image-20221218004855003-16712957366981.png)

数据库配置:

```yaml
#数据库配置
database:
# The password for the root user of Harbor DB. Change this before any production use.
password: root123
# The maximum number of connections in the idle connection pool. If it <=0, no idle connections are retained.
max_idle_conns: 50
# The maximum number of open connections to the database. If it <= 0, then there is no limit on the number of open connections.
# Note: the default number of connections is 100 for postgres.
max_open_conns: 100
```

**持久化数据目录:**

```yaml
data_volume: /opt/harbor/data
```

![image-20221218005044116](Docker.assets/image-20221218005044116.png)

### 执行安装脚本:

在`/opt/harbor/`目录下,执行 `./install.sh`

### 网页可视化访问:

![image-20221218005326603](Docker.assets/image-20221218005326603.png)

#### 新建项目

![image-20221218005400773](Docker.assets/image-20221218005400773.png)



### 本地镜像推送harbor

#### docker登录到harbor

```sh
docker login ip地址:harbor端口
```

**可能出现错误:**

![image-20221218005520373](Docker.assets/image-20221218005520373.png)

**原因：**Docker自从1.3.X之后docker registry交互默认使用的是HTTPS，但是我们搭建私有镜像默认使用的是HTTP服务，所以与私有镜像交时出现以上错误。

**解决方案：**

修改docker配置文件

`vim /etc/docker/daemon.json`

添加行：`"insecure-registries":["IP地址:harbor端口"]`

![image-20221218005621694](Docker.assets/image-20221218005621694.png)

随后执行命令:

```sh
#重新加载docker配置
systemctl daemon-reload

#重启docker
systemctl restart docker

#重新启动harbor
cd /opt/harbor/harbor
docker-compose down
docker-compose up -d
```

重新利用docker登录到harbor，显示登录成功：

![image-20221218005731719](Docker.assets/image-20221218005731719.png)

**对本地镜像进行重新命名，命名要求参考harbor指示：**

![image-20221218010121967](Docker.assets/image-20221218010121967-16712964830762.png)

![image-20221218010139808](Docker.assets/image-20221218010139808.png)

比如我们**想把hello-world镜像推到harbor，**具体过程如下：

#### (1)首先确认镜像存在

```sh
docker images
```

![image-20221218010238586](Docker.assets/image-20221218010238586.png)

#### **(2)重命名镜像**

**按harbor命名要求重新给hello-world命名**

```sh
dokcer tag hello-world 仓库IP地址:harbor端口/项目名/推送的镜像名:版本
```

![image-20221218010355425](Docker.assets/image-20221218010355425.png)

#### **(3)推送到harbor上**

```sh
docker pull 按规范命名好的镜像名
```

![image-20221218010636602](Docker.assets/image-20221218010636602.png)

**网页上刷新确认**

![image-20221218010733995](Docker.assets/image-20221218010733995.png)

### 拉取harbor镜像

#### (1)利用docker登录到harbor

#### (2)在网页上点击要拉取的镜像

![image-20221218010901675](Docker.assets/image-20221218010901675.png)

![image-20221218010912112](Docker.assets/image-20221218010912112.png)

![image-20221218010922685](Docker.assets/image-20221218010922685.png)

随后到终端运行复制的命令即可



## docker可视化web工具

Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。

### 安装步骤

```sh
#拉取镜像
docker pull portainer/portainer
#创建文件夹并且开放文件夹权限
mkdir -p /opt/portainer && chmod 777 -R portainer
```

**创建配置文件`docker-compose.yml`**

```sh
#在/opt/portainer下:
vim docker-compose.yml
```

`docker-compose.yml`文件内容

```yaml
version: "3.6"
services:
    portainer:
        container_name: portainer
        image: portainer/portainer:latest
        restart: always
        ports:
         - "9000:9000"
         - "8000:8000"
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock:rw
            - /opt/portainer/data:/data:rw
        logging:
            driver: "json-file"
            options:
                max-size: "10m"
```

**启动:**

```sh
docker compose up -d
```

**访问测试**

![image-20221218094758456](Docker.assets/image-20221218094758456.png)

选择docker类型:

![image-20221218094822453](Docker.assets/image-20221218094822453.png)

主界面

![image-20221218094837357](Docker.assets/image-20221218094837357.png)



### 单个部署

#### 创建局域网

对应命令: `dicker network create 网络名 `

![image-20221218095043425](Docker.assets/image-20221218095043425.png)

![image-20221218095054908](Docker.assets/image-20221218095054908.png)

#### 部署mysql

![image-20221218095339811](Docker.assets/image-20221218095339811.png)

![image-20221218095401453](Docker.assets/image-20221218095401453.png)

![image-20221218095445291](Docker.assets/image-20221218095445291.png)

![image-20221218095502887](Docker.assets/image-20221218095502887.png)

![image-20221218095528464](Docker.assets/image-20221218095528464.png)

![image-20221218095616371](Docker.assets/image-20221218095616371.png)

![image-20221218095627995](Docker.assets/image-20221218095627995.png)



#### 部署redis

在Home页面进入 Container-> Add Container

![image-20221218095811968](Docker.assets/image-20221218095811968.png)

![image-20221218095825486](Docker.assets/image-20221218095825486.png)

![image-20221218095839094](Docker.assets/image-20221218095839094.png)

![image-20221218095850255](Docker.assets/image-20221218095850255.png)

![image-20221218095901726](Docker.assets/image-20221218095901726.png)



### 堆积部署

#### 1.创建堆叠容器

![image-20221218192835688](Docker.assets/image-20221218192835688.png)

#### 2.命名

![image-20221218192855022](Docker.assets/image-20221218192855022.png)

#### 3.编写配置文件

相当于编写`docker-compose.yml`文件

![image-20221218193057218](Docker.assets/image-20221218193057218.png)

#### 4.启动部署

![image-20221218193203743](Docker.assets/image-20221218193203743.png)

![image-20221218193223636](Docker.assets/image-20221218193223636.png)

