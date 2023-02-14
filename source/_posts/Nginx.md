---
title: Nginx
date: 2020-04-12 18:57:32
categories: 
- 运维
---



# Nginx

## 简介:

Nginx (engine x) 是一个**高性能的HTTP和反向代理web服务器**，同时也提供了**IMAP/POP3/SMTP服务**。

其特点是**占有内存少，并发能力强**，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。在全球活跃的网站中有12.18%的使用比率，大约为2220万个网站。

Nginx 是一个安装非常的简单、配置文件非常简洁（还能够支持perl语法）、Bug非常少的服务。**Nginx 启动特别容易，并且几乎可以做到7*24不间断运行，即使运行数个月也不需要重新启动。**你还能够不间断服务的情况下进行软件版本的升级。

Nginx代码完全用C语言从头写成。官方数据测试表明能够支持高达 50,000 个并发连接数的响应。

### Nginx产生

一个公司的项目刚刚上线的时候，并发量小，用户使用的少，所以在低并发的情况下，一个 jar 包启动应用就够了，然后内部 tomcat 返回内容给用户

![image-20221218214310098](Nginx.assets/image-20221218214310098.png)

慢慢的，使用平台的用户越来越多了，并发量慢慢增大了，这时候一台服务器满足不了我们的需求了

![image-20221218214419279](Nginx.assets/image-20221218214419279.png)

于是我们横向扩展，又增加了服务器。这个时候几个项目启动在不同的服务器上，用户要访问，就需要增加一个**代理服务器**了，通过代理服务器来帮我们转发和处理请求。

![image-20221218214436378](Nginx.assets/image-20221218214436378.png)

我们希望**这个代理服务器可以帮助我们接收用户的请求，然后将用户的请求按照规则帮我们转发到不同的服务器节点之上**。这个过程用户是无感知的，用户并不知道是哪个服务器返回的结果，我们还希望他可以按照服务器的性能提供不同的权重选择。保证最佳体验！所以我们使用了Nginx。



### 作用

**Http代理，反向代理**：作为web服务器最常用的功能之一，尤其是反向代理。

代理分为**正向代理和反向代理**:

> 正向代理：代理客户端

![image-20221218215240706](Nginx.assets/image-20221218215240706.png)

> 反向代理 ：代理服务端

所以用户是无感知的，比如，百度的服务器是在不同的服务器上，我们只需要搜索 baidu.com 就行。

![image-20221218215343482](Nginx.assets/image-20221218215343482.png)

### 负载均衡策略

Nginx提供的负载均衡策略有2种：**内置策略**和**扩展策略**。内置策略为**轮询，加权轮询**，**ip hash**。扩展策略,即自定义策略

#### 内置策略:

##### **轮询: **

每个请求按时间顺序分配到不同的后端服务器，**如果服务器down掉，能自动剔除**

![image-20221218215607179](Nginx.assets/image-20221218215607179-16713717686961.png)

##### **加权轮询**: 

通过给服务增加权重来决定具体请求服务器

![image-20221218215706575](Nginx.assets/image-20221218215706575.png)

##### **ip Hash**:

**对客户端请求的 ip 进行 hash 操作**，然后**根据 hash 结果决定请求分发给哪一台服务器进行处理，**可以**解决 session 不共享的问题**(只要客户端IP不变,每次请求的都是同一个台服务器)

![image-20221218220103315](Nginx.assets/image-20221218220103315.png)

##### **fair(第三方):**

**按后端服务器的响应时间来分配请求，响应时间短的优先分配**



#### 动静分离:

Nginx可以将我们的请求的资源根据静态资源(图片,js,css等资源)还是动态资源(后端接口)进行区分:

**静态资源直接请求Nginx**, **动态资源再请求服务器**

![image-20221218220631909](Nginx.assets/image-20221218220631909.png)



## Nginx安装

### windos下:

直接下载安装即可



### Linux

发行版: CentOS 7

> 参考:https://www.yuque.com/wukong-zorrm/cql6cz

 准备工作:

