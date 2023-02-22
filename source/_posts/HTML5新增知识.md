---
title: HTML5新增知识
date: 2020-01-01 18:57:32
updated: {{date}}
categories: 
- 大前端
---



# HTM5新增知识

## 一、HTML发展史

- HTML5草案的前身名为Web Applications 1.0, 于2004年被WHATWG提出，于2007年被W3C接纳，并成立了新的HTML工作团队。
  HTML 5的第一份正式草案已于2008年1月22日公布。HTML5仍处于完善之中。然而，大部分现代浏览器已经具备了某些HTML5支持。
- 2012年12月17日，万维网联盟(W3C)正式宣布凝结了大量网络工作者心血的HTML5规范已经正式定稿。根据W3C的发言稿称: "HTML5是开放的Web网络平台的奠基石。”
- 2013年5月6日， HTML 5.1正式草案公布。该规范定义了第五次重大版本，第一次要修订万维网的核心语言:超文本标记语言(HTML) 。在这个版本中，新功能不断推出，以帮助Web应用程序的作者，努力提高新元素互操作性。
- 本次草案的发布，从2012年12月27日至今,进行了多达近百项的修改，包括HTML和XHTML的标签, 相关的API、Canvas等, 同时HTML 5的图像img标签及svg也进行了改进，性能得到进一 步提升。

## 二、HTML5的浏览器兼容问题

- 支持HtmI5的浏览器包括Firefox (火狐浏览器)，IE9及其更高版本, Chrome (谷歌浏览器)，Safari, Opera等; 国内的遨游浏览器(Maxthon) ,以及基于IE或Chromium (Chrome的工程版或称实验版)所推出的360浏览器、搜狗浏览器、 QQ浏览器、猎豹浏览器等国产浏览器同样具备支持HTML5的能力。
  常用的五大浏览器有: lE,chrome,firefox,safari,opera

## 三、HTML5语法

- 内容类型(ContentType)
  HTML 5的文件扩展符与内容类型保持不变,仍然为" .html"或" .htm".
- DOCTYPE声明
  不区分大小写
- 指定字符集编码
  meta charset="UTF-8"
- 可省略标记的元素
  不允许写结束标记的元素: br. col. embed、hr. img、 input. 、link. meta
  可以省略结束标记的元素: li、dt、 dd、p. option. colgroup、 thead. tbody、 tfoot. tr. td. th
  可以省略全部标记的元素: html. head、 body. colgroup、 tbody
- 省略引号
  属性值可以使用双引号,也可以使用单引号。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 语义化标签
    增强型表单
    canvas svg
    音频视频
    本地存储和离线存储 -->

    <input type="text" value="aaaaa"/>
    <input type="text" value='bbbbb'>

    <ul>
        <li>1111
        <li>2222
        <li>33333
    </ul>
</body>
</html>
```

## 四、HTML5新增语义化标签

### 4.1、语义化案例

![image-20230218162801826](HTML5%E6%96%B0%E5%A2%9E%E7%9F%A5%E8%AF%86/image-20230218162801826.png)

- section元素表示页面中的- -个内容区块
- article元素表示一块与上下文无关的独立的内容
- aside元素在article之外的，与article内容相关的辅助信息
- header元素表示页面中-个内容区块或整个页面的标题
- footer元素表示页面中一个内容区块或整个页面的脚注
- nav元素表示页面中导航链接部分
- figure元素表示- -段独立的流内容，使用figcaption元素为其添加标题(第-个或最后- 个子元素的位置)
- main元素表示页面中的主要的内容(ie不兼容)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            
        }
        html,body{
            height: 100%;
        }
        header,footer{
            height: 80px;
            line-height: 80px;
            background: #f47d31;
            font-size: 40px;
            font-weight: bolder;
            text-align: center;
            color: #fff;
        }
        section{
            /* 注意：‘-’两边留好空格 */
            height: calc(100% - 160px);
            /* background: chocolate; */
        }
        nav,aside{
            float: left;
            width: 200px;
            height: 100%;
            background: #ccc;
        }
        nav ul{
            margin: 10px;

        }
        nav ul>li{
            color: #f47d31;
           text-indent: 10px;
           padding-bottom: 10px;
           border-bottom: 2px solid #fff;
        }
        figure{
            color: white;
            font-size: 20px;
            text-align: center;
        }
        main{
            float: left;
            width: calc(100% - 400px);
            height: 100%;
        }

        article header{
            margin: 5px;
        }
        .article1{
            height: 60%;
        }
        .article2{
            height: 40%;
        }
    </style>
</head>
<body>
    <header>
        header
    </header>
    <section>
        <nav>
            <ul>
                <figure>nav</figure>
                <li>Link1</li>
                <li>Link2</li>
                <li>Link3</li>
            </ul>
        </nav>
        <main>
            <article class="article1">
                <header>article-header</header>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Fugiat minus amet ratione cumque quae expedita maxime ducimus eum quam sunt aliquam,
                     odit temporibus voluptates totam illo doloremque corrupti alias incidunt!
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    
                </p>
                <footer>article-footer</footer>
            </article>
            <article class="article2">
                <header>article-header</header>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Fugiat minus amet ratione cumque quae expedita maxime ducimus eum quam sunt aliquam,
                     odit temporibus voluptates totam illo doloremque corrupti alias incidunt!
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  
                </p>
                <footer>article-footer</footer>
            </article>
        </main>
        <aside>
            <figure>aside</figure>
            <p class="aside_p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis culpa quae repudiandae necessitatibus nam non, atque pariatur nihil voluptate magni deserunt voluptates corrupti assumenda facilis maxime alias minima dicta a?
            </p>
        </aside>
    </section>
    <footer>footer</footer>
</body>
</html>
```

