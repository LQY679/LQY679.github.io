---
title: JSON
date: 2020-04-12 18:57:32
categories: 
- 常用知识笔记
---



# JSON

> 参考自菜鸟教程:[Java 中 JSON 的使用 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/java-json-instro.html)

## JSON 简介

[JSON](https://baike.baidu.com/item/JSON)([JavaScript](https://baike.baidu.com/item/JavaScript) Object Notation, JS 对象简谱) 是一种轻量级的**数据交换格式。**它基于 [ECMAScript](https://baike.baidu.com/item/ECMAScript) (欧洲计算机协会制定的js规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

在javaScrip 一切皆为对象,任何js支持的类型,都可以用JSON来表示

## JSON 格式

- 都以键值对的形式表示, 即 key: value 
- 对象都用 {}  形式为: `{"属性1":属性1的值,"属性2":属性2的值,"属性3":属性3的值}` 

- 数组(即使包含了多个对象)都用 [] ,  形式为: 

 `[{"对象1的属性1":对象1的属性1的值,"对象1的属性2":对象1的属性2的值},{"对象2的属性1":对象2的属性1的值,"对象2的属性2":对象2的属性2的值}]`



## JSON 转换

### 在JavaScript中:

```javascript
// 假如定义了一个对象 let user = { name:'mm', sex : '女' ,age : 19 }; 
/* JSON转换成字符串 */
JSON.stringify(user); //返回一个字符串,内容为:  {"name":"mm" ,"age":"20","sex":"女"}


/* 字符串转换成JSON */
let user_text = '{"name":"mm" ,"age":"20","sex":"女"}';
JSON.parse(user2_text); //返回一个对象
```



### 在Java中:

Java中并没有内置JSON的解析，因此使用JSON需要借助第三方类库。

下面是几个常用的 JSON 解析类库：

- [Gson](https://github.com/google/gson): 谷歌开发的 JSON 库，功能十分全面。
- [FastJson](https://github.com/alibaba/fastjson): 阿里巴巴开发的 JSON 库，性能十分优秀。
- [Jackson](https://github.com/FasterXML/jackson): 社区十分活跃且更新速度很快。

*注:本文以阿里的 `FastJson`为例说明*



#### 依赖导入

```xml
<!--FastJson的Maven依赖-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
```



#### 流程说明:

`java变量 <--> JSON对象 <--> 字符串`



#### 将java变量转换为JSON

```java
public void testJson() {
    JSONObject object = new JSONObject();
    //string
    object.put("string","string");
    //int
    object.put("int",2);
    //boolean
    object.put("boolean",true);
    //array
    List<Integer> integers = Arrays.asList(1,2,3);
    object.put("list",integers);
    //null
    object.put("null",null);
    System.out.println(object);
//打印结果:   {"boolean":true,"string":"string","list":[1,2,3],"int":2}    
}
```

#### 将JSON转换为java变量

```java
public void testJson2() {
    
  JSONObject object = JSONObject
      .parseObject("{\"boolean\":true,\"string\":\"string\",\"list\":[1,2,3],\"int\":2}");
  //string
  String s = object.getString("string");
  System.out.println(s);
  //int
  int i = object.getIntValue("int");
  System.out.println(i);
  //boolean
  boolean b = object.getBooleanValue("boolean");
  System.out.println(b);
  //list
  List<Integer> integers = JSON.parseArray(object.getJSONArray("list").toJSONString(),Integer.class);
  integers.forEach(System.out::println);
  //null
  System.out.println(object.getString("null"));
}
/*  打印结果:
string
2
true
1
2
3
null
*/
```



#### 方法使用

| 方法                           | 作用                                 |
| :----------------------------- | :----------------------------------- |
| `JSON.parseObject(String)`     | 将字符串解析为 JSON 对象             |
| `JSON.parseArray(String)`      | 将从字符串解析为 JSON 数组           |
| `JSON.toJSONString(obj/array)` | 将 JSON 对象或 JSON 数组转化为字符串 |

实例:

```java
//将字符串解析为JSON对象
JSONObject obj = JSON.parseObject("{\"runoob\":\"菜鸟教程\"}");
//从字符串解析为JSON数组
JSONArray arr = JSON.parseArray("[\"菜鸟教程\",\"RUNOOB\"]\n");
//将JSON对象转化为字符串
String objStr = JSON.toJSONString(obj);
//将JSON数组转化为字符串
String arrStr = JSON.toJSONString(arr);
```







