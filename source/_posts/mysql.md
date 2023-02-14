---
title: mysql
date: 2020-04-12 18:57:32
categories: 
- 数据库
---
## 关系型数据库(MySQL)

### 数据库分类
#### 关系型数据库(SQL)

* 如mySQL SQLserver Oracle
* 通过表和表之间,行列之间的关系进行数据的存储
#### 非关系型数据库(NoSQL)
* 如Redis, MongDB
* 对象存储(如key: value), 通过对象自身的属性来决定



### MySQL 安装以及常用命令行

***
#### 下载mysql

安装mySQL教程:https://mp.weixin.qq.com/s/E1PM4EHwU6Joot4OG0gDjw

可自行前往官网下载,不建议使用最新版本(不稳定),随后解压到自己想要安装的地方

压缩版5.7版本下载地址:  https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.19-winx64.zip



#### 编写相关配置文件

在mysql**安装目录下**,**新建一个my.ini文件**,文件内容如下(具体配置自行修改)

```sh
[mysqld]
basedir=D:\Program Files\mysql-5.7\      # mysql安装目录
datadir=D:\Program Files\mysql-5.7\data\   # 数据存放的目录,没有需自己添加
port=3306    # 配置默认端口
skip-grant-tables
```

**注意:没有data文件夹自己新建一个,与上面配置文件一致**

#### 配置环境变量(非必须)

配置环境变量可以让我更方便的全局使用命令行, 一下默认有jdk的相关配置基础,默认不具体放图

在系统变量中新建变量名为**MySQL**,值为mysql的安装目录,在**原有的系统变量Path**中,添加值 **%MySQL%\bin**

(其实也就是相对路径映射)

#### 安装和初始化mysql

1. 在window下进入管理员权限的dos窗口(使用系统的搜索工具搜索cmd,然后选中右击以管理员身份运行即可进入)

