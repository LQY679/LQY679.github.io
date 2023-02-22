---
title: Maven课程教案
date: 2020-01-01 18:57:32
updated: {{date}}
categories: 
- Java系列
---



# Maven课程教案



## 课程介绍

| 课程目录                        | 课程目标               |
| ------------------------------- | :--------------------- |
| 01. 知识点 - Maven 概述         | 认识 Maven             |
| 02. 实操 - Maven 下载与安装     | 完成 Maven的下载与安装 |
| 03. 知识点 - Maven 结构与配置   | 了解 Maven的结构与配置 |
| 04. 知识点 - Maven 仓库与坐标   | 认识 Maven的仓库与坐标 |
| 05. 知识点 - Maven 项目的结构   | 认识 约定结构与pom文件 |
| 06. 实操 - 手动创建 Maven项目   | 完成 第一个项目的创建  |
| 07. 实操 - 模板创建 Maven项目   | 认识 模板创建的方法    |
| 08. 实操 - Idea创建 Maven项目   | 完成 Idea集成Maven     |
| 09. 知识点 - Maven 生命周期     | 认识 Maven的生命周期   |
| 10. 实操 - 常用构建命令         |                        |
| 11. 知识点 - Maven 插件介绍     | 了解 Maven插件的作用   |
| 12. 实操 - 生成项目站点         |                        |
| 13. 知识点 - Maven 依赖管理     | 掌握 Maven的依赖管理   |
| 14. 知识点 - 项目模块化开发     | 了解 项目的模块化开发  |
| 15. 实操 - Maven 项目继承与聚合 | 掌握 项目继承配置      |
| 16. 实操 - 测试项目的代码编写   | 测试以上配置           |

## 重点难点

| 难点用高亮标识          |
| :---------------------- |
| 01. Maven是什么         |
| 02. Maven有什么用       |
| 03. Maven项目结构       |
| 04. Maven生命周期       |
| 05. ==Maven依赖管理==   |
| 06. ==Maven模块化开发== |



----

## 01. 知识点 - Maven 概述 

### 1.目标

- [x] 了解Maven是什么
- [x] 了解Maven有什么用

### 2.路径

1. Maven 的简介
2. Maven 的作用

### 3.讲解

#### 3.1 Maven 的简介

> ​	**Apache Maven是一个强大的、服务于 Java 平台的项目管理工具。**
>
> ​	Maven 是一个可以用于构建和管理任何基于Java的项目的工具，它可以使Java开发人员的日常工作变得更轻松，并且通常有助于理解任何基于Java的项目。
>
> ​	Maven是使用Java语言开发的 ，可以对Java项目进行构建、依赖管理。当然Maven也可以被用于构建和管理各种项目，例如C#，Ruby，Scala和其他语言编写的项目。

#### 3.2 Maven 的作用

##### 3.2.1 使用Maven 可以实现项目的自动化构建

> ​	Maven 使用标准的目录结构和默认构建生命周期，我们可以使用它自动完成项目的基础工具建设。

##### 3.2.2 使用Maven 可以自动管理项目的依赖

> ​	Maven 提供了强大的中央仓库，能够帮助我们自动下载依赖。

##### 3.2.3 使用Maven 可以自动生成项目报告

> ​	Maven 提供了有用的项目信息，可以生成项目站点与文档。

### 4.小结

1. Maven是什么

​	管理项目的软件

2. Maven有什么用

​	构建项目，管理依赖，生成报告

## 02. 实操 - Maven 下载与安装

### 1.目标

- [ ] 完成Maven的下载
- [ ] 完成Maven的安装

### 2.路径

1. 使用前说明
2. Maven下载
3. Maven安装

### 3.讲解

#### 3.1 使用前说明

> ​	Maven本身就是基于Java写的，所以在安装配置Maven之前，有必要将Java的运行环境安装配置好。
>
> ​	需要注意Maven版本依赖的JDK版本。

#### 3.2 Maven下载

> ​	Maven官网：http://maven.apache.org
>
> ​	下载步骤：登录官网，进入下载页面，选择对应环境与版本。

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/903.jpg)

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/904.jpg)

#### 3.3 Maven安装

> ​	下载完成解压后即可完成安装
>
> ​	通过调用bin目录下命令使用，全局使用则需要配置环境变量
>
> ​	注意：解压路径建议 无空格，无中文

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/1001.jpg)

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/1002.jpg)

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1003.jpg" style="zoom: 200%;" />

### 4.小结

1. 安装前注意 安装Java环境
2. 下载时注意 选择版本
3. 安装后注意 配置环境变量
4. 配置后注意 测试

## 03. 知识点 - Maven 结构与配置

### 1.目标

- [ ] 了解Maven软件的结构
- [ ] 了解Maven软件的配置

### 2.路径

1. Maven软件结构
2. Maven配置概述
3. 配置本地仓库位置
4. 配置阿里云镜像地址

### 3.讲解

#### 3.1 Maven软件结构

> ​	Maven软件解压后的文件结构如下

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\303" style="zoom:200%;" />

| 目录       | 介绍                                                         |
| ---------- | ------------------------------------------------------------ |
| bin        | 该目录中包含了 mvn 的运行脚本。                              |
| boot       | 该目录只有一个类加载器Jar，对于一般的Maven用户来说，不必关心该文件。 |
| conf       | 该目录中包含了Maven配置文件，配置Maven行为。                 |
| lib        | 该目录中包含了所有 Maven 运行时需要的 Java 类库。            |
| LICENSE    | 记录了 Maven 使用的软件许可证。                              |
| NOTICE     | 记录了 Maven 包含的第三方软件。                              |
| README.txt | 说明了 Maven 的简要介绍以及安装需求以及如何安装的简单指令等。 |

