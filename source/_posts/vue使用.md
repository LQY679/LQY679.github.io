---
title: Vue使用
date: 2020-04-12 18:57:32
categories: 
- 大前端
---



# Vue(使用)

## Vue初识

### 1、什么是MVVM

MVVM（Model-View-ViewModel）是一种软件设计模式，由微软WPF（用于替代WinForm，以前就是用这个技术开发桌面应用程序的）和Silverlight（类似于Java Applet，简单点说就是在浏览器上运行WPF）的架构师Ken Cooper和Ted Peters开发，是一种简化用户界面的事件驱动编程方式。由John Gossman（同样也是WPF和Sliverlight的架构师）与2005年在他的博客上发表。

MVVM源自于经典的MVC（Model-View-Controller）模式。MVVM的核心是ViewModel层，负责转换Model中的数据对象来让数据变得更容易管理和使用。其作用如下：

- **该层向上与视图层进行双向数据绑定**
- **向下与Model层通过接口请求进行数据交互**

![image-20220606201805984](vue%E4%BD%BF%E7%94%A8.assets/image-20220606201805984.png)

MVVM已经相当成熟了，主要运用但不仅仅在网络应用程序开发中。当下流行的MVVM框架有Vue.js，Anfular JS



### 2、为什么要使用MVVM

MVVM模式和MVC模式一样，主要目的是分离视图（View）和模型（Model），有几大好处

低耦合：视图（View）可以独立于Model变化和修改，**一个ViewModel可以绑定到不同的View上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。**
可复用：你可以把一些视图逻辑放在一个ViewModel里面，让很多View重用这段视图逻辑。
独立开发：开发人员可以专注于业务逻辑和数据的开发（ViewMode），设计人员可以专注于页面设计。
可测试：界面素来是比较难以测试的，而现在测试可以针对ViewModel来写。

![image-20220606202201824](vue%E4%BD%BF%E7%94%A8.assets/image-20220606202201824.png)



### View

View是视图层，也就是用户界面。前端主要由HTML和css来构建，为了更方便地展现ViewModel 或者Model 层的数据，已经产生了各种各样的前后端模板语言，比如FreeMarker、Thymeleaf 等等，各大MVVM 框架如Vue.js，AngularJS，EJS 等也都有自己用来构建用户界面的内置模板语言。

### Model

Model是指数据模型， 泛指后端进行的各种业务逻辑处理和数据操控， 主要围绕数据库系统展开。这里的难点主要在于需要和前端约定统一的接口规则

### ViewModel

ViewModel是由前端开发人员组织生成和维护的视图数据层。在这一层， 前端开发者对从后端获取的Model数据进行转换处理， 做二次封装， 以生成符合View层使用预期的视图数据模型。

需要注意的是View Model所封装出来的数据模型包括视图的状态和行为两部分， 而Model层的数据模型是只包含状态的

比如页面的这一块展示什么，那一块展示什么这些都属于视图状态(展示)
页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为(交互)
视图状态和行为都封装在了View Model里。这样的封装使得View Model可以完整地去描述View层。由于实现了双向绑定， View Model的内容会实时展现在View层， 这是激动人心的， 因为前端开发者再也不必低效又麻烦地通过操纵DOM去更新视图。
  MVVM框架已经把最脏最累的一块做好了， 我们开发者只需要处理和维护View Model， 更新数据视图就会自动得到相应更新，真正实现事件驱动编程。
  View层展现的不是Model层的数据， 而是ViewModel的数据， 由ViewModel负责与Model层交互， 这就完全解耦了View层和Model层， 这个解耦是至关重要的， 它是前后端分离方案实施的重要一环。



### Vue概述

Vue被设计为可以自底向上逐层应用。**Vue的核心库只关注视图层**，不仅易于上手，还便于与第三方库（如: `vue-router: 跳转`，`vue-resource: 通信`，`vuex:管理`）或既有项目整合

Vue官网：https://cn.vuejs.org/

在MVVM架构中，是不允许数据和视图直接通信的，只能通过ViewModel来通信，而ViewModel就是定义了一个Observer观察者

ViewModel能够观察到数据的变化，并对视图对应的内容进行更新
ViewModel能够监听到视图的变化，并能够通知数据发生改变
至此，我们就明白了，Vue.js就是一个MVVM的实现者，他的核心就是实现了DOM监听与数据绑定



## 模板语法

模板语法又叫插值语法,大胡子语法, 如:

```js
{{数据}}
```

括号中的数据可以写 **js表达式**, 和 **data属性的内容,还有vm的computed**(vm实例的一个配置项),其中,html标签中的文本内容叫做模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/vue.js"></script>
    <title>Document</title>
</head>
    
    
<!-- 
  Vue 数据代理:
  在页面中{{name}} 实际上获取到的值,应该是 data(){
       return {school:"广科师",major:"软件工程"};
  }
  原理: 在new 一个Vue实例时, 我们将构造器Vue({对象})中的参数对象称为
  opintion , 其中参数对象的 data属性 会成为 vue实例的生成一个名为 _data的属性(此时依然没有
  涉及到数据代理,属于赋值的关系),即实际上js整个作用域中真实存在的只有 _data属性(这个属性的类型是对象)
  随后为了编码方便,vue实例又生成代理_data对象的属性值的属性
 -->
<body>
<!-- 
并且可以在 html 标签的文本内容中 可以用 {{}} 引入属性值 data
{{}} ,中可以写 js表达式, 和 data属性的内容
其中,html标签中的文本内容叫做模板
 -->
    <div id="root">
        <h2>学校名称:{{school}}</h2>
        <h2>专业名称:{{major}}</h2>
    </div>
</body>
<script>
    Vue.config.productionTip = false;
    var vm = new Vue({
        el: "#root",
        data(){
            return {school:"广科师",major:"软件工程"}
        }
    });
</script>
</html>
```



## VM配置属性

vm( 即ViewModel )对象负责对Model成进行交互, 对视图层进行控制管理

其构造方法` Vue(Object obj)`; ,其中的**参数是一个对象,对象的属性包括了vue对象的一些基本信息**

vm的对象有如下这些:

### el 绑定Dom

用来将vm绑定dom容器,并且一一对应(一般是根容器) 

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>初识vue</title>
		<script src="js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div class="div1">
			1. hello {{name}}! 时间戳:{{new Date()}} 
		</div>
		<!-- 这个div不会解析,因为唯一绑定原则,并且按照dom加载顺序解析 -->
		<div class="div1">     
			2. hello {{name}}! 
		</div>
		<script type="text/javascript">
			Vue.config.Vue.config.productionTip = false  //设置为 false 以阻止 vue 在启动时生成生产提示。
			// 创建 vue 对象
			new Vue({
				el: ".div1",    // 绑定 dom
		</script>
	</body>
</html>

```

### data 数据属性

`data`用于存放vm对象的数据, 有两种写法: 对象式和函数式,**一般我们推荐用函数式写法**

对象式写法(不推荐):

```html
<script>
    Vue.config.productionTip = false;
    var vm = new Vue({
        el: "#root",
        data:{
            school:"xxxxx",
            major:"软件工程"
        }
    });
</script>
</html>
```

**函数式写法**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/vue.js"></script>
    <title>Document</title>
</head>
    <div id="root">
        <h2>学校名称:{{school}}</h2>
        <h2>专业名称:{{major}}</h2>
    </div>
</body>
<script>
    Vue.config.productionTip = false;
    var vm = new Vue({
        el: "#root",
        data(){
            return {school:"xxx",major:"软件工程"}
        }
    });
</script>
</html>
```

#### Vue中的数据代理

  Vue 数据代理:  在页面中{{name}} 实际上获取到的值,应该是 data(){
       return {school:"广科师",major:"软件工程"};
  }
  原理: 在new 一个Vue实例时, 我们将**构造器Vue({对象})中的参数对象称为  opintion** , 其中**参数对象的 data属性 会成为 vue实例的生成一个名为 _data的属性**(此时依然没有涉及到数据代理,属于赋值的关系),即**实际上js整个作用域中真实存在的只有 _data属性**(这个属性的类型是对象)随后**为了编码方便,vue实例又生成代理_data对象的属性值的属性**



### methods 方法(事件处理)

`methods`里可为vm对象新建多个方法,**一般用于事件绑定**

**methods配置的函数最终都会被vm管理,并且不要使用箭头函数,否则this将会变成 window** , **默认是指向vm或组件实例**

 注意: 当事件函数名带括号时如果不写$event就无法获取(只写函数名能获取则可以)到事件对象event  如 f() 即如果无须指定参数,且想用 event请直接写函数名即可	

#### **基本事件处理:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js" type="text/javascript"></script>
</head>
<!-- 
事件的基本使用:
  1.使用命令 v-on:事件名="事件函数名" 来绑定事件,通常可以将v-on简写为@   需要回调和指定参数的话 @事件名: "事件函数(@event,参数)"  
  2. 事件的回调需要配置在methods中, 最终会在vm上
  3.methods配置的函数最终都会被vm管理,并且不要使用箭头函数,否则this将会变成 window , 默认是指向vm或组件实例
 注意: 当事件函数名带括号时如果不写$event就无法获取(只写函数名能获取则可以)到 事件对象event  如 f()
 即如果无须指定参数,且想用 event请直接写函数名即可
   -->
<body>
    <div id="root">
        <h2>你好!欢迎来到{{name}}</h2>
        <!-- <button v-on:click="showInfo">点我提示信息</button> -->
		<!-- 简写形式: -->
		<button type="button" @click="showInfo">点我提示信息</button>
		<!-- 外部传参,且保留event, 注意: @event 相当于vue的关键字 -->
		<button type="button" @click="showInfo2($event,'data')">点我提示信息(传参)</button>	
    </div>
	
	<script type="text/javascript">
	    Vue.config.productionTip = false ; 
	const vm = new Vue({
	    el:"#root",
	    data(){
	        return {name:"Vue"}
	    },
		methods:{
			showInfo(event){
				console.log(event.target);
				alert("欢迎学习vue");
				
			},
			showInfo2(event,num){
				console.log(event.target);
				console.log(num);
			}
		}
	});
	</script>
</body>

</html>
```

#### 键盘事件处理

vue为了方便开发,**给常用的按键起了别名**,我们可以通过 `@按键事件.别名` 来绑定特定案件(可以使用多个按键, 如 @keyup.ctrl.y)

**按键事件:**`keydwon`即当 键 按下去时触发(组合键不可用) , `keyup`当 键 松起时触发

每个按键都有一个代号 可以通过 event对象的keyCode属性查看到, 注: 2022-2-9 keyCode已经弃用, 采用 key属性替换

**1.常用别名**

   回车 `enter`

   删除 `delete` (捕获删除键和退格键)

   退出 `esc`

   空格 `space`

   换行 `tab` (注意:由于会切换焦点,故**只能配合keydwon使用**)

   方向键:    上 up  下 dwon 左 left 右 right	

**2.系统修饰按键(用法特殊): ctrl  alt  shift  meta(徽标键)** 

   (1) 配合 keyup使用: 按下修饰键的同时再按下其他键,随后其他键才能触发

   (2) 配合 keydwon使用: 正常触发

**3.Vue未提供的别名的按键,可以使用原始key值去绑定,但要注意键名是组合的单词的时候需要转为kebab-case**

  如 大写锁定键 `CapsLock`  应该写为 `@keyup.caps-lock = 事件函数名`

**4.自定义按键别名**

   Vue.config.keyCodes.自定义别名  = 键码

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			<!-- 键盘事件 使用别名 -->
			按回车打印<input type="text" name="" id="" value="" @keyup.ctrl="print"/>
		</div>		
		<!-- js键盘事件知识补充:
		  keydown 当按键按下时就触发 (组合键没法用)
		  keyup  当按钮按下后并且松开时触发
		  每个案件都有一个代号 可以通过 event对象的keyCode属性查看到, 注: 2022-2-9 keyCode已经弃用
		  采用 key属性替换
		 -->
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el:"#root",
				methods:{
					print(event){
						// console.log("键盘代号:",event.keyCode);
						// 通过回车打印文本框的值
						// if(event.keyCode!=13){
						// 	return
						// }
						console.log("按键:",event.key);
						console.log(event.target.value);
					}
				}
			});
		</script>
	</body>
</html>
```

#### 事件修饰符

常用的事件修饰符(修饰符可以连续使用多个如 `@click.stop.prevent`):

1.prevent 阻止默认事件(常用)

  2.stop 阻止事件冒泡 (常用) , **事件冒泡是指 当子元素与父元素有相同的事件时, 当子元素触发后父元素也会触发**

  3.once 事件只触发一次(常用)

  4.capture 使用事件的**捕获模式, 也就是事件处理在获取阶段就进行处理**

  浅谈事件的捕获与冒泡:   js事件分为了捕获和冒泡两个阶段,

  **捕获阶段是由外往内的,冒泡阶段是由外往内的** ,    其中,是**先进行了事件捕获,再进行事件冒泡的, 不过最后处理事件是在冒泡阶段完成**

​    5.self 只有event.target 是当前操作的元素时才触发事件,   场景假设: 当 div里有一个按钮, 两者同时存在click事件,但是div触发事件的回调的 event.target 是button

  6.passive 事件默认行为 为立即执行, 无需等待事件回调执行完毕, 例如有个 a标签,点击事件绑定了有 alert语句的事件函数,

  使用此修饰符将会 立即跳转而不等待弹窗



### computed 计算

计算属性和方法有点类似,但是为了解耦, 所以引入了计算属性, 虽然也**写成方法形式**, 不过计算属性是有值的, 他的值就是方法的返回值

此外还需要**注意使用计算属性时不能加括号**(因为是代表一个值) , **可以在插值语法中使用**

计算属性有三种写法如下所示: 

**注意: 简写的时候没有`set()`也就意味着是没法修改的, 并且由于他还是属性,使用计算属性时不能加括号**

```html
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: "#root",
				data: {
					fristname3: "枫",
					lastname3: "叶",
				},
				// 完整写法:
				computed: {
					
					/* fullNname: {
						set() {
							.....
						 }
						get() {
							console.log("get被调用!");
							// vue 做了优化,此时 get函数的this是指向vue实例的
							return this.fristname3 + "-" + this.lastname3;
						} 
					}  */
					// 简写: 将计算属性写成一个函数,返回的值即是计算属性的值
					
					/* fullName:function(){
						console.log("get被调用!");
						return this.fristname3 + "-" + this.lastname3;
					}, */
					// 最简写法:
					fullName() {
						console.log("get被调用!");
						return this.fristname3 + "-" + this.lastname3;
					}
				}
			});
