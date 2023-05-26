---
slug: "/blog/post-03"
date: "2023-05-17"
title: "後端知識 - 前端工程師的Spring Boot成長日記。"
category: "SpringBoot"
featuredImage: ../images/blog-spring.jpg
---

## SpringBoot菜鳥成長日記

### 開發環境設定
#### Mac OS
1. [Homebrew](https://brew.sh/index_zh-tw)
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ brew install git //安裝git
```
2. [oh-my-zsh](https://ohmyz.sh/)
```
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
3. [MySQL Server](https://www.mysql.com/downloads/)
4. [Java 11](https://github.com/AdoptOpenJDK/homebrew-openjdk)
```
$ brew tap AdoptOpenJDK/openjdk
$ brew install --cask adoptopenjdk11
```
5. [Talend API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=zh-TW)
6. [Intellij IDEA](jetbrains.com/idea/download/)

#### Windows開發環境設定
1. [MySQL Server](https://www.mysql.com/downloads/)
2. [Java 11](https://adoptopenjdk.net/)
3. [Talend API Tester](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=zh-TW)
4. [Intellij IDEA](jetbrains.com/idea/download/)
5. [Git](https://git-scm.com/)


#### Create New Project
- Prederences - Spring Initializr + Project SDK Java 11


---


### 基本專案結構以及了解SpringBoot特性
- src/main - 放我們要寫的Code
- src/main/java - 放Java Code
- src/main/resource - 放Spring Boot設定檔
- src - test - 放測試用的Code


```
package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication <= 加在Class上的註解，使電腦能夠運行SpringBoot的程式
public class HelloWorldApplication { 

    public static void main(String[] args) {
        SpringApplication.run(HelloWorldApplication.class, args);
    }

}
```

#### Spring IoC(Inversion of Control) 控制反轉

##### 主要概念 - 將Object的控制權交給外部的Sprint Container來保管
##### 優點
1. Loose coupling 鬆耦合
2. Lifecycle Management 生命週期管理
3. More Testable 方便測試程式

##### 範例

```
public class Teacher {

    private Printer printer = new HpPrinter();
    
    public void teach() {
        printer.print("I am a Teacher");
    };
    
}

------ 改成以下這樣 ------

public class Teacher {

    private Printer printer;
    
    public void teach() {
        printer.print("I am a Teacher");
    };
    
}
```

#### 說明
##### @Component 用法 (@RestController類似)
- 用法：只能加在class上
- 用途：將該class變成由Spring容器管理的Object(Bean)

```
@Component <= 將該class變成由Spring容器管理的Object(Bean hpPrinter)
public class HpPrinter implements Printer {
    
    @Override
    public void print(String message) {
        System.out.println("HP印表機: " + message);
    }
    
}

透過依賴注入 Dependency Injection
@Component
public class Teacher {
    
    @Autowired
    private Printer printer;
    
    public void teach() {
        printer.print("I am a Teacher");
    };
    
}


```


#### Spring IoC 專有名詞整理
1. IoC=Inversion of Control (控制反轉)
2. DI=Dependency Injection (依賴注入)
3. Bean=存放在Spring容器裡的Object
4. @Component註解=加在class上，將該class變成由Spring容器管理的bean
5. @Autowired註解=加在變數上，取得Spring容器中的bean

##### @Autowired以及@Qualifier 詳解
```
兩種註解寫法沒有順序性
```

##### @Autowired
- 用法：通常是加在class變數上
- 用途：根據變數的類型，去Spring容器中尋找有沒有符合類型的bean
- 變數的類型盡量使用Interface

##### @Qulifier
- 用法：通常是加在class變數上，會跟@Autowired一起使用
- 用途：指定要載入的bean的名字

##### 小結
- @Autowired：根據變數的類型，去Spring容器中尋找有沒有符合類型的bean
- @Qulifier：輔助@Autowired，指定要載入的bean的名字

---

### 創建Bean的方法

1. 在Class上加上 @Component註解
2. 使用 @Configuration + @Bean 註解
3. 兩種方法可以混用

#### @Configuration
- 用法：只能加在class上
- 用途：Spring中的設定用註解，表示這個class是拿來設定Spring用的

```

@Configuration
public class MyConfiguration { // class的名字不重要
    // do something
}

```

#### @Bean
- 用法：只能加在帶有@Configuration class 的方法上
- 用途：在Spring容器中創建一個Bean

```

@Configuration
public class MyConfiguration { // class的名字不重要
    
    @Bean
    public Printer myPrintr() {
        return new HpPrinter();
    }
}

Spring容器中產生的bean的預設名字會是方法的名字 myPrinter
如果是@Bean("xxx") 產生的bean的名字就會是xxx

```

#### Bean的初始化

##### @PostConstruct
- 用法：加在方法上
- 細節：使用@PostConstruct的時候
    - 方法：public
    - 返回類型：void
    - 方法名稱：任意取名但不含參數 e.g. init()


```
@Component
public class HpPrinter implements Printer {

    private int count;

    @PostConstruct
    public void initialize() {
        count = 5;
    }

    @Override
    public void print(String message) {
        count--;
        System.out.println("HP印表機： " + message);
        System.out.println("剩餘使用次數： " + count);
    }
}
```

##### 實現@InitializingBean 這個 Interface
- 用法：實現 Interface
- 細節：使用@InitializingBean的時候，必須要再實現裡面的afterPropertiesSet()方法
```
@Component
public class HpPrinter implements Printer, InitializingBean{

    private int count;
        
    @Override
    public void afterPropertiesSet() throws Exception {
        count = 5;
    }
    

    @Override
    public void print(String message) {
        count--;
        System.out.println("HP印表機： " + message);
        System.out.println("剩餘使用次數： " + count);
    }
}
```

---

#### Bean的生命週期
- 創建Bean => 初始化Bean => Bean可以被使用
- 有多個Bean的話，要每一個Bean都可以正常被使用才能運行成功
- Bean之間的依賴關係 e.g. myController依賴於Printer
- 避免以下循環依賴類型寫法
```
@Component
public class A {

    @Autowired
    private B b; // A依賴於B
}

@Component
piblic class B {

    @Autowired
    private A a;
    
}
```

- 小結
    - Bean的生命週期：創建->初始化->可以被使用
    - 創建時若有依賴其他Bean，則Spring會回過頭去「創建 + 初始化」那個被依賴的Bean
    - 不要寫出循環依賴的Code

#### Bean的生命週期 讀取Spring Boot設定檔 - application.properties + @Value

##### Spring Boot設定檔 - application.properties
- 用法：使用properties語法(key=value)
- 用途：存放Spring Boot的設定值
- 細節：檔名一定是application

```
# example
count=5
my.name=Hubert
my.age=33
```

##### @Value
- 用法：加在Bean或是設定Spring用的class裡面的變數上
- 用途：讀取Spring Boot設定檔(application.properties)中指定的key的值

```
# application.properties
count=5
my.name=Hubert
my.age=33

public class MyBean {

    @Value("${count}")
    private Integer number; // number=5
}

```

---

### Spring IoC總結
- IoC = Inversion of Control (控制反轉)
    - 將object的控制權交給外部的Spring容器管理
    - 存放在Spring容器裡的object，稱為Bean

- DI = Dependency Injection (依賴注入)
    - 和IoC相輔相成

- 創建Bean的方法
    - @Component
    - @Configuration + @Bean

- 初始化Bean的方法
    - @PostConstruct
    - 實現InitializingBean interface

- 注入Bean的方法
    - @Autowired
    - 多個Bean可以搭配@Qualifier

- Bean的生命週期
    - 創建 -> 初始化 -> 可以被使用
    - 創建時若有依賴其他bean，則Spring會回過頭去「創建+初始化」那個被依賴的bean
    - 不要寫出循環依賴的code

- 讀取Spring Boot設定檔(application.properties)的值的方法
    - application.properties+@Value

---

### Spring AOP(Aspect-Oriented Programming) 切面導向程式設計

#### 基本概念
- 將每個方法內重複執行的共同邏輯，設計成一個切面貫穿所有方法，由切面統一做處理。


```
// pom.xml 新增設定
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>

```


#### Example
- 用法：加在class上，需和@Component一起使用
- 用途：宣告這個class是一個切面
- 換言之這個class必須成為一個bean才能夠成為切面

```
@Aspect
@component
public class MyAspect {
    // do something
}
```

#### @before
- 用法：加在切面的class上
- 用途：在切入點的方法執行前執行

```
@Aspect
@component
public class MyAspect {
    
    @Before("execution(* com.example.demo.HpPrinter.*(..))") // 切入點(Pointcut)
    public void before() {
        System.out.println("I am before");
    }
}
```

#### @After
- 用法：加在切面的class上
- 用途：在切入點的方法執行後執行

```
@Aspect
@component
public class MyAspect {
    
    @After("execution(* com.example.demo.HpPrinter.*(..))") // 切入點(Pointcut)
    public void before() {
        System.out.println("I am before");
    }
}
```

#### @Around
- 用法：加在切面的class上
- 用途：在切入點的方法執行前後都執行

```
@Aspect
@component
public class MyAspect {
    
    @Around("execution(* com.example.demo.HpPrinter.*(..))") // 切入點(Pointcut)
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("I am around before");
        Object obj = pjp.proceed(); // 去執行原本切入點的方法
        System.out.println("I am around after");
        return obj;
    }
}
```

#### Spring AOP提供的註解
- 常用
    - @Before：在切入點的方法執行前執行
    - @After：在切入點的方法執行後執行
    - @Around：在切入點的方法執行前後都執行

- 不常用
    - @AfterThrowing：在切入點的方法拋出異常之後執行
    - @AfterReturning：在切入點的方法執行成功之後執行

#### 常見的切入點表達式
- execution(* com.example.demo.HpPrinter.*(..))：切入點為com.example.demo package裡的HpPrinter class裡的所有方法
- execution(* com.example.demo.*(..))：切入點為com.example.demo package裡的所有class的所有方法
- execution(* com.example.demo..*(..))：切入點為com.example.demo package以及所有子package裡的所有class的所有方法
- execution(* com.example.demo.HpPrinter.print())：切入點為com.example.demo.HpPrinter class裡的print()方法
- @annotation(com.example.demo.MyAnnotation)：切入點為帶有@MyAnnotation的方法

#### Spring AOP的發展
- 權限驗證 / Spring Security
- 統一的Exception / @ControllerAdvice
- Log紀錄

#### Spring AOP的總結
- AOP = Aspect-Oriented Programming (切面導向程式設計)
- 創建切面的方法
    - @Aspect + @Component
- 可使用的切面註解
    - 常用：@Before、@After、@Around
    - 不常用：@AfterThrowing、@AfterReturning
- Spring AOP的發展
    - 權限驗證 / Spring Security
    - 統一的Exception / @ControllerAdvice
    - Log紀錄

---

### Spring MVC

#### HTTP協議
- 負責規定資料的傳輸格式，讓前端和後端能夠有效的進行資料溝通
- 可以分成Request(請求)和Response(回應)兩個部分
- Http Request(請求)
    - Method
        - GET
        - POST
        - PUT
        - DELETE
        - ...
    - Url
        - http://localhost:8080/test -> 出現在瀏覽器中的網址
    - Request header
        - 放一些通用的資訊
    - Request body
        - 放請求參數
        - 只有在使用POST以及PUT時才能使用
        -
- Http Response(回應)
    - Status Code(Http狀態碼)
        - 1xx：資訊
        - 2xx：成功 e.g. 200(Success)
        - 3xx：重新導向
        - 4xx：前端請求錯誤 e.g. 404(找不到網頁)
        - 5xx：後端處理有問題
    - Response header
        - 放一些通用的資訊 e.g. Content-type：text/plain
    - Response body
        - 很重要，放後端返回的數據

#### URL路徑對應
- 協議/域名/路徑 e.g. http://localhost:8080/test
- @RequestMapping
    - 用法：加在class上或方法上，小括號裡填寫url路徑
        - 使用@RequestMapping時，class上ㄧ定要加上@Controller或是@RestController
    - 用途：將url路徑對應到方法上
    - 運行原理：
    ```
    @RestController
    public class MyController {
        
        @RequestMapping("/test")
        public String test() {
            System.out.println("Hi");
            return "Hello World";
        }
    }
    ```

- @Controller / @RestController
    - 用法：加在class上
    - 用途：將該class變成bean，並且可以使用@RequestMapping
        - 可以思考成 @Component的加強版

---

### 結構化的呈現數據 Json

#### Json
- 一種輕量級的資料交換格式，易於讀寫
- 目的：結構化的呈現數據
```
{
    "id": 3345678,      // "key": value
    "name": "Hubert",   // "key": value
    "inervice": true    // "key": value
}
```

---

### 回傳Json格式 @RestControler、@Controller + @ResponseBody

#### Spring Boot使用Jackson library去轉換Java class和Json格式
```
public class Student {
    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


@RequestMapping("/detail")
@RestController
public class MyController {

    @RequestMapping("/user")
    public Student user() {
        Student student = new Student();
        student.setName("Hubert");
        return student;
    }
}
```

---

### Http method - GET和POST
- 有多種可以選，每一種的特性不同
- 常用的http method
    - GET
    - POST
    - PUT
    - DELETE
    - ...

#### GET
- 最常使用的http method
- 類似於明信片的概念，傳遞的參數會被別人看見

```
http://localhost:8080/test?id=123&name=Hubert
```


#### POST
- 常使用的http method
- 類似於信封的概念，傳遞的參數不會被別人看見，安全性較高

```
http://localhost:8080/test

// Request Body
{
    "id": 123,
    "name": "Hubert"
}

```

---

### 取得前端請求參數
- @RequestParam
- @RequestBody
- @RequestHeader
- @PathVariable

#### @RequestParam
- 用法：只能加在方法的參數上
- 用途：取得url裡面的參數 query parameter
```
http:localhost:8080/test1?id=123&name=Hubert

public class MyController {
    
    public String test1(@RequestParam Integer id
                        @RequestParam String name) {
        // do something
    }
}

```
##### @RequestParam 可使用的設定
- name(or value)：指定url參數的名字，不常使用
```
http:localhost:8080/test1?testId=123

public class MyController {
    
    public String test1(@RequestParam(name = "testId") Integer id) {
        // do something
    }
}
```
- required：是否是必須的參數？
    - 預設是true，可以改成false
```
http:localhost:8080/test1?id=123&name=Hubert

public class MyController {
    
    public String test1(@RequestParam(required = false) Integer id) {
        // do something
    }
}

```

- defaultValue：提供預設值，最常使用
    - 可以想成required=false的加強版，提供預設值
```
http:localhost:8080/test1?id=123&name=Hubert

public class MyController {
    
    public String test1(@RequestParam(defaultValue = "10", required = false) Integer id) {
        // do something
    }
}
```

#### @RequestBody
- 用法：只能加在方法的參數上
- 用途：取得request body裡面的參數(將Json轉為Java object)
```
    // class物件
    public class Student {
        Integer id;
        String name;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
    
    // example
    @RequestMapping("/test2")
    public String test2(@RequestBody Student student) {
        System.out.println("student id: " + student.getId());
        System.out.println("student name: " + student.getName());
        return  "Hello test2";
    }

```


#### @RequestHeader
- 用法：只能加在方法的參數上
- 用途：取得request header裡面的參數，跟RequestParam很類似
```
    // request header
    info:hello
    
    // example
    @RequestMapping("/test3")
    public String test3(@RequestHeader String info) { // hello

    }
```

##### @RequestHeader 可使用的設定
- name(or value)：指定url參數的名字，經常使用
```
http:localhost:8080/test1?testId=123

public class MyController {
    
    public String test1(@RequestParam(name = "Content-Type") String contentType) {
        // do something
    }
}
```
- required：是否是必須的參數？
    - 預設是true，可以改成false


- defaultValue：提供預設值，最常使用
    - 可以想成required=false的加強版，提供預設值
```
http:localhost:8080/test1?id=123&name=Hubert

public class MyController {
    
    public String test1(@RequestParam(defaultValue = "10", required = false) Integer id) {
        // do something
    }
}
```

##### 常見的 request header
- Content-Type：表示request body的格式
    - application/json(Json格式，最常用)
    - application/octet-stream(用於上傳文件)
    - multipart/form-data(用於上傳圖片)
- Authorization：用於身份驗證

#### @PathVariable
- 用法：只能加在方法的參數上
- 用途：取得url路徑的值

```
    http:localhost:8080/test4/123/Hubert
    
    // example
    @RequestMapping("/test4/{id}/{name}")
    public String test4(@PathVariable Integer id, @PathVariable String name) { // 123

    }
```

#### @RequestParam 與 @PathVariable 的差異
- @RequestParam：把參數放在url的最後面
``` 
    http:localhost:8080/test1?testId=123
```

- @PathVariable：把參數放在url的裡面
``` 
    http:localhost:8080/test4/123
```

---

### RESTful API的設計
#### 取得商品列表的API
- Http Request（請求）

GET
/getProducts

| Name     | type     | Description   | Required |
| -------- | -------- | -----------   | -------- |
| size     | Integer  | 要取得幾個商品   | yes      |
| search   | String   | 查詢的商品關鍵字 | no       |

- Http Response (回應)
```
Sample response body
{
  "productList": [
    {
      "id": 123,
      "name": "apple",
      "price": 30
    }
  ] 

}
```

```
http://localhost:8080/getProducts?size=10

@RequestMaping("/getProducts")
public Product getProducts(@RequestParam Integer size, 
                           @RequestParam(required = false) String search) {
    // do something...
}    
```

#### API常見說法
- 這個getProducts API怪怪的，可以幫我看一下嗎？
```
@RequestMaping("/getProducts")
public Product getProducts(@RequestParam Integer size, 
                           @RequestParam(required = false) String search) {
    // do something...
}  
```

- 你可以call getProducts API / 打 getProducts API
- 可以提供API文件嗎？

#### REST風格
- 目的：簡化溝通成本
- 如果你所設計的API符合REST風格，那麼你所設計的API就是RESTful API
    - Beauty -> Beautiful
    - Peace -> Peaceful

- 規範：使用http method表示動作，去對應資料庫的CRUD(增查改刪)

| Http method | 對應的資料庫操作 | 說明        |
| --------    | --------      | ---------  | 
| POST        | Create(新增)   | 新增一個資源 | 
| GET         | Read(查詢)     | 取得一個資源 |
| PUT         | Update(修改)   | 更新一個已存在的資源 |
| DELETE      | Delete(刪除)   | 刪除一個資源 |

- 使用url路徑描述資源之間的階層關係

| Http method   | 說明 | 
| --------      | --------      |
| GET/users     | 取得所有user   | 
| GET/users/123 | 取得user id為123的user |
| GET/users/123/articles | 取得user id為123的user所寫的所有文章 |
| GET/users/123/articles/456 | 取得user id為123的user所寫的、article id為456的文章 |

- response body返回json或是xml格式
- To REST or Not To REST ?
    - REST風格只是一種約定俗成的習慣，不是標準規範
    - 選擇最洽當的做法即可


---

### 實作 RESTful API

```
// 利用@NotNull註解就不用像以前一樣，如下
if(student.getId() == null) {
    throw new RuntimeException("id 不可以是 null");
}

```

#### 驗證請求參數(常用)
- @NotNull：不能為null
- @NotBlank：不能為null、且不能為空白的字串，用在驗證String類型的參數上
- @NotEmpty：不能為null、且size必須>0，用在驗證集合類型(List、Set、Map)的參數上
- @Min(value)：值必須>=value，用在驗證數字類型的參數上
- @Max(value)：值必須<=value，用在驗證數字類型的參數上


##### 使用@RequestBody時，要在該參數上加上@Valid註解，才能讓這個class裡的驗證請求參數的註解生效
```
@PostMapping("/students")
public String create(@RequestBody @Valid Student student) {
    return "執行資料庫的Create操作";
}
    
public class Student {

    @NotNull
    Integer id;

    @NotBlank
    String name;
}
```


#### 驗證請求參數(不常用)
- @Size(min,max)：min <= 字串長度or集合的size <= max，可以只設max or min
- @Email：必須符合電子郵件的格式
- @Pattern(regexp)：必須符合正規表達式regexp
- @Past：必須比當前時間早，也就是被註解的參數必須是以前的時間
- @Future：必須比當前時間晚，也就是被註解的參數必須是未來的時間
- @AssertTure：必須為true，用在驗證boolean類型的參數上
- @AssertFalse：必須為false，用在驗證boolean類型的參數上
- @Null：必須為null

##### 使用@RequestParam、@RequestHeader、@PathVariable時，要在Controller上加上@Validated註解，才能夠讓驗證請求參數的註解生效
```

@RestController
@Validated
public class StudentController {

    @PostMapping("/students/{studentId}")
    public String create(@PathVariable @Min(100) Integer studentId) {
        return "執行資料庫的Create操作";
    }
}
    
public class Student {

    @NotNull
    Integer id;

    @NotBlank
    String name;
}
```

#### Http status code (Http狀態碼)
- 用來表示這次http請求的結果為何
- 可以根據首位數字分成五大類
    - 1xx：資訊
        - 無常見的狀態碼
    - 2xx：成功
        - 200 Ok：請求成功
        - 201 Create：請求成功且新的資源成功被創建，通常用在POST的response
        - 202 Accepted：請求已經接受，但尚未處理完成
    - 3xx：重新導向
        - 301 Moved Permanently：永久性重新導向，新的url應放在response header的"Location"中返回，通常會用在網頁搬家上
        - 302 Found：臨時重新導向，新的臨時性的url應放在response header的"Location"中返回
    - 4xx：前端請求錯誤
        - 400 Bad Request：前端的請求參數有錯誤(例如：前端傳給後端的參數名稱不同、請求的格式有問題)
        - 401 Unauthorized：沒有通過身份驗證
        - 403 Forbidden：請求被後端拒絕，通常是權限不足導致的
    - 5xx：後端處理有問題
        - 500 Internal Server Error：後端在執行程式時發生錯誤，可能是程式內有bug導致的
        - 503 Service Unavailable：由於臨時維護或著流量太大，後端目前沒有辦法處理請求
        - 504 Gateway Timeout：請求超時

##### ResponseEntity<>
- 用法：作為方法的返回類型
- 用途：自定義回傳的http response的細節

```
@RestController
public class MyController {

    @RequestMapping("/test")
    public String test() {
        return "Hello World";
    }
}


@RestController
public class MyController {

    @RequestMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.ACCEPTED) 
                .body("Hello World");
    }
}

```

##### @ControllerAdvice
- 用法：只能加在class上，通常會和@ExceptionHandler一起用
- 用途：將這個class變成一個bean，並且可以在內部使用@ExceptionHandler


##### @ExceptionHandler
- 用法：只能加在方法上，通常會和@ControllerAdvice一起用
- 用途：去catch方法所噴出的Exception


##### 使用@ControllerAdvice的好處 - 統一管理Exception
- 底層由Spring AOP所實作

```
// Java基礎

// 系統錯誤，不需處理
Throwable - Error - OutOfMemoryError

// 程式有錯誤，需要處理
Throwable - Exception - RuntimeException - IllegalArgumentException
Throwable - Exception - IOException

// 原生處理方式 try catch

public String test1() {
    try {
        throw new Runtime
    } catch () {
    
    }
}

// 503 exsample
// MyController && MyExceptionHandle

@RestController
public class MyController {

    @RequestMapping("/test1")
    public ResponseEntity<String> test() {
        throw new RuntimeException("This is test1 error");
    }
}

@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> errorHandle(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("RuntimeException: " + exception.getMessage());
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> errorHandle(IllegalArgumentException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("IllegalArgumentException: " + exception.getMessage());
    }
}

```

---

### 攔截器Interceptor

```
// Controller
@RestController
public class MyController {

    @RequestMapping("/test1")
    public String test1() {
        System.out.println("執行 test1 方法");
        return "hello test1";
    }

    @RequestMapping("/test2")
    public String test2() {
        System.out.println("執行 test2 方法");
        return "hello test2";
    }
}


// MyInterceptor 
@Component
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("執行 MyInterceptor 的 preHandle 方法");
        return false;
    }
}


```

---

### Spring MVC總結
- Http 協議
    - 規定前後端之間的資料傳輸格式
        - Http Request
        - Http Response

- URL路徑的對應
    - URL格式
    - @RequestMapping

- 結構化的呈現數據
    - Json的格式
    - @RestController、@Controller + @ResponseBody

- Http method
    - GET
    - POST

- 取得請求參數的方法
    - @RequestParam
    - @RequestBody
    - @RequestHeader
    - @PathVariable

- 如何設計 RESTful API
    - REST風格：簡化溝通成本

- 實作 RESTful API
    - @GetMapping
    - @PostMapping

- 驗證請求參數的方法
    - @NotNull、@NotBlank、@NotEmpty
    - @Valid、@Validated

- 常見的Http狀態碼
    - 依照首位數字分成五大類
    - ResponseEntity<>

- Controller層統一的Exception處理
    - @ControllerAdvice + @ExceptionHandler
    - 底層使用Spring AOP機制

- 攔截器Interceptor
    - preHandle方法的返回值：true=允許通過，false=拒絕

---

### Spring JDBC、Spring Data JPA
- 簡介：如何操作資料庫
- Spring JDBC：在SpringBoot中執行原始的SQL語法，去操作資料庫
- Spring Data JPA：使用ORM的概念，透過操作Java object的方式，去操作資料庫

#### 使用IntelliJ 管理資料庫的數據
- 取代MySQL Workbench
    - new DataSource => MySQL

```
# SQL Console 

CREATE DATABASE myjdbc

CREATE table student (
    id INT PRIMARY KEY ,
    name VARCHAR(30)
)

# 新增
INSERT INTO student(id, name) value(1, 'Hubert')

# 查詢
SELECT * FROM student

# 更新
UPDATE student SET name = 'Adam' WHERE id = 1

# 刪除
DELETE FROM student WHERE id = 1

```

#### 資料庫連線設定

```
// pom.xml 新增設定 讓SpringBoot可以使用jdbc的功能
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

// pom.xml 新增設定 添加MySQL Driver讓SpringBoot可以連線到MySQL資料庫
// Google maven mysql
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>

// application.properties
// google database timezone
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/myjdbc?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=springboot

設定完之後運行SpringBoot Spring JDBC會自動創建 NamedParameterJdbcTemplate這個Bean

```

#### 使用NamedParameterJdbcTemplate(SpringBoot Bean) / INSERT、UPDATE、DELETE
- 根據sql語法分成兩類
    - update()可執行的SQL語法
        - INSERT
        - UPDATE
        - DELETE
    - query()、queryForObject()
        - SELECT

##### update(String sql, Map<String, Object> map) 基本用法
```
@RestController
public class StudentController {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @PostMapping("/students")
    public String insert(@RequestBody Student student) {

        String sql = "INSERT INTO student(id, name) VALUE (:studentId, :studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId", student.getId());
        map.put("studentName", student.getName());

        namedParameterJdbcTemplate.update(sql, map);

        return "執行 INSERT SQL";
    }

    @DeleteMapping("/students/{studentId}")
    public String delete(@PathVariable Integer studentId) {

        String sql = "DELETE FROM student WHERE id = :studentId";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId", studentId);

        namedParameterJdbcTemplate.update(sql, map);

        return "執行 DELETE SQL";
    }
}
```

##### update(String sql, Map<String, Object> map) 進階用法
- 當table 的 id會自動增加時，要如何去取得id的值
```
@PostMapping("/students")
    public String insert(@RequestBody Student student) {

        String sql = "INSERT INTO student(name) VALUE (:studentName)";

        Map<String, Object> map = new HashMap<>();
        map.put("studentName", student.getName());

        KeyHolder keyHolder = new GeneratedKeyHolder();

        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);

        int id = keyHolder.getKey().intValue();

        System.out.println("mysql 自動生成的 id 為： " + id);

        return "執行 INSERT SQL";
    }
```

- 要如何大量的執行一批 INSERT/UPDATE/DELETE sql

```

@PostMapping("/students/batch")
public String insertList(@RequestBody List<Student> studentList) {

    String sql = "INSERT INTO student(name) VALUE (:studentName)";

    MapSqlParameterSource[] parameterSources = new MapSqlParameterSource[studentList.size()];

    for(int i=0; i<studentList.size(); i++) {
        Student student = studentList.get(i);

        parameterSources[i] = new MapSqlParameterSource();
        parameterSources[i].addValue("studentName", student.getName());
    }

    namedParameterJdbcTemplate.batchUpdate(sql, parameterSources);

    return "執行一批 INSERT sql";
}

// 在update()內使用for迴圈也可達成一樣的效果，但是使用batchUpdate()效能較好
// 需要執行大量sql的時候，需考慮效能問題

for(int i=0; i<studentList.size(); i++) {
    Student student = studentList.get(i);

    Map<String, Object> map = new HashMap<>();
    map.put("studentName", student.getName());

    namedParameterJdbcTemplate.update(sql, map);
}


MapSqlParameterSource[] parameterSources = new MapSqlParameterSource[studentList.size()];

for(int i=0; i<studentList.size(); i++) {
    Student student = studentList.get(i);

    parameterSources[i] = new MapSqlParameterSource();
    parameterSources[i].addValue("studentName", student.getName());
}

namedParameterJdbcTemplate.batchUpdate(sql, parameterSources);

```

##### query(String sql, Map<String, Object> map, RowMapper<T'> rowMapper) 基本用法
- 第一個參數放的是要執行的sql語法
```
"SELECT id, name FROM student"
```
- 第二個參數放的是sql語法裡面變數的值
- 第三個參數 RowMapper 放的是將資料庫查詢出來的數據，轉變成Java object，最重要的參數
- 在寫SELECT sql時，不要使用*號
    - 會產生效能問題，會花費額外的網路流量
    - 無法提升資料庫查詢的速度
- RowMapper：一次只能取得一條row，無法取得到其他row的資訊
- ResultSetExtractor：一次可以取得到所有row的資訊，可以自由的組合不同row的數據

```
// StudentController
@GetMapping("/students")
public List<Student> select() {

    String sql = "SELECT id, name FROM student";

    Map<String, Object> map = new HashMap<>();

    List<Student> list = namedParameterJdbcTemplate.query(sql, map, new StudentRowMapper());

    return list;
}

// RowMapper
public class StudentRowMapper implements RowMapper<Student> {
    
    // 右鍵 Genertate implements 方法
    @Override
    public Student mapRow(ResultSet resultSet, int i) throws SQLException {

        Student student = new Student();
        student.setId(resultSet.getInt("id"));
        student.setName(resultSet.getString("name"));

        return student;
    }
}
```

#### query方法重點回顧
- 在SpringBoot裡寫SELECT sql時，不要使用*，要一一列舉想要查詢的column
- query方法永遠會回傳一個List
    - List裡面有可能有多筆數據、或是只有一筆數據、或是完全沒有任何數據
    - 取得List中的數據前，記得要先判斷內部是否有數據

- RowMapper
    - 用途：將資料庫查詢出來的數據，轉換成Java object
    - 可使用resultSet.getXxx(String column)取得column名字的值(推薦使用)
    - 可使用resultSet.getXxx(int index)取得第幾順位的column的值
    - resultSet所包含的column，就是SELECT sql中所查出來的那些column

- ResultSetExtractor
    - 和RowMapper用途一樣，只是比較強大，可以組合不同row之間的數據
    - 較少用


---

#### MVC架構模式 Controller-Service-Dao 三層式架構

##### 軟體工程(Software Engineering)
- 面對一個大型的系統，工程師們需要如何分工合作，一起去解決問題？
    - Git版本控制：管理多位工程師所寫的程式

##### MVC架構模式是軟體工程中的一種軟體架構
- 用途：將系統拆分成Model、View、Controller三個部分，每個部分各自負責不同的功能
- 好處
    - 職責分離，更容易維護程式
    - 使程式結構更直覺，有利於團隊分工
    - 可重複使用寫好的程式

##### MVC架構模式 in Spring Boot
- MVC架構模式是抽象的概念
- 實際套用到Spring Boot時，會轉化為Controller-Service-Dao三層式架構

#### Controller-Service-Dao三層式架構
```
前端發出Request => Controller接收並且驗證請求參數是否正確

Controller接收並且驗證請求參數是否正確 =Call=> Service負責業務邏輯

Service負責業務邏輯 =Call=> Dao(Data Access Object)負責和資料庫溝通(與資料庫存取數據)
```

##### 實作Controller-Service-Dao 三層式架構
```
// Controller
@GetMapping("/students/{studentId}")
public Student select(@PathVariable Integer studentId) {
    return studentService.getById(studentId);
}

// Service
@Component
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentDao studentDao;

    @Override
    public Student getById(Integer studentId) {
        return studentDao.getById(studentId);
    }
}

// Dao
@Component
public class StudentDaoImpl implements StudentDao{

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public Student getById(Integer studentId) {
        String sql = "SELECT id, name FROM student WHERE id = :studentId";

        Map<String, Object> map = new HashMap<>();
        map.put("studentId", studentId);

        List<Student> list = namedParameterJdbcTemplate.query(sql, map, new StudentRowMapper());

        if (list.size() > 0) {
            return list.get(0);
        } else {
            return null;
        }
    }
}
```

#### 交易 Transaction
- 交易(Transaction) 是資料庫的一種用法
- 用途：可以在一個交易裡包含多個資料庫操作，這些資料庫操作，要馬一起成功，要馬一起失敗
    - 也就是All or Nothing 原則
- Rollback(回滾)
    - 撤銷已執行的資料庫操作，確保數據恢復原狀

##### @Transactional
- 用法：加在class上或方法上(通常是加在方法上)
- 用途：使用交易來管理這個方法中的資料庫操作

```
@Component
public class MyService {
    
    @Transactional (Transaction加上al變成形容詞，形容這個方法是具有交易特性的)
    public void transfer() {
        //...
    }

}
```

#### 多個資料庫的連線設定
```
// application.properties
# 多個資料庫的連線設定
spring.datasource.test1.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.test1.jdbc-url=jdbc:mysql://localhost:3306/test1?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.test1.username=root
spring.datasource.test1.password=springboot

spring.datasource.test2.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.test2.jdbc-url=jdbc:mysql://localhost:3306/test2?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.test2.username=root
spring.datasource.test2.password=springboot

# 單個資料庫的連線方式
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/myjdbc?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=springboot

// DataSourceConfiguration
@Configuration
public class DataSourceConfiguration {

    // 連線到 test1 資料庫的 DataSource 和 NamedParameterJdbcTemplate
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.test1")
    public DataSource test1DataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public NamedParameterJdbcTemplate test1JdbcTemplate(
            @Qualifier("test1DataSource") DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }


    // 連線到 test2 資料庫的 DataSource 和 NamedParameterJdbcTemplate
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.test2")
    public DataSource test2DataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public NamedParameterJdbcTemplate test2JdbcTemplate(
            @Qualifier("test2DataSource") DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }
}

```

#### Spring Jdbc 總結
- 使用Intellij管理資料庫的數據
    - console編輯區
    - 圖形化介面

- 資料庫連線設定
    - 連線資訊寫在Spring Boot的設定檔 - application.properties裡面

- NamedParameterJdbcTemplate的用法
    - update() - 執行INSERT、UPDATE、DELETE sql
    - query() - 執行SELECT sql

- MVC架構模式
    - Model、View、Controller
    - 軟體工程：當很多工程師一起做很大的Project時，就很需要注重軟體工程
    - Controller-Service-Dao 三層式架構
        - Controller：負責接收Http Request、驗證請求參數
        - Service：負責業務邏輯
        - Dao：負責和資料庫溝通

---

### Spring Data JPA

#### 簡介
- Spring JDBC：執行原始的SQL語法，去操作資料庫
- Spring Data JPA：使用ORM的概念，透過操作Java object的方式，去操作資料庫

#### ORM
- 全名為Object-Relational Mapping
- 用途：將Java object，去對應到資料庫的table，所以對Java object的操作，就是對資料庫的操作

#### JPA
- 全名為Java Persistence API，定義要如何去操作資料庫
- JPA提供了很多註解讓我們使用，像是@Entity、@Table、@Column...
- Hibernate
    - 一種ORM框架，去實現JPA
    - 負責自動生成SQL語法

#### Spring JDBC VS Spring Data JPA
- Spring JDBC
    - 是以SQL為中心
    - 需要自己寫SQL語法，去操作資料庫
    - 開發效率較低
    - 效能較好
    - 可寫出較為複雜的SQL語法
    - 一開始比較難上手，但上手後就不會有什麼問題

- Spring Data JPA
    - JPA是以Java Object為中心
    - 不需要自己寫SQL語法，Hibernate會自動生成SQL語法去操作資料庫
    - 開發效率較高
    - 效能較差
    - 很難寫出複雜的查詢
    - 容易上手，但需要能妥善處理後續帶來的問題

#### 資料庫連線設定
```
// pom.xml 新增設定 讓SpringBoot可以使用data-jpa的功能
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

// pom.xml 新增設定 添加MySQL Driver讓SpringBoot可以連線到MySQL資料庫
// Google maven mysql
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>

// application.properties
// google database timezone
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/myjdbc?serverTimezone=Asia/Taipei&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=springboot

設定完之後運行SpringBoot Spring JDBC會自動創建 NamedParameterJdbcTemplate這個Bean

```

#### 第一個Spring Data JPA 程式
```
// Student Class 

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "name")
    String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

// StudentRepository interface
public interface StudentRepository extends CrudRepository<Student, Integer> {
    // ...
}

// StudentController
@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/students")
    public String insert(@RequestBody Student student) {

        studentRepository.save(student);

        return "執行資料庫的 Create操作";
    }
}

```

#### Spring Data JPA提供的Interface
- CrudRepository：基本的CRUD操作 => 最常用
- PagingAndSortingRepository：新增分頁和排序的操作 => extends CrudRepository
- JpaRepository：能力最強，新增了JPA相關的flush操作 => extends PagingAndSortingRepository

##### CrudRepository 基本用法
```
@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
        
    // CREATE
    @PostMapping("/students")
    public String insert(@RequestBody Student student) {

        studentRepository.save(student);

        return "執行資料庫的 Create操作";
    }
        
    // READ
    @GetMapping("/students/{studentId}")
    public Student read(@PathVariable Integer studentId) {

        Student student = studentRepository.findById(studentId).orElse(null);

        return student;
    }
    
    // UPDATE
    @PutMapping("/students/{studentId}")
    public String update(@PathVariable Integer studentId,
                         @RequestBody Student student) {

        Student s = studentRepository.findById(studentId).orElse(null);

        if (s != null) {
            s.setName(student.getName());
            studentRepository.save(s);

            return "執行資料庫的 Update操作";
        } else {
            return "Update失敗，數據不存在";
        }

    }
    
    // DELETE
    @DeleteMapping("/students/{studentId}")
    public String delete(@PathVariable Integer studentId) {

        studentRepository.deleteById(studentId);

        return "執行資料庫的 Delete操作";
    }


}
```

##### 自定義查詢條件 - findByXxx的命名規則
```
public interface StudentRepository extends CrudRepository<Student, Integer> {

List<Student> findByName(String name); 
=> SELECT * FROM Student WHERE name = ?(String name)
=> 返回的類型通常是返回Student或是List<Student>

Student findByIdAndName(Integer id, String name);
=> SELECT * FROM Student WHERE id = ? AND name = ?(Integer id, String name)

}
```

##### 原生SQL查詢 @Query
- 目的：用來解決findByXxx無法寫出複雜的查詢邏輯的問題
- 用途：在Spring Data JPA中，執行原生的SQL語法
- 用法：加在方法上

```
public interface StudentRepository extends CrudRepository<Student, Integer> {
    
    @Query(value = "SELECT id, name FROM student WHERE id = ?1 AND name = ?2, nativeQuery = true")
    Student test1(Integer id, String name);

}
```
- @Query vs findByXxx
    - 優先使用findByXxx的命名規則
    - 複雜的邏輯才使用@Query


##### Spring Data JPA 總結
- 建立ORM對應關係
    - @Entity
    - @Table、@Column、@Id

- CrudRepository的用法
    - save()：新增/修改
    - findById()：查詢
    - deleteById()：刪除

- 自定義查詢條件
    - findByXxx的命名規則
    - @Query執行sql語法

---

### 單元測試
- 目的：自動化測試程式的正確性
- 所謂單元測試，就是一次只測試一個功能點，一個單元(Unit)可以是一個method，或是一個API
- 其他軟體測試
    - 整合測試(Integration Testing)
    - 端對端測試(End-To-End Testing)
```
// pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

// class
public class Calculator {
    
    public int add(int x, int y) {
        return x + y;
    }
}

// test/classTest
public class CalculatorTest {

    @Test 
    public void test() {
        Calculator calculator = new Calculator();
        int result = calculator.add(1, 2);

        assertEquals(3, result);
    }
}

```

#### 單元測試的特性
- 可以被自動化運行
- 各個單元測試互相獨立，彼此之間不能有依賴關係
- 測試的結果是穩定的，不受外部服務影響

#### 單元測試的注意事項
- 測試的程式要放在test資料夾裡面
- 測試的class以「原class的名字加上Test做為結尾」來命名
- 測試的class的package，要跟原class的package保持一致

#### JUnit
- JUnit是Java單元測試的必備工具
- JUnit和SpringBoot的版本關係
    - SpringBoot版本 <= 2.1
        - 僅能使用JUnit4
    - SpringBoot版本 = 2.2、2.3
        - 能同時使用JUnit4和JUnit5
    - SpringBoot版本 >= 2.4
        - 僅能使用JUnit5
- 只要在方法上加上@Test，即可生成一個單元測試
    - 用法：加在方法上，可以生成一個單元測試，@Test只能在test資料夾底下使用，可以將該方法變成可執行的test case(測項)
    - 細節：方法必須是public void，並且沒有任何參數
##### JUnit5的Assert用法
- 若是不符合assert斷言的預期結果，則為測試失敗

| Assert            |   用途       | 
| -------------     | ----------- |
| assertNull(A)     | 斷言A為Null   |
| assertNotNull(A)  | 斷言A不為Null   |
| assertEquals(A, B)  | 斷言A和B相等，會使用equal()方法去判斷 |
| assertTrue(A)  | 斷言A為True   |
| assertFalse(A)  | 斷言A為False   |
| assertThrows(exception, method)  | 斷言執行method時，會噴出exception   |

##### JUnit5的其它用法
- @BeforeEach：、@AfterEach
    - @BeforeEach：在每次@Test開始前，都會執行一次
    - @AfterEach：在每次@Test結束後，都會執行一次
    - @BeforeAll：在所有@Test開始前，執行一次 / public static void
    - @AfterAll：在所有@Test結束後，執行一次 / public static void
    - @Disabled：忽略該@Test不執行
    - @DisplayName：自訂義顯示名稱

##### 撰寫Service層、Dao層測試
- @SpringBootTest、@Transactional
- 只要在測試的class上加上@SpringBootTest，則在運行單元測試時，SpringBoot就會去啟動Spring容器，創建所有的Bean出來

```
@SpringBootTest
public class DemoApplicationTests {
    
    @Autowired
    private StudentDao studentDao;
    
    @Test
    public void getById() {
        studentDao.getById(1);
    }
    
}
```
- @SpringBootTest：不只是創建bean，所有的@Configuration設定也都會被執行，效果等同於直接運行起SpringBoot程式
- @Transactional(for 單元測試)：單元測試運行完成之後，SpringBoot會去rollback這個單元測試裡面的所有資料庫操作
    - 用法：可以加在方法上、也可以加在class上
    - 用途：在單元測試結束後，rollback所有資料庫操作，將數據恢復原狀
    - 在main資料夾（正常程式）
        - 交易管理
        - 程式運行中途發生錯誤的話，才rollback已經執行的資料庫操作，將數據恢復原狀
    - 在test資料夾（單元測試）
        - 在該單元測試結束後，強制rollback所有執行的資料庫操作，將數據恢復原狀

##### 撰寫Controller層測試 - MockMvc主要架構
- 目的：模擬前端的行為，測試API是否運行正確
- 不能直接注入bean來測試，需要透過模擬真實的API call來測試
- MockMvc
    - 用途：模擬真實的API call
    - @SpringBootTest
    - @AutoConfigureMockMvc
```
@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getById() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/students/{studentId}, 3");
        
        // Builder設計模式（建造者模式）
        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().is(200));
    }
}
```

##### 撰寫Controller層測試 - MockMvc常用寫法
```
@SpringBootTest
@AutoConfigureMockMvc
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getById() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/students/{studentId}", 3)
                .header("headerName", "headerValue")
                .queryParam("graduate", "true");

        MvcResult mvcResult = mockMvc.perform(requestBuilder)
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.id", equalTo(3)))
                .andExpect(jsonPath("$.name", notNullValue()))
                .andReturn();

        String body = mvcResult.getResponse().getContentAsString();
        System.out.println("返回的 response body 為: " + body);
    }

    @Test
    public void create() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "  \"name\": \"Hank\",\n" +
                        "  \"score\": 14.6,\n" +
                        "  \"graduate\": false\n" +
                        "}");

        mockMvc.perform(requestBuilder)
                .andExpect(status().is(201));
    }
}
```

##### Mock測試 - Mockito
- 目的：避免為了測試某一個單元測試，而去構建了整個bean的dependency
- 做法：創造一個假的Bean，去替換掉Spring容器中原有的Bean
-
##### Mockito
- 在SpringBoot中進行Mock測試的工具
- 功能：
    - 模擬方法的返回值
        - when...thenReturn...
        - doReturn...when...
    - 模擬拋出Exception
        - when...thenThrow...
        - doThrow...when...
    - 紀錄方法的使用次數、順序
        - Mockito.verify(studentDao, Mockito.times(2)).getById(Mockito.any());
    - 限制：
        - 不能mock static方法
        - 不能mock private方法
        - 不能mock final class
- @MockBean：產生一個假的Bean，替換掉Spring容器中的Bean
    - 沒有定義的方法，預設返回null

```
@SpringBootTest
public class StudentServiceImplMockTest {

    @Autowired
    private StudentService studentService;

    @MockBean
    private StudentDao studentDao;

    @Test
    public void getById() {
        Student mockStudent = new Student();
        mockStudent.setId(100);
        mockStudent.setName("I'm mock");

        Mockito.when(studentDao.getById(Mockito.any())).thenReturn(mockStudent);
        Mockito.doReturn(mockStudent).when(studentDao).getById(Mockito.any());

        Student student = studentService.getById(2);
        assertNotNull(student);
        assertEquals(100, student.getId());
        assertEquals("I'm mock", student.getName());
    }
}
```
- SpyBean：Spring容器中的Bean仍舊是正常的bean，只替換其中幾個方法
    - 沒有定義的方法，預設使用真實的方法

##### 使用H2資料庫
- H2是一種嵌入式資料庫
- 用途：可以在啟動SpringBoot時被生成出來，在運行結束時被銷毀，用完即丟
- 常用在單元測試，降低程式對實體資料庫的依賴
    - 也就是說，任何一台電腦，不需要安裝任何軟體，都可以運行該單元測試
- 在test/resources中的application.properties需要和main/resources中的application.properties同步，不然運行測試會失敗
- 在test/resources中新增schema.sql、data.sql，並且添加SQL語法
```
// application.properties setting
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=sa

// 如果是使用Spring Data Jpa的方式要另外添加這行
spring.jpa.hibernate.ddl-auto=none

// schema.sql + IF NOT EXISTS 避免H2資料庫重複創建Table
CREATE TABLE IF NOT EXISTS student (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(30),
     score DOUBLE,
     graduate BOOLEAN,
     create_date TIMESTAMP
);

// data.sql
INSERT INTO student (name, score, graduate, create_date) VALUES ('Amy', 90.3, true, '2021-09-01 10:20:33');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Rom', 34.6, false, '2021-08-10 17:21:14');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Judy', 100.0, true, '2021-09-05 12:19:48');
INSERT INTO student (name, score, graduate, create_date) VALUES ('Mike', 87.2, true, '2021-09-03 15:01:15');
```

##### Spring Boot補充特性
- Convention over Configuration（約定大於配置 || 慣例優於設定）
    - 不需添加任何設定，只要知道運作規則，就能直接使用
    - 所有project遵循一致的標準化設定
- Spring Boot出現的意義就是為了簡化Spring開發

##### 我們真的需要單元測試嗎
- 單元測試的數量不是越多越好
    - 單元測試也是程式，程式越多，就表示維護成本越高
    - 單元測試的重要程度＝影響使用者的程度，使用頻率越高的功能越需要單元測試
- 要加多少單元測試
    - 比如在金融業或是博弈業：能測多細就多細，有關金錢是很重要的
    - 在一般軟體業：
        - 使用MockMvc測試各API是否運作正常
        - 重要的Service層可以加一些專屬的單元測試
        - Dao層比較少測，但如果有複雜的sql語法，可以額外添加測試
##### 如何寫出好的單元測試
- 在寫單元測試時，要從使用者的角度去思考
    - 不要在實作完直接寫單元測試，可以沈澱一下再回頭寫，以免鑽牛角尖
- 一定要記得測試Error Case
    - 在測試getById方法時，可以測試當id不存在時怎麼處理？當id的長度超過限制怎麼處理？
    - 實作Error Handling是開發中最難的一部分
- 善用Run Test With Coverage，查看單元測試覆蓋的範圍
    - 不要為了單純提升測試覆蓋率而寫單元測試，而是要思考是否有哪些使用場景沒考慮到
    - 不要被數字迷惑，並不是一定要100%覆蓋率才是完美，要確保的是重要的功能有被測試到
- 如果測試中使用的@SpyBean過多，表示功能切分的不夠好
    - 盡量從功能面去區分Service，譬如說ProductService、OrderService、UserService
    - 和外部服務有關的API call，獨立成一個Service
        - 譬如說和Youtube有關的API call，就統一放在YoutubeService裏
    - 靠經驗多累積

##### 學單元測試的四個心裡階段
- 新手期：寫測試太花時間了，感覺沒什麼用，不如多解另外一個bug
- 被逼著寫期：公司開始要求測試覆蓋率，只能開始試著寫
- 領悟期：測試越寫越熟練，也測出越來越多bug，開始覺得寫測試真的有用
- 開導他人期：督促新進工程師寫測試，邁入正向循環

#### 測試驅動開發 Test-Driven Development
- 全稱 Test-Driven Development，常稱TDD
- 貫徹「先寫測試、再寫開發」的精神
- 大致上分五個步驟
    - 選擇一個功能，先寫單元測試
    - 單元測試失敗（紅燈）
    - 實作功能程式
    - 單元測試成功（綠燈）
    - 持續重構程式

#### 單元測試總結
- 單元測試的特性和注意事項
    - 可以被自動化運行
    - 單元測試彼此獨立
    - 測試結果穩定，不受外部服務影響
- Junit5用法
    - @Test
    - assert斷言方法
    - @BeforeEach、@AfterEach、@BeforeAll、@AfterAll
    - @Disabled、@DisplayName
- 如何測試Spring Boot程式
    - Service、Dao層的測試
        - @SpringBootTest
        - @Transaction
    - Controller層的測試
        - MockMvc
        - 主架構：RequestBuilder、mockMvc.perform()、andExpect()
- 隔絕外部服務的依賴
    - Mock測試 - Mockito
        - @MockBean、@SpyBean
        - 模擬方法的返回值：when...thenReturn、doReturn...when
        - 模擬噴出Exception：when...thenThrow、doThrow...when
    - 使用H2資料庫
        - schema.sql：放創建table的sql
        - data.sql：放插入數據的sql
- 前輩經驗談
    - 單元測試的數量不是越多越好
    - 記得要測試Error Case
    - 善用Intellij的Run Test With Coverage功能
- 測試驅動開發
    - Test-Driven Development（TDD）
    - 先寫測試、再寫開發


---

### Spring 常用功能

#### Maven
- Maven是在SpringBoot開發中，負責Library管理和Project構建的工具

##### Maven - Library管理
- 用途：管理這個SpringBoot project可以使用哪些功能
- 用法：透過pom.xml檔案進行管理

##### Maven - Project構建
- 用途：對SpringBoot project進行編譯、測試、運行、清理、打包
- 用法：透過maven指令操作

##### Maven Repository（Maven倉庫）
- 用途：儲存SpringBoot project依賴的Library（jar檔）
- 可以分為Local Repository（本地倉庫）和Remote Repository（遠端倉庫）

##### Maven指令
- Clean：刪除src底下的target資料夾
- Compile > Test > Package > Install > Deploy

#### 針對不同環境做不同的設定
```
application-dev.properties
application-test.properties

Intellij右上角設定 > Active profiles:dev / test
```

#### Log的級別與規範
```
private final static Logger log = LoggerFactory.getLogger(StudentController.class);

log.info("取得 student {}", studentId);
log.warn();
log.error();
```

#### Json字串和Java Object互相作轉換
##### ObjectMapper
- 用途：將Json字串和Java Object互相作轉換
- 使用條件：只要確保pom.xml中有加上spring-boot-starter-web即可
- 用法：
    - writeValueAsString()：Java Object -> Json字串
    - readValue()：Json字串 -> Java Object
```
// 過濾掉null的key
@JsonInclude(JsonInclude.Include.NON_NULL)

// 在Json字串轉換成User的過程中，發現有一些key不存在的話，就忽略
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    Integer id;
    String name;

    // 將現有變數對應到名字如有不同的key上
    @JsonProperty("contact_email")
    String contactEmail;

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

#### 在SpringBoot中發起Http請求 - RestTemplate
- RestTemplate
    - 用途：在SpringBoot中，發起一個REST風格Http請求
        - 即是可以發起GET、POST、PUT、DELETE的Http請求
        - 並且可以將收到的reponse body中的Json字串，轉換成Java object
    - 使用條件：只要確保pom.xml中有加上spring-boot-starter-web即可

```
@RestController
public class RestTemplateController {

    @GetMapping("/getForObject")
    public String getForObject() {

        RestTemplate restTemplate = new RestTemplate();

        Student student = restTemplate.getForObject(
                "https://mocki.io/v1/7eda2b1b-d2a8-408e-a228-0cfe6bd6bec6",
                Student.class);

        System.out.println("Student 的 id 值為: " + student.getId());
        System.out.println("Student 的 name 值為: " + student.getName());
        System.out.println("Student 的 phone 值為: " + student.getContactPhone());


        return "getForObject success";
    }


    @GetMapping("/getForObjectWithParam")
    public String getForObjectWithParam() {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> queryParamMap = new HashMap<>();
        queryParamMap.put("graduate", true);

        Student student = restTemplate.getForObject(
                "https://mocki.io/v1/77f69435-224e-4c90-b7cd-53f07bbf5604",
                Student.class,
                queryParamMap
        );

        return "getForObject with param success";
    }


    @GetMapping("/getForEntity")
    public String getForEntity() {
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Student> studentEntity = restTemplate.getForEntity(
                "https://mocki.io/v1/b7a68eb2-f77c-43cf-bffe-8c647e9a2514",
                Student.class
        );

        System.out.println("http 狀態碼為: " + studentEntity.getStatusCode());

        Student student = studentEntity.getBody();

        System.out.println("student 的 id 值為: " + student.getId());
        System.out.println("student 的 name 值為: " + student.getName());
        System.out.println("student 的 phone 值為: " + student.getContactPhone());

        return "getForEntity success";
    }


    @GetMapping("/postForObject")
    public String postForObject() {
        RestTemplate restTemplate = new RestTemplate();

        Student studentRequestBody = new Student();
        studentRequestBody.setName("John");

        Student result = restTemplate.postForObject(
                "https://mocki.io/v1/b7a68eb2-f77c-43cf-bffe-8c647e9a2514",
                studentRequestBody,
                Student.class
        );

        return "postForObject success";
    }

    @GetMapping("/postForEntity")
    public String postForEntity() {
        RestTemplate restTemplate = new RestTemplate();

        Student studentRequestBody = new Student();
        studentRequestBody.setName("John");

        ResponseEntity<Student> responseEntity = restTemplate.postForEntity(
                "https://mocki.io/v1/b7a68eb2-f77c-43cf-bffe-8c647e9a2514",
                studentRequestBody,
                Student.class
        );

        return "postForEntity success";
    }


    @GetMapping("/exchange")
    public String exchange() {

        RestTemplate restTemplate = new RestTemplate();

        // 使用 exchange 發起 GET 請求
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("header1", "123");

        HttpEntity requestEntity = new HttpEntity(requestHeaders);

        Map<String, Object> queryParamMap = new HashMap<>();
        queryParamMap.put("graduate", true);

        ResponseEntity<Student> getStudentEntity = restTemplate.exchange(
                "https://mocki.io/v1/b7a68eb2-f77c-43cf-bffe-8c647e9a2514",
                HttpMethod.GET,
                requestEntity,
                Student.class,
                queryParamMap
        );



        // 使用 exchange 發起 POST 請求
        HttpHeaders requestHeaders2 = new HttpHeaders();
        requestHeaders2.set("header2", "456");
        requestHeaders2.setContentType(MediaType.APPLICATION_JSON);

        Student studentRequestBody = new Student();
        studentRequestBody.setName("John");

        HttpEntity requestEntity2 = new HttpEntity(studentRequestBody, requestHeaders2);

        ResponseEntity<Student> postStudentEntity = restTemplate.exchange(
                "https://mocki.io/v1/b7a68eb2-f77c-43cf-bffe-8c647e9a2514",
                HttpMethod.POST,
                requestEntity2,
                Student.class
        );

        return "exchange success";
    }
}
```

#### 前端模板引擎 - Thymeleaf
- 用途：SpringBoot中的前端模板引擎，支援Html頁面的開發和渲染
- 使用條件：在pom.xml中加上spring-boot-starter-thymeleaf
- 其他常見SpringBoot前端模板引擎
    - JSP
    - Freemarker


#### Intellij的Debug用法
##### Debug模式
- 用途：
    - 可以新增斷點，一行一行的執行程式
    - 可以馬上知道運行中的變數的值

##### Intellij的實用技巧
- 第一類：一定要背的
- 第二類：學了可以有效去提高開發效率的
    - 刪除多餘的import：Ctrl + Option + O
    - 如何快速美化程式排版：Command + Option + L
    - 查詢某個class或是檔案在哪裡：Shift連續按兩下
- 第三類：有趣的，不學也不會怎樣的


### Lombok
- 用途：透過添加註解去自動生成對應的程式，讓程式碼變得更簡潔
- 使用條件：
    - 在pom.xml中加上lombok
    - 在Intellij中安裝lombok插件
```
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Student {

    Integer id;
    String name;
}


@Data -> 包含許多方法
public class Student {

    Integer id;
    String name;
}

@RestController
public class StudentController {

    @GetMapping("/test")
    public Student test() {
        Student student = new Student();
        student.setId(1);
        student.setName("Hubert");

        return student;
    }
}
```