#### 3.2 Maven配置概述

> ​	==conf/settings.xml文件==，配置全局范围的 Maven 行为。
>
> ​	配置文件主要包含以下元素：

| 顶级标签           | 配置内容                 | 默认值                           |
| ------------------ | ------------------------ | -------------------------------- |
| \<localRepository> | 本地仓库的目录           | 用户目录下面的.m2/repository目录 |
| \<interactiveMode> | 是否启用交互模式         | true                             |
| \<offline>         | 是否启用离线模式         | false                            |
| \<mirrors>         | 定义远程仓库镜像         |                                  |
| \<proxies>         | 定义代理连接             |                                  |
| \<profiles>        | 定义开发环境             |                                  |
| \<servers>         | 连接远程服务时需要的验证 |                                  |

#### 3.3 配置本地仓库位置

> ​	配置改变默认的仓库目录

```xml
<localRepository>你指定的文件夹</localRepository>
```

#### 3.4 配置阿里云镜像地址

> ​	配置阿里云镜像地址

```xml
<mirrors>
	<mirror>
        <id>alimaven</id>
        <mirrorOf>central</mirrorOf>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
    </mirror>
</mirrors>
```

### 4.小结

1. 安装完成后建议配置阿里云镜像，提高依赖下载速度。

## 04. 知识点 - Maven 仓库与坐标

### 1.目标

- [ ] 了解Maven的仓库结构
- [ ] 了解Maven的坐标

### 2.路径

1.  Maven 仓库介绍
2.  Maven 坐标介绍

### 3.讲解

#### 3.1 Maven 仓库介绍

> ​	Maven 的仓库就是用来存储依赖的地方
>
> ​	Maven 仓库分为**本地仓库**与**远程仓库**

##### 3.1.1 Maven 本地仓库

> ​	本地仓库就是 Maven 在本地存储依赖的仓库，默认是在用户的 .m2/repository/ 目录下

##### 3.1.2 Maven 远程仓库

> ​	远程仓库就是 Maven 在远程存储构建的仓库，软件默认链接中心仓库
>
> ​	远程仓库可以分为**中央仓库**和**私服**
>
> ​	**中央仓库**：就是 Maven 提供所提供的远程仓库，其地址为：http://repo.maven.apache.org/maven2 ，该仓库包含了绝大多数流行的开源 Java 构件，以及源码、作者信息、SCM 信息、许可证信息等。据统计，每个月中央仓库大概会接受全世界 Java 程序员大概 1 亿次访问，其重要性不言而喻。
>
> ​	**私服**：公司、私人搭建的远程仓库。

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\905.jpg" style="zoom:200%;" />

#### 3.4 Maven 的坐标

> ​	Maven 坐标是 Maven 定义的一组规则：其目的是为了给世界上任一构件创建一个**唯一标识**。
>
> ​	主要元素包括：GroupID、ArtifactID、Version

| 元素标签      | 建议内容                                                     |
| ------------- | ------------------------------------------------------------ |
| \<GroupID>    | 当前 Maven 项目隶属，一般与公司域名相对应，比如 com.taobao。 |
| \<ArtifactID> | 实际项目中的一个模块。                                       |
| \<Version>    | 表示当前模块的版本。                                         |

### 4.小结

1. 本地仓库-->私服【如果存在】-->中心仓库
2. Maven规定的的坐标规则是GAV，用来保证模块唯一

## 05. 知识点 - Maven 项目的结构

### 1.目标

- [ ] 了解Maven项目是什么
- [ ] 了解Maven项目的结构
- [ ] 认识pom.xml文件

### 2.路径

1. Maven项目是什么
2. Maven项目的结构
3. pom.xml文件简介

### 3.讲解

#### 3.1 Maven项目是什么

> ​	有pom.xml描述文件的项目，就是一个Maven项目。
>
> ​	需要遵循Maven约定目录结构。

#### 3.2 Maven项目的结构

> ​	Maven 对于项目目录结构有着既定的规则，只要遵循了这些成熟的规则，用户在项目中切换的时候就免去了额外的学习成本，也就是**约定优于配置**。

| 项目根目录         | 结构意义                  |
| ------------------ | ------------------------- |
| src                | 源文件                    |
| src/main           | 项目主源文件              |
| ==src/main/java==  | 代码                      |
| src/main/resources | 配置                      |
| src/main/webapp    | 页面资源【如果为Web项目】 |
| src/test           | 项目测试源文件            |
| src/test/java      | 测试代码                  |
| src/test/resources | 测试配置                  |
| target             | 打包目录                  |
| ==pom.xml==        | ==项目描述文件==          |

#### 3.3 pom.xml文件简介

> ​	POM(project object model)是Maven对一个单一项目的描述
>
> ​	pom.xml就是对该项目的描述文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 默认写法：pom文件的版本 -->
    <modelVersion>4.0.0</modelVersion>
    <!-- 项目的坐标-->
    <groupId>com.aepvale</groupId>
    <artifactId>demo230221</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!-- 项目打包类型：不设置默认为Jar-->
    <packaging>jar</packaging>