```sh
# 关闭并精用防火墙
sudo systemctl stop firewalld
sudo systemctl disable firewalld
#修改/etc/selinux/config，设置SELINUX=disabled （永久有效，需重启）

#安装网络工具包,有就不用了
sudo yum install yum-utils net-tools
# 添加Nginx下载源
cat > /etc/yum.repos.d/nginx.repo << EOF
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/\$releasever/\$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF

#安装Nginx
sudo yum install nginx
```



## Nginx相关命令

```sh
whereis nginx  # 查找安装路径

# 使用nginx必须进入sbin目录，需要先找到nginx的安装目录 进入sbin目录执行以下命令
./nginx #启动
./nginx -v  #查看版本号
./nginx -s stop
./nginx -s quit
./nginx -s reload
# ./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。
# ./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。

#重新加载配置文件，相当于 systemctl reload nginx
nginx -s reload
#将日志写入一个新的文件
nginx -s reopen
#测试配置文件
nginx -t

# 查看nginx状态
systemctl status nginx
#产看日志
journalctl -xe

#配置开机启动
systemctl enable nginx
```



## 配置文件

Linux版本的配置文件: `/etc/nginx/nginx.conf`

默认配置信息:` /etc/nginx/conf.d/default.conf`

## 配置文件详解

由三部分组成

### 全局块

从配置文件开始到events块之间的内容，主要会**设置一些影响nginx服务器整体运行的配置指令**，主要包括**配置运行Nginx服务器的用户组**，**允许生成的worker process数**，**进程PID存放路径**，**日志存放路径和类型以及配置文件的引入**等

### 第二部分 events块

events块涉及的指令主要**影响Nginx服务器与用户的网络连接**，这部分的配置**对Nginx的性能影响较大**，在实际中应该灵活配置

### 第三部分 http块

Nginx服务器**配置中最频繁的部分**，**http块也可以包括http全局块、server块**

#### http全局块:

http全局块配置的指令包括**文件引入、MIME-TYPE定义，日志自定义，连接超时时间、单链接请求数上限**等

#### **server块**:

这**块和虚拟主机有密切关系**，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本

每个http块可以包括多个srever块，而**每个server块就相当于一个虚拟主机**，而每个server也分为**全局server块**以及可以同时包含多个**location块**

- **全局server块**:最常见的配置时本虚拟机主机的监听配置和本虚拟机主机的名称或IP配置
- **location块**: **一个server块可以配置多个location块**，这块的作用是**基于nginx服务器接收到的请求字符串，对虚拟注解名称之外的字符串进行匹配**，对特定的**请求进行处理，地址定向、数据缓存和应答控制等功能**，还有许多第三方模块的配置也在这里进行



### 文件内容

```yaml

user  nginx;
#worker_processes越大，可以支持的并发处理数量也越多，但是会受到硬件，软件等设备的制约
worker_processes  auto;

#错误日志
error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
	#表示每个work process支持的最大连接数为1024
    worker_connections  1024;
}

http {
	# 引入/etc/nginx/mime.types文件的内容,包含了可以处理的资源类型
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #日志
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    #gzip  on, 引入了/etc/nginx/conf.d/*.conf文件,包含了监听端口,代理配置等信息
    include /etc/nginx/conf.d/*.conf;
}

```

默认情况下,`/etc/nginx/conf.d/*.conf`只有一个默认配置文件`default.conf`,内容如下:

```yaml
server {
	# 默认监听 localhost的 80端口
    listen       80;  
    listen  [::]:80;
    server_name  localhost; #主机名(即ip地址)

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
    	#页面文件根目录,类似tomcat的webapps/Root目录
        root   /usr/share/nginx/html;
        #首页
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```





## 配置实例

### 配置实例-反向代理

> 案例一:

实现效果：打开浏览器，在浏览器地址栏输入地址`www.123.com`，跳转Linux系统tomcat主页面中

准备工作：在linux中安装tomcat, 并启动tomcat

具体实现：在windows的host文件中加入 `装有nginx虚拟机ip www.123.com`

nginx也修改配置文件添加配置:

