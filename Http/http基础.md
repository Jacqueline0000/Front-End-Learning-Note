### HTTP介绍
HTTP协议（HyperText Transfer Protocol，超文本传输协议）：是用于从www服务器传输超文本到本地浏览器到传送协议

### 协议栈
##### HTTP在TCP/IP协议栈中的位置

| 应用层：HTTP |
|---|
|  传输层：TCP|
|  网络层：IP|
|  数据传输层|
|  物理链路层|

##### HTTP的工作过程
1. 客户端连接到Web服务器             
        `客户端 --------> 服务端`
2. 发送HTTP请求                     
        `客户端 --------> 服务端`
3. 服务器接受请求并返回HTTP响应       
        `客户端 <-------- 服务端`
4. 释放连接TCP连接                   
        `客户端`
5. 客户端浏览器解析HTML内容           
        `客户端`

### HTTP URL
格式 ：`http://host[:port][abs_path]`
- http: 通过HTTP协议来定位网络资源 
- host: 合法的Internet主机域名或IP地址（以点分十进制格式表示）
- post: 指定一个端口号，拥有被请求资源的服务器主机监听该端口的TCP连接（如果port是空，则使用缺省的端口80。当服务器的端口不是80的时候，需要显式指定端口号）
- abs_path: 指定请求资源的URI（Uniform Resource Identifier，统一资源定位符）

### URI、URL和URN
**URI（Uniform Resource Identifier）** 统一资源标识符，包括URL和URN

**URL（Uniform Resource Locator）** 统一资源路径地址，比如`http://www.baidu.com/index.html`就是一个URL  
> 对可以从互联网上得到的资源的位置和访问方法的一种简洁的表示，是互联网上标准资源的地址。互联网上的每个文件都有一个唯一的URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它
    
**URN（Uniform Resource Name）** 统一资源名称，它是无关物理位置的资源名定义，例子`urn:ieft:rfc:2141`
    > - 唯一标识一个实体的标识符，但是不能给出实体的位置。系统可以先在本地寻找一个实体，在它试着在Web上找到该实体之前。它也允许Web位置改变，然而这个实体却还是能够被找到。
    > - P2P下载中使用的磁力链接是URN的一种实现，它可以持久化的标识一个BT资源，资源分布式的存储在P2P网络中，无需中心服务器用户即可找到并下载它。
    
    
### HTTP事务
- 客户端传给服务器叫做请求（request）
- 服务器返回给客户端叫做响应（response）
- request+response统称为一个**HTTP事务（事务：一件完整端事情）**

**HTTP事务**
1. 当客户端向服务器端发送请求，此时客户端和服务器端会建立一个传输通道（链接通道），传输协议就是基于这个通道把信息进行传输端
2. 当服务器端接受到请求信息，把内容返回给客户端后，传输通道会自动销魂关闭

### HTTP报文
客户端和服务端传输端内容总称**HTTP报文**
1. 起始行
    - 请求行
    - 响应行
2. 首部（头）
    - 请求头：内置请求头、自定义请求头
    - 响应头：内置响应头、自定义响应头
    - 通用头：请求和响应都有的
3. 主体
    - 请求主体
    - 响应主体
> - 请求XXX都是客户端设置的信息，服务器端获取这些信息
> - 响应XXX都是服务器端设置的信息，客户端来接收这些信息

总结：

客户端传递给服务器端数据：
1. URL问号传递参数
2. 设置请求头
3. 设置请求主体
4. ...

服务器端返回给客户端内容：
1. 设置响应头（例如服务器时间）
2. 设置响应主体
3. ...

### 一个完整的URL包含的部分
#### 第一部分：传输协议
- http：超文本传输协议

    客户端和服务器端传输端内容除了文本以外，还可以传输图片、音视频等文件流(二进制编码/base64码)，以及传输xml格式的数据等，是目前市场上应用最广泛等传输协议
- https：http ssl

    它比http更加安全，因为数据内容的传输通道是经过ssl加密的（它需要在服务器端进行特殊端处理），所以涉及资金类的网站一般都是https协议的
    
- ftp：资源文件传输协议

    一般用于客户端把资源文件（不是代码）上传到服务器端，或者从服务器端下载一些资源文件（一般ftp传输的内容会比http这类协议传输的内容多）
    