</project>
```

### 4.小结

1. 遵循项目的约定结构：约定大于配置
2. pom.xml文件是项目的描述文件，非常重要。

## 06. 实操 - 手动创建 Maven项目

### 1.目标

- [ ] 创建一个简单Maven工程

### 2.路径

1. 创建项目文件夹
2. 创建约定目录结构
3. 创建pom.xml文件
4. 创建测试用文件
5. 执行mvn命令测试

### 3.讲解

#### 3.1 创建项目文件夹

- 创建一个空的项目文件夹

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\906.jpg" style="zoom:200%;" />

#### 3.2 创建约定目录结构

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\900.jpg" style="zoom:200%;" />

#### 3.3 创建pom.xml文件

- maven项目的描述文件 - 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 默认写法：pom文件的版本 -->
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.daojie</groupId>
    <artifactId>himvn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
</project>
```

#### 3.4 创建测试用文件

- src/main/java/HelloMaven.java

```java
public class HelloMaven{
	public static void main(String args[]){
		System.out.println("Hello Maven！");
	}
}
```

#### 3.5 执行mvn命令测试

- mvn compile [执行编译]

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\907.jpg" style="zoom:200%;" />

### 4.小结

1. 理解符合约定结构的项目，就叫做Maven项目

## 07. 实操 - 模板创建 Maven项目

### 1.目标

- [ ] 使用插件创建Maven工程

### 2.路径

1. 创建空文件夹
2. 使用模板命令创建
3. 查看结果

### 3.讲解

#### 3.1 创建空文件夹

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\906-1594456380271.jpg" style="zoom:200%;" />

#### 3.2 使用模板命令创建

##### 3.2.1 使用命令 mvn archetype:generate

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\910.jpg" style="zoom:200%;" />

##### 3.2.2 选择将要创建的模板

```ini
# 选择模板，本次测试选择 maven-archetype-quickstart 模板
```

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\908.jpg" style="zoom:200%;" />

##### 3.2.3 输入项目坐标G,A,V

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\909.jpg" style="zoom:200%;" />

#### 3.3 查看结果

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\911.jpg" style="zoom:200%;" />

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\912.jpg" style="zoom:200%;" />

### 4.小结

- 使用模板命令，省去了手动创建

## 08. 实操 - Idea创建 Maven项目

### 1.目标

- [ ] 使用 Idea 集成并创建Maven项目 

### 2.路径

1. Idea配置Maven环境
2. 创建Maven项目

### 3.讲解

#### 3.1 Idea配置Maven环境

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\307" style="zoom:200%;" />

#### 3.3 创建Maven项目

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/309.)

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/310.)

![](Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88/311.)

### 4.小结

1. 注意正式版Idea包含默认Maven，需要配置自己的
2. 三种方式创建结果其实没有什么不同

## 09. 知识点 - Maven 生命周期

### 1.目标

- [ ] 了解Maven 的生命周期

### 2.路径

1. 生命周期概述
2. Clean 生命周期
3. Site 生命周期
4. Default 生命周期

### 3.讲解

#### 3.1 生命周期概述

> ​	Maven 的生命周期是对所有的构建过程进行的抽象和统一
>
> ​	为此 Maven 提供了三套独立的生命周期：clean、site 和 default

#### 3.2 Clean 生命周期[天天用]

> ​	clean 生命周期的目的是清理项目，删除之前的构建结果
>
> ​	它包含以下三个阶段：

| 生命周期阶段 | 阶段介绍                     |
| ------------ | ---------------------------- |
| pre-clean    | 执行一些清理前需要完成的工作 |
| clean        | 清理上一次构建生成的文件     |
| post-clean   | 执行一些清理后需要完成的工作 |

#### 3.3 Site 生命周期 [不常用 / 基本不用]

> ​	site 生命周期的目的是建立和发布项目站点，方便团队交流和发布项目信息
>
> ​	它包含以下四个阶段：

| 生命周期阶段 | 阶段介绍                             |
| ------------ | ------------------------------------ |
| pre-site     | 执行生成项目站点文档前需要完成的工作 |
| site         | 生成项目站点文档                     |
| post-site    | 执行生成项目站点文档后需要完成的工作 |
| site-deploy  | 将生成的项目站点发布到服务器上       |

#### 3.4 Default 生命周期

> ​	Default 生命周期是最重要的一个，绝大部分工作都发生在这个生命周期中。
>
> ​	它定义了真正构建项目中需要执行的所有步骤。
>
> ​	它包含以下23个阶段：

| 生命周期阶段            | 阶段介绍                               |
| ----------------------- | -------------------------------------- |
| validate                | 验证                                   |
| initialize              | 初始化                                 |
| generate-sources        | 生成所有需要包含在编译过程中的源代码   |
| process-sources         | 处理源代码                             |
| generate-resources      | 生成所有需要包含在打包过程中的资源文件 |
| process-resources       | 复制并处理资源文件至目标目录           |
| compile                 | 编译项目源代码                         |
| process-classes         | 流程类                                 |
| generate-test-sources   |                                        |
| process-test-sources    |                                        |
| generate-test-resources |                                        |
| process-test-resources  |                                        |
| test-compile            | 编译测试源代码                         |
| process-test-classes    |                                        |
| test                    | 使用单元测试框架运行测试               |
| prepare-package         | 在打包之前执行                         |
| package                 | 项目打包                               |
| pre-integration-test    | 执行一些在集成测试运行之前需要的动作   |
| integration-test        | 处理包并发布至集成测试可以运行的环境   |
| post-integration-test   | 集成测试运行之后需要的动作             |
| verify                  | 安装前验证                             |
| install                 | 将包安装至本地仓库                     |
| deploy                  | 复制提交至到远程的仓库                 |

### 4.小结

1. Maven三个生命周期过程是相互独立的

## 10. 实操 - 常用构建命令

### 1.目标