</script>
```

### watchd 监视 (异步计算)

监视属性与计算属性非常类似, 当**一般计算时通常使用,computed计算属性, 但涉及到异步运算, 就用 watch 监视属性来间接实现**

两者区别如下: 

1.computed能完成的,watchd都能完成

2.watch能完成的, computed不一定能完成, 比如异步操作

两个重要的小原则:

   1.**所有被vue管理的函数, 最好写成,普通函数,这样this指向的是 vue或组件实例对象**

   2.所有不被vue管理的函数(如:**定时器的回调函数,ajax的回调函数等), 最好写成箭头函数**,这样 this 才可以指向 vm 或组件实例

如下面的例子:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
		
			<h4>使用计算属性computed实现</h4>
			姓:<input type="text" name="" id="" v-model="fristname3" /> <br><br>
			名:<input type="text" name="" id="" v-model="lastname3" /> <br><br>
			<span>全名: {{fullName}}</span> <br>
			
			<h4>使用监听属性</h4>
			姓:<input type="text" name="" id="" v-model="fristname2" /> <br><br>
			名:<input type="text" name="" id="" v-model="lastname2" /> <br><br>
			<span>全名: {{fullName2}}</span> <br>
		</div>

		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: "#root",
				data: {				
					fristname3: "枫",
					lastname3: "叶",
					fristname2: "张",
					lastname2: "三",
					// 监听属性需要使用
					fullName2:"张-三"
				},
				computed:{
					fullName(){ 
						// 这样没法达到效果是 因为: fullName没有返回语句返回出去给他
						setTimeout(()=>{
							return this.fristname3+"-"+this.lastname3;
						},1000);
						// 假如在这里加上一个 return 依然没有效果, 会直接返回
						// return this.fristname3+"-"+this.lastname3;
					}		
				},
				watch:{
					fristname2(newValue){
						// 注意,此时箭头函数的this是指向 vm 
						// 要使用箭头函数 是因为 setTimeOut()不是 vm管理的函数,
						// 其普通函数默认回调函数的this指向:window,使用箭头函数后this 才会指向 vm
						setTimeout(()=>{
							this.fullName2 = newValue +"-"+this.lastname2;
						},1000)
						
					},
					lastname2(newValue){
						this.fullName2 = this.fristname2 + "-" + newValue;
					}
				}
			});
		</script>
	</body>
</html>
```

#### 简写形式:

**注意: 简写形式不能开启 deep 等配置项时**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<script src="../js/vue.js"></script>
	</head>
	<body>
		<div id="root">
			<h2>今天天气真{{info}}</h2>
			<button @click="charWheather">改变天气</button>
		</div>

		<script>
			Vue.config.productionTip = false;
			const vm = new Vue({
				el: "#root",
				data: {
					isHost: false
				},
				computed: {
					info() {
						return this.isHost ? "凉爽" : "炎热";
					}
				},
				methods: {
					charWheather() {
						this.isHost = !this.isHost
					}
				},
				watch:{
					// "isHost":{
					// 	// immediata:true,
					// 	// 当监测的属性(如 isHost)改变时调用 handler ,他有两个参数 可获得监测属性的改变值
					// 	handler(newValue,oldValue){
					// 		console.log("调用了handler!",newValue,oldValue);

					// 	}
					// }
					/*       简写        */
					isHost(newValue,oldValue){
						console.log("调用了handler!",newValue,oldValue);
					}
				},
				
				// 写法二
				// vm.$watch("isHost", {
				// 	handler(newValue, oldValue) {
				// 		// immediata:true,  //是否未等监测值改变就执行 handler
				// 		// 当监测的属性(如 isHost)改变时调用 handler ,他有两个参数 可获得监测属性的改变值
				// 		console.log("调用了handler!", newValue, oldValue);
				// 	}
				// })
			});
			
		</script>
	</body>
</html>

```

#### 深度检测(监测对象内容变化)

深度监视:

1. vue中watch默认不监视对象内部值的改变

2. 配置 `deep:true` 可以监测对象内部值改变

  备注:   **vue 自身监测对象内部值的改变,但 vue 提供的watch默认不可以**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<script src="../js/vue.js"></script>
	</head>
	<body>
		<div id="root">
			<h2>今天天气真{{info}}</h2>
			<button @click="charWheather">改变天气</button>
			
			<hr>
			<h3>a的值:{{number.a}}</h3>
			<h3>b的值:{{number.b}}</h3>
			<button type="button" @click="add_a">a+1</button>
			<button type="button" @click="add_b">b+1</button>
			
		</div>

		<script>
			Vue.config.productionTip = false;
			const vm = new Vue({
				el: "#root",
				data: {
					isHost: false,
					number: {
						a:1,
						b:2
					}
				},
				computed: {
					info() {
						return this.isHost ? "凉爽" : "炎热";
					}
				},
				methods: {
					charWheather() {
						this.isHost = !this.isHost
					},
					add_a(){
						this.number.a++;
					},
					add_b(){
						this.number.b++;
					}
				},
			
				watch:{
					"isHost":{
						// immediata:true,
						// 当监测的属性(如 isHost)改变时调用 handler ,他有两个参数 可获得监测属性的改变值
						handler(newValue,oldValue){
							// console.log("调用了handler!",newValue,oldValue);
						}
					},
					// 注意: 多级结构需注意由于 key 是字符串类型的,要加引号
					"number.a":{
						handler(newValue,old){
							console.log("a改变了",newValue,old);
						}
					},
					// 如果监测 number,默认只会监测 a b 的地址是否改变, a b 的值改变监测number监测不到
					//  开启 deep 深度监测 可解决上述问题
					"number":{
						deep:true,  // 深度监测
						handler(newValue,old){
							console.log("number改变了");
						}
					}
				}
			});		
		</script>
	</body>
</html>
```



### filters过滤器

我们可以在VM中配置过滤来对一些数据进行格式化, **在插值语法中结合管道符使用过滤器进行过滤**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>过滤器</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h4>now时间戳:{{time}}</h4>
        <!-- 将 time 作为默认参数传入过滤器,只有默认参数时不需要括号,
            有多个参数,需省略默认参数,即如果有两个参数,只需写 timeFilter(pra2),
            time依然传递,还可以传递pra2
           此外,过滤器后面再接一个 管道符 还可以进行串联        -->
        <h4>局部过滤器:{{time|timeFilter}}</h4>
        <h4>全局过滤器:{{time|timeFilter2}}</h4>
    </div>

    <script>
// 封装转换时间格式的方法
Date.prototype.Format = function (fmt) {
var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**************** Vue 开始工作 ********************************************/
        Vue.config.productionTip = false;
// 注意:全局过滤器需要在 new vue实例前配置好
        Vue.filter("timeFilter2",(value)=>{
            return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
        });

        let vm = new Vue({
            el :"#root",
            data :{time:new Date().getTime()},

            filters:{
                timeFilter(value){
                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                }
            },
        });
    </script>
</body>
</html>
```

##### 全局过滤器:

我们还可以配置全局过滤器(在整个Vue项目中都可以使用) , **不过需要注意,全局过滤器要在实例化Vue配置**

```js
// 注意:全局过滤器需要在 new vue实例前配置好
        Vue.filter("timeFilter2",(value)=>{
            return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
        });
        let vm = new Vue({
            el :"#root",
            data :{time:new Date().getTime()},

            filters:{
                timeFilter(value){
                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                }
            },
        });
```

### directives 自定义指令

在vue里设置配置项 `directives` 值可以是函数和对象, 如果是函数,则可以有两个默认参数` function(element,binding)` . 其中,`binding`是一个对象,存在一些关于使用指令时的属性:

- `expression`: "10"    表达式,也就是指令等号里的内容

- `value`: 10        表达式的值

- `modifiers`: {}    

- `name`: "big"       指令的名字(不带v-)

- `rawName`: "v-big"    指令全称

**一. 当使用函数式时, 该函数调用的时机是: **

1.当指令与**元素成功绑定后**(即使最开始加载时);

 2.指令所在的**模板被修改时**(模板包括了差值语法和指令语法)   
 **注意:这与methods和其他指令等内置的不同,他们是依赖数据改变才会改变,其原因是底层做了复用优化**

**二. 使用对象式时, 我们可以通过三个钩子函数来具体化调用时机**

- `bind(element,binding)`: 指令与模板绑定时调用

- `inserted(element,binding)`:指令所在元素被插入页面时调用

- `update(element,binding)`: 指令所在模板被重新解析

具体使用:

```html
<!DOCTYPE html>
<!-- 
    如下案例将演示 创建一个自定义指令 v-big 将一个值扩大10倍 
    用法: 在vue里设置配置项 directives 值可以是函数和对象
    如果是函数,则可以有两个默认参数 function(element,binding)
    其中,binding是一个对象,存在一些关于使用指令时的属性:
expression: "10"      表达式,也就是指令等号里的内容
modifiers: {}       
name: "big"            指令的名字(不带v-)
rawName: "v-big"       指令全称
value: 10              表达式的值
 -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>自定义指令v-big</h2>
        <h3>这是一个值n:{{n}}</h3>
        <h3 v-big="n">使用自定义的指令v-big{{n}}</h3>
        <button type="button" @click="n++">n++</button>
    
        <br>
        <h2>自定义一个指令v-fbing,使文本框自动获取焦点,并且获得2*n的值</h2>
        
         n :<input type="text" v-fbind:value="n">
    </div>
    

    <script>
        Vue.config.productionTip = false;

        let vm = new Vue({
            el :"#root",
            data :{
                n :1,
            },
            directives:{
                // big函数何时会被调用? 
                // 1.当指令与元素成功绑定后(即使最开始加载时);  
                // 2.指令所在的模板被修改时(模板包括了差值语法和指令语法)   
                // 注意:这与methods和其他指令等内置的不同,他们是依赖数据改变才会改变,其原因是底层做了复用优化
                big(element,binding){
                    console.log(element,binding);
                     element.innerText ="使用自定义指令v-big "+ binding.value * 10;
                },
                /************对象式:*********************/
                // 实际上, 函数式就是 bind函数与update函数结合
                // 下面这几个经常被称为钩子
                fbind:{
                    // 指令与模板绑定时调用
                    bind(element,binding){
                        console.log("bind");
                        element.value = 2*binding.value;
                    },
                    // 指令所在元素被插入页面时调用
                    inserted(element,binding){
                        // 获取焦点
                        element.focus();
                        console.log("update");
                    },
                    // 指令所在模板被重新解析
                    update(element,binding){
                        console.log("update");
                        element.value = 2*binding.value;
                    }
                }
            }

        });
    </script>
</body>
</html>
```



### components 组件

![image-20220606210850969](vue%E4%BD%BF%E7%94%A8.assets/image-20220606210850969.png)

**组件就是 js+css+html片段,可以复用,组件可以看作vm的子类, 一般简称组件的实例对象为vc** , **组件可以嵌套组件**

Vue中使用组件的三大步骤:

#### **一.定义组件(创建组件)**:

分为**单文件组件(常用)**和**非单文件文件组件** ,非单文件组件使用`Vue.extend({配置})`

**组件的配置项和vm里的配置项基本一致,只不过data要写成方法的形式**,    ==并且不能写el配置==,因为组件由vm管理,由vm中的el决定在哪个容器

**单文件组件定义**,例如 `School.vue`

```vue
<!-- 组件的结构 -->
<template>
    <div id="demo">
        <h3>学校:{{name}}</h3>
        <h3>地址:{{address}}</h3>
        <button @click="show">点我提示信息</button>
    </div>
</template>

<!-- 组件交互 -->
<script>
    // 模块化导出, 默认导出一个文件只可以有一个,此外还有分别导出和统一导出
    // 使用默认导出的时候比较简单
    export default {
        name:"school",  //为了更好在开发者工具显示
        data() {
            return {
                name:"广科师",
                address:"广西来宾"
            }
        },
        methods:{
            show(){
                alert("欢迎学习Vue!");
            }
        }
    }
</script>

<!-- 组件的样式 -->
<style>
    .demo{
        background-color: aquamarine;
    }
</style>
```

**非单文件组件定义:**在使用了Vue的html文件中,定义主键student

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件基本使用</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <!-- 第三步: 编写组件标签 -->
            <student></student>
    </div>   
<script>
// 注册组件: 
// Vue.component(student);
    
// (第一步)创建组件
let student = Vue.extend({
    template:`<div>
        <h3>姓名:{{name}}</h3>
        <h3>年龄:{{age}}</h3>
        </div>`,
    data(){
        return {
            name:"神奈川",
            age: "18"
        }
    }
});

let vm = new Vue({
        el :"#root",
        // (第二步)注册组件 局部注册
        components:{
           student
        }
    });
</script>
</body>
</html>
```

####   **二.注册组件:** 

可分为局部注册和全局注册

- 局部注册: 使用` new Vue({})的components`配置项

  ```js
  let vm = new Vue({
          el :"#root",
          components:{
             student
          }
      });
  ```

- 全局注册: `Vue.component("组件名",组件变量)`

  ```js
  // 组件定义...
  // 注册组件
  Vue.component(student);
  ```

####   **三.使用组件:** 写组件标签

`<组件名><组件名/>` , 假如已经定义注册了名为student的组件

```html
<student></student>
```

#### 组件的注意点

**1.关于组件名:**

- ​    一个单词组成:  首字母可大写可小写

- ​    多个单词组成:

  - kebab-case写法:使用-链接,如 **my-school**

  - CamelCase写法:**MySchool (需要Vue脚手架支持)**    

备注: **组件名尽量回避html标签名,此外,使用的组件标签名一定与注册时的名字一致**, 可在组件中配置**name属性,但这仅仅影响开发者工具中的名字**



**2.关于组件标签**

  第一种,使用正常的双标签如: <组件名></组件名>

  第二种,使用单标签 <组件名/>

  备注: **不使用脚手架的情况下,使用单标签组件会导致后续组件不能渲染**



### props 传递数据

在vm或者组件中配置`props`属性可以**用于父组件向子组件传递数据** (即组件通信)

#### 传送数据:

当需要向子组件传送数据时, 一般是**在组件标签通过添加标签属性来传递参数(数据)** , ***注: 这个参数可以是 变量或者函数***

形如:

```vue
<组件名 参数名 = "值"><组件名>
```

注意,**参数的 值 必须用双引号包裹**(语法规则) ,**若需要传递组件的`data`数据, 或者js表达式, 可以使用`v-bind`指令来实现, 不过我们一般用其简写形式`:`**, 此外如果有特殊需要甚至可以使用双向绑定 `v-mode`

```vue
<!-- 简写形式: -->
<组件名 :参数名 = "值"><组件名>
<!-- 不简写 -->
<组件名 v-bind:参数名 = "值"><组件名>
```

#### 接收使用数据:

一般是子组件接收数据, 所以**需要给接收数据的组件实例对象需要配置`props`属性**,配置的方式有很多种, 有数组式,和**对象式(参数约束)**

子组件**接收到数据后,会变成vm的属性,可通过vm直接访问,也可以直接在插值语法中使用**

```js
props:["参数名1","参数名2..."]
```

**注意! `props`中的元素(即参数名)一定要和传递的设置的参数名对应得上**

**对象式**:

```js
// 限定类型
props{
    参数名1: 数据类型(Sting,Number等),
	参数名2: String,
	参数名3: Number,
	参数名4: Boolean,
}
// 完整性约束(必要性,默认值)
props{
    参数名1:{
        type: 数据类型,
        required: true
    },
    参数名2:{
        type: 数据类型,
        default: 12
    }
}
```

样例:

```html
<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>组件基本使用</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
    <father></father>
    </div>
   
    
<script>
Vue.config.productionTip = false;

// 定义子组件
const son = Vue.extend({
    template:` <div>
        <h2>子组件</h2>
        <h3>参数1:{{pram}}</h3> 
        <h3>参数2:{{pram2}}</h3>
        </div>`,
    name:"son",
    props:["pram","pram2"]
});

// 定义父组件
const father = Vue.extend({
    template:` <div>
        <h3>父组件</h3>
        <son pram="props传递的普通字符串" :pram2="name"></son>
        </div>`,
    name:"father",
    data(){
        return {
            name:"父组件data中的name",
        }
    },
    components:{
        son
    }
});

// 在Vue中注册父组件
let vm = new Vue({
        el :"#root",
        components:{
           father
        }
    });
</script>
</body>
</html>
```



## 指令

为了开发方便,Vue为我们提供了一些常用操作的基本指令,**可在html标签中使用**

### 内置指令

#### v-bind

我们已经成功创建了第一个Vue应用！看起来这跟渲染一个字符串模板非常类似， 但是Vue在背后做了大量工作。现在数据和DOM已经被建立了关联， 所有东西都是响应式的。我们在控制台操作对象属性，界面可以实时更新!
我们还可以使用**`v-bind`来绑定元素的属性! `v-bind`还有一个简写形式, 可用`:`直接代替**

```html
<!DOCTYPE html>
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--view层  模板-->
<div id="app">
   <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
<!--导入vue.js-->

<script src="https://v2.vuejs.org/js/vue.min.js"></script>
<script>
    var vm=new Vue({
        el:"#app",
        // Model:数据
        data:{
            message:"hello,vue!!"
        }
    });
</script>
</body>
</html>
```

####  v-model Vue双向绑定

**1、什么是双向绑定**
 Vue.js是一个MVVM框架，即数据双向绑定，即当数据发生变化的时候，视图也就发生变化，当视图发生变化的时候，数据也会跟着同步变化。这也算是Vue.js的精髓之处了。

 值得注意的是，我们所说的数据双向绑定，一定是对于UI控件来说的，非UI控件不会涉及到数据双向绑定。单向数据绑定是使用状态管理工具的前提。如果我们使用vuex，那么数据流也是单项的，这时就会和双向数据绑定有冲突。

**2、为什么要实现数据的双向绑定**
在Vue.js 中，如果使用vuex，实际上数据还是单向的，之所以说是数据双向绑定，这是用的UI控件来说，对于我们处理表单，Vue.js的双向数据绑定用起来就特别舒服了。即两者并不互斥，在全局性数据流使用单项，方便跟踪；局部性数据流使用双向，简单易操作。

**3、在表单中使用双向数据绑定**
你可以用v-model指令在表单 `<input>`、`<textarea>`及`<select>`元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但v-model本质上不过是语法糖。它负责监听户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

*注意：v-model会忽略所有元素的value、checked、selected特性的初始值而总是将Vue实例的数据作为数据来源，你应该通过JavaScript在组件的data选项中声明*

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>双向绑定</title>
</head>
<body>
<div id="app">

文本：<input type="text" v-model="message">{{message}}
<!-- 文本：<textarea type="text" cols="30" rows="10" v-model="message"></textarea>{{message}} -->
    性别：
    <input type="radio" name="sex" value="男" v-model="checked">男
    <input type="radio" name="sex" value="女" v-model="checked">女
<p>选中了：{{checked}}</p>

    下拉框
    <select v-model="acc" name="" id="">
        <option value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <span>value:{{acc}}</span>
</div>
<script src="https://v2.vuejs.org/js/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
             message: '123'
        },
    });
