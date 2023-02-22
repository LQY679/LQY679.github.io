---
title: JSON
date: 2020-01-01 18:57:32
updated: {{date}}
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



### 在Java第三方JSON处理库:

Java中并没有内置JSON的解析，因此使用JSON需要借助第三方类库。

下面是几个常用的 JSON 解析类库：

- [Gson](https://github.com/google/gson): 谷歌开发的 JSON 库，功能十分全面。
- [FastJson](https://github.com/alibaba/fastjson): 阿里巴巴开发的 JSON 库，性能十分优秀。
- [Jackson](https://github.com/FasterXML/jackson): 社区十分活跃且更新速度很快。

**本人强烈推荐`Jackson`** , 因为`FastJson`存在很多安全漏洞,并且线程不安全



### Jackson

> 参考: [史上最全的Jackson框架使用教程_程序员资源社区的博客-CSDN博客](https://blog.csdn.net/weixin_44747933/article/details/108301626)

#### 依赖导入

```xml
<!--Jackson的Maven依赖-->
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.14.1</version>
</dependency>
```



#### 快速入门

Jackson 最常用的 API 就是基于"对象绑定" 的` ObjectMapper`。下面是一个 ObjectMapper 的使用的简单示例。

准备一个实体类Person, **注意: Jackson的反序列化依赖于无参构造,所以实体类一定要有无参构造**

```java
import java.util.Date;

public class Person {

    // 正常case
    private String name;
    // 空对象case
    private Integer age;
    // 日期转换case
    private Date date;
    // 默认值case
    private int height;

    public Person(String name, Integer age, Date date, int height) {
        this.name = name;
        this.age = age;
        this.date = date;
        this.height = height;
    }

    public Person() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", date=" + date +
                ", height=" + height +
                '}';
    }
}
```

进行单元测试:

```java
 ObjectMapper mapper = new ObjectMapper();
        // 造数据
        Person person = new Person("Tom", 40, new Date(), 170);

        System.out.println("序列化...");
        String jsonString = null;
        try {
             // writerWithDefaultPrettyPrinter() 会将序列化的json进行格式化美化
//            jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(person);
            jsonString = mapper.writeValueAsString(person);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(jsonString);

        System.out.println("反序列化...");
        Person deserializedPerson = null;
        try {
            deserializedPerson = mapper.readValue(jsonString, Person.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(deserializedPerson);
    }
```

打印结果: 

```sh
序列化...
{"name":"Tom","age":40,"date":1676962157783,"height":170}
反序列化...
Person{name='Tom', age=40, date=Tue Feb 21 14:49:17 CST 2023, height=170}
```

##### 总结:

`ObjectMapper` 通过` writeValue` 系列方法将 java 对象序列化为 json，并将 json 存储成不同的格式，String（writeValueAsString），Byte Array（writeValueAsString），Writer， File，OutStream 和 DataOutput。

`ObjectMapper `通过 `readValue` 系列方法从不同的数据源像 String ， Byte Array， Reader，File，URL， InputStream 将 json 反序列化为 java 对象。

#### 统一配置

在调用 writeValue 或调用 readValue 方法之前，往往需要设置 ObjectMapper 的相关配置信息。这些配置信息应用 java 对象的所有属性上。示例如下：

```java
//在反序列化时忽略在 json 中存在但 Java 对象不存在的属性
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//在序列化时日期格式是否设置为时间戳,默认为ture, 设置为false变成: yyyy-MM-dd'T'HH:mm:ss.SSSZ,
mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
//在序列化时自定义时间日期格式
mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
//在序列化时忽略值为 null 的属性
mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
//在序列化时忽略值为默认值的属性
mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_DEFAULT);
```

更多配置信息可以查看 Jackson 的 DeserializationFeature，SerializationFeature 和 Include。



#### 注解个性化处理

Jackson 根据它的默认方式序列化和反序列化 java 对象，若根据实际需要，灵活的调整它的默认方式，可以使用 Jackson 的注解。常用的注解及用法如下。

| 注解                  | 用法                                                         |
| :-------------------- | :----------------------------------------------------------- |
| @JsonProperty         | 用于属性，把属性的名称序列化时转换为另外一个名称。示例：@JsonProperty("birth_date") private Date birthDate |
| @JsonIgnore           | 可用于字段、getter/setter、构造函数参数上，作用相同，都会对相应的字段产生影响。使相应字段不参与序列化和反序列化。 |
| @JsonIgnoreProperties | 该注解是类注解。该注解在Java类和JSON不完全匹配的时候使用。   |
| @JsonNaming           | 类注解。序列化的时候该注解可将驼峰命名的字段名转换为下划线分隔的小写字母命名方式。反序列化的时候可以将下划线分隔的小写字母转换为驼峰命名的字段名。示例：@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class) |
| @JsonFormat           | 用于属性或者方法，把属性的格式序列化时转换成指定的格式。示例：@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm") public Date getBirthDate() |
| @JsonRootName         | 类注解。需开启mapper.enable(SerializationFeature.WRAP_ROOT_VALUE)，用于序列化时输出带有根属性名称的 JSON 串，形式如 {"root_name":{"id":1,"name":"zhangsan"}}。但不支持该 JSON 串反序列化。 |
| @JsonPropertyOrder    | 用于类， 和 @JsonProperty 的index属性类似，指定属性在序列化时 json 中的顺序 ， 示例：@JsonPropertyOrder({ "birth_Date", "name" }) public class Person |
| @JsonCreator          | 用于构造方法，和 @JsonProperty 配合使用，适用有参数的构造方法。示例：@JsonCreator public Person(@JsonProperty("name")String name) {…} |
| @JsonAnySetter        | 用于属性或者方法，设置未反序列化的属性名和值作为键值存储到 map 中 @JsonAnySetter public void set(String key, Object value) { map.put(key, value); } |
| @JsonAnyGetter        | 用于方法 ，获取所有未序列化的属性 public Map<String, Object> any() { return map; } |

#### 属性可视化

JackSon 默认不是所有的属性都可以被序列化和反序列化。默认的属性可视化的规则如下：

- 若该**属性修饰符是 public，该属性可序列化和反序列化。**
- 若**属性的修饰符不是 public，但是它的 getter 方法和 setter 方法是 public，该属性可序列化和反序列化。因为 getter 方法用于序列化， 而 setter 方法用于反序列化。**
- 若属性只有 public 的 setter 方法，而无 public 的 getter 方 法，该属性只能用于反序列化。

若想更改默认的属性可视化的规则，需要调用 ObjectMapper 的方法 `setVisibility`。

下面的示例使修饰符为 protected 的属性 name 也可以序列化和反序列化。

```java
public static class People {
    public int age;
    protected String name;
}
 
@Test
public void test7() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    // PropertyAccessor 支持的类型有 ALL,CREATOR,FIELD,GETTER,IS_GETTER,NONE,SETTER
    // Visibility 支持的类型有 ANY,DEFAULT,NON_PRIVATE,NONE,PROTECTED_AND_PUBLIC,PUBLIC_ONLY
    mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    // 造数据
    People people = new People();
    people.name = "Tom";
    people.age = 40;
    System.out.println("序列化");
    String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(people);
    System.out.println(jsonString);
    System.out.println("反序列化");
    People deserializedPerson = mapper.readValue(jsonString, People.class);
    System.out.println(deserializedPerson);
}
```

#### 属性过滤

在将 Java 对象序列化为 json 时 ，有些属性需要过滤掉，不显示在 json 中 ，除了使用 `@JsonIgnore` 过滤单个属性或用 `@JsonIgnoreProperties` 过滤多个属性之外， Jackson 还有通过代码控制的方式。

自定编写一个属性过滤器:

```java
@JsonFilter("myFilter")
public interface MyFilter {
}
 
@Test
public void test8() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    //设置 addMixIn
    mapper.addMixIn(Person.class, MyFilter.class);
    //调用 SimpleBeanPropertyFilter 的 serializeAllExcept 方法,过滤age属性
    SimpleBeanPropertyFilter newFilter = SimpleBeanPropertyFilter.serializeAllExcept("age");
    
    //或重写 SimpleBeanPropertyFilter 的 serializeAsField 方法
    SimpleBeanPropertyFilter newFilter2 = new SimpleBeanPropertyFilter() {
        @Override
        public void serializeAsField(Object pojo, JsonGenerator jgen,
                                     SerializerProvider provider, PropertyWriter writer)
                throws Exception {
            if (!writer.getName().equals("age")) {
                writer.serializeAsField(pojo, jgen, provider);
            }
        }
    };
    //设置 FilterProvider
    FilterProvider filterProvider = new SimpleFilterProvider().addFilter("myFilter", newFilter);
    // 造数据
    Person person = new Person();
    person.setName("Tom");
    person.setAge(40); // 该属性将被忽略
    person.setDate(new Date());
    // 序列化
    String jsonString = mapper.setFilterProvider(filterProvider).writeValueAsString(person);
    System.out.println(jsonString);
}
```

运行结果:

```sh
{"name":"Tom","date":1595780842754}
```



#### 日期处理

不同类型的日期类型，JackSon 的处理方式也不同。

##### 普通日期

对于日期类型为 `java.util.Calendar`, `java.util.GregorianCalendar`, `java.sql.Date`, `java.util.Date`, `java.sql.Timestamp`，若不指定格式，在 json 文件中将序列化为 `long` 类型的数据。显然这种默认格式，可读性差，转换格式是必要的。

JackSon 有很多方式转换日期格式。

- 注解方式，使用 `@JsonFormat` 注解指定日期格式。
- ObjectMapper 方式，调用 ObjectMapper 的方法 `setDateFormat`，将序列化为指定格式的 string 类型的数据。



##### Local日期

对于日期类型为 java.time.LocalDate, java.time.LocalDateTime，还需要添加代码 `mapper.registerModule(new JavaTimeModule())`，同时添加相应的依赖 jar 包。

导入依赖：

```xml
<dependency> 
  <groupId>com.fasterxml.jackson.datatype</groupId> 
  <artifactId>jackson-datatype-jsr310</artifactId> 
  <version>2.9.1</version> 
</dependency>
```

对于 Jackson 2.5 以下版本，需要添加代码 `mapper.registerModule(new JSR310Module ())`。使用示例：

```java
@Data
public static class Student {
    // 正常case
    private String name;
    // 日期转换case
    private LocalDateTime date;
}
 
@Test
public void test4() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    // 必须添加对LocalDate的支持
    mapper.registerModule(JavaTimeModule());
    // 造数据
    Student student = new Student();
    student.setName("Tom");
    student.setDate(LocalDateTime.now());
    System.out.println("序列化");
    String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(student);
    System.out.println(jsonString);
    System.out.println("反序列化");
    Student deserializedPerson = mapper.readValue(jsonString, Student.class);
    System.out.println(deserializedPerson);
}
 
private Module JavaTimeModule() {
    JavaTimeModule module = new JavaTimeModule();
    String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    String DATE_FORMAT = "yyyy-MM-dd";
    String TIME_FORMAT = "HH:mm:ss";
    module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT)));
    module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
    module.addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern((TIME_FORMAT))));
    module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT)));
    module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
    module.addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(TIME_FORMAT)));
    return module;
}
```

##### Joda日期

对于日期类型为 `org.joda.time.DateTime`，还需要添加代码 `mapper.registerModule(new JodaModule())`，同时添加相应的依赖 jar 包

```xml
<dependency> 
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-joda</artifactId> 
  <version>2.9.1</version> 
</dependency>
```

#### 对象集合

Jackson 对泛型反序列化也提供很好的支持

##### List

对于 List 类型 ，可以调用 `constructCollectionType` 方法来序列化，也可以构造 `TypeReference` 来序列化。

使用示例：

1. 构造mapper和数据:

```java
ObjectMapper mapper = new ObjectMapper();
        // 造数据
        List<Person> list = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Person person = new Person();
            person.setName("Tom");
            person.setAge(new Random().nextInt(100));
            person.setDate(new Date());
            list.add(person);
        }
```

序列化

```java
System.out.println("序列化...");
String jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(list);
System.out.println(jsonInString);
```

通过调用 `constructCollectionType` 方法来反序列化

```java
System.out.println("反序列化：使用 javaType");
CollectionType javaType = mapper.getTypeFactory().constructCollectionType(List.class, Person.class);
List<Person> personList = mapper.readValue(jsonInString, javaType);
System.out.println(personList);
```

构造 `TypeReference` 来反序列化

```java
System.out.println("反序列化：使用 TypeReference");
List<Person> personList2 = mapper.readValue(jsonInString, new TypeReference<List<Person>>() {});
System.out.println(personList2);
```

运行结果: 

```sh
序列化...
[ {
  "name" : "Tom",
  "age" : 94,
  "date" : 1676964663518,
  "height" : 0
}, {
  "name" : "Tom",
  "age" : 5,
  "date" : 1676964663518,
  "height" : 0
}, {
  "name" : "Tom",
  "age" : 60,
  "date" : 1676964663518,
  "height" : 0
} ]
反序列化：使用 javaType
[Person{name='Tom', age=94, date=Tue Feb 21 15:31:03 CST 2023, height=0}, Person{name='Tom', age=5, date=Tue Feb 21 15:31:03 CST 2023, height=0}, Person{name='Tom', age=60, date=Tue Feb 21 15:31:03 CST 2023, height=0}]
反序列化：使用 TypeReference
[Person{name='Tom', age=94, date=Tue Feb 21 15:31:03 CST 2023, height=0}, Person{name='Tom', age=5, date=Tue Feb 21 15:31:03 CST 2023, height=0}, Person{name='Tom', age=60, date=Tue Feb 21 15:31:03 CST 2023, height=0}]
```

##### Map

对于 map 类型， 与 List 的实现方式相似。

- 构建ObjectMaper, 造数据

```java
  ObjectMapper mapper = new ObjectMapper();
        // 造数据
        Map<String, Person> map = new HashMap<>();
        for (int i = 0; i < 3; i++) {
            Person person = new Person();
            person.setName("Tom");
            person.setAge(new Random().nextInt(100));
            person.setDate(new Date());
            map.put("key" + i, person);
        }
```

- 序列化基本一致

```java
 String jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map);
```

- 通过调用 `constructCollectionType` 方法来反序列化

```java
System.out.println("反序列化: 使用 javaType");
//第二参数是 map 的 key 的类型，第三参数是 map 的 value 的类型
MapType javaType = mapper.getTypeFactory().constructMapType(HashMap.class, String.class, Person.class);
Map<String, Person> personMap = mapper.readValue(jsonInString, javaType);
System.out.println(personMap);
```

- 构造 `TypeReference` 来反序列化

```java
System.out.println("反序列化: 使用 TypeReference");
Map<String, Person> personMap2 = mapper.readValue(jsonInString, new TypeReference<Map<String, Person>>() {});
System.out.println(personMap2);
```

运行结果:

```sh
序列化...
{
  "key1" : {
    "name" : "Tom",
    "age" : 57,
    "date" : 1676964964761,
    "height" : 0
  },
  "key2" : {
    "name" : "Tom",
    "age" : 76,
    "date" : 1676964964761,
    "height" : 0
  },
  "key0" : {
    "name" : "Tom",
    "age" : 80,
    "date" : 1676964964760,
    "height" : 0
  }
}
反序列化: 使用 javaType
{key1=Person{name='Tom', age=57, date=Tue Feb 21 15:36:04 CST 2023, height=0}, key2=Person{name='Tom', age=76, date=Tue Feb 21 15:36:04 CST 2023, height=0}, key0=Person{name='Tom', age=80, date=Tue Feb 21 15:36:04 CST 2023, height=0}}
反序列化: 使用 TypeReference
{key1=Person{name='Tom', age=57, date=Tue Feb 21 15:36:04 CST 2023, height=0}, key2=Person{name='Tom', age=76, date=Tue Feb 21 15:36:04 CST 2023, height=0}, key0=Person{name='Tom', age=80, date=Tue Feb 21 15:36:04 CST 2023, height=0}}
```

Array 和 Collection 的处理与 List，Map 相似，这里不再赘述。

#### 树模型处理

Jackson 也提供了树模型(tree model)来生成和解析 json。若想修改或访问 json 部分属性，树模型是不错的选择。树模型由` JsonNode` 节点组成。程序中常常使用 `ObjectNode`，`ObjectNode` 继承于 JsonNode，示例如下：

```java
 ObjectMapper mapper = new ObjectMapper();
    //构建 ObjectNode
    ObjectNode personNode = mapper.createObjectNode();
    //添加/更改属性
    personNode.put("name", "Tom");
    personNode.put("age", 40);
    ObjectNode addressNode = mapper.createObjectNode();
    addressNode.put("zip", "000000");
    addressNode.put("street", "Road NanJing");
    //设置子节点
    personNode.set("address", addressNode);
    System.out.println("构建 ObjectNode:\n" + personNode.toString());
    //通过 path 查找节点
    JsonNode searchNode = personNode.path("name");
    System.out.println("查找子节点 name:\n" + searchNode.asText());
    //删除属性
    ((ObjectNode) personNode).remove("address");
    System.out.println("删除后的 ObjectNode:\n" + personNode.toString());
    //读取 json
    JsonNode rootNode = mapper.readTree(personNode.toString());
    System.out.println("Json 转 JsonNode:\n" + rootNode);
    //JsonNode 转换成 java 对象
    Person person = mapper.treeToValue(personNode, Person.class);
    System.out.println("JsonNode 转对象:\n" + person);
    //java 对象转换成 JsonNode
    JsonNode node = mapper.valueToTree(person);
    System.out.println("对象转 JsonNode:\n" + node);

```



#### 自定义序列类(不常用)

当 Jackson 默认序列化和反序列化的类不能满足实际需要，**可以自定义新的序列化和反序列化的类**。

##### 自定义序列化类：

自**定义的序列化类需要直接或间接继承 StdSerializer 或 JsonSerializer**，同时需要利用 `JsonGenerator `生成 `json`，重写方法 `serialize()`，

示例如下：

```java
public static class CustomSerializer extends StdSerializer<Person> {
    protected CustomSerializer() {
        super(Person.class);
    }
 
    @Override
    public void serialize(Person person, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        jgen.writeStartObject();
        jgen.writeNumberField("age", person.getAge());
        jgen.writeStringField("name", person.getName());
        jgen.writeStringField("msg", "已被自定义序列化");
        jgen.writeEndObject();
    }
}
```

JsonGenerator 有多种 write 方法以支持生成复杂的类型的 json，比如 writeArray，writeTree 等 。若想单独创建 JsonGenerator，可以通过 JsonFactory() 的 createGenerator。

##### 自定义反序列化类：

自定义的反序列化类需要**直接或间接继承 StdDeserializer 或 StdDeserializer**，同时需要利用 `JsonParser `读取 json，重写方法 `deserialize`，示例如下：

````java
public static class CustomDeserializer extends StdDeserializer<Person> {
    protected CustomDeserializer() {
        super(Person.class);
    }
 
    @Override
    public Person deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        Person person = new Person();
        int age = (Integer) ((IntNode) node.get("age")).numberValue();
        String name = node.get("name").asText();
        person.setAge(age);
        person.setName(name);
        return person;
    }
}
````

JsonParser 提供很多方法来读取 json 信息， 如 isClosed(), nextToken(), getValueAsString()等。若想单独创建 JsonParser，可以通过 JsonFactory() 的 createParser。

##### 使用自定义序列类

定义好自定义序列化类和自定义反序列化类，若==想在程序中调用它们，还需要注册到 ObjectMapper 的 Module，==示例如下:

```java
	ObjectMapper mapper = new ObjectMapper();
    // 生成 module
    SimpleModule module = new SimpleModule("myModule");
    module.addSerializer(new CustomSerializer());
    module.addDeserializer(Person.class, new CustomDeserializer());
    // 注册 module
    mapper.registerModule(module);

 	Person person = new Person();
    person.setName("Tom");
    person.setAge(40);
    person.setDate(new Date());
    System.out.println("序列化");
    String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(person);

    System.out.println(jsonString);
    System.out.println("反序列化");
    Person deserializedPerson = mapper.readValue(jsonString, Person.class);
```



#### 封装工具类

根据上述知识点,我们可以对Jackson进行再次封装成一个工具类,方便我们进行使用:

本工具类拥有`mapperFactory`系列方法用于生成`mapper`对象, 可以进行自定义的配置, 同时, 工具类还提供了很多简便的转换json的方法

`JsonUtility.java`

```java
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.text.SimpleDateFormat;
import java.util.Collection;

/**
 * 基于Jackson封装的JSON工具类,
 * 封装掉复杂的操作,只暴漏简单易用的方法
 */
public class JsonUtility {

    private static final String failJsonInfo = "{\"code\":\"500\", \"msg\": \"Conversion failure\"}";

    private void serializationConfig(ObjectMapper mapper){
        this.serializationConfig(mapper,"yyyy-MM-dd HH:mm:ss", false, false);
    }
    private void serializationConfig(ObjectMapper mapper, String dataFormat){
        this.serializationConfig(mapper,dataFormat, false, false);
    }
    private void serializationConfig(ObjectMapper mapper, boolean isIgnoreNull, boolean isIgnoreDefault){
        this.serializationConfig(mapper,"yyyy-MM-dd HH:mm:ss", isIgnoreNull, isIgnoreDefault);
    }
    /**
     * serializationConfig()
     * 设置序列化的一些配置
     * @param dataFormat: 指定序列化的格式,默认格式为 yyyy-MM-dd HH:mm:ss
     * @param isIgnoreNull: 设置序列化时是否忽略属性为null的值, 默认为 false, 不忽略
     * @param isIgnoreDefault: 设置序列化时是否忽略属性值为默认值的值, 默认为 false, 不忽略
     */
    private void serializationConfig(ObjectMapper mapper,
                                    String dataFormat,
                                    boolean isIgnoreNull,
                                    boolean isIgnoreDefault){
        mapper.setDateFormat(new SimpleDateFormat(dataFormat));
        if (isIgnoreNull) {
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        }
        if (isIgnoreDefault){
            mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_DEFAULT);
        }
    }

    /**
     * 对反序列化进行一些配置,
     * @param isIgnoreUnknownProperty: 反序列化时是否忽略在 json 中存在但 Java 对象不存在的属性,默认为true,忽略
     */
    private void deSerializationConfig(ObjectMapper mapper, boolean isIgnoreUnknownProperty){
        if (isIgnoreUnknownProperty){
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        }
        else {
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);
        }
    }

    // 返回一个默认配置的 mapper
    public ObjectMapper mapperFactory(){
        ObjectMapper mapper = new ObjectMapper();
        this.serializationConfig(mapper);
        return mapper;
    }
    public ObjectMapper mapperFactory(String dataFormat){
        ObjectMapper mapper = new ObjectMapper();
        this.serializationConfig(mapper, dataFormat);
        return mapper;
    }

    public ObjectMapper mapperFactory(boolean isIgnoreNull,boolean isIgnoreDefault){
        ObjectMapper mapper = this.mapperFactory("yyyy-MM-dd HH:mm:ss", isIgnoreNull, isIgnoreDefault, true);
        return mapper;
    }

    public ObjectMapper mapperFactory(String dataFormat,boolean isIgnoreNull,boolean isIgnoreDefault){
        ObjectMapper mapper = this.mapperFactory(dataFormat, isIgnoreNull, isIgnoreDefault, true);
        return mapper;
    }
    // 返回自定义配置的mapper
    public ObjectMapper mapperFactory(String dataFormat,boolean isIgnoreNull,boolean isIgnoreDefault,boolean isIgnoreUnknownProperty){
        ObjectMapper mapper = new ObjectMapper();
        this.serializationConfig(mapper, dataFormat, isIgnoreNull, isIgnoreDefault);
        this.deSerializationConfig(mapper, isIgnoreUnknownProperty);
        return mapper;
    }

    // 将Java对象转换成没有格式化的JSON字符串
    public String jsonParser_ByObject(ObjectMapper mapper, Object object){
        return this.jsonParser_ByObject(mapper, object,false);
    }
    /**
     * 将Java对象转换成一个JSON字符串
     * @param mapper 根据传入的mapper对象的进行转换
     * @param object 需要转换成JSON的Java对象,可以是集合,如List,Map
     * @param isFormat 是否返回一个经过格式化美化的JSON,默认为 false 不美化
     * @return String:返回一个JSON字符串
     */
    public String jsonParser_ByObject(ObjectMapper mapper, Object object, boolean isFormat){
        String jsonString = JsonUtility.failJsonInfo;
            try {
                if (isFormat){
                    jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
                }
                else{
                    jsonString = mapper.writeValueAsString(object);
                }
            } catch (JsonProcessingException e) {
                System.err.println(object+"转换json失败!");
                e.printStackTrace();
            }
        return jsonString;
    }

    /**
     *  将 JSON字符串解析成 Java对象
     * @param mapper 根据传入的mapper对象的进行转换
     * @param jsonString 需要解析JSON字符串
     * @param aClass 根据 Class 推导 Java对象的类型1
     * @return 返回解析好的 Java对象
     */
    public Object objectParser_ByJSON(ObjectMapper mapper, String jsonString, Class aClass){
        Object o = null;
        try {
            o = mapper.readValue(jsonString, aClass);
        } catch (JsonProcessingException e) {
            System.err.println(jsonString+"解析失败!");
            e.printStackTrace();
        }
        return o;
    }

    /**
     *
     * @param mapper  根据传入的mapper对象的配置信息进行转换
     * @param jsonString 需要解析的json字符串
     * @param type 提供一个类型引用实例, 例如 new TypeReference<Map<String, Object>>(){} 或 new TypeReference<List<Objectr>>{}
     * @param <E> 类型参数, 即使 集合元素类型
     * @return 返回解析好的 集合对象
     */
    public <E> Collection collectionParser_ByJSON(ObjectMapper mapper, String jsonString, TypeReference<E> type){
        Collection collection = null;
        try {
            collection = (Collection) mapper.readValue(jsonString, type);
        } catch (JsonProcessingException e) {
            System.err.println(jsonString+"解析失败!指定解析的类型为:"+type);
            e.printStackTrace();
        }
        return collection;
    }

    /**
     * 根据传入的 mapper对象的映射规则将 json字符串解析成 JSON节点树形对象
     * @param mapper
     * @param jsonString 需要的解析json对象
     * @return 返回的 JSON节点树形对象
     */
    public JsonNode readJsonToNode(ObjectMapper mapper, String jsonString){
        JsonNode jsonNode = null;
        try {
            jsonNode = mapper.readTree(jsonString);
        } catch (JsonProcessingException e) {
            System.err.println(jsonString+"解析失败!");
            e.printStackTrace();
        }
        return jsonNode;
    }

    /**
     * 将json节点对象转换成 Java对象
     * @param mapper 映射器对象
     * @param jsonNode 需要转换的 json节点对象
     * @param aClass 转换后的Java对象的Class
     * @return 返回转换好的 对象
     */
    public Object readNodeToObject(ObjectMapper mapper, JsonNode jsonNode, Class aClass){
        Object object = null;
        try {
            object = mapper.treeToValue(jsonNode, aClass);
        } catch (JsonProcessingException e) {
            System.err.println(jsonNode+"节点转换失败!");
            e.printStackTrace();
        }
        return object;
    }

    /**
     * 为 指定的 objectNode 添加基本属性(不包括对象类型的属性),相当于为json对象添加或者设置属性
     * @param node 需要添加或者修改属性值的 对象节点, 即使json对象
     * @param key 属性名, 不存在则添加该属性,存在则修改该属性
     * @param value 属性值, 需要添加或者修改的属性值
     * @throws Exception 当时 传入的 value 类型 不是 int ,double, boolean, String 任意一个时,会抛出异常
     */
    public void setAttribute(ObjectNode node, String key, Object value) throws Exception {
        String type = null;
        type = value instanceof String ? "String" : type;
        type = value instanceof Integer ? "int" : type;
        type = value instanceof Double ? "double" : type;
        type = value instanceof Boolean ? "boolean" : type;
        if (type == null){
            throw new Exception("value 不能为 null !");
        }
        switch (type){
            case "String": {
                node.put(key, (String) value);
                break;
            }
            case "int": {
                node.put(key, (Integer) value);
                break;
            }
            case "double": {
                node.put(key, (Double) value);
                break;
            }
            case "boolean": {
                node.put(key, (Boolean) value);
                break;
            }
            default: {
                throw new Exception("value参数类型错误!只能为int, double, String, boolean");
            }
        }
    }

    /**
     * 给指定节点添加对象属性
     * @param node 指定节点
     * @param key 属性名,存在则修改,不存在则新建
     * @param value 对象属性
     */
    public void setNodeAttribute(ObjectNode node, String key, ObjectNode value){
        node.set(key, value);
    }

    // 删除指定节点的指定属性
    public void removeAttribute(ObjectNode objectNode, String key){
        objectNode.remove(key);
    }

    // 查找指定节点
    public JsonNode findNode(JsonNode jsonNode, String key){
        return jsonNode.path(key);
    }
}
```





### FastJson

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