- [ ] 了解Maven 命令
- [ ] 掌握Maven 常用命令

### 2.路径

1. Maven命令介绍
2. 常用的构建命令

### 3.讲解

#### 3.1 Maven命令介绍

> ​	输入【mvn + 生命周期阶段名称】即可执行相关构建操作
>
> ​	比如：mvn complie 就会执行编译源代码
>
> ​	注意：执行某一周期，其实执行的是从头到此的完整阶段
>
> ​	比如：mvn test实际执行阶段是从validate到test的所有阶段

#### 3.2 常用的构建命令

| 命令             | 描述                 |
| :--------------- | :------------------- |
| mvn clean        | 执行清理             |
| mvn compile      | 编译源代码           |
| mvn test-compile | 项目打包             |
| mvn test         | 执行测试             |
| mvn package      | 项目打包             |
| mvn install      | 将项目安装进本地仓库 |

### 4.小结

1. mvn＋生命周期名即可执行该生命周期
2. 执行某一周期其实执行的是该周期从头到此周期的完整阶段

## 11. 知识点 - Maven 插件介绍 

### 1.目标

- [ ] 了解Maven 的插件机制
- [ ] 了解插件的目标
- [ ] 了解自定义插件绑定

### 2.路径

1. Maven 插件概述
2. 关于插件的目标
3. 自定义绑定插件

### 3.讲解

#### 3.1 Maven 插件概述

> ​	其实Maven 生命周期的各个阶段都是抽象的概念，真正干活的是一个个的插件。插件是以独立的构件形式存在，Maven 的生命周期的各个阶段与 Maven 的插件进行了绑定。当我们执行 `mvn` 命令其实就是在指挥着一个个的插件在干活。
>
> ​	Maven本质上是一个插件框架，它并不执行任何具体的构建任务，把所有这些任务都交给插件来完成。
>
> ​	但是为了方便用户使用，Maven为生命周期默认绑定了一套插件。

#### 3.2 关于插件的目标

> ​	Maven 的插件以独立的构件形式存在，为了能够复用代码，使得一个插件可以完成多个任务，我们定义了插件目标（Plugin Goal），每一个目标都可以完成不同的功能。
>
> ​	比如：compile和test-compile就使用的同一个插件，但是是不同的目标。
>
> ​	事例：

| 生命周期阶段           | 插件                   | 目标          | 执行任务                  |
| ---------------------- | ---------------------- | ------------- | ------------------------- |
| process-resources      | maven-resources-plugin | resources     | 复制项目资源 - 至输出目录 |
| ==compile==            | maven-compile-plugin   | compile       | 编译代码 - 至输出目录     |
| process-test-resources | maven-resources-plugin | testResources | 复制测试资源 - 至输出目录 |
| ==test-compile==       | maven-compile-plugin   | testCompile   | 编译测试代码 - 至输出目录 |
| test                   | maven-surefire-plugin  | test          | 执行测试用例              |
| package                | maven-jar-plugin       | jar           | 创建项目Jar包             |
| install                | maven-install-plugin   | install       | 将项目安装到本地仓库      |
| deploy                 | maven-deploy-plugin    | deploy        | 将项目部署到远程仓库      |

#### 3.3 自定义绑定插件

> ​	除了Maven默认的绑定之外，可以选择指定为某个阶段绑定某个插件，更自由的构建项目。
>
> ​	在项目的pom文件中单独指定：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.daojie</groupId>
  <artifactId>himvn</artifactId>
  <version>1.0-SNAPSHOT</version>

  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <!-- 将clean插件替换成3.1.0版本-->
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
	
        <plugin>
          <!-- 将compile插件目标替换成3.8.0版本-->
          <artifactId>maven-compiler-plugin</artifactId>
			  <version>3.8.0</version>
				 <executions>
					<execution>
						<phase>compiler</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
    </pluginManagement>
  </build>
</project>

```

### 4.小结

1. 插件才是真正干活的东西
2. Maven默认绑定了一套插件，也可以自主绑定

## 12. 实操 - 生成项目站点

### 1.目标

- [ ] 使用mvn命令生成项目站点

### 2.路径

1. 配置site插件
2. 执行mvn site命令

### 3.讲解

#### 3.1 配置site插件

> ​	需要配置最新的版本的site插件
>
> ​	或者配置它所需要的依赖

```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <artifactId>maven-site-plugin</artifactId>
                <version>3.7.1</version>
                <configuration>
                    <locales>zh_CN</locales>
                </configuration>
            </plugin>
            <plugin>
                <artifactId>maven-project-info-reports-plugin</artifactId>
                <version>3.0.0</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

#### 3.2 执行mvn site命令

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1004.jpg" style="zoom:200%;" />

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1005.jpg" style="zoom:200%;" />

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1006.jpg" style="zoom:200%;" />

### 4.小结

1. 实操辅助理解插件机制

## 13. 知识点 - Maven 依赖管理

### 1.目标

-   [ ] 了解Maven依赖的原则
-   [ ] 了解Maven依赖的仓库网站
-   [ ] 掌握Maven依赖的管理

### 2.路径

1.  依赖的配置
2.  依赖的查找网站
3.  依赖的范围
4.  依赖的传递性
5.  依赖传递的原则
6.  依赖的排除
7.  依赖的归类

### 3.讲解

#### 3.1 依赖的配置

>   ​	Maven用坐标一一对应地描述了构件，并且保存在仓库中
>
>   ​	在项目需要这些构件时，直接指定该坐标，就可以集成到项目中了
>
>   ​	所以：项目的依赖是配置在项目pom.xml文件中的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.daojie</groupId>
    <artifactId>himvn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    
  <dependencies>
      <!-- 在项目中引入mysql-connector-java-5.2.36的Jar包 -->
      <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>5.1.36</version>
      </dependency>
  </dependencies>