</script>
</body>
</html>

```

**注意**：`v-model`表达式的初始值未能匹配任何选项，元系将被渲染为“未选中”状态。 在iOS中， 这会使用户无法选择第一个选项，因为这样的情况下，iOS不会触发change事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

##### 表单数据收集

 若是：`<input type="text"/>`，则v-model收集的是value值

​      若是：`<input type="radio"/>`，则v-model收集的是value值

​      若是：`<input type="checkbox"/>`

​              1.没有配置input的value属性，那么收集的的就是checked（勾选 or 未勾选，是布尔值）

​              2.配置input的value属性:

​                    (1).v-model的初始值是非数组，那么收集的的就是checked（勾选 or 未勾选，是布尔值）

​                    (2).v-model的初始值是数组，那么收集的的就是value组成的数组

​      备注: v-model的三个修饰符:

​       ` lazy`: 失去焦点再收集数据

​        `number`: 输入字符串转为有效数字

​      `  trim`: 输入首尾空格过滤

样例如下所示:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>收集表单数据</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<div id="root">
			<form @submit.prevent="submit">
				账号：<input type="text" v-model="userInfo.account"> 
				<br/><br/>
				密码：<input type="password" v-model="userInfo.password">
				<br/><br/>
				性别：男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
							女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
				<br/><br/>
				爱好：抽烟 <input type="checkbox"  v-model="userInfo.hobby" value="smoke">
							喝酒 <input type="checkbox"  v-model="userInfo.hobby" value="drink">
							开车 <input type="checkbox"  v-model="userInfo.hobby" value="drive">
				<br/><br/>
				所属校区：<select v-model="userInfo.city">
										<option value="">请选择校区</option>
										<option value="beijing">北京</option>
										<option value="shanghai">上海</option>
										<option value="shenzhen">深圳</option>
										<option value="wuhan">武汉</option>
								 </select>
				<br/><br/>
				其他信息：<textarea v-model="userInfo.other" cols="30" rows="10"></textarea>
				<br/><br/>
				<input v-model="userInfo.agree" type="checkbox">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
				<br/><br/>
				<button>提交</button>
			</form>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					userInfo:{
						account:'',
						password:'',
						sex:'',
						hobby:[],
						city:'',
						other:'',
						agree:false,
					}
				},
				methods:{
					submit(){
						console.log(this.userInfo)
					}
				}
			})
		</script>
	</body>
</html>
```







#### v-if，v-else 和 v-show

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			<h3 v-show="isHiden1">使用v-show隐藏 原生js display:none</h3>
			<button type="button" @click="Cut_hiden(1)">v-show隐藏/显示</button>
			<template v-if="isHiden2">
				<h3 >使用v-if隐藏 直接删除dom(注意会影响结构)</h3>
				<p><i>扩展:可以使用template标签配合v-if(但是不能使用 v-show)使用包裹不会影响结构,使用div包裹会结构</i></p>
			</template>
			<button type="button" @click="Cut_hiden(2)">v-if隐藏/显示</button>
			<!-- 条件渲染除了有 v-if 还有 , v-else-if  , v-else 
			  逻辑与一般编程语言的 if 语句逻辑相同 
			  -->
		</div>
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: "#root",
				data: {
					isHiden1: true,
					isHiden2: true
				},
				methods: {
					Cut_hiden(type) {
						if (type == 1) {
							this.isHiden1 = !this.isHiden1;
						} else {
							this.isHiden2 = !this.isHiden2;
						}
					}
				}
			});
		</script>
	</body>
</html>

```

测试：

1、在浏览器上运行，打开控制台!
2、在控制台输入`vm.ok=false`然后回车，你会发现浏览器中显示的内容会直接变成NO

注：使用v-*属性绑定数据是不需要双花括号`{{}}`包裹的

**v-else-if**

- `v-if`
- `v-else-if`
- `v-else`

注：===三个等号在JS中表示绝对等于（就是数据与类型都要相等）



#### v-for

类似 js 的 `for in` 以及`for of`  , for in 与 for of 的区别是:

- `for in` **遍历的是key,适合遍历对象(拿到属性名),也可以遍历数组(拿到索引值)**

- `for of` **遍历的是 value 适合遍历数组,(不过在js中不可遍历对象,因为对象没有迭代器)**

此外还可以遍历次数 和字符串

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			 <h3>使用 v-for="(value,index) in persons" 遍历 </h3>
			<li v-for="(p,index) in persons" :key="index">
				<!-- v-for p in persons 也行,这样不返回索引值	 -->
				名字:{{p}} - 年龄: {{index}}
			</li>
			<br/>
			<h3>使用 v-for="(value,key) of obj" 遍历 </h3>
			<li v-for="(val,k) of obj" :key="k">
				{{val}} ,{{k}}
			</li>
			<!-- 此外还可以遍历次数 和字符串 -->
		</div>
		
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: root,
				data:{
					persons:[
						{id:"001",name:"张三",age:18},
						{id:"002",name:"李四",age:23},
						{id:"003",name:"王五",age:19},
					],
					obj :{
						key1:"value1",
						key2:"value2",
						key3:"value3",
					}
				}
				
			});
		</script>
	</body>
</html>
```

**补充: Vue检测数组中元素改变是通过检测js中几个原生方法的调用还判断数组是否改变的, 假如修改数组不是通过这几个原生方法则Vue无法响应数组的改变**

- `shift()` : 移除头端第一个元素

- `unshift(元素)` : 在头端添加元素

- `push(元素)` :  相当于入栈,**在尾部追加**

- `pop()` : 相当于出栈, **在尾部删除** 

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			<h3>使用 v-for="(value,index) in persons" 遍历 </h3>
			<li v-for="(p,index) in persons" :key="index">
				<!-- v-for p in persons 也行,这样不返回索引值	 -->
				名字:{{p}} - 年龄: {{index}}
			</li>
			<br/>
			<h3>使用 v-for="(value,key) of obj" 遍历 </h3>
			<li v-for="(val,k) of obj" :key="k">
				{{val}} ,{{k}}
			</li>
			<!-- 此外还可以遍历次数 和字符串 -->
		</div>
		
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: root,
				data:{
					persons:[
						{id:"001",name:"张三",age:18},
						{id:"002",name:"李四",age:23},
						{id:"003",name:"王五",age:19},
					],
					obj :{
						key1:"value1",
						key2:"value2",
						key3:"value3",
					}
				}
			});
		</script>
	</body>
</html>

```

##### Key原理

可通过`:key`来**绑定遍历的关键字**,只有选择正确的关键字才不会出现dom错位

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			<h3>index作为key</h3>
			<button type="button" @click="add_per(1)">添加一个老刘</button>
			<li v-for="(p,index) of persons" :key="index">
				名字:{{p.name}} - 年龄: {{p.age}} 
				<input type="text"/>
			</li>
			<hr>
			<h3>index作为key</h3>
			<button type="button" @click="add_per(2)">添加一个老刘</button>
			<li v-for="(p,index) of persons2" :key="p.id">
				名字:{{p.name}} - 年龄: {{p.age}} 
				<input type="text"/>
			</li>
			
		</div>
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: root,
				data:{
					persons:[
						{id:"001",name:"张三",age:18},
						{id:"002",name:"李四",age:23},
						{id:"003",name:"王五",age:19},
					],
					// 对照组
					persons2:[
						{id:"001",name:"张三",age:18},
						{id:"002",name:"李四",age:23},
						{id:"003",name:"王五",age:19},
					],
				},
				methods:{
					add_per(type){
						if(type==1){
							this.persons.unshift({id:"004",name:"老刘",age:25});
						}
						else{
							this.persons2.unshift({id:"004",name:"老刘",age:25});
						}
						
					}
				}	
			});
		</script>
	</body>
</html>
```

##### 列表过滤:

如下是实现了一个模糊搜索的列表过滤

**知识补充: `Array.filter()`**

它创建一个新数组，**新数组中的元素是通过检查指定数组中符合条件的所有元素。**

 注意：filter()不会对空数组进行检测、不会改变原始数组

 语法`:Array.filter(function(currentValue, indedx, arr), thisValue)`  其中，函数 function 为必须，**数组中的每个元素都会执行这个函数。**且如果返回值为 true，则该元素被保留；**函数的第一个参数 currentValue 也为必须，代表当前元素的值**。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			
			<h3>列表过滤(watch实现)</h3>
		模糊搜索:<input type="text" v-model="keyword" placeholder="请输入名字"/> <br>
			<li v-for="(p,index) of filterPersons" :key="p.id">
				{{p.name}} - {{p.age}} 
			</li>
			
			<h3>列表过滤(computed实现)</h3>
			模糊搜索:<input type="text" v-model="keyword2" placeholder="请输入名字"/> <br>
				<li v-for="(p,index) of key_person" :key="p.id">
					{{p.name}} - {{p.age}} 
				</li>			
		</div>
        
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: root,
				data:{
					persons:[
						{id:"001",name:"马冬梅",age:32},
						{id:"002",name:"周冬雨",age:18},
						{id:"003",name:"周杰伦",age:26},
						{id:"004",name:"温兆伦",age:27}
					],
					// 搜索关键字
					keyword:"",
					// 过滤后的数据
					filterPersons:[],
					
					 persons2:[
					 	{id:"01",name:"马冬梅",age:32},
					 	{id:"02",name:"周冬雨",age:18},
					 	{id:"03",name:"周杰伦",age:26},
					 	{id:"04",name:"温兆伦",age:27}
					 ],
					 // 搜索关键字
					 keyword2:"",
				},
				methods:{
					
				},
				computed:{
					key_person(){
						return this.persons2.filter((p)=>{
							return p.name.indexOf(this.keyword2) !== -1
						})
					}
				},
				watch:{
					keyword:{
						immediate:true,
						handler(newValue){
				/*   Array.filter() 用法
            	  它创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            	  注意：filter()不会对空数组进行检测、不会改变原始数组
            	  语法:Array.filter(function(currentValue, indedx, arr), thisValue)
            	  其中，函数 function 为必须，数组中的每个元素都会执行这个函数。且如果返回值为 true，则该元素被保留；
            	  函数的第一个参数 currentValue 也为必须，代表当前元素的值。
            	  */
						return this.filterPersons = this.persons.filter((p)=>{
						//  indexOf() 判断一个字符串是否包含参数字符串,返回匹配值的首字符索引,不存在返回 -1
						// 并且每个数组都包含空串
						// console.log("过滤器的this是:",this);  //this 因为是箭头函数指向父级上下问,即 vm
								return p.name.indexOf(newValue) !== -1;
							})
						}
					}	
				}
				
			});
		</script>
	</body>
