### prototype
- Object.create(null) 没有原型，所以并不是所有的对象的顶层对象都是OBject

### 闭包
- 函数内再嵌套函数
- 参数和变量不会被垃圾回收机制回收
- 内部函数可以引用外层的参数和变量
- 闭包会导致原始作用域链不释放,造成内存泄漏

### 在 ECMAScript6 中，promise的状态有:
- Pending
- Fulfilled
- Rejected


### typeof
- typeof undefined  //"undefined"
- typeof Boolean()  //"boolean"
- typeof Symbol()  //"symbol"
- typeof String()  //"string"

- typeof Number()  //"number"
- typeof NaN  //"number"

- typeof Function()  //"function"

- typeof Array()  //"object"
- typeof Object()  //"object"
- typeof null  //"object"

- typeof  1; //'number'
- typeof (1); //'number'
- typeof (); //SyntaxError 语法错误

- void  0; //undefined
- void (0); //undefined
- void (); //SyntaxError 语法错误


### 数据类型
> - 原始值是存储在栈中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。
> - 引用值是存储在堆中的对象，也就是说，存储在变量处的值是一个指针，指向存储对象的内存处。
1. 基本数据类型（原始值）
    - Null
    - Undefined
    - Boolean
    - Number
    - String
    - Symbol (ECMAScript 6 新定义)

2. 复杂数据类型（引用值）
    - Object（Array、Function、Math、Date）



### this
- 当在函数调用的时候指向widow
- 当方法调用的时候指向调用对象
- 当用apply和call上下文调用的时候指向传入的第一个参数
- 构造函数调用指向实例对象

### ||
 - 短路或，也就是||前面为true的话就直接等于前面的值了，不会再看||后面
 
### ajax的事件`
 - ajaxComplete(callback) 
 - ajaxError(callback) 
 - ajaxSend(callback) 
 - ajaxStart(callback) 
 - ajaxStop(callback) 
 - ajaxSuccess(callback)
 
### Ajax与Flash对比
 - Ajax的优势：
    1. 可搜索性 
    2. 开放性 
    3. 费用 
    4. 易用性 
    5. 易于开发。
 - Flash的优势：
    1. 多媒体处理 
    2. 兼容性 
    3. 矢量图形 
    4. 客户端资源调度
 - Ajax的劣势：
    1. 它可能破坏浏览器的后退功能   
    2. 使用动态页面更新使得用户难于将某个特定的状态保存到收藏夹中 ，不过这些都有相关方法解决。
 - Flash的劣势：
    1. 二进制格式 
    2. 格式私有 
    3. flash 文件经常会很大，用户第一次使用的时候需要忍耐较长的等待时间  
    4. 性能问题

### DOM中的事件对象：（符合W3C标准）
- preventDefault() 取消事件默认行为
- stopImmediatePropagation() 取消事件冒泡同时阻止当前节点上的事件处理程序被调用。
- stopPropagation() 取消事件冒泡对当前节点无影响。
### IE中的事件对象：
- cancelBubble() 取消事件冒泡
- returnValue() 取消事件默认行为

### JavaScript全局函数
> JavaScript 中包含以下 7 个全局函数escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、parseInt( )、unescape( )。

>JavaScript中只有global全局对象，并没有window全局对象，window对象是浏览器厂商实现的，所以window对象下的setTimeOut方法不能算作JavaScript的全局函数。

### JavaScript内部对象