</project>
```

#### 3.2 依赖的查找网站

>   ​	网站一： https://mvnrepository.com/
>
>   ​	网站二：https://repository.sonatype.org/
>
>   ​	查找流程：搜索项目依赖，选择对应的依赖，选择需要的版本，复制到pom文件



#### 3.3 依赖的范围

>   ​	在引入依赖的时候，Maven提供了五种依赖的选择范围
>
>   ​	用以区别编译，执行，测试，等不同时期的依赖
>
>   ​	在依赖的\<scope>标签指定，例如：

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.2</version>
    <scope>test</scope>
</dependency>
```

| 范围的选项   | 描述               |
| ------------ | ------------------ |
| ==compile==  | 编译依赖【默认值】 |
| ==test==     | 测试依赖           |
| ==provided== | 已提供依赖         |
| runtime      | 运行时依赖         |
| system       | 系统依赖           |

| 依赖范围 | 编译有效 | 测试有效 | 运行有效 |
| -------- | :------: | :------: | :------: |
| compile  |   YES    |   YES    |   YES    |
| test     |   YES    |   YES    |  **NO**  |
| provided |   YES    |   YES    |  **NO**  |
| runtime  |  **NO**  |   YES    |   YES    |
| system   |   YES    |   YES    |  **NO**  |

#### 3.4 依赖的传递性

>   ​	有的依赖构件，又依赖其他的第三方构件，比如Junit依赖Hamcrest
>
>   ​	Maven通过自动解析引入项目的依赖信息，并将间接依赖导入
>
>   ​	传递依赖在将间接依赖引入项目的过程中也有它自己的规则和范围

| 传递性规则【注】 | compile  | test | provided | runtime  |
| ---------------- | -------- | ---- | -------- | -------- |
| compile          | compile  | -    | -        | runtime  |
| provided         | provided | -    | -        | provided |
| runtime          | runtime  | -    | -        | runtime  |
| test             | test     | -    | -        | test     |

[^注]: 第一列表示直接依赖，第一行表示间接依赖

#### 3.5 依赖传递的原则

>   ​	当前项目对同一个构件，有多个直接或间接的依赖，版本可能不同，Maven该如何抉择

##### 3.3.1 路径优先原则

>   ​	对同一构件，Maven优先选择路径最近者

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1007.jpg" style="zoom:200%;" />

##### 3.3.2 声明优先原则

>   ​	对同一构件，路径相同时，Maven优先选择声明时\<dependency>靠后的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.daojie</groupId>
    <artifactId>himvn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <dependencies>
        <!-- 声明在上者优先 -->
        <dependency>
            <groupId>test.maven</groupId>
            <artifactId>One</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>test.maven</groupId>
            <artifactId>A</artifactId>
            <version>1.0</version>
        </dependency>
    </dependencies>
</project>
```

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1009.jpg" style="zoom:200%;" />

#### 3.6 依赖的排除

>   ​	Maven除了依赖传递的原则之外，还提供了手动排除依赖的配置方式
>
>   ​	使用：\<exclusion>标签排除依赖

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1008.jpg" style="zoom:200%;" />

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.daojie</groupId>
    <artifactId>himvn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <dependencies>
        <!-- 声明在上者优先 -->
        <dependency>
            <groupId>test.maven</groupId>
            <artifactId>One</artifactId>
            <version>1.0</version>
            <exclusions>
                <exclusion>
                    <artifactId>com.Utils</artifactId>
                    <groupId>utils</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>test.maven</groupId>
            <artifactId>A</artifactId>
            <version>1.0</version>
        </dependency>
    </dependencies>
</project>
```

#### 3.7 依赖的归类

>   ​	在引入依赖的时候，很多情况需要引入一个构件的多个模块，这些模块都应该是**相同的版本**
>
>   ​	比如Spring框架下开发应用，就需要引入：spring-core、spring-context、spring-beans等等模块，他们都应该是同一版本
>
>   ​	对此，Maven 可以声明变量统一管理版本

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.daojie</groupId>
    <artifactId>himvn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <!-- 声明统一管理版本号 -->
    <properties>
        <!-- 自定义标签名称 -->
        <spring.version>5.0.0.RELEASE</spring.version>
    </properties>  
    <!--导入Spring相关依赖包-->
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <!-- 统一管理版本号 -->
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
        </dependency>
    </dependencies>