</html>
```

##### 列表排序

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../js/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="root">
			
			<h3>列表过滤(computed实现)</h3>
			模糊搜索:<input type="text" v-model="keyword2" placeholder="请输入名字"/> <br>
				<li v-for="(p,index) of filPerson" :key="p.id">
					{{p.name}} - {{p.age}} 
				</li>
			<br>	
			<button type="button" @click="sortType = 1">按年龄升序</button>
			<button type="button" @click="sortType = 2">按年龄降序</button>
			<button type="button" @click="sortType = 0">复原</button>
		</div>
		
		<script type="text/javascript">
			Vue.config.productionTip = false;
			var vm = new Vue({
				el: root,
				data:{

					 persons2:[
					 	{id:"01",name:"马冬梅",age:32},
					 	{id:"02",name:"周冬雨",age:18},
					 	{id:"03",name:"周杰伦",age:26},
					 	{id:"04",name:"温兆伦",age:27}
					 ],
					 // 搜索关键字
					 keyword2:"",
					 sortType:0,  // 0 原顺序 , 1 升序 , 2降序
				},
				methods:{
					
				},
				computed:{
					filPerson(){
						let arr =  this.persons2.filter((p)=>{
							return p.name.indexOf(this.keyword2) !== -1
						});
						// 判断排序类型
						if(this.sortType){
							arr.sort((p1,p2)=>{
								return this.sortType === 1 ? (p1.age-p2.age):(p2.age-p1.age);
							});
							
							//  补充 js 中 array.sort(function(a,b){如果是return a-b就升序,否则降序}
						}
						return arr ;
					}
				},
				
			});
		</script>
	</body>
</html>
```





#### v-on 事件绑定

`v-on`监听事件 , 事件有Vue的事件、和前端页面本身的一些事件!我们这里的`click`是vue的事件，可以绑定到Vue中的`methods`中的方法事件! **此外`v-on`还有一个简写形式: 可直接用`@`代替`v-on`**

*注意: 当给元素(html标签)绑定好事件后, 即使组件销毁后, 元素绑定的事件依然存在*

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
     <!-- 在这里我们使用了v-on绑定了click事件，并指定了名为sayHi的方法 -->
    <button v-on:click="sayHi">click me</button>

</div>

<script src="https://v2.vuejs.org/js/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            message: '狂神说java'
        },
        methods: {  //方法必须定义在vue 的Methods对象中
            sayHi: function () {
                //this 在方法里指向当前Vue实例
                alert(this.message);
            }
        }
    });
</script>
</body>
</html>
```





#### v-text 和 v-html

两者底层都是innerHtml或InnerText,会覆盖原来的内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>内置指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>解析数据</h2>
        <h3 v-text="inText"></h3>
        <h3 v-html="inHtml"></h3>
        <p>注意:两者底层都是innerHtml或InnerText,会覆盖原来的内容</p>
        
        let vm = new Vue({
            el :"#root",
            data :{
                inText :"v-text将数据解析成普通文本(推荐使用)",
                inHtml :"<a href='#'>v-html能将数据解析成html标签</a>",
            }
        });
    </script>
</body>
</html>
```

#### v-cloak , v-once , v-once

`v-cloak`:v-cloak在vue加载后会清除,通常配合css属性选择器使用

使用场景:比如在vue还没加载时,会将vue未解析的内容显示出来可以使用属性选择器[v-cloak]{display:none}将其隐藏,随后vue加载后会把v-cloak属性清除随后解析内容

`v-once`:v-once只解析一次,随后就变成静态内容,不会再响应数据变化

`v-pre`:v-pre 使用后vue不解析使用此指令的东西\

应用场景:能提高效率,静态内容使用此指令,vue能直接跳过从而避免逐一解析影响性能

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>内置指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <br>
        <h2>v-cloak在vue加载后会清除,通常配合css属性选择器使用</h2>
        <p>使用场景:比如在vue还没加载时,会将vue未解析的内容显示出来
            可以使用属性选择器[v-cloak]{display:none}将其隐藏,随后vue加载后会把v-cloak属性清除
        随后解析内容
        </p>

        <br>
        <h2>v-once只解析一次,随后就变成静态内容,不会再响应数据变化</h2>
        <h3 v-once>使用v-once后:{{n}}</h3>
        <h3>不使用v-once{{n}}</h3>
        <button type="button" @click="n++">点我n+1</button>

        <br>
        <h2>v-pre 使用后vue不解析使用此指令的东西</h2>
        <h3 v-pre>{{n}}</h3>
        <p>应用场景:能提高效率,静态内容使用此指令,vue能直接跳过从而避免逐一解析影响性能</p>
    </div>
    <script>
        Vue.config.productionTip = false;
        
        let vm = new Vue({
            el :"#root",
            data :{
                inText :"v-text将数据解析成普通文本(推荐使用)",
                inHtml :"<a href='#'>v-html能将数据解析成html标签</a>",
                n :1,
            }
        });
    </script>
</body>
</html>
```

### 自定义指令

通过vm 的`directives` 配置属性,我们可以定义局部自定义指令,并结合钩子函数选择何时调用,执行什么操作

如需定义全局自定义指令, 可以使用`Vue.dereactives({...})`

```html
<!DOCTYPE html>
<!-- 
    如下案例将演示 创建一个自定义指令 v-big 将一个值扩大10倍 
    用法: 在vue里设置配置项 directives 值可以是函数和对象
    如果是函数,则可以有两个默认参数 function(element,binding)
    其中,binding是一个对象,存在一些关于使用指令时的属性:
expression: "10"      表达式,也就是指令等号里的内容
modifiers: {}       
name: "big"            指令的名字(不带v-)
rawName: "v-big"       指令全称
value: 10              表达式的值
 -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
        <h2>自定义指令v-big</h2>
        <h3>这是一个值n:{{n}}</h3>
        <h3 v-big="n">使用自定义的指令v-big{{n}}</h3>
        <button type="button" @click="n++">n++</button>
    
        <br>
        <h2>自定义一个指令v-fbing,使文本框自动获取焦点,并且获得2*n的值</h2>
        
         n :<input type="text" v-fbind:value="n">
    </div>
    

    <script>
        Vue.config.productionTip = false;

        let vm = new Vue({
            el :"#root",
            data :{
                n :1,
            },
            directives:{
                // big函数何时会被调用? 
                // 1.当指令与元素成功绑定后(即使最开始加载时);  
                // 2.指令所在的模板被修改时(模板包括了差值语法和指令语法)   
                // 注意:这与methods和其他指令等内置的不同,他们是依赖数据改变才会改变,其原因是底层做了复用优化
                big(element,binding){
                    console.log(element,binding);
                     element.innerText ="使用自定义指令v-big "+ binding.value * 10;
                },
                /************对象式:*********************/
                // 实际上, 函数式就是 bind函数与update函数结合
                // 下面这几个经常被称为钩子
                fbind:{
                    // 指令与模板绑定时调用
                    bind(element,binding){
                        console.log("bind");
                        element.value = 2*binding.value;
                    },
                    // 指令所在元素被插入页面时调用
                    inserted(element,binding){
                        // 获取焦点
                        element.focus();
                        console.log("update");
                    },
                    // 指令所在模板被重新解析
                    update(element,binding){
                        console.log("update");
                        element.value = 2*binding.value;
                    }
                }
            }

        });
    </script>
</body>
</html>
```



## ref 属性

我们可以在组件标签中或者html标签中添加一个属性值,`ref`, 它被用来给组件或者元素**注册引用信息**

- **在组件中使用, 可以获取到该组件的 vc 实例对象**
- 在html标签中使用, 获取的是dom元素

***注: 假如用 html的原生标签属性 `id ` 来标识并获取组件标签, 则会得到将组件解析后的dom元素***

```html
<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ref属性</title>
    <script src="../js/vue.js"></script>
</head>
<body>
    <div id="root">
    <app></app>
    </div> 
<script>

Vue.config.productionTip = false;
// 定义组件
let student = Vue.extend({
    name: "student",
    template:`<div>
        <h3>子组件的元素</h3>
        <h3>姓名:{{name}}</h3>
        </div>`,
    data(){
        return {
            name:"神奈川",
        }
    }
});
// 定义组件
const app = {
    template:`<div>
        <h2 ref = "f_h3">父组件</h2>
        <student ref = "stu"></student>
        <button @click="showInfo()">点我打印信息</button>
        </div>`,
    components:{
        student
    },
    methods:{
        showInfo(){
            console.log("dom使用ref属性",this.$refs.f_h3)
            console.log("组件使用ref属性",this.$refs.stu)
        }
    }
}
let vm = new Vue({
        el :"#root",
        components:{
           app
        }
    });
</script>
</body>
</html>
```



## 插件, 混入(mixin)

### 插件

用于拓展功能,插件本质上是一个个暴露的js模块

#### 定义插件:

z在js文件中,`插件名.js`

```js
obj.install = function(Vue, options){ // 此处的Vue并不是vm, 而是vm的缔造者,他的原型对象
    // 功能代码: 如定义全局过滤器, 全局指令等
  	Vue.filter(...)
    Vue.directive(...)
    Vue.mixin(...)
}
```

#### 使用插件:

在实例化vm之前, 

```js
Vue.use("插件名")
```



### 混入(用到在学)



## 样式绑定



### 1.class样式

  写法`:class="xxx"` xxx可以是字符串、对象、数组。

- 字符串写法适用于：类名不确定，要动态获取。

-  对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。

-  数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

### 2. style样式

-   :style="{fontSize: xxx}"其中xxx是动态值。

-   :style="[a,b]"其中a、b是样式对象

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>绑定样式</title>
		<style>
			.basic{
				width: 400px;
				height: 100px;
				border: 1px solid black;
			}
			
			.happy{
				border: 4px solid red;;
				background-color: rgba(255, 255, 0, 0.644);
				background: linear-gradient(30deg,yellow,pink,orange,yellow);
			}
			.sad{
				border: 4px dashed rgb(2, 197, 2);
				background-color: gray;
			}
			.normal{
				background-color: skyblue;
			}

			.atguigu1{
				background-color: yellowgreen;
			}
			.atguigu2{
				font-size: 30px;
				text-shadow:2px 2px 10px red;
			}
			.atguigu3{
				border-radius: 20px;
			}
		</style>
		<script type="text/javascript" src="../js/vue.min.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
			<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
			<div class="basic" :class="classArr">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
			<div class="basic" :class="classObj">{{name}}</div> <br/><br/>

			<!-- 绑定style样式--对象写法 -->
			<div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
			<!-- 绑定style样式--数组写法 -->
			<div class="basic" :style="styleArr">{{name}}</div>
		</div>

		<script type="text/javascript">
			Vue.config.productionTip = false
			
			const vm = new Vue({
				el:'#root',
				data:{
					name:'尚硅谷',
					mood:'normal',
					classArr:['atguigu1','atguigu2','atguigu3'],
					classObj:{
						'atguigu1':false,
						'atguigu2':false,
					},
					styleObj:{
						fontSize: '40px',
						color:'red',
					},
					styleObj2:{
						backgroundColor:'orange'
					},
					styleArr:[
						{
							fontSize: '40px',
							color:'blue',
						},
						{
							backgroundColor:'gray'
						}
					]
				},
				methods: {
					changeMood(){
						const arr = ['happy','sad','normal']
						const index = Math.floor(Math.random()*3)
						this.mood = arr[index]
					}
				},
			})
		</script>
	</body>
</html>
```





## 生命周期(钩子函数)

每个**vm实例对象 (vc组件实例对象) 都有生命周期** , 我们可以**在vm配置项中编写对应生命周期函数(一般叫钩子函数) , 可以在特定的时机执行一些逻辑操作** 

### 生命周期过程:

![img](vue%E4%BD%BF%E7%94%A8.assets/5d8e6ecad769422995f0cfe75a8f5392.png)



### 钩子函数

#### 创建:

`beforeCreate()`:

`create():`

#### 挂载:

`beforeMount()` 

`mount()` **(重要)**

#### 更新:

`beforeUpate()`:  

`update()` 

#### 销毁:

`beforeDestory()`   **(重要)**

`destory()`





### 补充:

上面的生命周期结构图中有三个生命周期钩子没有体现出来

#### $nextTick

使用 vm中的`$nextTick(回调函数)`可以在Vue帮我们**解析完dom模板后, 在执行回调函数里面的逻辑操作**, 可以**用于生成输入框并自动获取焦点**



#### 路由生命周期钩子

路由组件有两个生命周期钩子 , 分别是路由组件被激活时和失活时





## 组件事件

### 自定义组件事件绑定

有两种绑定方式: 

- 通过`v-on`或简写形式`@`在组件标签中直接绑定: `<组件名 @自定义组件名="事件函数名"></组件名>`

- 注册子组件引用(子组件添加`ref`属性) , 随后通过父组件的`this.$refs.子组件引用值.$on("自定义组件名",事件函数)`

**触发组件事件:**

可以在**绑定事件的组件中**, 通过调用`this.$emit("自定义组件名",数据)`**来触发组件事件(注意:此处的`this`是指向绑定了组件事件的组件实例对象vc,即子组件对象而不是父组件)**

如下样例:将演示, 在app组件中,有两个子组件分别是: school 和 student , school组件通过`props`传递函数来实现向父组件传递数据,

而student组件to通过绑定自定义事件, 调用事件函数来传递数据

父组件:`App.vue`

```vue
<template>
  <div id="root">
    <h2>app组件</h2>

    <h3>接收参数1:{{name}}</h3>
     <!-- 通过props传递函数,子组件调用函数传递参数 实现子组件向父组件传递数据 -->
    <School :getSchoolName="getSchoolName"></School>

    <!-- 通过自定义组件事件,由子组件在触发内置事件时,通过$emit() 触发组件事件,并传递数据 -->
    <Student @my_event="getStudentName"></Student>
    <!-- <Student ref="student"></Student> -->
  </div>
</template>

<script>
import School from './components/scholl.vue'
import Student from './components/student.vue'

export default {
  name: 'App',
  data() {
    return {
      name: "姓名",
    }
  },
  components: {
    School,
    Student
  },
  mounted() {
    // 定时器...
    // this.$refs.student.$on("my_event",this.getStudentName)
    // 只执行一次
    // this.$refs.student.$once("my_event",this.getStudentName)
  },

  methods: {
    //  ES6语法: function(参数1,...参数) 表示参数重载,可以选用多个参数, 多个参数用数组存储
    getSchoolName(receiveData,...prarms){
      console.log("父组件接收到了学校的数据:",receiveData);
      this.name = receiveData.name
    },
    getStudentName(name){
      console.log("父组件接收到了学生的数据",name);
      this.name = name
    }
  }
}
</script>

<style>
#root {
  background-color: aqua;
}
</style>
```

