## DOM基础
> DOM: document object model 文档对象模型
提供一些属性和方法可以让我们去操作DOM元素

### 获取DOM元素的方法
- document.getElementById 一个元素对象
- [context].getElementByTagName 元素集合
    - 可以自己指定上下文
    
- [context].getElementByClassName 元素集合
- document.getElementByName 节点集合
- document.body 获取整个body对象
- document.head 获取整个head对象
- [context].querySelector 一个元素对象
    - ie6-8不兼容 一般用于移动端
    - 性能没有document.getElementById好
- [context].querySelectorAll 获取元素集合
    - ie6-8不兼容 一般用于移动端
- ...

### DOM的节点
> node：节点，浏览器认为在一个html页面中的所有内容都是节点（包括标签、注释、文字文本等）

- 元素节点：html标签
- 文本节点：文字内容（高版本浏览器会把空格和换行也当作文本节点）
- 注释节点：注释内容
- document文档节点
- ...

`元素节点`
- nodeType: 1
- nodeName: 大写标签名（在部分浏览器等怪异模式下，我们写的标签名是小写，它获取的就是小写）
- nodeValue: null

[curEle].tagName: 获取当前元素的标签名（获取的标签名一般都是大写）

`文本节点`
- nodeType: 3
- nodeName: #text
- nodeValue: 文本内容

`注释节点`
- nodeType: 8
- nodeName: #comment
- nodeValue: 注释内容

`文档节点`
- nodeType: 9
- nodeName: #document
- nodeValue: null


> 节点是用了描述页面中每一部分之间关系的，只要获取页面中的一个节点，就可以通过相关方法获取到页面中的所有节点


`childNodes`
- 获取当前元素所有的子节点（节点集合：类数组）
- 注：不仅仅是元素子节点，文本、注释等都会包含在内


`children`
- 获取当前元素所有的元素子节点（元素集合）
- 注：在ie6-8下获取的结果和标准浏览器中有区别（ie-8中会把注释节点当作元素节点获取到）


`parentNode`
- 获取当前元素的父节点（元素对象 ）
- 注：在ie6-8下获取的结果和标准浏览器中有区别（ie-8中会把注释节点当作元素节点获取到）

`previousSibling nextSibling`
- previousSibling 获取当前节点的上一个哥哥`节点`（不一定是元素节点也可能是文本或者注释）
- nextSibling 获取当前节点的下一个弟弟`节点`

`previousElementSibling nextElementSibling`
- previousSibling 获取当前节点的上一个哥哥节`元素节点`
- nextSibling 获取当前节点的下一个弟弟`元素节点`
- ie6-8下不兼容
    ```javascript
    //获取上一个哥哥元素节点（兼容所有浏览器）
    function prev(curle) {
        var prevNode = curle.previousSibling;
        while (prevNode && prevNode.nodeType !== 1){
            prevNode = prevNode.previousSibling;
        }
        return prevNode;
    }
    ```
    ```javascript
    //获取下一个弟弟元素节点（兼容所有浏览器）
    function next(curle) {
        
    }
    ```
    ```javascript
    //获取所有的哥哥元素节点（兼容所有浏览器）
    function prevAll(curEle) {
        
    }
    ```
    ```javascript
    //获取所有的弟弟元素节点（兼容所有浏览器）
    function prevAll(curEle) {
        
    }
    ```
    ```javascript
    //获取当前元素在兄弟中的排名（兼容所有浏览器）
    function prevAll(curEle) {
        
    }
    ```

`firstChild lastChild`
- firstChild 当前元素所有子节点中的第一个（不一定是元素节点）
- lastChild 当前元素所有子节点中的最后一个

`firstElementChild lastElementChild`
- firstChild 当前元素所有元素子节点中的第一个
- lastChild 当前元素所有元素子节点中的最后一个
- ie6-8下不兼容

### DOM的增删改
`document.createElement`
- 在JS中动态创建一个HTML标签

`appendChild`
- 把当前创建的新元素添加到容器的末尾位置

`insertBefore`
- 容器.insertBefore(新元素, 老元素)
- 在当前容器中，把新创建的元素增加到老元素之前

`insertBefore`
- 容器.insertBefore(新元素, 老元素)
- 在当前容器中，把新创建的元素增加到老元素之前

> eg：解析URL地址每一部分的信息（包含问号传递的参数值）
1. 纯字符串拆分截取
2. 编写正则，捕获到需要的结果
3. 通过动态创建一个a标签，利用a标签的一些内置属性来分别获取每一部分的内容
> `a标签内置属性`
> * hash 哈希值 '#teacher'
> * hostname 域名 'www.123.cn'
> * pathname 请求资源的路径名称 '/stu/'
> * protocol 协议 'http:'
> * search 问号后传递的参数值，没传时是空字符串 'name=sj&age=25'
 

    ```javascript
        function UrlSearch() {
            let link = document.createElement('a');
            link.href = 'http://www.123.cn/stu/?name=sj&age=25#teacher'; // 需要解析的URL
            // link.href = decodeURI(location.href); //取得整个地址栏
        
            let search = link.search,
                obj = {};
            if(search.length === 0) return;
            search = search.substr(1).split(/&|=/g);
            for (let i=0;i<search.length;i+=2){
                let [key, value] = [search[i], search[i+1]];
                this[key] = value
            }
            link = null;
        }
    ```

 `removeChild`
 - 容器.removeChild(元素)
 - 在当前容器中把某一个元素移除掉
 
 `replaceChild`
 - 容器.replaceChild(新元素, 老元素)
 - 在当前容器中拿新元素替换老元素
 
 `cloneNode`
 - 元素.cloneNode(false/true)
 - 把原有元素克隆一份一模一样的
    - false 只克隆当前元素本身
    - true 把当前元素本身以及元素的所有后代都进行克隆
 
 `cloneNode`
 - 元素.cloneNode(false/true)
 - 把原有元素克隆一份一模一样的
    - false 只克隆当前元素本身
    - true 把当前元素本身以及元素的所有后代都进行克隆
    
 `[set/get/remove]Attribute`
 - 给当前元素设置/获取/移除 自定义属性
 - box.setAttribute('myIndex', 0)
 - box.getAttribute('myIndex')
 - box.removeAttribute('myIndex')
 > 使用xxx.index = 0 和 xxx.setAttribute('index', 0)的区别
 > - xxx.index 是把当前操作的元素当作一个普通对象，为其设置一个属性名（和页面中的HTML标签没关系）
 > - xxx.setAttribute 是把当前操作的元素当作特殊的元素对象来处理，设置的自定义属性是和页面结构中的DOM元素映射在一起的
 
 > JS中获取元素对象，我们可以理解为两种角色：
 > - 与页面HTML结构无关的普通对象
 > - 与页面HTML结构存在映射关系的元素对象
 
 > 元素对象中的内置属性，大部分都和页面的标签存在映射关系：
 > - xxx.style.backgroundColor = 'xxx' 此时不仅把JS对象对应的属性值改变了，而且也会映射到页面的HTML标签上（标签中有一个style行内样式、元素的样式改变了）
 > - xxx.className = 'xxx' 此时不仅把JS对象对应的属性值改变了，而且页面中的标签增加了class样式类（可以看见的）
 ---
 > - xxx.index = 0 仅仅是把JS对象中增加了一个属性名，和页面中的HTML没关系（`在结构上看不见，消耗性能低`）
  > - xxx.setAttribute 和内置属性差不多，可以呈现在结构上
 
 