```yaml
http {
	# ...
	server {
		listen 80;
		# localhost指:nginx主机ip,根据实际情况来
		server_name localhost ;
		# 资源映射
		location / {
			root html
        	index index,html index.htm
        	# 代理配置: 访问nginx服务器的 / 目录就会转发到 127.0.0.1:8080
        	proxy_pass http://127.0.0.1:8080
		}
	}
	
}
```



> 案例二:

实现效果：使用nginx反向代理，**根据访问的路径跳转到不同端口的服务中**，nginx监听端口为9001

访问 http://127.0.0.1:9001/edu/ 直接跳转到127.0.0.1:8080

访问 http://127.0.0.1:9001/vod/ 直接跳转到127.0.0.1:8081

**具体实现**:弄两个tomcat并修改它们的配置文件中的监听端口号分别为: 8080, 8081

![image-20221219111326510](Nginx.assets/image-20221219111326510.png)

之后**启动两个tomcat并进行测试**

在8080端口的tomcat的安装目录的`/webapps/Root/`下**创建edu文件夹并创建a.html文件**

在8081端口的tomcat的安装目录的`/webapps/Root/`下**创建vod文件夹并创建a.html文件**

**修改nginx的配置文件:**

```yaml
http{
 # ...
 	server {
 		listen 9001;
 		server_name localhost;
 		
 		# 匹配映射
 		location ~ /edu/ {
 			proxy_pass http:localhost:8080;
 		}
 		location ~ /vod/ {
 			proxy_pass http:localhost:8081;
 		}
  	}
  	
}
```

**补充:**

==注意: 如果location 映射路径中包含正则表达式,则必须要有 `~ 或 ~*`标识==

1. `~`:用于 uri 包含正则表达式且**区分大小写**
2. `~*`:用于 uri 包含正则表达式且不区分大小写
3.  `=` : 用于不含正则表达式的 uri 前, 要求请求字符串与 uri严格匹配,匹配成功,就停止向下搜索并立即处理
4. `^~`: 用于不含正则表达式前,匹配到与 uri 匹配度最高的location后立即使用该location处理请求,不再匹配后续location中 uri 的正则表示式



### 配置实例-负载均衡

实现效果：

浏览器地址栏输入地址 http://10.10.10.129/edu/a.html 负载均衡效果，**将请求平均分发到8080和8081端口中**

需要在nginx的配置文件中进行负载均衡的配置

**在http块中进行如下配置:**

`nginx.conf`

```yaml
http {
	#...
	
	# 定义名为 myserver 负载均衡所分配的服务,
	upstream myserver {
		#这里可以设置负载均衡策略,默认是轮询策略
		#ip_hash
		server 127.0.0.1:8080;  
		server 127.0.0.1:8081;
		
		#或  设置权重
		#server 127.0.0.1:8080 weight=5;  
		#server 127.0.0.1:8081 weight=10;
	}
	
	server {
		listen 80;
		server_name 127.0.0.1;
		
		location / {
		root html;
		index index.html index.htm ;
		proxy_pass http://myserver;
		}
	}	
}
```

之后访问地址之后进行刷新，**每次刷新之后显示的内容都不一样(同一个请求会每次请求会被分发到不同的服务器)**，表示已经实现了负载均衡



### 配置实例-动静分离

准备工作：准备一些静态资源，用于进行访问

在nginx配置文件中进行配置:

```yaml
http {
	server {
		listen 80;
        server_name localhost;
	}
	location /www/{
		root /data/;
		index  index.html index.htm;
	}
	location /image/{
		root /data/;
		# autoindex on 代表访问该目录时,会将该目录的资源以列表的形式展示
		autoindex on;
	}
}
```

> autoindex on 效果

![image-20221219211830073](Nginx.assets/image-20221219211830073.png)



### 配置实例-主从配置

所有的服务器都有宕机的可能性，所以当我们只有一台服务器的时候就不能保证程序的正常运行，这个时候我们就需要使用多台服务器来保证服务器的正常运行，其中会有一台主服务器和多台备用服务器。

一般都是**先发送到主服务器，如果主服务器宕机那么就会使用备份服务器进行转发**