2. 随后输入命令`mysqld –install `(注意:没有配置变量请切换mysql的安装目录使用此命令)dos系统切换目录的命令是 `cd 目录`,更多请自行访问[DOS命令大全](https://product.pconline.com.cn/itbk/software/os/1404/4604099.html)
3. 安装好后再输入初始化命令`mysqld --initialize-insecure --user=mysql` (注意一定要先配置好my.ini文件)
4. 随后输入命令`net start mysql`启动服务
5. 最后链接数据库即可(链接命令在下文的常用命令那里有)



#### 常用命令

**注意:**使用命令行配置系统环境变量可以不用切换到bin目录,**注意,在使用安装命令和初始化命令时,请打开管理员权限的dos窗口**

```sh
mysqld –install  #安装mysql
mysqld --initialize-insecure --user=mysql  #初始化数据文件
net stop mysql   #停止mysql服务
net start mysql  #启动mysql服务
mysql -uroot -p   #链接数据,随后在输入密码, 密码可以为空
#修改用户密码
update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost'; 

flush privileges;   #修改用户密码 刷新权限 
#####  注意:以下命令是在mySQL 下执行的,注意目录有个空格且命令有分号 #####
show databases;  # 注意有分号,且默认的mySQL
use 数据库名;  # 切换到某个数据库,
show tables; # 查看当前数据库下所有的表
describe 表名; # 查看表的信息
create database  #数据库名;
exit ;  # 退出链接
```
#### 用于获取sql的一些命令
```sql
show create table 表名 -- 查看创建表的语句,也可以常见创建库的
desc 表名;    --查看表的结构
```

### 关于mysql一些知识
***
#### mysql数据库的字符集编码
mysql的默认字符集编码是Latin1 ,**不支持中文**
* 在创建数库表时设置
```sql
CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `sex` varchar(4) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```
* 在my.ini配置文件中设置默认编码(不推荐):  
```xml
character-set-server=utf8
```

#### mysql的数据库引擎

|              | INNODB              | MYISAM |
| ------------ | ------------------- | ------ |
| 事务支持     | 支持                | 不支持 |
| 数据行锁定   | 支持                | 不支持 |
| 外键约束     | 支持                | 不支持 |
| 全文索引     | 不支持              | 支持   |
| 表空间的大小 | 较大,为myisam的两倍 | 较小   |

**常规使用操作:**
* MYISAM 节约空间，速度较快
* INNODB 安全性高，事务的处理，多表多用户操作

**在物理空间存在的位置:**所有的数据库文件都在data目录下,本质还是文件的存储！

* Mysql引擎在物理引擎文件上面的区别
* innoDB 在数据库表中只有一个**fm文件
  * *.frm表结构的定义文件 
  * *.MYD文件 数据文件**
  * *.MYI 索引文件

### mysql 的常用数据类型

***
#### 数值
1. int 4 字节 比较常用
2. bigint 8字节
3. float 浮点数 4字节数
4. double 浮点数 8字节
5. decimal 字符串形式的浮点数 (用于金融计算)

#### 字符串
1. char 固长字符串(0-255)
2. varchar 可变字符串(0-65535)
3. tinytext 微型文本 2^8-1
4. text 文本串 2^16-1

#### 日期时间(以字面量表示要有引号)

1. date YYYY-MM-DD ,日期格式
2. time HH:mm:ss 时间格式
3. datetime YYYY-MM-DD HH:mm:ss 最常用的时间格式
4. timestamp 时间戳 1970年1月1日到现在的毫秒数

### mysql常用函数
***
#### 数学函数:
1.  ABS() : 返回绝对值  abs
2.  CEILING()  : 天花板函数  ceiling
3.  FLOOR()  :  floor 地板函数
4.  RAND() -- 返回0-1的随机数  rand()

#### 字符串函数:
1. CHAR_LENGTH('字符串') : char_lengrh 返回字符串长度
2. CONCAT('字符串','字符串')  : concat 拼接字符串   
3. INSERT('字符串',int,int,'字符串') : insert 从指定位置替换字符串
4. UPPER('字符串') : 转大写母
5. LOWER('字符串') : 转小写字母
6. REPLACE('字符串','指定的','替换后的') perlace 替换指定的字符串

#### 日期函数
1. CURRENT_DATE() -- 获取当前日期,current_date()
2. CURDATE() -- 获取当前日期  curdate()
3. NOW() -- 获取当前日期  now()
4. LOCATIME()  -- 本地时间   localtime ()
5. SYSDATE()  -- 系统时间   sysdate()

#### 系统函数
1. SYSTEM_USER()
2. USER()
3. VERSION()

```sql
SELECT ABS(-8) -- 绝对值
SELECT CEILING(9.4) -- 向上取整
SELECT FLOOR(9.4)  -- 向下取整
SELECT RAND() -- 返回0-1随机数
SELECT SIGN(-10) -- 判断一个数的符号 0-0 负数返回-1 正数返回1
-- 字符串函数
SELECT CHAR_LENGTH('2323232') -- 返回字符串长度
SELECT CONCAT('我','233') -- 拼接字符串
SELECT INSERT('java',1,2,'cccc') -- 从某个位置开始替换某个长度
SELECT UPPER('abc') 
SELECT LOWER('ABC')
SELECT REPLACE('坚持就能成功','坚持','努力')
-- 查询姓 周 的同学 ，改成邹
SELECT REPLACE(studentname,'周','邹') FROM student
WHERE studentname LIKE '周%'
-- 时间跟日期函数（记住）
SELECT CURRENT_DATE() -- 获取当前日期
SELECT CURDATE() -- 获取当前日期
SELECT NOW() -- 获取当前日期
SELECT LOCATIME()  -- 本地时间
SELECT SYSDATE()  -- 系统时间
SELECT YEAR(NOW())
SELECT MONTH(NOW())
SELECT DAY(NOW())
SELECT HOUR(NOW())
SELECT MINUTE(NOW())
SELECT SECOND(NOW())
-- 系统
SELECT SYSTEM_USER()
SELECT USER()
SELECT VERSION()
```
#### 聚合函数
***
| 函数名称                                  | 描述   |
| ----------------------------------------- | ------ |
| COUNT()                                   | 计数   |
| SUM()                                     | 求和   |
| AVG()                                     | 平均值 |
| MAX()                                     | 最大值 |
| MIN()                                     | 最小值 |
| 其中                                      |        |
| **count(字段,尤其是主键)效率最高**        |        |
| count(1) 效率略高于count(＊)              |        |
| count(＊)  在只有一个字段时会优于count(1) |        |
| ### mysql中的数据表                       |        |
***
#### 修改表字段

```sql
ALTER TABLE 旧表名 RENAME  AS 新表名  -- 修改表名 
ALTER TABLE 表名 ADD 字段名 数据类型号 约束    --增加表的字段 
ALTER TABLE 表名 MODIFY 字段名 VARCHAR(11)  -- modify 修改约束,但不能修改名字
ALTER TABLE 表名 CHANGE 字段名 新字段名 INT(1)  -- change字段重命名,也可以改属性,但是名字无论是否改变都要写两次
-- 删除表的字段
ALTER TABLE 表名 if exists DROP 字段名
```

### DML语言
#### TRUNCATE和TRUNCATE的区别
* 相同点： 都能删除数据，都不会删除表结构
* 不同：
TRUNCATE 重新设置自增列 计数器会归零
TRUNCATE 不会影响事务

### mysql事务
***
* **原子性（Atomicity）:**要么都成功，要么都失败
  
* **一致性（Consistency）:** 事务前后的数据完整性要保持一致
  
* **持久性（Durability):**  事务一旦提交就不可逆转，被持久化到数据库中,提交不成功就恢复原状
  