- ...
    
#### 第二部分：域名
给不好记忆的服务器外网IP设置了一个好记忆的名字
- 顶级域名(一级域名): `qq.com`
- 二级域名: `www.qq.com`、`v.qq.com`、`sports.qq.com`
- 三级域名: `kbs.sports.qq.com`

#### 第三部分：端口号
在服务器发布项目的时候，我们可以通过端口号区分当前服务器上不同的项目

一台服务器的端口号取值范围：0～65535之间，如果电脑上安装了很多程序，有一些端口号是被占用了
- HTTP: 默认端口号80
- HTTPS: 默认端口号443
- FTP: 默认端口号21
    
对于上述三个端口号其实是很重要的，如果被其它程序占用，我们则不能使用了；所以服务器上一般是禁止安装其它程序的

#### 第四部分：请求资源文件的路径名称

在服务器中发布项目的时候，我们一般都会配置一些默认文档：用户即使不输入请求文件的名称，服务器也会找到默认文档（一般默认文档都是index/default）

我们通常为了做SEO优化，会把一些动态页面的地址（xxx.php、xxx.aspx、xxx.asp、xxx.jsp...）进行伪`URL重写`（需要服务器处理的）

#### 第五部分：问号传参
`?name=xhh&age=9...`

把一些值通过xxx=xxx的方式，放在一个URL的末尾，通过问号传参

**作用**
1. 在AJAX请求中，我们可以通过问号传递参数的方式，客户端把一些信息传递给服务器，服务器根据传递信息的不一样，返回不同的数据、

2. 消除AJAX请求中GET方式缓存
```javascript
$.ajax({
    url: 'xxx?_=0.123456',
    method: 'get'
});
// => 我们会在请求URL的末尾追加一个随机数 `_=随机数`，保证每一次请求的URL都是不一样的，以此来消除GET请求遗留的缓存问题
```

3. 通过URL传递参数的方式，可以实现页面之间信息的通信，例如：`<a href='game.html?id=xxxx'>`

#### 第六部分：HASH值
`\#xxx' URL末尾传递的#什么，就是HASH值（哈希值）

**作用**
1. 页面中锚点定位
1. 前端路由（SPA单页面开发）


### HTTP请求
客户端通过发送HTTP请求向服务器请求对资源的访问

HTTP请求由三部分组成，分别是：**请求行**，**请求头**，**请求体**。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1g1onybxe52j31600pi44t.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcgy1g1ontj2mzxj30bv0473yn.jpg)

##### 请求行
格式：`Method Request-URL HTTP-Version CRLF`
- Method 请求的方法
- Request-URL 请求的资源
- HTTP-Version 请求的HTTP协议版本
- CRLF 表示回车换行

##### 请求头
请求头包含若干个属性，格式为“属性名:属性值”，服务端据此获取客户端的信息
> 请求HTTP报文和响应HTTP报文都拥有若干个报文头属性，它们是为协助客户端及服务端交易的一些附属信息。

**常见的HTTP请求报文头属性**
- **Accept** 

    请求报文可通过一个`Accept`报文头属性告诉服务端 客户端接受什么类型的响应

  eg: `Accept:text/plain` (告诉服务端，客户端能够接受的响应类型仅为纯文本数据)
  
  **MIME类型（媒体类型）**
  
  Multipurpose Internet Mail Extension 多用途因特网邮件扩展
  ```
  html：text/html
  Ascii: text/plain
  Json:text/json
  Jpg:image/jpeg
  Gif:image/gif
  Ppt: application/vnd.ms-powerpoint
  Quicktime:video/quicktime
  ...
  ```
- **Cookie** 

    客户端的`Cookie`就是通过这个报文头属性传给服务端
    
    ```
    Cookie: $Version=1; Skin=new;jsessionid=5F4771183629C9834F8382E23BE13C4C  
    ```
    服务端通过HTTP请求报文头的Cookie属性的`jsessionid`的值判断多个请求是隶属于一个Session（也可以通过重写URL的方式将会话ID附带在每个URL的后面）
    
- **Referer**

    表示这个请求是从哪个URL过来的
    > 假如你通过google搜索出一个商家的广告页面，你对这个广告页面感兴趣，鼠标一点发送一个请求报文到商家的网站，这个请求报文的Referer报文头属性值就是`http://www.google.com`
    