</project>
```

### 4.小结

1.  依赖配置注意GAV坐标和Scope范围
2.  依赖传递管理有两原则、一操作：路径优先，声明优先，依赖排除
3.  我们可以通过统一管理版本号，来管理依赖归类

## 14. 知识点 - Maven 模块化开发

### 1.目标

-   [ ] 了解模块化是什么
-   [ ] 了解Maven项目的模块化

### 2.路径

1.  模块化简介
2.  Maven 模块化介绍

### 3.讲解

#### 3.1 模块化开发简介

>   ​	模块化其实是一个程序设计方法。	
>
>   ​	进行程序设计时将一个大程序按照功能划分为若干小程序模块，每个小程序模块完成一个确定的功能，并相对独立。
>
>   ​	通过对这些模块之间建立必要的联系，按需引用，互相协作完成项目功能。

#### 3.2 Maven 模块化介绍

>   ​	在实际的项目中，我们往往需要建立多个模块协同开发，所以Maven提供了继承与聚合两个方式。

##### 3.2.1 Maven 模块的继承

>   ​	回顾：
>
>   ​		设计Java类的时候，当我们发现类有公共行为和特征的话，会很自然地将这些公共特征和行为提炼到一个类中，这个类叫父类
>
>   ​		只要继承一个父类，就不用重复定义行为和特征了，解决了代码重复编写的问题，从而简化了子类的代码
>
>   ​	同样的：
>
>   ​		Maven项目里经常需要在pom.xml中配置很多信息，随着Maven项目的模块化，很多内容都是重复的
>
>   ​		所以Maven借鉴了面向对象的思想，支持继承
>
>   ​	例如：
>
>   ​		如果有多个项目模块要用的配置，单独用一个公共的父项目编写Maven配置项，然后用子项目继承，即可完成配置复用

##### 3.2.1 Maven 模块的聚合

>   ​	项目开发时是分模块开发的，但是开发完成进行编译和运行时，是整个项目多模块一起运行的
>
>   ​	所以，为了能够使用统一进行项目管理，Maven提供了聚合方法能够帮助把项目的各个模块聚合在一起构建
>
>   ​	通过配置，可以方便项目的整体构建

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1010.jpg" style="zoom:200%;" />

### 4.小结

1.  模块化开发 是一种程序设计方法
2.  继承 可以实现pom配置的复用
3.  聚合 方便了整体的项目构建
4.  通常来说 继承 和 聚合 是同时使用的
    - 聚合模块知道它聚合了哪些模块，但是被聚合的模块不知道聚合模块的存在。
    - 父模块不知道子模块的存在，但是子模块都必须知道自己的父模块是谁。

## 15. 实操 - Maven 项目继承与聚合

### 1.目标

-   [ ] 配置完成模块的继承
-   [ ] 了解继承需要注意的内容

### 2.路径

1.  创建新项目
2.  创建项目模块
3.  被继承的属性
4.  父项目pom.xml的编写
5.  子项目pom.xml的编写

### 3.讲解

#### 3.1  创建新项目

>   ​	本测试项目为SSM集成框架测试
>
>   ​	注意：父项目只留pom.xml文件，且==打包方式为pom==

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1011.jpg" style="zoom:200%;" />

#### 3.2 创建项目模块

>   ​	测试项目分层4个模块：分别是util，pojo，dao，service，controller
>
>   ​	继承：子模块通过\<parent>标签继承父项目
>
>   ​	聚合：父项目通过\<module>标签聚合子模块

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1012.jpg" style="zoom:200%;" />

-   子模块pom展示

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>test-parent</artifactId>
        <groupId>com.daojie</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.daojie</groupId>
    <artifactId>test-controller</artifactId>
    <version>1.0-SNAPSHOT</version>

</project>
```

-   父项目pom展示

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.daojie</groupId>
    <artifactId>test-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>test-pojo</module>
        <module>test-dao</module>
        <module>test-service</module>
        <module>test-controller</module>
    </modules>

</project>
```

#### 3.3 被继承的配置

>   ​	子模块继承了父项目，以下配置项被继承
>
>   ​	注意 dependencies 和 dependencyManagement 
>
>   ​	dependencyManagement ：其中配置的依赖，子模块并不直接引入，它只是为子模块提供依赖选择

| Pom元素                              | 介绍                   |
| ------------------------------------ | ---------------------- |
| GroupID                              | 项目坐标——项目组ID     |
| Version                              | 项目坐标——项目版本     |
| properties                           | 自定义的 Maven 属性    |
| ==**dependencies**==                 | **项目的依赖配置**     |
| ==**dependencyManagement**==         | **项目的依赖管理配置** |
| build                                | 项目的构建配置         |
| **---- *入门课程以下看看即可* ----** |                        |
| description                          | 项目的描述信息         |
| organization                         | 项目的组织信息         |
| inceptionYear                        | 项目的创始年份         |
| url                                  | 项目的 URL 地址        |
| developers                           | 项目的开发者信息       |
| contributors                         | 项目的贡献者信息       |
| distributionManagement               | 项目的部署配置         |
| issueManagement                      | 项目的问题管理系统     |
| ciManagement                         | 项目的持续集成信息     |
| scm                                  | 项目的版本控制代码库   |
| malilingLists                        | 项目的邮件列表信息     |
| repositories                         | 项目的仓库配置         |
| reporting                            | 项目的报告输出配置     |

#### 3.4 父项目pom.xml的编写

>   ​	测试项目构建

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.daojie</groupId>
    <artifactId>test-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>test-dao</module>
        <module>test-service</module>
        <module>test-util</module>
        <module>test-controller</module>
        <module>test-pojo</module>
    </modules>
    
    <properties>
        <spring.version>5.0.2.RELEASE</spring.version>
        <slf4j.version>1.6.6</slf4j.version>
        <log4j.version>1.2.12</log4j.version>
        <mysql.version>5.1.6</mysql.version>
        <mybatis.version>3.4.5</mybatis.version>
        <aspectjweaver.version>1.6.8</aspectjweaver.version>
        <junit.version>4.12</junit.version>
        <jsp-api.version>2.0</jsp-api.version>
        <servlet-api.version>2.5</servlet-api.version>
        <jstl.version>1.2</jstl.version>
        <mybatis-spring.version>1.3.0</mybatis-spring.version>
        <druid.version>1.0.9</druid.version>
        <!--文件的编码格式-->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>

    <!--
        jar包管理
        dependencyManagement:并非导入依赖，而只是管理依赖（这样子工程可供选择）
    -->
    <dependencyManagement>
        <!--引入依赖-->
        <dependencies>
            <!-- spring（切面） -->
            <dependency>
                <groupId>org.aspectj</groupId>
                <artifactId>aspectjweaver</artifactId>
                <version>${aspectjweaver.version}</version>
            </dependency>
            <!-- spring（aop） -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-aop</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!--spring包（核心）-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!--用于SpringMVC-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-web</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!--用于数据库源相关操作-->
            <!-- spring（整合jdbc） -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-jdbc</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <!-- spring（事务） -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-tx</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!--Servlet相关API（可以使用Request、Response）-->
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>servlet-api</artifactId>
                <version>${servlet-api.version}</version>
                <scope>provided</scope>
            </dependency>

            <dependency>
                <groupId>javax.servlet.jsp</groupId>
                <artifactId>jsp-api</artifactId>
                <version>${jsp-api.version}</version>
                <scope>provided</scope>
            </dependency>

            <!--jstl标签-->
            <dependency>
                <groupId>jstl</groupId>
                <artifactId>jstl</artifactId>
                <version>${jstl.version}</version>
            </dependency>

            <!--MySQL数据库驱动-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
                <scope>runtime</scope>
            </dependency>

            <!--spring测试-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
                <scope>test</scope>
            </dependency>


            <!-- log日志 start -->
            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-api</artifactId>
                <version>${slf4j.version}</version>
            </dependency>

            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-log4j12</artifactId>
                <version>${slf4j.version}</version>
            </dependency>
            <!-- log end -->

            <!--mybatis-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>${mybatis.version}</version>
            </dependency>

            <!--MyBatis集成Spring-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis-spring</artifactId>
                <version>${mybatis-spring.version}</version>
            </dependency>

            <!--数据源-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>${druid.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>

```