* **隔离性:** 事务产生多并发时，互不干扰    

#### 事务隔离级
* **Read UnCommitted(读未提交)**
最低的隔离级别。一个事务可以读取另一个事务并未提交的更新结果。

* **Read Committed(读提交)**
大部分数据库采用的默认隔离级别。一个事务的更新操作结果只有在该事务提交之后，另一个事务才可以的读取到同一笔数据更新后的结果。

* **Repeatable Read(重复读)**
mysql的默认级别。整个事务过程中，对同一笔数据的读取结果是相同的，不管其他事务是否在对共享数据进行更新，也不管更新提交与否。

* **Serializable(序列化)**
最高隔离级别。所有事务操作依次顺序执行。注意这会导致并发度下降，性能最差。通常会用其他并发级别加上相应的并发锁机制来取代它。

#### 事务隔离级常见问题:
参考链接: https://www.cnblogs.com/balfish/p/8298296.html
***
* **脏读:** 指一个事务读取了另外一个事务未提交的数据(即不要的数据,脏的数据).这跟不可重复读类似，但是第二个事务不需要执行提交。
* **虚读(幻读):** 是指在一个事务内读取到了别的事务插入的数据，导致前后读取不一致。（重点是可能由于其他数据插入了所需要查询的数据,行数变了导致不一样）
* **不可重复读:**在一个事务内读取表中的某一行数据，多次读取结果不同。（重点是由于别的事务对数据进行了更改,导致两次读取的值不一样）