- **Cache-Control**

    对缓存进行控制，如一个请求希望响应返回的内容在客户端要被缓存一年，或不希望被缓存就可以通过这个报文头达到目的。
    ```
    Cache-Control: no-cache  //让服务端将对应请求返回的响应内容不要在客户端缓存
    ```
- **Host** 请求主机名和端口号
- **User-Agent** 告诉服务端发起请求的应用程序的名称

- 其它请求报文头属性

    参见：http://en.wikipedia.org/wiki/List_of_HTTP_header_fields 

##### 请求体
**报文体** 将一个页面表单中的组件值通过param1=value1&param2=value2的键值对形式编码成一个格式化串，它承载多个请求参数的数据。不但报文体可以传递请求参数，请求URL也可以通过类似于“/chapter15/user.html? param1=value1&param2=value2”的方式传递请求参数

例如：`GET /test.html HTTP/1.1 (CRLF)`

### HTTP请求方法
- **GET** 用于请求服务器发送某个资源
- **POST** 用于向服务端提交数据，有主体(Form Data)
- **HEAD** 与GET类似，但在响应中只有首部，不返回具体数据，可以用来查看资源是否存在
- **DELETE** 用于删除服务端某个资源
- **TRACE** 用于跟踪某个请求
- **CONNECT**
- **OPTIONS** 用于查询服务端支持的方法
- **PUT** 用于向服务端写入文档

### HTTP响应
HTTP的响应报文也由三部分组成：**响应行**+**响应头**+**响应体**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1g1oqwk92f1j311k0im41d.jpg)

##### 响应行
**报文协议及版本**

**响应状态码**

和请求报文相比，响应报文多了一个`响应状态码`，它以`清晰明确`的语言告诉客户端本次请求的处理结果

- **1xx 信息类** 

    一般是告诉客户端，请求已经收到了，正在处理，别急...
- **2xx 处理成功** 

    一般表示：请求收悉、我明白你要的、请求已受理、已经处理完成等信息.
- **3xx 重定向到其它地方** 

    它让客户端再发起一个请求以完成整个处理。
- **4xx 处理发生错误，责任在客户端** 

    如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等。
- **5xx 处理发生错误，责任在服务端**
 
    如：服务端抛出异常，路由出错，HTTP版本不支持等。
    
**常见状态码**
- **200 OK**
- **303 See Other**
- **304 Not Modified** 标识请求的内容没有改变，可以使用缓存数据
- **403-Forbidden** 请求被服务端拒绝了，有可能是没有权限访问，也有可能是用户名密码错误
- **404 Not Found**
- **414-Request URI Too Long** 请求的URL太长了
- **500 Internal Server Error**

##### 响应头
**常见的HTTP响应报文头属性**
- **Cache-Control** 

    响应输出到客户端后，服务端通过该报文头属告诉客户端如何控制响应内容的缓存
    
- **ETag** 

    一个代表响应服务端资源（如页面）版本的报文头属性，如果某个服务端资源发生变化了，这个ETag就会相应发生变化。它是Cache-Control的有益补充，可以让客户端“更智能”地处理什么时候要从服务端取资源，什么时候可以直接从缓存中返回响应。
    
- **Location** 

    在JSP中让页面Redirect到一个某个A页面中
    
    其实是让客户端再发一个请求到A页面，这个需要Redirect到的A页面的URL，是通过响应报文头的`Location`属性告知客户端的，如下的报文头属性，将使客户端redirect到iteye的首页中： 
    ```
    Location: http://www.iteye.com  
    ```
    
- **Set-Cookie**

    服务端可以设置客户端的Cookie，其原理就是通过这个响应报文头属性实现的
    ```
    Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1  
    ```

##### 响应体
服务端返回数据

**参考文章**
- https://blog.csdn.net/u010256388/article/details/68491509
- https://www.cnblogs.com/coco-dot/p/6424446.html
- https://www.cnblogs.com/TomSnail/p/6078395.html