子组件:`school,vue`

```vue
<!-- 组件的结构 -->
<template>
    <div class="demo">
        <h2>学校信息:</h2>
        <h3>学校:{{name}}</h3>
        <h3>地址:{{address}}</h3>
        <button @click="sendSchool()">通过传递参数向父组件传递信息</button>
    </div>
</template>

<!-- 组件交互 -->
<script>
    // 模块化导出, 默认导出一个文件只可以有一个,此外还有分别导出和统一导出
    // 使用默认导出的时候比较简单
    export default {
        name:"school",  //为了更好在开发者工具显示
        data() {
            return {
                name:"广科师",
                address:"广西来宾"
            }
        },
        props: ["getSchoolName"],
        methods: {
            sendSchool(){
                
                this.getSchoolName({'name':this.name, "address": this.address})
            }
        }
    }
</script>
<!-- 组件的样式 -->
<style scoped>
    .demo{
        background-color: rgb(135, 233, 110);
        padding: 5px;
    }
</style>
```

子组件`student.vue`:

```vue

<template>
    <div class="demo">
        <h2>学生信息:</h2>
        <h3>姓名:{{name}}</h3>
        <h3>年龄:{{age}}</h3>
        <button @click="sendStudentName">点我向父组件发送数据</button>
    </div >
</template>

<script>
    export default {
        name:"student",
        data() {
            return {
                name:"神奈川",
                age:18
            }
        },
        methods: {
            sendStudentName(){
                // 触发 组件事件的api: $emit("自定义组件事件名",数据) , 其中数据是可选的
                this.$emit("my_event",this.name)
            }
        }
    }

</script>


<style scoped>
     .demo{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
```

入口文件: `main.js`:

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#root')
```



### 自定义组件事件解绑

通过`this.$off(参数)`可以解绑事件,**`this`指向需要解绑组件事件的组件实例对象vc**,其中该函数有三种重载形式:

- `this.$off("组件事件名")` : 解绑指定的组件事件,  *(注意:参数写的是组件事件名, 而不是事件回调名)*

- `this.$off(["组件事件名1",组件事件名2,"组件事件名3"])`: 解绑多个组件事件
- `this.$off()` : **解绑所有组件事件**

 样例: `App.vue`

```vue
<template>
  <div id="root">
    <h2>app组件</h2>
    <h3>接收参数1:{{name}}</h3>
      
    <!-- 通过自定义组件事件,由子组件在触发内置事件时,通过$emit() 触发组件事件,并传递数据 -->
    <Student @my_event="getStudentName" @my_event2="getStudentName2"></Student>
  </div>
</template>

<script>
import Student from './components/student.vue'

export default {
  name: 'App',
  data() {
    return {
      name: "姓名",
    }
  },
  components: {
    Student
  },
  mounted() {
    // 定时器...
    // this.$refs.student.$on("my_event",this.getStudentName)
    // 只执行一次
    // this.$refs.student.$once("my_event",this.getStudentName)
  },

  methods: {
    getStudentName(name){
      console.log("父组件接收到了学生的数据",name);
      this.name = name
    },
    getStudentName2(){
      console.log("学生组件的第二个事件回调函数");
    }
  }
}
</script>

<style>
#root {
  background-color: aqua;
}
</style>
```

绑定组件事件的组件: `Student.vue`

```vue

<template>
    <div class="demo">
        <h2>学生信息:</h2>
        <h3>姓名:{{name}}</h3>
        <h3>年龄:{{age}}</h3>
        <button @click="sendStudentName">点我向父组件发送数据</button> <br>
        <button @click="unbind">解绑组件事件</button>
    </div >
</template>

<script>
    export default {
        name:"student",
        data() {
            return {
                name:"神奈川",
                age:18
            }
        },
        methods: {
            sendStudentName(){
                // 触发 组件事件的api: $emit("自定义组件事件名",数据) , 其中数据是可选的
                this.$emit("my_event",this.name)

                // 触发第二个组件事件
                this.$emit("my_event2")
            },

            // 解绑组件事件回调函数
            unbind(){
                // 解绑指定事件:
                this.$off("my_event2")
                
                // 解绑多个事件, 注意参数为数组类型
                // this.$off(["my_event","my_event2"])
                
                // 若不写参数, 则默认解绑所有组件事件
                // this.$off()  
            }
        }
    }

</script>

<style scoped>
     .demo{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
```



### 组件原生事件:

组件要想绑定原生事件,只需要加上一个事件修饰符`native`即可, **(因为组件绑定的事件, 默认是自定义事件)**

```vue
<组件名 @原生事件名.native="事件回调函数名"></组件名>
<!--或-->
<组件名 v-on:原生事件名.native="事件回调函数名"></组件名>
```

**注意: 给组件绑定原生事件, 触发时是以组件的最外层模板元素为准的,这也解释了为啥组件的模板为啥只能有一个最外层元素的原因**



### 全局组件事件总线

通过全局组件事件,我们可以==实现兄弟组件之间的组件通信==, 其原理是**在Vue的原型组件上添加一个属性`$bus` , 该属性的类型为Vue类型的对象,指向了一个Vue的实例** ,

- **接收数据的组件**,通过`this.$bus.on("全局组件事件名",事件回调函数)`可在组件事件回调函数中接收到数据 

- **发送数据的组件**通过`this.$bus.$emit("全局组件事件名",数据)` 则可以触发全局组件事件并且传送数据

如下案例: 通过全局组件事件Student组件向Scholl组件传送数据

**1.首先在vm实例中,通过钩子函数添加全局事件总线`$bus`** , 在`main.js`中

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  beforeCreate(){
    // 添加 全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#root')

```

`App.vue`

```vue
<template>
  <div id="root">
    <h2>app组件</h2>

    <School></School>
    <Student></Student>
  </div>
</template>

<script>
import School from './components/scholl.vue'
import Student from './components/student.vue'

export default {
  name: 'App',
  components: {
    School,
    Student
  },

}
</script>

<style>
#root {
  background-color: aqua;
}
</style>
```

`scholl,vue`

```vue
<!-- 组件的结构 -->
<template>
    <div class="demo">
        <h2>学校组件</h2>
        <h3>学生名:{{name}}</h3>
    </div>
</template>

<script>
    export default {
        name:"school",  //为了更好在开发者工具显示
        data() {
            return {
                name:"",
                address:"广西来宾"
            }
        },
        mounted() {
            this.$bus.$on("SchoolReceive",(data)=>{
                console.log("School组件接收数据所绑定的全局事件的回调函数:",data);
                this.name = data
            })
        },
        // 为了不造成耦合, 最好在组件销毁时把其绑定的事件解绑
        beforeDestroy() {
            this.$bus.$off("SchoolReceive")
        },
    }

</script>

<!-- 组件的样式 -->
<style scoped>
    .demo{
        background-color: rgb(135, 233, 110);
        padding: 5px;
    }
</style>
```

`student.vue`

```vue
<template>
    <div class="demo">
        <h2>学生信息:</h2>
        <h3>姓名:{{name}}</h3>
        <h3>年龄:{{age}}</h3>
        <button @click="sendStudentName">向学校组件发送数据</button> <br>
    </div >
</template>

<script>
    export default {
        name:"student",
        data() {
            return {
                name:"神奈川",
                age:18
            }
        },
        methods: {
            sendStudentName(){
              this.$bus.$emit("SchoolReceive",this.name)
            },
        }
    }
</script>

<style scoped>
     .demo{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
```







## vue脚手架(CLI)

**CLI即command line Interface,命令行接口**,在使用单文件组件的时候会用到

### 安装脚手架

**注意:使用的命令行尽量都使用管理员权限的命令行**

1. 脚手架的安装需要node.js环境

   ##### node.js安装与配置

   由于 Node.js 中默认安装了 npm，所以不用额外配置就能在全局命令中使用 `npm`命令，如果要使用自己安装的 npm 时，如 cnpm ，那么就需要像上面一样添加相应的环境变量然后在cmd或者shell中测试一下是否安装成功了：输入 `node -v` 与 `npm -v`

   ##### node.js修改默认下载地址

   在node.js下新建两个文件夹如下所示

   ![image-20220218172641041](vue%E4%BD%BF%E7%94%A8.assets/image-20220218172641041.png)

随后输入命令修改配置:

```sh
npm config set prefix "D:\node安装目录\node_global"  注意:目录自行替换  
npm config set cache "D:\node安装目录\node_cache"
```

将来全局安装的东西就会跑到这个文件夹的node_modules文件夹里面去了。

#### 配置npm镜像源

输入如下命令:

```sh
npm --registry https://registry.npm.taobao.org install express -g
```

#### 配置环境变量

增加**系统环境变量**NODE_PATH 内容是：`D:\node安装目录\node安装目录\node_modules`

最后编辑**用户变量**里的`Path`，将相应`npm`的路径改为：`D:\node安装目录\node_global`(以自己路径为主)

至此node.js环境就配置好了

#### 下载脚手架CLI

命令 :`npm install -g @vue/cli`

#### 使用脚手架

**切换到需要创建项目的目录**

创建项目: `vue create 项目名  `

运行项目:  `npm run serve`



### 项目结构

![image-20220218224157557](vue%E4%BD%BF%E7%94%A8.assets/image-20220218224157557.png)



基本的html页面相关说明

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <!-- 兼容IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 开启移动端最理想视图 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <!-- 引入图标, <%= BASE_URL %>表示脚手架配置处理的路径 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- 引入配置的网页标题 -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- noscript标签当浏览器不支持js的时候才会渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
   
  </body>
</html>

```



#### 配置修改

`vue.config.js`配置文件在**项目的根目录**下(没有可以在自己新建)

随后来到vue官网的CLI配置栏目进行查找:  [配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#outputdir)

![image-20220219131757221](vue%E4%BD%BF%E7%94%A8.assets/image-20220219131757221.png)



### VueCli命令与配置速查

#### 命令:

```sh
vue create 项目名 #在当前目录下创建vue项目
npm run serve #启动项目服务

npm i vue-router #安装vue路由插件 ,低版本较稳定 npm install vue-router@3.2.0

npm i element-ui -S #饿了么UI组件库安装

cnpm install sass-loader node-sass --save-dev  # 安装SASS加载器

npm install axios #安装axios
```

**Npm命令解释：**

- `npm install moduleName`：安装模块到项目目录下
- `npm install -g moduleName`：-g的意思是将模块安装到全局，具体安装到磁盘哪个位置要看npm config prefix的位置
- `npm install -save moduleName`：–save的意思是将模块安装到项目目录下， 并在package文件的dependencies节点写入依赖，-S为该命令的缩写
- `npm install -save-dev moduleName`：–save-dev的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖，-D为该命令的缩写



#### 配置:

**在vue文件`vue.config.js`中可以配置一些东西避免一些麻烦**

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //强烈建议关闭ES语法规范检查,常见问题就是不准用驼峰命名和大写命名
  devServer: {
    port:8081,//端口号
    // open:true//自动在浏览器上打开项目
  }
})
```



### webpack(了解即可)

##### 1.什么是Webpack

本质上， webpack是一个现代JavaScript应用程序的静态模块打包器（module bundler) 。当webpack处理应用程序时， 它会递归地构建一个依赖关系图（dependency graph) ， 其中包含应用程序需要的每个模块， 然后将所有这些模块打包成一个或多个bundle

Webpack是当下最热门的前端资源模块化管理和打包工具， 它可以将许多松散耦合的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分离，等到实际需要时再异步加载。通过loader转换， 任何形式的资源都可以当做模块， 比如Commons JS、AMD、ES 6、CSS、JSON、Coffee Script、LESS等；
  
伴随着移动互联网的大潮， 当今越来越多的网站已经从网页模式进化到了WebApp模式。它们运行在现代浏览器里， 使用HTML 5、CSS 3、ES 6等新的技术来开发丰富的功能， 网页已经不仅仅是完成浏览器的基本需求； WebApp通常是一个SPA（单页面应用) ， 每一个视图通过异步的方式加载，这导致页面初始化和使用过程中会加载越来越多的JS代码，这给前端的开发流程和资源组织带来了巨大挑战。

前端开发和其他开发工作的主要区别，首先是前端基于多语言、多层次的编码和组织工作，其次前端产品的交付是基于浏览器的，这些资源是通过增量加载的方式运行到浏览器端，如何在开发环境组织好这些碎片化的代码和资源，并且保证他们在浏览器端快速、优雅的加载

##### 2.模块化的演进

###### **Script标签**

```js
<script src = "module1.js"></script>
<script src = "module2.js"></script>
<script src = "module3.js"></script>
```

这是最原始的JavaScript文件加载方式，如果把每一个文件看做是一个模块，那么他们的接口通常是暴露在全局作用域下，也就是定义在window对象中，不同模块的调用都是一个作用域。

这种原始的加载方式暴露了一些显而易见的弊端：

全局作用域下容易造成变量冲突
文件只能按照<script>的书写顺序进行加载
开发人员必须主观解决模块和代码库的依赖关系
在大型项目中各种资源难以管理，长期积累的问题导致代码库混乱不堪

###### **CommonsJS**

服务器端的NodeJS遵循CommonsJS规范，该规范核心思想是允许模块通过require方法来同步加载所需依赖的其它模块，然后通过exports或module.exports来导出需要暴露的接口。

```js
require("module");
require("../module.js");
export.doStuff = function(){};
module.exports = someValue;
```

优点：

服务器端模块便于重用
NPM中已经有超过45万个可以使用的模块包
简单易用
缺点：

同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的
不能非阻塞的并行加载多个模块
实现：

服务端的NodeJS
Browserify，浏览器端的CommonsJS实现，可以使用NPM的模块，但是编译打包后的文件体积较大
modules-webmake，类似Browserify，但不如Browserify灵活
wreq，Browserify的前身



###### **ES6模块(vue在使用)**

EcmaScript 6标准增加了JavaScript语言层面的模块体系定义。ES 6模块的设计思想， 是尽量静态化， 使编译时就能确定模块的依赖关系， 以及输入和输出的变量。Commons JS和AMD模块，都只能在运行时确定这些东西。

```js
import "jquery"
export function doStuff(){}
module "localModule"{}
```

优点:

容易进行静态分析
面向未来的Ecma Script标准

缺点:

原生浏览器端还没有实现该标准
全新的命令，新版的Node JS才支持

实现: Babel

大家期望的模块

系统可以兼容多种模块风格， 尽量可以利用已有的代码， 不仅仅只是JavaScript模块化， 还有CSS、图片、字体等资源也需要模块化。



##### 3.简单配置价绍

创建 webpack.config.js配置文件

`entry`：入口文件， 指定Web Pack用哪个文件作为项目的入口
`output`：输出， 指定WebPack把处理完成的文件放置到指定路径
`module`：模块， 用于处理各种类型的文件
`plugins`：插件， 如：热更新、代码重用等
`resolve`：设置路径指向
`watch`：监听， 用于设置文件改动后直接打包



## 服务器代理配置

服务代理是用于解决请求跨域问题, 所谓的跨域问题,即违背了同源策略,  **即客户端在与服务端进行通信时, 请求头必须保持:**

- 协议名相同
- 主机名相同
- **端口号相同**

**解决跨域问题主要有三种解决方案:**

- **后端设置:后端人员通过设置响应头的`cors`配置**
- 通过`jsonp`配置解决跨域, 一般开发中用得少, 需要前后端都进行配置
- 前端通过通过配置服务代理实现, 其**原理是在客户端与服务端之间建立一个代理中介**

例如 需要请求`/student` 的资源, 则只能编写这样的url:`localhost:8080/student` ,但是实际上提供`/student`资源的后端服务程序, 使用的5000端口, 即该服务的url为: `localhost:5000/student` ,这就是经典的跨域问题,如下是代理服务原理图



![image-20221111170346924](vue%E4%BD%BF%E7%94%A8.assets/image-20221111170346924.png)



### 方法一

> 在vue.config.js中追加如下配置

```json
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）



### 方法二

编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
    proxy: {
      '/api1': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,    // 修改请求的 host
 // 相当于路径映射,即所有以/api开头的请求路径都消除,如请求 /api/student , 请求代理实际上真正请求的是 /student         
        pathRewrite: {'^/api1': ''}  
        
      },
      '/api2': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}   
      }
    }
  }
}
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。



### 附:axious

> 安装

```sh
npm install axios
```



#### 浅谈axious与ajax

##### 1.区别:

axios是通过[promise](https://www.cnblogs.com/ming1025/p/13092502.html)实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。
简单来说： [ajax](https://so.csdn.net/so/search?q=ajax&spm=1001.2101.3001.7020)技术实现了网页的局部数据刷新，axios实现了对ajax的封装。
**axios是ajax (一部分),  ajax不止axios。**

**扩展:**Promise是异步编程的一种解决方案，可以替代传统的解决方案--回调函数和事件。ES6统一了用法，并原生提供了Promise对象。作为对象，Promise有一下两个特点： （1）对象的状态不受外界影响。 （2）一旦状态改变了就不会在变，也就是说任何时候Promise都只有一种状态。

##### 2.优缺点:

**ajax：**
本身是针对MVC的编程,不符合现在前端MVVM的浪潮
基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务
**axios：**
从 node.js 创建 http 请求
支持 Promise API
客户端支持防止CSRF
提供了一些并发请求的接口（重要，方便了很多的操作）

**拓展:**Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。

[ajax和axios、fetch的区别](https://www.cnblogs.com/lgx5/p/15835740.html)



#### 3.实现对比:

```js
 // jquery封装的ajax
$.ajax({
            url: '/getUsers',
            type: 'get',
            dataType: 'json',
            data: {
                //'a': 1,
                //'b': 2,
            },
            success: function (response) {
                console.log(response)；
            }
        })
//axious封装的ajax
axios({
            url: '/getUsers',
            method: 'get',
            responseType: 'json', // 默认的
            data: {
                //'a': 1,
                //'b': 2,
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            }）
```

#### 4.axious使用:

注: axious请求默认都是异步请求

**发送get请求:**

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

**发送post请求:**

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

**并发多个请求:**

```js
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```



**请求配置:**

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

详情请查询:[axios中文网](http://www.axios-js.com/zh-cn/docs/)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
  .catch(function (error) {
    console.log(error);
});
```

配置项有:

```js
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
      
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
     
   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
      
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
      
  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```



## slot 插槽

也**算是一种组件间通信的方式，适用于 父===>子，且传递的是html结构**
(1).作用：父组件向子组件指定位置中插入html结构
(2).分类：
		默认插槽：`<slot></slot>`
		命名插槽：`<slot name="s1"></slot>`
		作用域插槽：后期项目中会讲到
(3)使用：	
			父组件中：

​					`<html标签名 slot=插槽名"> </html标签名>`  或  `<template slot="插槽名">具体html结构</template>`

​					使用`<template></template>`可用于包裹结构但最后Vue解析模板时不生成多于的dom结构

​					此外,如果使用`<template>`还有另一使用插槽的写法: `<template v-slot:插槽名>具体html结构</template>`

​			子组件中：
​					`<slot></slot>` 或 `<slot name="s1"></slot>`

样例:

组件:`Category.vue`

```vue
<template>
	<div class="cate">
		<h3 class="bt">{{title}}分类</h3>

		<!-- 默认插槽 -->
		<!-- <slot></slot> -->

		<!-- 命名插槽(具名插槽)定义 -->
		<slot name="youxi"></slot>
		<slot name="meishi"></slot>
		<slot name="movie"></slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title']
	}
</script>

<style>
	.cate{
		width: 240px;
		height: 300px;
		background-color: skyblue;
	}
	.bt{
		text-align: center;
		background-color: yellowgreen;
	}
	img{
		width: 100%;
	}
</style>
```

`App.vue`(有错误)

```vue
<template>
	<div class="cate">
		<h3 class="bt">{{title}}分类</h3>

		<!-- 默认插槽 -->
		<!-- <slot></slot> -->

		<!-- 命名插槽(具名插槽)定义 -->
		<slot name="youxi"></slot>
		<slot name="meishi"></slot>
		<slot name="movie"></slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title']
	}
</script>

<style>
	.cate{
		width: 240px;
		height: 300px;
		background-color: skyblue;
	}
	.bt{
		text-align: center;
		background-color: yellowgreen;
	}
	img{
		width: 100%;
	}
</style>
```



### 作用域插槽(重要)

**作用域插槽可通过插槽实现子组件向父组件传递数据**

在子组件`Category.vue`文件中,在 插槽标签`<slot></slot>` 绑定数据 , 

```vue
<slot :gameArr="gameArr"></slot>
```



随后在父组件中使用子组件标签放入插槽时,必须用`<template></template>`包裹 , 并且在`<template></template>`定义一个**属性`slot-scope`来接收插槽发送的数据,属性值随意**,符合语义即可, 如下所示, 

在父组件`App.vue`文件中:

```vue
<Category title="游戏">
	<template slot-scope="slotData">  
		<!-- {{slotData}} -->
	</template>
</Category>
```









## 组件通信总结

- 父组件 -> 子组件: 通过`props`实现
- 子组件 -> 父组件: **通过事件回调函数传递参数实现**
- 兄弟组件之间通信或者任意组件通信: 
  - 通过**全局组件事件`$bus`实现**
  - 通过**订阅发布第三方库如: `Pubsub-js` 实现**

- 子组件 -> 父组件: **通过作用域插槽实现**



## Vuex

Vuex是一个专门再Vue中实现集中式状态(数据)管理的一个Vue插件, 对Vue应用中多个组件的共享状态进行集中式管理(读/写),也是一种组件间通信方式, 适用于任意组件间通信.

### Vuex原理

![image-20221112162950940](vue%E4%BD%BF%E7%94%A8.assets/image-20221112162950940.png)





### Vuex环境搭建

> 安装Vue

*注意: 目前Vue3已经是默认版本了, 由于Vue3支持Vuex4, Vue2只支持Vuex3* , 所以我们在安装Vuex时倘若是使用的Vue2, 则需要指定Vue版本

```sh
npm i Vuex@3 #指定安装Vuex3版本

npm i Vuex  # 默认安装只支持Vue3的Vuex4
```

**(1) 项目根目录创建：`store/index.js`** , *注: 此文件夹和文件名都可以自定义,但官方文档是这样*

`store/index.js`文件内容:

```js
// 该文件用于创建Vuex核心的 store

import Vue from "vue"
import Vuex from "vuex"

// 使用Vuex之前必须先引入Vuex
Vue.use(Vuex)

const actions = {}
const mutations = {}
const state = {}

export default new Vuex.Store({
    // actions: actions,
    // mutations: mutations,
    // state: state
    // ES6语法: 当对象的key和value重名时,只写一个即可
    actions,
    mutations,
    state
})
```

**随后在`main.js`**文件中, 引入配置好的Vuex.store,**并且在vm中增加一个`store`配置项**

```js
import Vue from 'vue'
import App from './App.vue'
// import store from './store/index' 如果store文件只有一个名为index.js的文件,可简写为如下形式:
import store from './store'

Vue.config.productionTip = false //关闭生产提示

new Vue({
	el:'#app',
	store,
	render:h => h(App)
})
```

至此,Vuex的环境就配置完毕



### Vuex基本使用

首先  在store的`index.js`中配置好共享状态(数据)

```js
// 该文件用于创建Vuex核心的 store

import Vue from "vue"
import Vuex from "vuex"

// 使用Vuex之前必须先引入Vuex
Vue.use(Vuex)

const actions = {}
const mutations = {}

//配置数据
const state = {
    sum:0
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

#### 第一步,**分发(diapatch)**

在`vc`中调用:

```js
/* 调用acitons中dispatch方法,有两个参数:
	第一个: 我们自己定义的用于处理业务逻辑的方法名, 
	第二个: 传递的数据 
*/ 
this.$store.dispatch("add",this.n)
```



#### 第二步: 提交(commit)

在`index.js`中的`actions`对象中**配置处理业务逻辑的方法,并且在业务逻辑处理方法中**

**调用`context.commit("数据加工方法名",数据)`**,

```js
// 该文件用于创建Vuex核心的 store
import Vue from "vue"
import Vuex from "vuex"
// 使用Vuex之前必须先引入Vuex
Vue.use(Vuex)

const actions = {
    add(context,value){  // 配置的方法有两个默认参数: 第一个是 上下文对象, 第二个是传入的值
        console.log("action中配置的add方法被调用:用于处理业务逻辑",context,value);
        // 处理完业务逻辑 将数据提交
        context.commit("ADD",value)
    }
}
// 其他store的配置....
```



#### 第三步 配置数据加工

在`index.js`文件中, **配置`mutations`对象的数据加工方法**

```js
// 省略其他 store配置
const mutations = {
    // 一般mututions里,只进行数据加工,并且配置的方法名是全大写形式:
    ADD(state,value){
        console.log("mutations中配置的ADD方法被调用:用于加工数据");
        state.sum += value
    },
}
```

#### 第四步 获取状态(数据)

在vc中, 调用 `this.$store.state.数据名`即可,以上面为例:

```vue
{{$store.state.sum}} 或 this.$store.state.sum
```

### 使用样例:

`/store/index.js`

```js
// 该文件用于创建Vuex核心的 store

import Vue from "vue"
import Vuex from "vuex"

// 使用Vuex之前必须先引入Vuex
Vue.use(Vuex)

const actions = {
    add(context,value){  // 配置的方法有两个默认参数: 第一个是 上下文对象, 第二个是传入的值
        console.log("action中配置的add方法被调用:用于处理业务逻辑",context,value);
        // 处理完业务逻辑 将数据提交
        context.commit("ADD",value)
    },
    sub(context,value){
        context.commit("SUB",value)
    },
    addOdd(context,value){
        if(this.state.sum % 2){
            context.commit("ADD",value)
        }
    },
    addWait(context,value){
        setTimeout(()=>{
            context.commit("ADD",value)
        },500)
    }
}
const mutations = {
    // 一般mututions里,只进行数据加工,并且配置的方法名是全大写形式:
    ADD(state,value){
        console.log("mutations中配置的ADD方法被调用:用于加工数据");
        state.sum += value
    },
    SUB(state,value){
        state.sum -= value
    },

}


// 在 state 中配置 组件共享(状态)数据
const state = {
    sum:0
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

`main.js`

```js
import Vue from 'vue'
import App from './App.vue'
// import Vuex from './store/index' 如果store文件只有一个名为index.js的文件,可简写为如下形式:
import store from './store'

Vue.config.productionTip = false //关闭生产提示

new Vue({
	el:'#app',
	store,
	render:h => h(App)
})
```

`App.vue`

```vue
<template>
	<div>
		<Count/>
  </div>
</template>

<script>
	import Count from './components/Count'

	export default {
		name:'App',
		components:{
			Count
		},
	}
</script>

```

`Count.vue`

```vue
<template>
	<div>
		<!-- 获取 store中的state的数据 -->
		<h2>当前求和为：{{$store.state.sum}}</h2>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>&nbsp;
		<button @click="increment">+</button>&nbsp;
		<button @click="decrement">-</button>&nbsp;
		<button @click="incrementOdd">奇数再加</button>&nbsp;
		<button @click="incrementAsync">异步加</button>
	</div>
</template>

<script>
	export default {
		name:'Count',
		data(){
			return {
				n:1 //n是用户选择的数字
			}
		},
		methods:{
			increment(){
				/* 调用acitons中dispatch方法,有两个参数:
					第一个: 我们自己定义的用于处理业务逻辑的方法名, 
					第二个: 传递的数据 
				*/ 
				this.$store.dispatch("add",this.n)
			},
			decrement(){
				this.$store.dispatch("sub",this.n)
			},
			incrementOdd(){
				this.$store.dispatch("addOdd",this.n)
			},
			incrementAsync(){
				this.$store.dispatch("addWait",this.n)
			},
		}
	}
</script>
```





### getter配置项

类似计算属性, 相当于 `$state`中数据的 计算属性

使用: 在`index.js`中新增一个配置对象

```js
// ...
const getters = {
    bigSum(state){
        return state.sum*10
    }
} 

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

使用`getters`的数据

在vc中: `this.$store.getters.方法名`



### 配置映射(四个map方法)

==注意: 使用简写形式需要引入对象的模块==

```js
import {mapState,mapMutations,mapAction } from 'vuex'  // 简写形式需要引入
```





#### mapState和mapGetters

主要是相当于**自动生成 计算属性而避免频繁重复写 `this.$store.state.数据`,** 我们可以在vm或者vc中的`computed`配置项中使用

```js
/*******************自己定义计算属性(state数据名和 计算属性名 不一致)*****************/
			/* he(){
				return this.$store.state.sum
			},
			ming(){
				return this.$store.state.name
			}, */

/**********************mapState对象写法:*******************/
			//适用于: 需要的 计算属性名 和state中的数据名 不一致
			/* ...mapState({
				he:'sum', //he控制的是模板中读取的属性，'sum'控制的是读取state中的哪个属性
				ming:'name'
			}) */


/*******************自己定义计算属性(state数据名和 计算属性名 一致)*****************/
			/* sum(){
				return this.$store.state.sum
			},
			name(){
				return this.$store.state.name
			}, */

/**********************mapState数组写法(推荐):*******************/
			//适用于: 需要的 计算属性名 和state中的数据名 一致
			...mapState(['sum','name']),

			
/**********************自己定义计算机属性获取getters*******************/
			/* bigSum(){
				return this.$store.getters.bigSum
			}  */

/**********************mapGetters与上面同理...*******************/
			...mapGetters(['bigSum'])			
```

#### mapAction

相当于**帮我们避免重复定义方法写`this.$store.dispatch('方法名',数据)`**,我们可以在vm或者vc中的`methods`配置项中使用

**注意:**当我们使用这种方法时,无法像这样传送数据,`this.$store.dispatch('方法名',数据)`,则**默认传送一个 事件对象 作为参数传递给mutations , 所以我们必须在绑定事件回调函数时指定传参** , 

```html
<button @click="increment(n)">+</button>
<button @click="decrement(n)">-</button>
```

用法:

```js
/***************** 自己定义方法，和actions中对话 **********************/
			/* incrementOdd(value){
				this.$store.dispatch('jiaOdd',value)
			},
			incrementAsync(value){
				this.$store.dispatch('jiaAsync',value) 
			}, */

/******************* mapActions方法,同样有对象式写法和数组式写法,适用场景也和mapState的一样 *****************/
			/* ...mapActions({
				incrementOdd:'jiaOdd',
				incrementAsync:'jiaAsync'
			}) */
			...mapActions(['jiaOdd','jiaAsync'])
```

#### mapMutations

相当于**帮我们避免重复定义方法写`this.$store.commit('方法名',数据)`**,我们可以在vm或者vc中的`methods`配置项中使用

**注意:**当我们使用这种方法时,无法像这样传送数据,`this.$store.commit('方法名',数据)`,则**默认传送一个 事件对象 作为参数传递给state, 所以我们必须在绑定事件回调函数时指定传参** , 

```html
<button @click="jiaOdd(n)">奇数再加</button>
<button @click="jiaAsync(n)">异步加</button>
```



用法:

```js
/******************* 自己定义方法和 mutations交互 ****************************/
			/* increment(value){
						this.$store.commit('JIA',value)
				 },
				 decrement(value){
						this.$store.commit('JIAN',value)
					}, 
			*/

/******************* mapMutations方法和 mutations交互, 同样有对象写法和数组写法,适用场景类似之前的mapState ****/
			...mapMutations({
				increment:'JIA',
				decrement:'JIAN',
			}),

			// ...mapMutations(['JIA','JIAN'])
```



### 命名空间配置(用到在学)



## vue-router路由

> 官方文档:https://router.vuejs.org/guide/

**Vue Router是Vue.js官方的路由管理器(类似页面跳转)。**它和Vue.js的核心深度集成， 让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于Vue js过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的CSS class的链接
- HTML5 历史模式或hash模式， 在IE 9中自动降级
- 自定义的滚动行为



### 安装

vue-router是一个插件包， 所以我们还是需要用n pm/cn pm来进行安装的。打开命令行工具，进入你的项目目录，输入下面命令。

`npm i vue-router`

注:如果使用时 (Vue2只能使用router3版本) 出现问题可安装低版本:`npm i vue-router@3`

如果在一个模块化工程中使用它，**必须要通过`Vue.use()`明确地安装路由功能：**

```js
import VueRouter from 'vue-router'

Vue.use(VueRouter);
```

### 基本使用

##### 1.创建组件

在`components`目录下(其他目录也可)创建我们自己编写的组件

`Content.vue`:

```vue
<template>
   <p>内容区</p>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Content"
}
</script>

<style scoped>
</style>
```

`Home.vue`:

```vue
<template>
  <h2>首页</h2>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home"
}
</script>

<style scoped>
</style>
```

##### 2.新建路由表文件

在src目录下，**新建一个文件夹：**`router(用于存放路由配置文件)`,**在里面新建文件`index.js`**(文件名可以任意,但规范是index,这样可以默认加载)

`index.js:`

```js
   /****路由配置*****/
//引入VueRouer插件
import VueRouter from 'vue-router'

//引入组件
import Content from "/components/Content";
import Home from '/components/Home';

// 配置路由插件并且暴露模块
export default new VueRouter({
    // 路由配置项,注意名字有个s,是一个数组,数组元素是一个路由对象
            //路由对象有三个属性,分别是名字,路径,以及对应的组件
    routes:[
        // 路由一:
        {
            path:'/content',
            name:'content',
            component:Content
        },
        {
            path: '/home',
            name:'home',
            component: Home
        }
    ]
});
```

##### 3.配置路由(main.js中)

`main.js:`

```js

//引入必需模块
import Vue from 'vue'
import App from './App.vue'

//引入VueRouter插件与自己写好的路由器
import VueRouter from "vue-router";
import router from './router'

Vue.config.productionTip = false  //关闭生产提示

Vue.use(router)  //应用Vue路由插件

new Vue({
  render: h => h(App), //注册组件,相当于 component:App
  //配置路由,很重要
  router:router,
  data:{
  }
}).$mount('#app')  //绑定div,相当于:el: '#app'
```

##### 4.使用路由

在`App.vue`中使用路由

- `<router-link to="路由路径">内容</router-link>` 类似`<a href="路径">内容</a>` , 并且有该标签个属性`active-class` , **当该路由链接被点击时, 会为`class`属性追加`active-class`的属性值, 主要用于点击时高亮效果**
- ` <router-view></router-view>` 用于展示对应路由的组件

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <hr/>
    <h1>Vue Router</h1>
<!--    路由链接,相当于html的a标签,to属性相当于href属性,值是之前路由配置好的path-->
    <router-link to="/home">首页</router-link> |
    <router-link to="/content">内容区</router-link>
<!--    展示路由切换后的视图,不写则不会展示-->
    <router-view></router-view>
  </div>
</template>

<script>
import Content from './components/Content'
import Home from "./components/Home"

export default {
  name: 'App',
  components: {
    Content,
    Home
  },
  data(){
    return {
      msg:'hello vue!'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



#### 几个注意点:

1. 路由组件通常存放在`pages`文件夹, 一般组件通常存放在`components`文件夹
2. 通过切换,隐藏了的路由组件, 默认是被销毁掉的, 需要的时候再去挂载
3. 每个路由组件都有自己的`$route` , 里面存储着自己的路由信息
4. 整个应用只有一个router , 可以通过组件的`$router`属性获取



### 多级(嵌套)路由

多级路由是在一级路由(即使基本路由)的基础上在建立多个路由, 具体用法是: **在配置的路由表文件中, 给需要添加子路由的路由对象配置一个`children`对象属性 **, 形如:

```js
routes:[
			{
				path:'/home',
				component:Home,
				children:[
					{
						path:'message',
						component:Message,
					},
					{
						path:'news',
						component:News
					}
				]
			}
		]
```

不过需要注意的是: **子路由的路径最开头不要再加 `/`** ,



### 路由的query参数

我们可以**在发送路由的时候, 携带query参数**

```vue
<!-- 路由切换时，携带query参数, 有一般写法和对象写法 -->
					<!-- `字符串` 是ES6的模板字符串语法, 可以在字串中使用 ${变量名} 插入变量, 	 -->
				<!-- <router-link :to="`/home/message/detail/${msg.id}?title=${msg.title}&content=${msg.content}`">{{msg.title}}</router-link> -->
				<!-- 对象写法: -->
				<router-link :to="{
					path: '/home/message/detail',
					query:{
						title: msg.title,
						content: msg.content
					}
				}">
				{{msg.title}}
				</router-link>