![](https://atts.w3cschool.cn/attachments/image/20210815/1629013298112275.png)

### 规范数据库设计

***
**糟糕的数据库设计:**
* 数据冗余,浪费空间
* 数据库插入和删除都会麻烦,异常(屏蔽使用物理外键)
* 程序的性能差

**良好的数据库设计:**
* 节省内存空间
* 保证数据库的完整性
* 方便我们开发系统

**软件开发中,关于数据库的开发设计:**
* 分析需求
* 概要设计:设计关系图E-R图

#### 三大范式
注:每个范式都必须满足前一个范式
##### 第一范式(1NF)
*原子性: 保证每一列不可再分*
![](https://atts.w3cschool.cn/attachments/image/20210813/1628825947848861.png)

##### 第二范式(2NF)
*完全依赖:非主属性完全依赖于主键*
![](https://atts.w3cschool.cn/attachments/image/20210813/1628826151813550.png)

##### 第三范式(3NF)
*消除传递依赖:非主属性必须直接依赖于主键*
![](https://atts.w3cschool.cn/attachments/image/20210813/1628826488728154.png)

#### 规范性和性能的问题
关联查询的表不得超过三张表
* 考虑商业化的需求和目标,数据库性能更重要
* 在规范性能问题时,适当考虑规范性
* 故意给某些表增加一些冗余字段(从表查询变为单表查询)
* 故意增加一些计算列(从大数据量降低为小数据量的查询:索引)

### JDBC(重点)
***
![](https://atts.w3cschool.cn/attachments/image/20210813/1628827744218385.png)
#### JDBC介绍
Sun公司为了简化开发人员的(对数据库的统一)操作,提供了(Java操作数据库的)规范,俗称JDBC,这些规范的由具体由具体的厂商去做
对于开发人员来说,我们只需要掌握JDBC接口的操作即可
#### 所需要的jar包
* java.sql(默认有)
* javax.sql(默认有)
还需要导入数据库驱动包

#### java程序链接mySQL

==注意! 增删改操作都需要提交事务==

**步骤:**
1. 加载驱动
2. 登陆链接数据库对象
3. 创建statement对象,用于执行sql语句   statement(清单)
4. 执行sql语句
5. 返回结果集,结果集中封装了我们查询的所有结果
6. 释放链接

```java
 // 1.加载驱动
        Class.forName("com.mysql.jdbc.Driver");
                      //协议://主机:端口/数据库名?编码设置&使用安全的链接
        String url = "url=jdbc:mysql://localhost:3306/db01?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&useSSL=true";
        String use = "root";  //用户名
        String password = "123456";  //密码
        //2.登陆链接数据库对象
        Connection connection = DriverManager.getConnection(url, use, password);
        //3.创建statement对象,用于执行sql语句   statement(清单)
        Statement statement = connection.createStatement();
        //4.执行sql语句
        String sql = "SELECT * from class"; //sql语句
        //5.返回结果集,结果集中封装了我们查询的所有结果
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()){
            System.out.println("classno:"+resultSet.getNString("classno"));
            System.out.println("classname:"+resultSet.getNString("classname"));
            System.out.println("department:"+resultSet.getNString("department"));
            System.out.println("monitor(班长):"+resultSet.getNString("monitor(班长)"));
            System.out.println("==========================================================");
        }
        //6.释放链接
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```



#### 几个重要对象

**DirverManager 驱动管理**                    

```java
Class.forName("com.mysql.jdbc.Driver");
DriverManager.registerDriver(new Driver()); //这是Driver源码
```
**URL 资源地址**
```java
//协议://主机:端口/数据库名?时区设置&编码设置&使用安全的链接
String url = "url=jdbc:mysql://localhost:3306/db01?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&useSSL=true";
```
**Connection 链接对象,操作数据库的对象**
```java
connection.commit();  //提交事务
connection.rollback();   //回滚事务
connection.setAutoCommit();  //自动提交事务

/* Statemen 清单,执行sql的对象  */
```java
statement.executeQuery("sql");   //执行查询,返回结果集
statement.executeUpdate("sql");  //执行更新(插入和删除也算更新),返回受影响的行数
statement.execute("sql");  //执行全部的sql语句
```
**ResultSet:查询后的结果集**

获取数据:
```java
resultSet.getNString();
resultSet.getObject();  //不知道什么类型的情况下使用
resultSet.getInt();
resultSet.getDate();
resultSet.getFloat();
```
指针移动:
```java
resultSet.next();
resultSet.previous();
resultSet.absolute();
resultSet.beforeFirst();
resultSet.afterLast();
```
关闭链接
```java
resultSet.close();
statement.close();
connection.close();
```

#### SQL注入的问题

SQL注入即是指web应用程序对用户输入数据的合法性没有判断或过滤不严，攻击者可以在web应用程序中事先定义好的查询语句的结尾上添加额外的SQL语句，在管理员不知情的情况下实现非法操作，以此来实现欺骗数据库服务器执行非授权的任意查询，从而进一步得到相应的数据信息。
**即:通过sql语句的漏洞来实现一些非法操作.**
```sql
// 欲根据用户id来进行获取用户的其他信息,但是使用如下语句就会将所有用户的信息都查询到
select * from db01.user where (id =' 'or 1=1)";   --sql注入
```
##### PreparedStatement对象

可以防止sql注入,并且效率更高,如:**在编辑sql语句时使用?代表占位符,并且预编译sql语句,随后在设置参数防止sql注入**

##### 常用方法:

```java
preparedStatement.executeQuery();
preparedStatement.executeUpdate();
preparedStatement.setString(); //给参数传递字符串类型的值
preparedStatement.setInt();  //给参数传递 int 类型的值
preparedStatement.setDate();  //给参数传递 Date 类型的值
... 等等
```
例子:
```java
//带参数的sql语句
String sql = "select * from db01.user where(id = ?)" ;
//预编译sql语句并且返回一个PreparedStatement对象
preparedStatement = con.prepareStatement(sql);
//给参数传递值(适当的使用对应类型的方法能提高效率)
preparedStatement.setString(1,id);  //注意下标从1开始
//运行sql语句
resultSet = preparedStatement.executeQuery();
```



#### 解藕,封装工具类

我们可以将配置信息编写成配置文件(xxx.properties),然后通过`Properties`类读取文件内容对应参数来配置信息

配置文件db.properties, 我们需要将此配置文件放入字节码的相同路径(maven项目的resources目录下)

```properties
# 驱动类名
driver=com.mysql.cj.jdbc.Driver
# //协议://主机:端口/数据库名?设置时区&编码设置&使用安全的链接协议
url=jdbc:mysql://localhost:3306/db01?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&useSSL=true
user=root
password=123456
```

JdbcUtil类

```java
package SQL_injection;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JdbcUtility {
// 初始化变量,并且避免作用域问题
    static Properties properties = new Properties();
    static Connection con = null;
    static PreparedStatement preparedStatement = null;
    static ResultSet resultSet = null;
    static String username = null;
    static String password = null;

    //初始化配置
    static {
        // 获取输入流, 通过此类的类加载器获取类加载路径,进而获取到配置文件的输入流
        InputStream in = JdbcUtility.class.getClassLoader().getResourceAsStream("db.properties");
        try {
            // 通过properties对象加载配置文件的输入流
            properties.load(in);
//相当于加载驱动Class.forName("com.mysql.jdbc.Driver"); 只不过是将配置文件的driver参数获取出来           
            JdbcUtility.class.forName(properties.getProperty("driver"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
     //使用配置文件内容信息链接数据库
    public JdbcUtility(){
        try {
            //获取配置文件信息
            String url = properties.getProperty("url");
            String user = properties.getProperty("user");
            String password = properties.getProperty("password");
            // 根据参数链接数据库
             con = DriverManager.getConnection(url,user,password);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

     //使用自定义的用户名和密码登陆数据库
     public JdbcUtility(String username,String password){
        try {
            con = DriverManager.getConnection(properties.getProperty("url"), username, password);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public boolean select(String id){
        String sql = "select * from db01.user where(id = ?)" ;

        //执行查询语句
        try {
            preparedStatement = con.prepareStatement(sql);
            preparedStatement.setString(1,id);
            resultSet = preparedStatement.executeQuery();
            if(!resultSet.next()) {
                System.out.println("查询失败!");
                return false;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return true;
    }

    public void getResult(){
        try {
            do {
                System.out.print("id:"+resultSet.getString(1)+"\t");
                //System.out.println("password:"+resultSet.getString(0)+"\t");
                System.out.print("name:"+resultSet.getString(3)+"\t");
                System.out.print("sex:"+resultSet.getString(4)+"\t");
                System.out.print("birthday:"+resultSet.getString(5)+"\t");
                System.out.println();
            }
            while (resultSet.next());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void insert(String id ,String name,String sex ){
            String sql = "insert into db01.user (id,name,sex,birthday) " +
                    "values(?,?,?,?)" ;
        try {
            preparedStatement = con.prepareStatement(sql);

            preparedStatement.setString(1,id);
            preparedStatement.setString(2,name);
            preparedStatement.setString(3,sex);
            Date date = new Date(new java.util.Date().getTime());
            preparedStatement.setDate(4,date);

            int n = preparedStatement.executeUpdate();
            if (n == 0) System.out.println("插入失败!");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    //删除
    public void delete(String id){
        String sql = "delete from db01.user where(id = ?);" ;
        try {
            preparedStatement  = con.prepareStatement(sql);
            preparedStatement.setString(1,id);
            if (preparedStatement.executeUpdate()==0) System.out.println("删除失败!");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void update(String id,String columnname,String value){
        String sql = "update db01.user set "+columnname +" = ? where (id = ? )" ;
        try {
            preparedStatement = con.prepareStatement(sql);
            //preparedStatement.setString(1,columnname);
            preparedStatement.setString(1,value);
            preparedStatement.setString(2,id);

            if(preparedStatement.executeUpdate()==0) System.out.println("更新失败");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

    //关闭
    public void  close(){
        try {
            resultSet.close();
            con.close();
            preparedStatement.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


}
```





#### JDBC操作事务

==注意! 增删改操作都需要提交事务==

##### 常用方法

```java
connection.setAutoCommit(boolean flag); //设置事务是否自动提交,默认是提交的
connection.commit(); //提交事务
connection.rollback(); //回滚事务,一般不用设置,事务一般发送错误会自动回滚
```

下面代码是模拟一笔转账操作,A账户减少100元,B账户增加100元,两个sql操作为一个事务,同时执行成功或者失败(失败事务发生回滚)
```java
 JdbcUtility jdbc = new JdbcUtility();
 try {
     //关闭自动提交事务
     jdbc.con.setAutoCommit(false);
     //进行一笔转账操作,其中update()方法,参数1代表付款或者收款人,参数2代表是否收款
     jdbc.update("A",true);
     jdbc.update("B",false);
     //提交一笔转账事务
     jdbc.con.commit();
     
 } catch (SQLException throwables) {
     try {
         //实际上事务会自动回滚当出现错误时
         jdbc.con.rollback();
     } catch (SQLException e) {
         e.printStackTrace();
     }
     throwables.printStackTrace();
 }
```

### 数据库链接池

**池化技术:准备一些预先资源,过来就连接预先准备好的**
```
数据库---＞执行完毕---＞释放  这种方式十分浪费资源
相关概念:
常用连接数: 10
最小连接数: 5
最大连接数: 15
等待超时: 100ms
```
连接池，必须实现接口 DateSource

#### 开源数据源实现技术

使用了以下的数据库连接池后,我们以后项目开发中就不需要编写**连接数据库的代码了**,
**DBCP:** Spring 推荐使用
**C3P0:** Hibernate 推荐使用c3p0
**Druid:** 阿里巴巴的技术
 ```java
   /*****************这是使用DBCP来连接数据库的操作***************************/
static InputStream in = JdbcUtilityDemo.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
static Properties properties = new Properties();
static BasicDataSource dateSource = null;
properties.load(in);
//创建数据源 工厂模式-->; 创建对象
dateSource  = BasicDataSourceFactory.createDataSource(properties);
//最后再得到连接
dateSource.getConnection();
 ```
##### 总结:

使用数据库连接池本质上就是帮助开发人员省区来连接数据库的操作,使得我们**只需要获取其来连接对象Connection即可**
无论使用什么数据源，本质是不变的，DateSource接口不会变，方法就不会变