#### 3.5 子模块pom.xml的编写

>   ​	子模块配置依赖时，继承了父项目版本号以及依赖范围
>
>   ​	注意controller打包方式是war，其他均为jar

##### 3.4.1 pojo模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>test-parent</artifactId>
        <groupId>com.daojie</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>test-pojo</artifactId>
    <packaging>jar</packaging>

</project>
```

##### 3.4.2 dao模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>test-parent</artifactId>
        <groupId>com.daojie</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>test-dao</artifactId>
    <packaging>jar</packaging>
    <!--引入依赖-->
    <dependencies>
        <!--pojo的依赖-->
        <dependency>
            <groupId>com.daojie</groupId>
            <artifactId>test-pojo</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </dependency>

        <!--MyBatis集成Spring-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
        </dependency>

        <!--数据源-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
        </dependency>

        <!--MySQL数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--SpringJdbc -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
        </dependency>

        <!-- log start -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </dependency>
        <!-- log end -->
    </dependencies>

</project>
```

##### 3.4.3 service模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>test-parent</artifactId>
        <groupId>com.daojie</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>test-service</artifactId>
    <packaging>jar</packaging>

    <!--依赖-->
    <dependencies>
        <!--依赖dao-->
        <dependency>
            <groupId>com.daojie</groupId>
            <artifactId>test-dao</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!-- spring -->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </dependency>
    </dependencies>

</project>
```

##### 3.4.4 controller模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>test-parent</artifactId>
        <groupId>com.daojie</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>test-controller</artifactId>
    <packaging>war</packaging>
    <!--依赖引入-->
    <dependencies>
        <!--依赖service-->
        <dependency>
            <groupId>com.daojie</groupId>
            <artifactId>test-service</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <!--导入springmvc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
        </dependency>

        <!--servletAPI -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <scope>provided</scope>
        </dependency>

        <!--jstl表达式 -->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
        </dependency>
    </dependencies>

</project>
```

### 4.小结

1.  Idea的模块创建，自动配置了继承与聚合
2.  dependencyManagement 管理配置项，子模块不会直接引入

## 16. 实操 - 测试项目的代码编写

### 1.目标

-   [ ] 完成测试项目的代码

### 2.路径

1.  创建项目数据库
2.  创建数据实体对象
3.  创建测试用页面
4.  写入框架配置文件
5.  完成dao层
6.  完成service层
7.  完成controller层
8.  测试效果

### 3.讲解

#### 3.1 创建项目数据库

```mysql
SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `items`
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(10) NOT NULL auto_increment,
  `name` varchar(20) default NULL,
  `price` float(10,0) default NULL,
  `pic` varchar(40) default NULL,
  `createtime` datetime default NULL,
  `detail` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('1', '智酷道捷', '1000', null, '2018-03-13 09:29:30', '带我走上人生巅峰');
INSERT INTO `items` VALUES ('2', '道捷实训云', null, null, '2018-03-28 10:05:52', '值得学习和拥有');
INSERT INTO `items` VALUES ('3', '道捷风云录', '199', null, '2018-03-07 10:08:04', '小人物，大智慧');
INSERT INTO `items` VALUES ('7', '道捷英雄', null, null, null, null);
INSERT INTO `items` VALUES ('8', '道捷飞车', null, null, null, null);
```

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1013.jpg" style="zoom:200%;" />

#### 3.2 创建数据实体对象

```java
package com.daojie.test.pojo;

import java.util.Date;

/**
 * @author dancinghorse
 * @version v0.0.1
 */
public class Items {
	private Integer id;
	private String name;
	private Float price;
	private String pic;
	private Date createtime;
	private String detail;
    // 省略，get..set..
}
```

#### 3.3 创建测试用页面

>   ​	创建 index.jsp 和 /WEB-INF/pages/success.jsp

