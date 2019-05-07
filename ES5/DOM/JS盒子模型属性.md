### JS盒子模型属性
在JS中通过相关属性可以获取（设置）元素的样式信息，这些属性就是盒子模型属性（基本上都是有关于样式的）

通过JS盒子模型属性获取值的特点：
- 获取的都是数字不带单位
- 获取的都是整数，不会出现小数（一般都会四舍五入，尤其是获取的偏移量）
- 获取的结果都是复合样式值（好几个元素样式组合在一起的值），如果只想获取单一的样式值（例如：只想获取padding），我们的盒子模型属性就操作不了了

**获取元素具体的某个样式值**
- [element].style.xxx 操作获取 只能获取所有写在元素行内上的样式
- 获取当前元素所有经过浏览器计算的样式
    - 标准浏览器（IE9+）window.getComputedStyle([element],[伪类，一般都写null]) 获取到当前元素所有被浏览器计算过的样式（对象）
    - IE6～8 [element].currentStyle 获取经过计算的样式
    
```javascript
/**
* 获取当前元素的某一个样式属性
* @param curEle 
* @param attr
* @returns {string}
*/
let getCss = function(curEle, attr) {
    if (typeof window.getComputedStyle === undefined) {
        // throw new SyntaxError(); // 抛出语法错误
        return;
    }
    let val = window.getComputedStyle(curEle, null)[attr],
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i;
    reg.test(val) ? val = parseFloat(val) : null;
    return val;
}
console.log(getCss(fakebox,'border')); //-> "1px solid rgba(0, 0, 0, 0)"

/**
* 设置当前元素的某一个样式属性
* @param curEle
* @param attr
* @param val
*/
let setCss = function(curEle, attr, val) {
    curEle.style[attr] = val;
}

/**
* 批量设置当前元素的样式属性
* @param curEle
* @param options
*/
let setGroup = function(curEle, options = {}) {
    for (let attr in options) {
        if (options.hasOwnProperty(attr)){
             setCss(curEle, attr, options[attr]);
        }
    }
}
setGroup(fakebox, {
    width: 400,
    height: 60,
    padding: 30
})


/*let css = function(...arg) {
    let len = arg.length;
    if (len >= 3) {
        setCss(...arg);
        // setCss.apply(null,arg);
        return;
    }
    if (len === 2 && typeof arg[1] === 'object' && arg[1] !== null) {
        setGroup(...arg);
        return; 
    }
    return getCss(...arg);
}*/

let css = function(...arg) {
    let len = arg.length,
        second = arg[1],
        fn = getCss();
    len >= 3 ? fn = setCss :null;
    len === 2 && (second instanceof Object) ? fn = setGroup : null;
    return fn(...arg);
}


```





#### client
top left width height
1.clientWidth & clientHeight 获取当前元素`可视区域`的宽高（内容的宽高+padding）
    - 和内容是否有溢出无关，就是我们自己设置的内容宽高+padding
   
获取当前页面一屏幕（可视区域）的宽高
- document.documentElement.clientWidth || document.body.clientWidth
- document.documentElement.clientHeight || document.body.clientHeight

2. clientTop & clientLeft 获取（上/左）边框的宽度

#### offset
top left width height parent
1. offsetWidth & offsetHeight 在client的基础上加上border
2. offsetParent 当前盒子的父级参照物
3. offsetTop & offsetLeft 获取当前盒子距离其父级参照物的偏移量
> 参照物：同一个平面中，元素的父级参照物和结构没有必然联系，默认它们的父级参照物都是body(当前平面最外层的盒子) body的父级参照物是null
> 参照物可以改变：构建出不同的平面即可（使用zIndex，但是这个属性只对定位有作用），所以改变元素的定位(position:relative/absolute/fixed)可以改变其父级参照物
#### scroll
top left width height
1.scrollWidth & scrollHeight 真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+padding，而且是一个约等于的值（没有内容溢出和client一样），不同的浏览器和overflow:hidden都会对最后的结果产生影响

获取当前页面真实的宽高（包含溢出的部分）
- document.documentElement.scrollWidth || document.body.scrollWidth
- document.documentElement.scrollHeight || document.body.scrollHeight

2.scrollTop & scrollLeft 滚动条卷去的高度或者宽度

最小卷去值：0
最大卷去值：`document.documentElement.scrollHeight - document.documentElement.clientHeight || document.body.scrollHeight - document.body.clientHeight`

> 操作浏览器的盒子模型属性，一般都要写两套，用来兼容各种模式下的浏览器