## 五、Video和audio的应用

1. video元素定义视频
   - 控制栏：controls
   - 循环播放：loop
   - 自动播放：autoplay（多数浏览器已屏蔽）
   - 静音：muted

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>
        之前的霸主flash, 由于安全性、计算资源使用效率低,被抛弃了
    </p>
    <h1>音频</h1>

    <audio src="./jiejie.wav" controls loop autoplay muted></audio>

    <!-- controls 控制栏
         loop : 循环
         autoplay :自动播放

         muted:静音
     -->
</body>
</html>
```

1. audio元素定义音频

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        video{
            width: 300px;
            height: 300px;
        }
    </style>
</head>
<body>
    <!-- <video src="./movie.mp4" controls loop autoplay muted></video> -->
    <video src="./movie.mp4" controls loop poster="./poster.jpg" ></video>

    <!-- controls 控制栏

         loop 循环

         autoplay 自动播放

         muted 静音


         poster 属性海报
         width 
         height
     -->
</body>
</html>
```

- ==**controls属性:**如果出现该属性,则向**用户显示控件,比如播放按钮。**==
- autoplay属性:如果出现该属性,**则视频在就绪后马.上播放。**
- loop属性:重复播放属性。
- muted属性:静音属性。
- **poster属性:**规定视频正在下载时显示的图像，直到用户点击播放按钮。==(即封面)==

## 六、增强表单

### input的类型(type)多样

- Type= "color” 生成一个颜色选择的表单
- Type= "tel” 唤起拨号盘表单（手机专用）
- Type= "search" 产生一个**搜索意义的表单**
- Type= "range” 产生- 个**滑动条表单**
- Type= "number” 产生一个数值表单  (只能选择指定范围的类型)
- Type= "email" 限制用户必须输入email类型  
- ==Type= "url” 限制用户必须输入url类型   (规则:协议命://路径)==
- Type= "date” 限制用户必须输入日期  
- Type= "month" 限制用户必须输入月类型    (火狐可能不支持)
- Type= "week"限制用户必须输入周类型     (火狐可能不支持)
- Type= "time” 限制用户必须输入时间类型     (火狐可能不支持)
- ==Type= "datetime-local" 限制输入时间格式==   (火狐可能不支持)

**注意:数值(number)框和range框可设置步长(step),最大值和最小值属性** 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 颜色选择 -->
    <form action="">
        <div>
            <!-- 颜色选择:<input type="color" name="color"> -->
        </div>
        <div>
            <!-- 邮箱: <input type="email" name="myemail"> -->
        </div>
        <div>
            url地址(完整地址) : <input type="url">
        </div>

        <div>
            电话号码: <input type="tel">
        </div>

        <div>
            滑块效果: <input type="range" name="range" min="100" max="200" value="100" step="10">

            <!-- step步长 -->
        </div>

        <div>
            数字类型: <input type="number" min="0" max="10" value="4" step="2" name="age">
        </div>

        <div>
            搜索: <input type="search">
        </div>

        <div>
            日期选择 <input type="date">
            月份选择 <input type="month">
            周数选择 <input type="week">

            <input type="datetime-local" name="datetime">
        </div>
        <input type="submit">
    </form>
</body>
</html>
```



###  增强表单之属性

- **autofocus属性:**
  给文本框、选择框、或者按钮控件加上该属性,==当打开页面时，该控件自动获得国标焦点，一个页面只能有一 个==。

- **required属性:** 验证输入不能为空

- **Multiple:**

  **可以输入一个或多个值，每个值之间用逗号分开**
  例:` <input type= "email" multiple/>`
  还可以应用于file

- **pattern: (定制验证格式)**
  **将属性值设为某个格式的正则表达式，在提交时会检查其内容是否符合给定格式。**
  例: <input pattern= "[0-9][A-Z]{3}" title= “输入内容: -个数与三个大写字母" placeholder=输入内容: 一个数与三个大写字母’>

- **placeholder: 提示内容,但不会提交,与value有区别**

- **list: 选项列表,详见选项列表**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <div>
            用户名: <input type="text" autofocus required pattern="[0-9][A-Z]{3}">
            <!-- autofocus 获取焦点 -->
        </div>
        <div>
            邮箱:<input type="email" name="email" required multiple>

            <!-- required 必填项, 不能为空 -->

            <!-- multiple, 支持多个地址, 用逗号隔开 -->
        </div>
        <input type="submit">
    </form>
</body>
</html>
```



## 七、Datalist :选项列表


例: <input type= "urI" list="url list" name="link" />

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="uri" list="mylist">

    <datalist id="mylist">
        <option value="手机"></option>
        <option value="手表"></option>
        <option value="手环"></option>
        <option value="手镯"></option>
    </datalist>
</body>
</html>
```

提示: ==option 元素永远都要设置value属性。==