-   index.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
</head>
<body>
<a href="/list">点击查询列表</a>
</body>
</html>
```

-   success.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>查询结果</title>
</head>
<body>
<hr>
<table border="1">
    <tr>
        <td>ID</td>
        <td>name</td>
        <td>price</td>
        <td>pic</td>
        <td>createTime</td>
        <td>detail</td>
    </tr>
    <c:forEach items="${items}" var="item">
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.pic}</td>
            <td>${item.createtime}</td>
            <td>${item.detail}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
```

#### 3.4 写入框架配置文件

##### 3.4.1 dao层

>   ​	配置mybatis和spring

-   applicationContext-mybatis.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- 1：数据源配置 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/test?characterEncoding=utf8" />
        <property name="username" value="root" />
        <property name="password" value="root" />
    </bean>
    <!--
        2：创建SqlSessionFactoryBean
    -->
    <bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--指定数据源-->
        <property name="dataSource" ref="dataSource" />
        <!--指定别名配置-->
        <property name="typeAliasesPackage" value="com.daojie.test.pojo" />
    </bean>
    <!--3：Dao层接口扫描，让Dao被spring管理-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--指定Dao接口的包-->
        <property name="basePackage" value="com.daojie.test.dao" />
    </bean>
</beans>
```

##### 3.4.2 service层

>   ​	配置事务相关代码

-   applicationContext-service.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/tx
                           http://www.springframework.org/schema/tx/spring-tx.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">


    <!--1：创建一个事务管理器-->
    <bean id="txtManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--指定数据源-->
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--2：配置通知，配置事务的传播特性，对切入点方法的细化-->
    <tx:advice id="txAdvice" transaction-manager="txtManager">
        <!--配置传播特性属性-->
        <tx:attributes>
            <!--对应方法参与事务并且在事务下执行，事务隔离剂别使用默认隔离级别,发生异常需要事务回滚-->
            <tx:method name="add*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
            <tx:method name="insert*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
            <tx:method name="save*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
            <tx:method name="delete*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
            <tx:method name="update*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>
            <tx:method name="edit*" isolation="DEFAULT" propagation="REQUIRED" rollback-for="java.lang.Exception"/>

            <!--除了以上操作，其余方法为只读操作-->
            <tx:method name="*" read-only="true"/>
        </tx:attributes>
    </tx:advice>

    <!--3：配置AOP，AOP声明式事务配置（配置切入点，让通知关联切入点）-->
    <aop:config>
        <!--切点指点-->
        <aop:pointcut id="tranpointcut" expression="execution(* com.daojie.test.service..*.*(..))"/>

        <!--配置通知-->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="tranpointcut"/>
    </aop:config>

    <!--引入spring-mybatis.xml-->
    <import resource="classpath:applicationContext-mybatis.xml"/>
</beans>
```

##### 3.4.3 controller层

>   ​	配置springmvc以及web.xml

-   spring-mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--1：包扫描-->
    <context:component-scan base-package="com.daojie" />
    <!--2：视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/" />
        <property name="suffix" value=".jsp" />
    </bean>
    <!--3：springmvc注解驱动，自动配置mvc的处理器适配器和处理映射器-->
    <mvc:annotation-driven />
    <!--4：静态资源不过滤-->
    <mvc:default-servlet-handler />
    <!--5：导入applicationContext-service.xml-->
    <import resource="applicationContext-service.xml" />
</beans>
```

-   web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <!--1:配置编码过滤器-->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <!--拦截映射-->
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--2:springmvc前端核心控制器-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--指定映射拦截，/表示所有请求-->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

#### 3.5 完成dao层

-   ItemsDao.java

```java
package com.daojie.test.dao;

import com.daojie.test.pojo.Items;
import java.util.List;

/**
 * @author dancinghorse
 * @version v0.0.1
 */
public interface ItemsDao {
	List<Items> selectAll();
}
```

-   ItemsDao.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.daojie.test.dao.ItemsDao">
    <select id="selectAll" resultType="Items">
        SELECT * FROM  items
    </select>
</mapper>
```

#### 3.6 完成service层

-   ItemsService.java

```java
package com.daojie.test.service;

import com.daojie.test.pojo.Items;
import java.util.List;
/**
 * @author dancinghorse
 * @version v0.0.1
 */
public interface ItemsService {
	List<Items> selectAll();
}
```

-   ItemsServiceImpl.java

```java
package com.daojie.test.service.Impl;

import com.daojie.test.dao.ItemsDao;
import com.daojie.test.pojo.Items;
import com.daojie.test.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
/**
 * @author dancinghorse
 * @version v0.0.1
 */
@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {
	@Autowired
	private ItemsDao itemsDao;

	@Override
	public List<Items> selectAll() {
		return itemsDao.selectAll();
	}
}
```

#### 3.7 完成controller层

-   ItemsController.java

```java
package com.daojie.test.controller;

import com.daojie.test.pojo.Items;
import com.daojie.test.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
/**
 * @author dancinghorse
 * @version v0.0.1
 */
@Controller
public class ItemsController {
    @Autowired
    private ItemsService itemsService;

    @RequestMapping(value = "/list")
    public String list(Model model){
        List<Items> items = itemsService.selectAll();
        model.addAttribute("items",items);
        return "success";
    }
}
```

#### 3.8 测试效果

>   ​	配置tomcat并启动

<img src="Maven%E8%AF%BE%E7%A8%8B%E6%95%99%E6%A1%88\1014.jpg" style="zoom:200%;" />

### 4.小结

1.  测试代码编写，知识点回顾，没有难度