```

**注意事项:**

- 一般我们传递的参数是 js变量, 所以**要绑定 to属性 即使 `:to`,无论是对象写法还是一般写法**
- **对象写法时 to属性值同样要用 `“”` 包裹, 并且对象属性之间别忘了逗号分隔** 

**获取query参数**

参数存放路由属性中, 我们可以**通过 `this.$route.query.参数名`获取到对应的参数数据**

*注: `this`指向的是 组件实例vc*



### 命名路由

接上一节,所谓命名路由,**即可以给路由定义个名字, 用路由名代替路由路径, 一般用于路径较长的情况**

在路由表配置文件`index.js`中添加`name`配置属性

```js
routes:[
			{
				path:'/home',
				component:Home,
				children:[
					{
                        name: "xiaoxi",
						path:'message',
						component:Message,
					},
					{
						path:'news',
						component:News
					}
				]
			}
		]
```

在路由标签中直接写名字即可:

```vue
<!-- <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link> -->
<router-link class="list-group-item" active-class="active" :to="{
						name:'xiaoxi'
					}">Message</router-link>
```

并且可以通过可以通过`name`属性展示多个路由组件

```vue
<router-view name="h1"></router-view>
<router-view name="h2"></router-view>
```





### 路由的params参数

在传递params参数时,**需要在路由表中配置参数占位符 `/:参数名`**

```js
export default new VueRouter({
	routes:[
		{
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					children:[
						{
							name: "xijie",
							path:'detail/:id/:title/:content', //声明接收params参数
							component:Detail,
						}
					]
				},
			]
		},
		{
			path:'/about',
			component:About
		}
	]
})
```

 **在路由标签中,传递params参数**:

**注意!!! 携带params参数的对象写法,必须配置name属性而不能使用path配置**

```vue
<!-- 路由携带params参数 -->
	<!-- `字符串` 是ES6的模板字符串语法, 可以在字串中使用 ${变量名} 插入变量, 	 -->
	<!-- <router-link :to="`/home/message/detail/${msg.id}/${msg.title}/${msg.content}`">{{msg.title}}</router-link> -->
	<!-- 注意!!! 携带params参数的对象写法,必须配置name属性而不能使用path配置 -->
	<router-link :to="{
			name: 'xijie',
			params: {
				id: msg.id,
				title: msg.title,
				content: msg.content
			}
		}
	">{{msg.title}}</router-link>
```



### 路由的props配置

**为了减少在组件中重复频繁使用`this.$route.params`或 `return this.$route.query`, 我们可以在路由表文件中配置`props`配置给路由组件传递数据**

在路由表文件`index.js` , 添加`props`配置

```js
	routes:[
		{
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					children:[
						{
							// path:'detail/:id/:title/:content', //声明接收params参数
							// path:'detail', //query参数无需声明即可接收
							path:'detail/:id', //同时接收params和query，要先声明params
							component:Detail,
							name:'xiangqing',

                            /*  三种写法: 只能使用一种   */
							// props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
                            		
                            	/*  用于params传参:  */
							// props:true //自动映射params参数为props传给路由组件
                            
                            	/*  用于query传参:  */
							props($route){ //此处接收到的route是vc或vm身上的$route
								const {id} = $route.params.id
								const {title,content} = $route.query
								return {
                                    id:$route.params.id,
                                    title:$route.query.title,
                                    content:$route.query.content
                                }
							}
						}
					]
				},
				{
					path:'news',
					component:News
				}
			]
		}
```

**随后在组件中配置项中`props`配置参数名**接收即可, 在`Detail.vue`文件中

```vue
<template>
	<ul>
		<!-- 获取params参数 -->
		<li>ID：{{id}}</li>
		<li>TITLE：{{title}}</li>
		<li>CONTENT：{{content}}</li>
	</ul>
</template>

<script>
	export default {
		name:'Detail',
		props:['id','title','content'],
	}
</script>

```



### 路由的replace模式

浏览器有两种模式:

- push模式(默认): 即点击链接(路由)后可以后退
- **replace模式: 类似浏览器的无痕模式, 点击后不发后退**

路由开启replace模式只需在路由标签中加上`replace`属性即可 

```vue
<router-link replace class="list-group-item" active-class="active" to="/about">About</router-link>
```



### 编程式路由(重要):

我们除了可以使用路由标签`<router-link></router-link>`实现组件切换跳转, **还可以通过**

**`this.$router.push(配置对象)或this.$router.replace(配置对象)`** ,*(其中`push()和replace()`对应了浏览器的两种浏览模式,配置对象的内容就是路由标签中`to`属性值的对象写法)* , **实现组件切换跳转,这种方式就叫编程式路由** 

```vue
<router-link :to="`/home/message/detail/${msg.id}/${msg.title}/${msg.content}`">{{msg.title}}</router-link>
或
<router-link replace :to="`/home/message/detail/${msg.id}/${msg.title}/${msg.content}`">{{msg.title}}</router-link>
```

分别对应以下的js逻辑代码:

```js
// 注: name配置属性代表路由名, 可以用path代替
this.$router.push({
					name:'xiangqing',
					params:{
                        id:msg.id,
						title:msg.title,
						content:msg.content
					}
				})
或
this.$router.replace({
					name:'xiangqing',
					params:{
                        id:msg.id,
						title:msg.title,
						content:msg.content
					}
				})
```



### 缓存路由组件

在默认情况下,我们在使用路由切换组件时, 被切换走的组件会被销毁, 我们可以**通过使用`<keep-alive></keep-alive>`标签包裹不希望被自动销毁的组件(即缓存组件) 的组件展示区`<router-view></router-view>`来实现缓存路由组件** , `<keep-alive></keep-alive>`有一个`include`属性名, 不写默认所有路由组件都设置为缓存组件(增加系统开销性能) ,所以一般我们通过设置`include`属性值指定需要缓存的路由组件

```vue
<!-- keep-alive可以让路由组件切换时，不销毁，include的值是组件名!!! -->
<keep-alive include="News">
	<router-view></router-view>
</keep-alive>
<!-- 若要设置多个缓存路由组件, 则将include属性值设置为数组即可 -->
<keep-alive :include="["组件名1","组件名2","组件名3"]">
	<router-view></router-view>
