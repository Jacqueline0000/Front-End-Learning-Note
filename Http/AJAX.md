# AJAX基础知识
## 什么是AJAX
`async JavaScript and xml` 异步的JS和XML
- xml 可扩展的标记语言

    作用是用来存储数据的（通过自己扩展的标记名称清晰的展示出数据结构）

    > ajax之所以称之为异步的js和xml，主要原因是：最开始用ajax实现客户端和服务器端数据通信的时候，传输的数据格式一般都是xml格式的数据，我们把它称之为异步js和xml（现在一般是基于JSON格式来进行数据传输的）
    
- 异步的JS

    这里的异步不是说ajax只能基于异步进行请求（虽然建议都是使用异步编程），这里的异步特指的是**局部刷新**
    > 局部刷新 VS 全局刷新
    > 
    > 在非完全前后端分离项目中，前端开发只需要完成页面的制作，并且把一些基础的人机交互效果使用js完成即可，页面中需要动态呈现内容的部分，都是交给后台开发工程师做数据绑定和基于服务器进行渲染的
    >
    >**优势**
    >1. 动态展示的数据在页面的源代码中可以看见，有利于SEO优化推广（有利于搜索引擎的收录和抓取）
    >2. 从服务器端获取的结果就已经是最后要呈现的结果来，不需要客户端做额外的事情，所以页面加载速度快（前提是服务器端处理的速度够快，能够处理过来），所以类似京东、淘宝这些网站，首屏数据一般都是经由服务器端渲染的
    >
    >**弊端**
    >1. 如果页面中存在需要实时更新的数据，每一次想要展示最新的数据，页面都要重新的刷新一次，这样肯定不行
    >2. 都交给服务器端做数据渲染，服务器端的压力太大，如果服务器处理不过来，页面呈现的速度更慢（所以京东淘宝这类网站，除了首屏是服务器端渲染的，其它屏一般都是客户端做数据渲染绑定）
    >3. 这种模式不利于开发（开发效率低）
    
    ![](https://ws3.sinaimg.cn/large/006tNc79gy1g1xg1iohrhj312c0h642m.jpg)
    
    > 目前市场上大部分项目都是前后端分离的项目
    > 前后端完全分离项目，页面中需要动态绑定的数据是交给客户端完成渲染的
    > 1. 向服务器端发送AJAX请求
    > 2. 把从服务器端获取的数据解析处理，拼接成为我们需要展示的HTML字符串
    > 3. 把拼接好的字符串替换页面中某一部分的内容（局部刷新），页面整体不需要重新加载，局部渲染即可
    >
    >**优势**
    >1. 我们可以根据需求，任意修改页面中某一部分的内容（例如实时刷新），整体页面不刷新，性能好，体验好（所有表单验证、需要实时刷新的等需求都要基于AJAX实现）
    >2. 有利于开发，提高开发的效率
    >1) 前后端的完全分离，后台不需要考虑前端如何实现，前端也不需要考虑后台用什么技术，真正意义上实现了技术的划分
    >2) 可以同时进行开发：项目开始开发，首先制定前后端数据交互的接口文档（文档中包含了，调取哪个接口或者哪些数据等协议规范），后台把接口先写好（目前很多公司也需要前端自己拿NODE来模拟这些接口），客户端按照接口调取即可，后台再次去实现接口功能即可
    >**弊端**
    >1. 不利于SEO优化：第一次从服务器端获取内容中不包含需要动态绑定的数据，所以页面的源代码中没有这内容，不利于SEO收录，后期通过JS添加到页面中的内容，并不会写在页面的源代码中（是源代码，不是页面结构）
    >2. 交由客服端渲染，首先需要把页面呈现，然后再通过JS异步AJAX请求获取数据，然后数据绑定，浏览器再把动态增加的部分重新渲染，无形中浪费了一些时间，没有服务器端渲染页面呈现速度快
    
    ![](https://ws1.sinaimg.cn/large/006tNc79gy1g1xh6rc4sej30x40giwgo.jpg)
    
    
## 基于原生JS实现AJAX
```javascript
// => 1、创建一个AJAX对象
let xhr = new XMLHttpRequest(); // 不兼容IE6及更低版本浏览器（IE6: ActiveXObject）

// => 2、打开请求地址（可以理解为一些基础配置，但是并没有发送请求）
xhr.open([method], [url], [async], [userName], [userPassword]);

// => 3、监听AJAX状态改变，获取响应信息（获取响应头、获取响应主体信息）
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        let result = xhr.responseText; // 获取响应主体中的内容
    }
};

// => 4、发送AJAX请求（括号中传递的内容就是请求主体的内容）
xhr.send(null)
```

#### 分析第二步中的细节点
`xhr.open([method], [url], [async], [userName], [userPassword]);`

##### - HTTP请求方式
1. GET系列的请求（获取）
    - get
    - delete: 从服务器上删除某些资源文件
    - head: 只获取服务器返回的响应头信息（响应主体内容不需要获取）
    - ...
2. POST系列的请求（推送）
    - post
    - put: 向服务器中增加指定的资源文件
    - ...
    
不管哪一种请求方式，客户端都可以把信息传递给服务器，服务器也可以把信息返回给客户端，只是GET系列一般以获取为主（给的少，拿回来的多），而POST系列一般以推送为主（给的多，拿回来的少）
1. 获取一些动态展示的信息，一般使用GET请求
2. 表单提交时，一般使用POST请求

**GET系列请求和POST系列请求的区别**
1. GET请求传递给服务器内容一般没有POST请求传递给服务器的内容多

    原因：GET请求传递给服务器内容一般都是基于`URL地址问号传递参数`来实现的，而POST请求一般都是基于`设置请求主体`来实现的。各浏览器都有自己的关于URL最大长度的限制（谷歌：8kb、火狐：7kb、IE：2kb...）超过限制长度的部分，浏览器会自动截取掉，导致传递给服务器的数据缺失

    理论上POST请求通过请求主体传递是没有大小限制的，真实项目中为了保证传输的速率，我们也会限制大小（例如：上传的资料或图片都会做大小限制）
    
2. GET请求很容易出现缓存（这个缓存不可控：一般都不需要），而POST不会出现缓存（除非自己做特殊处理）

    原因：GET是通过URL问号传参传递给服务器信息，而POST是设置请求主体：
    - 设置请求主体不会出现缓存，但是URL传递参数就会了
    ```javascript
    // 每隔一分钟重新请求服务器端最新的数据，然后展示在页面中（页面中某些数据实时刷新）
    setTimeout(() => {
        $.ajax({
            url: 'getList?type=news',
            ...
            success: result => {
                // 第一次请求数据回来，浏览器间隔一分钟后，浏览器又发一次请求，但是新发送的请求，不管是地址还是传递的参数都和第一次一样，浏览器很有可能会把上一次数据获取，而不是获取最新的数据
            }
        });
    },60000)
    
    // 解决方案：在每一次重新请求的时候，在URL的末尾追加一个随机数，保证每一次请求的地址不完全一致，就可以避免是从缓存中读取的数据
    setTimeout(() => {
            $.ajax({
                url: 'getList?type=news?_=' + Math.random(),
                ...
                success: result => {
                   
                }
            });
        },60000)
    ```
    
2. GET请求没有POST请求安全（POST也并不是十分安全，只是相对安全）

    原因：还是因为GET是URL传参给服务器
    
    有一种比较简单的黑客技术：URL劫持，可以把客服端传递给服务器的数据劫持掉，导致信息泄露



##### - URL：请求数据的地址（API地址）
##### - ASYNC：异步（SYNC同步）默认TRUE
##### - 用户名和秘密
    这两个参数一般不用，如果请求的URL地址所在的服务器设定了访问权限，则需要我们提供可通行的用户名和密码才可以（一般服务器都是可以允许匿名访问的）


#### 第三部分细节
```javascript
// => 3、监听AJAX状态改变，获取响应信息（获取响应头、获取响应主体信息）
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        let result = xhr.responseText; // 获取响应主体中的内容
    }
};

```
##### - ajax状态码`xhr.readyState`：描述当前ajax操作的状态
- 0 UNSENT 未发送：只要创建一个ajax对象，默认值就是0
- 1 OPENED 我们已经执行了`xhr.open`这个操作
- 2 HEADERS_RECEIVED 当前ajax的请求已经发送，并且已经接收到服务器端返回的响应头信息了
- 3 LOADING 响应主体内容正在返回的路上
- 4 DONE 响应主体内容已经返回到客户端

##### - HTTP网络状态码`xhr.status`：记录了当前服务器返回信息的状态
- 200 成功，一个完整的HTTP事务完成

以3开头的一般都是成功，不过服务器做了一些特殊的处理
- 301 Moved Permanently 永久转移（永久重定向）

  一般应用于域名迁移
  
- 302 Moved Temporarily 临时转移（临时重定向，新的HTTP版本中任务307是临时重定向）

    一般用于服务器的负载均衡：当前服务器处理不了，把当前请求临时交给其它服务器处理（一般图片请求经常出现302，很多公司都有单独的图片服务器）

- 304 Not Modified 从浏览器缓存中获取数据

    把一些不经常更新的文件内容缓存到浏览器中，下一次从缓存中获取，减轻服务器压力，以提高页面加载速度

以4开头的一般都是失败，而且客户端的问题偏大
- 400 请求参数错误
- 401 无权限访问
- 403 请求不允许
- 404 访问地址不存在


以5开头的一般都是失败，而且服务器的问题偏大
- 500 Internal server error 未知的服务器错误
- 503 server unavailable 临时的服务器维护或者过载

##### - AJAX中其它的属性和方法
> 面试题：AJAX中有几个方法？

```javascript
let xhr = new XMLHttpRequest();
console.log(xhr);
```
**属性**
- `readyState`: 存储的是当前AJAX的状态码
- `response`/`responseText`/`responseXML`: 都是用来接收服务器返回的响应主体中的内容，只是根据服务器返回内容的格式不一样，我们使用不同的属性接收即可
    + `responseText`是最常用的，接收到的结果是字符串格式
    + `responseXML`偶尔会用到，如果服务器端返回的是XML文档数据，我们需要使用这个属性接收
- `status`: 记录了服务器端返回的HTTP状态码
- `statusText`: 对返回状态码的描述
- `timeOut`: 设置当前AJAX请求的超时时间，假设我们设置时间为3000(MS)，从AJAX请求发送开始，3秒后响应主体内容还没返回，浏览器会把当前AJAX请求任务强制断开

**方法**
- `abort()`: 强制中断AJAX请求
- `getAllResponseHeaders()`: 获取全部的响应头信息（获取的结果是一堆字符串文本）
- `getResponseHeaders(key)`: 获取指定属性的响应头信息，例如：`xhr.getResponseHeader('date')`获取响应头中存储的服务器的时间
- `open()`: 打开一个URL地址
- `overrideMimeType()`: 重写数据的MIME类型
- `send()`: 发送AJAX请求（括号中书写的内容是客户端基于请求主体把信息传递给服务器）
- `sendRequestHeader(key,value)`: 设置请求头信息（可以是设置的自定义请求头信息）

**事件**
- `onabort()`: 当AJAX被中断请求时触发
- `onreadystatechange()`: AJAX状态发生改变时触发
- `ontimeout()`: 当AJAX请求超时时触发
- ...

**应用**
```javascript
let xhr = new XMLHttpRequest();
xhr.open('get', 'temp.json?_=' + Math.random(), true);

// 设置请求头信息必须在open之后和send之前，请求头的内容不能出现中文汉字
xhr.setRequestHeader('cookie', 'xxx'); 

// 设置超时
xhr.timeout = 10;
xhr.ontimeout = () => {
    console.log('当前请求已超时');
    xhr.abort();
}

xhr.onreadystatechange = () => {
    let {readyState : state, status} = xhr;
    
    // 说明请求数据成功了
    if(!/^(2|3)\d{2}$/.test(status)) return;
    
    // 在状态为2时就可以获取响应头信息
    if(state === 2) {
        let headerAll = xhr.getAllResponseHeaders(),
            serverDate = xhr.getResponseHeader('date'); // 获取的服务器时间是格林尼治时间（和北京时间差8小时）
            serverDate = new Date(serverDate); // 转化为北京时间
        return;
    }
    
    // 在状态为4的时候响应主体内容就已经回来了
    if(state === 4) {
        let valueText = xhr.responseText, // 获取到的结果一般都是JSON字符串（可以使用JSON.parse()将其转化为JSON对象）
        valueXML = xhr.responseXML; // 获取到到结果是XML格式到数据
    }
};

xhr.send('name=xhh&age=2');
```

## JS中常用到编码解码方法
##### - 正常的编码解码（非加密）
1. `escape/unescape`: 主要就是把中文汉字进行编码和解码（一般只有JS语言支持，与经常应用于前端页面通信时到中文汉字解码）

2. `encodeURI/decodeURI`: 基本上所有的编程语言都支持

2. `encodeURIComponent/decodeURIComponent`: 和第二种方式类似，区别在于`encodeURI()`不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而`encodeURIComponent()`则会对它发现的任何非标准字符进行编码。

##### - 加密方式的编码解码
1. 可逆转加密（一般都是团队自己玩的规则）

2. 不可逆转加密（一般都是基于MD5加密完成的，可能会把MD5加密后的结果二次加密）

##  AJAX中的同步和异步
AJAX这个任务：发送请求接收到响应主体内容（完成一个完整的HTTP事务）
- xhr.send() 任务开始
- xhr.readyState===4 任务结束

**同步**
```javascript
let xhr = new XMLHttpRequest();
xhr.open('get', 'temp.json', false);
xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
}
xhr.send();
// 只输出一次 结果是4
```

![](https://ws2.sinaimg.cn/large/006tNc79ly1g23posjgvhj30p60i8q54.jpg)

**异步**
```javascript
let xhr = new XMLHttpRequest();
xhr.open('get', 'temp.json');
xhr.onreadystatechange = () => {
    console.log(xhr.readyState);
}
xhr.send();
// 输出3次 结果分别是2 3 4
```

![](https://ws3.sinaimg.cn/large/006tNc79ly1g23q2w6gjij30o60h076a.jpg)

## JQ中的AJAX
**JQ中AJAX的使用**
```javascript
$.ajax({
    url: 'xxx.txt', // 请求API地址
    method: 'get', // 设置请求方式GET/POS... 在老版本JQ中使用的是type，使用type和method实现的是相同的效果
    dataType: 'json', // dataType只是我们预设获取结果的类型，不会影响服务器的返回（服务器端一般返回的都是JSON格式字符串），如果我们预设的是json，那么类库中将把服务器返回的字符串转换为json对象
    cache: false, // 设置是否清除缓存，只对GET系列请求有作用，默认值是true不清缓存，手动设置为false，JQ类库会在请求URL的末尾追加一个随机数来清除缓存
    data: null, // 我们通过data可以把一些信息传递给服务器；GET系列请求会把DATA中的内容通过问号传参的方式传递给服务器，post 系列请求会把内容放在请求主体中传递给服务器；DATA的值可以设置为两种格式：字符串、对象，如果是字符串，设置的值是什么传递给服务器的就是什么，如果设置的是对象，JQ会把对象变为 xxx=xxx&xxx=xxx 这样的字符串传递给服务器
    async: true, // 设置是否异步，默认true异步
    success: function(result) {
       // 当AJAX请求成功（readyState === 4 && status是以2或3开头时）
    },
    error: function(msg) {
       // 请求错误触发回调函数
    },
    complete: function() {
       // 请求完成触发
    }
     
})
```

## 封装属于自己的AJAX类库
**支持的参数**
- url
- method/type
- data
- dataType
- async
- cache
- success
- ...







