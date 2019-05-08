#JQ的核心原理解读
```javascript
var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
};

jQuery.fn = jQuery.prototype = {
    jQuery: version,
    constructor: jQuery,
    ...
};
...
init = jQuery.fn.init = function(selector, context) {
    if (typeof selector==="string") {
        ...
    }else if (selector.nodeType) {
        ...
    }else if (jQuery.isFunction(selector)) {
        ...
    }
    return jQuery.makeArray(selector, this); //=> 返回的是一个类数组
}

init.prototype = jQuery.fn;
...
window.jQuery = window.$ = jQuery;
```



`$()` JQ选择器：基于各种选择器创建一个JQ实例（JQ对象）
1. selector 选择器的类型（一般都是字符串，但是支持函数或者元素对象）
2. context 基于选择器获取元素指定的上下文（默认document）

JQ对象：一个类数组结构（JQ实例），这个类数组集合中包含类获取到的元素

传递的selector支持三种格式：
- 字符串：就是我们所谓的选择器，能够通过选择器获取到元素
- 元素对象：把JS原生对象转换为JQ对象 
    - `$(body)` `$(body)[0]` `$(body).get(0)`
- 函数：表示等DOM结构加载完成再执行对应的JS代码（类似于window.onload）（目的：防止script代码放在了body前面）

```javascript
$(function() {
    //=> 当页面中当DOM结构加载完成，就会执行回调函数中的代码
    //=> 类似于window.onload: 等页面中等DOM结构以及资源文件都加载完成才会执行对应的JS代
});
$(document).ready(function() {
    //=> 和上面一样
});
```


> 1、`$(function(){})` 可在同一个页面中使用多次，多次都生效（所以在使用JQ完成代码的时候，我们一般都会把代码放在回调函数中：等到结构加载再执行，还形成类一个闭包）
> 原理：利用了DOM二级事件绑定（可以执行多次），监听的是DOMContentLoaded事件（DOM结构加载完成就会触发执行）
> 2、window.onload本身就是资源都加载完成才会执行，使用的是DOM零级事件绑定，在同一个页面中只能使用一次
> window.onload=function()...
> 只能留最后一个，最后一次赋值替换了原有赋值


```javascript
$ === jQuery; //=> true
$() === jQuery(); //=> false
$() instanceof jQuery; //=> true
console.log($('.tabBox'));
/**
* JQ对象（类数组）=> JQ实例
*   0: div.tabBox
*   length: 1
*   context: document
*   selector: '.tabBox'
*   
*   __proto__:jQuery.prototype
*       add
*       ...
*       __proto__:Object.prototype
*           hasOwnProperty
*           ...
*/
```

## jQuery即是一个类也是一个对象
jQuery.prototype上设置类很多的属性和方法，这些是供jQuery实例使用的属性和方法
- addClass
- css
- removeClass
- attr
- ... 

jQuery也是一个普通的对象，在对象上也有一些自己的属性和方法（和实例没有任何的关系），这些都是工具类的方法
- ajax
- isFunction
- unique
- ... 

### 筛选方法
- filter 同级过滤
- children 子集过滤
- find 后代过滤