</keep-alive>
```

 

### 路由组件的两个生命周期

当**路由组件变成缓存式路由组件时**, 我们在切换路由组件时,并不会将被切换掉的组件销毁掉, 故我们现在有如下一个案例:

News路由组件和Message组件可以自由切换,  **并且News被设置为了缓存式路由组件, 我们在News组件中通过生命周期钩子`mounted`设置了一个定时用于实现浮动显示一个标题 (欢迎学习Vue) ,但我们在切换到 Message组件时, 打开控制台发现定时器仍然在不断执行, 非常浪费性能 , (即我们想要的最优方案是: 当有定时器的路由组件被切换走时, 我们希望其中的定时器也停掉)**

这时,我们可以使用路由组件独有的两个生命周期钩子 : 

- `activated():`**当路由组件被激活展示时**

- `deactivated():`**当路由组件失活(即被切换走)时**

**注意: 只有缓存路由组件使用这两个生命周期钩子才有效**

案例核心代码:

`News.vue`

```vue
<template>
	<ul>
			<!-- 绑定style的属性opacity, ES6语法:结构赋值 -->
		<li :style="{opacity}">欢迎学习Vue ^_^</li>
		<li>news001 <input type="text"></li> 
		<li>news002 <input type="text"></li>
		<li>news003 <input type="text"></li> 
	</ul>
</template>

<script>
	export default {
		name:'News',
		data() {
			return {
				opacity:1
			}
		},
		// mounted(){
		// 	this.timer = setInterval(() => {
		// 	console.log("News的定时器正在运行...")
		// 		this.opacity -= 0.01
		// 		if (this.opacity<0){
		// 			this.opacity = 1
		// 		}
		// 	}, 20)
		
		// },

		// beforeDestroy() {
		// 	clearInterval(this.timer)
		// },
		
		activated() {
			this.timer = setInterval(() => {
				console.log("News的定时器正在运行...")
				this.opacity -= 0.01
				if (this.opacity<0){
					this.opacity = 1
				}
			}, 20)
		},
		
		deactivated() {
			console.log("News组件失活了")
			clearInterval(this.timer)
		},
	}
</script>

```



### 路由守卫

路由守卫就有点**类似拦截器或者后端的路径过滤器 , 主要用于权限控制**, 根据配置的位置不同和作用域不同, 分为如下几种:

#### 全局路由守卫

##### 前置守卫:

由于是全局的,所以**全局守卫需要在路由表文件`index.js`中配置 , 并且不能直接new Router就暴露,因为我们还需要通过配置`beforeEach(回调函数)`写一些守卫逻辑,随后在暴露**

```js
/*
三个参数: to,from是对象类型 next是一个方法
to: 代表了通过路由守卫的路由要去哪里, 存放着目标路由的 参数,路径和路由名等信息
from: 代表了通过路由守卫的路由从哪里来, 存放从哪里来的路由的 参数,路径和路由名等信息
*/
router.beforeEach((to, from, next) => {  // 每次初始化时被调用, 每次切换路由时被调用
	// ... 拦截处理逻辑
	// next()  // 路由放行,默认会全局拦截不放行
})
```

假如: 进入`/home/news`或者`/home/message`需要校验浏览器本地存储信息, `index.js`完整信息如下:

```js
/* 该文件是Vue中路由器文件，路由器管理着所有路由 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
import News from '../pages/News.vue'
Vue.use(VueRouter)

//创建一个路由器，管理所有的路由
const router = new VueRouter({
	routes:[
		{
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					children:[
						{
							// path:'detail/:id/:title/:content', //声明接收params参数
							// path:'detail', //query参数无需声明即可接收
							path:'detail/:id', //同时接收params和query，要先声明params
							component:Detail,
							name:'xiangqing',

							// props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
							// props:true //映射params参数为props传给路由组件
							props(route){ //此处接收到的route是vc或vm身上的$route
								// console.log(route)
								const {id} = route.params
								const {title,content} = route.query
								return {id,title,content}
							}
						}
					]
				},
				{
					path:'news',
					component:News
				}
			]
		},
		{
			path:'/about',
			component:About
		}
	]
})
router.beforeEach((to, from, next) => {
    // 既可以通过路由的的路径判断也能通过路由名判断
	if(to.path ==="/home/news" || to.path ==="/home/message"){
		if(localStorage.getItem("user") ==="admin"){
			next()
		}
		else{
			alert("权限不足,无法访问!")
		}
	}
	else{
		next()
	}
})
//暴露路由器
export default router
```

**优化:**假如需要给多个路由做授权校验, 上述的写法过于繁琐, 我们可以**通过在`routes`中配置`meta`属性添加一个标记变量用于标记该路径是否需要校验授权**  ,  *(meta 有元数据的意思)*

*注: `to`, `from`是`route`的衍生对象, 所以在`routes`中配置的`meta`属性他们也能拿到*

```js
/* 该文件是Vue中路由器文件，路由器管理着所有路由 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
import News from '../pages/News.vue'
Vue.use(VueRouter)

//创建一个路由器，管理所有的路由
const router = new VueRouter({
	routes:[
		{
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					meta: {isAuth:true},
					children:[
						{
							path:'detail/:id', //同时接收params和query，要先声明params
							component:Detail,
							props(route){ //此处接收到的route是vc或vm身上的$route
								const {id} = route.params
								const {title,content} = route.query
								return {id,title,content}
							}
						}
					]
				},
				{
					path:'news',
					component:News,
					meta: {isAuth:true},
				}
			]
		},
		{
			path:'/about',
			component:About
		}
	]
})

router.beforeEach((to, from, next) => {
    // Auth 有授权的意思
	if(to.meta.isAuth){
		if(localStorage.getItem("user") ==="admin"){
			next()
		}
		else{
			alert("权限不足,无法访问!")
		}
	}
	else{
		next()
	}
})
//暴露路由器
export default router
```



##### 后置路由守卫:

后置路由守卫在**每次路由切换之后被调用 , 主要用于在切换路由组件之后更改页签名称** ,用法:

```js
// 在路由切换之后被调用
router.afterEach((to, from) => {
	// 处理逻辑
})
```

使用全局后置路由守卫实现页签标题随路由跳转变化功能案例如下所示: 

首先需要借助路由对象的`meta`属性给每个路由配置标题信息,以备获取 ,随后编写后置守卫的回调逻辑

`index.js`

```js
/* 该文件是Vue中路由器文件，路由器管理着所有路由 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
import News from '../pages/News.vue'
Vue.use(VueRouter)

//创建一个路由器，管理所有的路由
const router = new VueRouter({
	routes:[
		{
			path:'/home',
			component:Home,
			meta: {title:"首页"}, 
			children:[
				{
					path:'message',
					component:Message,
					meta: {title:"消息",isAuth:true},
					children:[
						{
						 	path:'detail/:id', //同时接收params和query，要先声明params
							component:Detail,
							name:'xiangqing',
							mate: {title:"详情"}, 
							props(route){ //此处接收到的route是vc或vm身上的$route
								// console.log(route)
								const {id} = route.params
								const {title,content} = route.query
								return {id,title,content}
							}
						}
					]
				},
				{
					path:'news',
					component:News,
					meta: {title:"新闻", isAuth:true},
				}
			]
		},
		{
			path:'/about',
			component:About,
			meta: {title:"关于"}, 
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.meta.isAuth){
		if(localStorage.getItem("user") ==="admin"){
			next()
		}
		else{
			alert("权限不足,无法访问!")
		}
	}
	else{
		next()
	}
})

// 在路由切换之后被调用
router.afterEach((to, from) => {
	document.title = to.meta.title || "路由守卫Demo"
})

//暴露路由器
export default router
```



#### 独享路由守卫:

即某个一个路由独有的路由守卫 , 我们需要在`index.js`中的`routes`中指定的路由对象中配置

```js
/* 该文件是Vue中路由器文件，路由器管理着所有路由 */
import Vue from 'vue'
import VueRouter from 'vue-router'
 //import ....
Vue.use(VueRouter)

const router = new VueRouter({
	routes:[
		{
			path:'/home',
			component:Home,
			meta: {title:"首页"}, 
			children:[
				{
					path:'message',
					component:Message,
					meta: {title:"消息",isAuth:true},
				},
				{
					path:'news',
					component:News,
					meta: {title:"新闻", isAuth:true},
					beforeEnter: (to, from, next) => {
							/*   home/news 独享的路由守卫    */
					}
				}
			]
		},
	]
})
//暴露路由器
export default router
```



#### 组件内容路由守卫

组件内路由守卫顾名思义就是定义在路由组件中的路由守卫, 有两个: 

- `beforeRouteEnter(to,from,next)`: **当通过路由规则进入组件时执行 **
- `beforeRouteLeave (to,from,next)`: **当通过路由规则离开组件时执行**

*注: 不通过路由规则进入组件即是指使用组件标签展示组件的意思*

这两个路由守卫和缓存式路由组件的两个生命周期钩子`actived()` , `deactived()`非常类似,但是他们的生命周期顺序是这样:

1. 先经过路由守卫:`beforeRouteEnter(to,from,next)`
2. 随后挂载组件: `mounted()`
3. 激活组件:`actived()`
4. 再经过路由守卫:`beforeRouteLeave (to,from,next)`
5. 组件失活: `deactivated()`

测试案例核心代码:

`About.vue`

```vue
<template>
	<h2>我是About的内容</h2>
</template>
<script>
	export default {
		name:'About',

		mounted() {
			console.log("组件被挂载");
		},

		beforeRouteEnter (to, from, next) {
			console.log("组件内路由守卫->beforeRouterEnter")
			next()	
		},
		beforeRouteLeave (to, from, next) {
			console.log("组件内路由守卫->beforeRouterLeave")
			next()	
		},

		activated() {
			console.log("关于 组件被激活");
		},
		deactivated() {
			console.log("关于 组件失活");
		},

	}
</script>
```

随后点击About路由后,又切换 , 控制台打印出如下结果:

```sh
组件内路由守卫->beforeRouterEnter
组件被挂载
关于 组件被激活
组件内路由守卫->beforeRouterLeave
关于 组件失活
```







### 路由的两种模式

1. 对于一个url来说,什么是hash值? ---- 路径中`#`后面的内容就是hash值
2. **hash值**不会包含在Http请求中, 即 Hash值不会带给服务器
3. **hash模式(默认):**
   1. 地址中永远带着`#`号, 不美观
   2. 若以后将地址通过第三方手机app分享, 若app校验严格, 则地址会被标记为不合法
   3. 兼容性较好

4. history模式:
   1. 地址干净美观
   2. 兼容性相较于哈希模式较差
   3. **应用部署上线需要后端人员支持, 解决刷新页面服务端404问题**

**切换模式只需在路由表文件`index.js`中添加如下配置**

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
// ...
Vue.use(VueRouter)

const router = new VueRouter({
    mode:"模式名",
	routes:[
		//...	
	]
})

//暴露路由器
export default router
```





## UI组件库

以ElementUI为例

> https://element.eleme.cn/#/zh-CN/

**安装:**

```sh
npm i element-ui -S
```



### 完整引入:

在`main.js`中

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

随后可以直接使用组件库的样式



### 按需引入:

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。首先，安装 babel-plugin-component：

```sh
# webpack命令, -D 代表生产依赖
npm install babel-plugin-component -D
```

然后，将 `babel.config.js`修改如下配置：

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins:[
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import { Button, Select } from 'element-ui';
 // 注册组件的全局方式:
Vue.component(Button.name, Button);  //第二个参数: 用于我们可以给组件进行重命名
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
```



## axios

> 在线引入CDN

[axios官方CDN服务](https://cdnjs.com/libraries/axios)

```html
<!-- 完整版 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.js"></script>

<!-- 精简版: -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"></script>


```



### 浅谈axious与ajax

#### 1.区别:

axios是通过[promise](https://www.cnblogs.com/ming1025/p/13092502.html)实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。
简单来说： [ajax](https://so.csdn.net/so/search?q=ajax&spm=1001.2101.3001.7020)技术实现了网页的局部数据刷新，axios实现了对ajax的封装。
**axios是ajax (一部分),  ajax不止axios。**

**扩展:**Promise是异步编程的一种解决方案，可以替代传统的解决方案--回调函数和事件。ES6统一了用法，并原生提供了Promise对象。作为对象，Promise有一下两个特点： （1）对象的状态不受外界影响。 （2）一旦状态改变了就不会在变，也就是说任何时候Promise都只有一种状态。

### 2.优缺点:

**ajax：**
本身是针对MVC的编程,不符合现在前端MVVM的浪潮
基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务
**axios：**
从 node.js 创建 http 请求
支持 Promise API
客户端支持防止CSRF
提供了一些并发请求的接口（重要，方便了很多的操作）

**拓展:**Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。

[ajax和axios、fetch的区别](https://www.cnblogs.com/lgx5/p/15835740.html)



### 3.实现对比:

```js
 // jquery封装的ajax
$.ajax({
            url: '/getUsers',
            type: 'get',
            dataType: 'json',
            data: {
                //'a': 1,
                //'b': 2,
            },
            success: function (response) {
                console.log(response)；
            }
        })
//axious封装的ajax
axios({
            url: '/getUsers',
            method: 'get',
            responseType: 'json', // 默认的
            data: {
                //'a': 1,
                //'b': 2,
            }
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            }）
```



### 在Vue中使用axios

1. 安装`npm i axious`
2. 引入并且在Vue原型链中挂载:

在`main.js`中添加:

```js
import axios from 'axios' //引入
Vue.prototype.$axios = axios
```



**注意: 在Vue中使用`axios`时注意回调函数的`this`指向问题,以便决定是否用箭头函数,**



注: axious请求默认都是异步请求

**发送get请求:**

```js
// 为给定 ID 的 user 创建请求
this.$axios.get('/user?ID=12345')
.then((response)=> {
   	console.log(response);
})
.catch((error)=>{
   console.log(error);
});

// 上面的请求也可以这样做
this.$axios.get('/user', {
    params: {
      ID: 12345
    }
  })
.then((response)=> {
   	console.log(response);
})
.catch((error)=>{
   console.log(error);
});
```

**发送post请求:**

```js
this.$axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
.then((response)=> {
   	console.log(response);
})
.catch((error)=>{
   console.log(error);
});
```

**并发多个请求:**

```js
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```



##### **请求配置:**

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

**请求参数配置:**

- `data`是将请求参数**放入请求体中,传递的是一个对象**  , java后端要**通过注解`@@RequestBody`来接收,接收的参数是一个实体类对象**

- `param`是将**放入请求头中,传递的是键值对** , java后端要**通过注解`@@RequestParam`来接收,接收的参数是对应的参数名**

详情请查询:[axios中文网](http://www.axios-js.com/zh-cn/docs/)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
.then((response)=> {
   	 console.log(response);
  })
.catch((error)=> {
     console.log(error);
});

// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
  .catch(function (error) {
    console.log(error);
});
```

配置项有:

```js
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default
      
  params: {}   // 用于携带数据参数,将数据放在请求头上,常用于get请求
  data: {}   // 也用于携带数据参数, 但是是将数据放在请求体上, 用于post请求  

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
      
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,
     
   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
      
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
      
  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