#### 理解高可用

问题引出:

![image-20221219212625110](Nginx.assets/image-20221219212625110.png)

**解决:** Nginx高可用

![image-20221219212720932](Nginx.assets/image-20221219212720932.png)





####  实现:

> 技术实现: [Keepalived_百度百科 (baidu.com)](https://baike.baidu.com/item/Keepalived/10346758?fr=aladdin)

实际上这已经跟nginx关系不大了, 主从配置主要是靠 `keepalived`实现的 

测试环境: 两台装有Nginx和keepalived 的服务器	

**准备工作**:

使用 yum 命令进行安装`yum install keepalived –y`
安装之后，使用命令`rpm -q -a keepalived`查看是否安装成功

**配置**

修改keepalived 的配置文件: `/etc/keepalived/keepalivec.conf`

**主服务器配置:**

```yaml
global_defs {
	notification_email {
		acassen@firewall.loc
		failover@firewall.loc
		sysadmin@firewall.loc
	}
	notification_email_from Alexandre.Cassen@firewall.loc
	smtp_server 192.168.17.129 #主服务器ip
	smtp_connect_timeout 30  
	router_id LVS_DEVEL  #主服务器的本地ip域名,可在 系统 host文件中看到
}

vrrp_script chk_http_port {
	script "/usr/local/src/nginx_check.sh"  # 检测主服务器是否挂掉的脚本
	interval 2 #（检测脚本执行的间隔）
	weight 2  
}

vrrp_instance VI_1 {
	state MASTER # 备份服务器上将 MASTER 改为 BACKUP
	interface ens33 #本地网卡名称（用ifconfig命令查看）
	virtual_router_id 51 # 主、备机的 virtual_router_id 必须相同
	priority 100 # 主、备机取不同的优先级，主机值较大，备份机值较小
	advert_int 1
	authentication {
		auth_type PASS
		auth_pass 1111
	}
	virtual_ipaddress {
		192.168.17.50 # 虚拟ip地址,可随便设置,但是主从服务器要一致,并且是内网IP地址
	}
}
```

从服务器配置keepalived 配置:

```yaml
global_defs {
	notification_email {
		acassen@firewall.loc
		failover@firewall.loc
		sysadmin@firewall.loc
	}
	notification_email_from Alexandre.Cassen@firewall.loc
	smtp_server 192.168.17.131 #从服务器ip
	smtp_connect_timeout 30  
	router_id LVS_DEVEL  #从服务器的本地ip域名,可在 系统 host文件中看到
}

vrrp_script chk_http_port {
	script "/usr/local/src/nginx_check.sh"  # 检测主服务器是否挂掉的脚本
	interval 2 #（检测脚本执行的间隔）
	weight 2  
}

vrrp_instance VI_1 {
	state BACKUP # 备份服务器上将 MASTER 改为 BACKUP
	interface ens33 #本地网卡名称（用ifconfig命令查看）
	virtual_router_id 51 # 主、备机的 virtual_router_id 必须相同
	priority 100 # 主、备机取不同的优先级，主机值较大，备份机值较小
	advert_int 1
	authentication {
		auth_type PASS
		auth_pass 1111
	}
	virtual_ipaddress {
		192.168.17.50 # 虚拟ip地址,可随便设置,但是主从服务器要一致,并且是内网IP地址
	}
}
```

检测脚本`/usr/local/src/nginx_check.sh"`,主从服务器都一致

```sh
#!/bin/bash
A=`ps -C nginx – no-header |wc -l`
if [ $A -eq 0 ];then
	/usr/local/nginx/sbin/nginx
	sleep 2
	if [ `ps -C nginx --no-header |wc -l` -eq 0 ];
	then
		killall keepalived
	fi
fi
```

把两台服务器上 Nginx 和 keepalived 启动

```sh
./nginx # !在nginx安装目录的 sbin/目录执行
systemctl start keepalived.service
```

测试:

在浏览器地址栏输入 虚拟 ip 地址 **192.168.17.50**
**把主服务器（192.168.17.129） Nginx 和 keepalived 停止**，再输入 192.168.17.50