## css引入方式
- 行内式 通过`style`标签属性，将css键值对直接写入标签内
    ```html
    <p style="width: 100px;height: 100px;"></p>
    ```
    
- 内嵌式 通过`<style>`标签引入，通常`<style>`标签放置在`<head>`标签中
    ```html
    <head>
        <style>
        p{
            width: 100px;
            height: 100px;
        }
        </style>
    </head>
    ```

- 外链式 通过`<link>`标签将独立的css文件引入到html文件中
    ```html
    <link rel="stylesheet" type="text/css" href="xxx.css">
    ```

**外链式和导入式的区别**

`<link>`和`@import`虽然都是引入外部的css文件，但是它们是有天差地别的区别
- `<link>`是html标签，`@import`完全是css提供的方式，要写在css文件或者style标签中
- 加载顺序
    - 页面被加载时，`<link>`引用的css文件会被同时加载
    - `@import`引入的css文件会等页面全部下载完后再加载
- 当使用JavaScript控制`DOM`去改变css样式时，只能使用`<link>`标签，因为`import`是不能被DOM控制的

## css选择器
##### css伪类选择器
- a:link 没访问之前a的样式
- a:visited 已访问a的样式
- a:hover a鼠标移上的样式
- a:active a鼠标按下的样式

- input:focus 获取光标

**css3新增**
- `E:not(E:last-child)`  排除 `E:last-child`
- `E:last-child`  最后一个子元素
- `E:nth-child(n)`  n表示具体的第几个
    - `E:nth-child(odd)`  奇数
    - `E:nth-child(even)`  偶数
- `E:only-child`  只有一个元素时选中

##### css伪元素选择器
- `:first-line` 向文本首行设置特殊样式，只能用于块级元素
- `:first-letter` 向文本首字母设置特殊样式
- `:before` 在元素之前添加内容
- `:after` 在元素之后添加内容
```css
div:before, div:after{
content: '新加内容'; /* 这个属性不能省略 */
vertical-align: bottom; /* 基线对齐 使行内元素对齐*/
}
```

##### css选择器权重
!important > id > class > 标签 > *


## css中继承和无继承属性
##### 无继承的属性
- display
- 文本类 
    - vertical-align 垂直文本对齐
    - text-decoration 添加到文本的装饰
    - text-shadow 文本阴影
    - white-space 空白符处理
    - unicode-bidi 设置文本方向
- 盒子模型
- 背景类
- 浮动类
- 定位类

##### 可继承的属性
- 字体系列属性
- 文本系列属性 text-align line-height text-indent


## 盒子模型

![](https://ws1.sinaimg.cn/large/006tNc79gy1g25qyvczd5j30yu0h8jtx.jpg)

- content（width+height）
- padding
- border
- margin

**不切图片的情况下，如何制作箭头和小三角的形状**

三角箭头原理：
- 正方形任意相邻的两条边
- 旋转一定的角度，得到我们需要的任意方向的箭头

```html
<style>
    .arrow{
        width: 20px;
        height: 20px;
        border: 2px solid #000;
        /*background-color: tomato;*/
        display: inline-block;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
    }
</style>
<body>
<span class="arrow"></span>
</body>
```

小三角原理：
- 宽高为0，实现一个由四个小三角组成的正方形
- 把不需要的小三角颜色设置为`transparent`

```html
<style>
    .triangle{
                width: 0;
                height: 0;
                border-width: 20px;
                border-style: solid;
                border-color: tomato transparent transparent transparent;
                margin: 10px;
            }
</style>
<body>
<span class="triangle"></span>
</body>
```

**margin外边距的重叠问题**

面试题：一个盒子有上边距，另一个有下边距，会出现margin边距的重叠问题（并列盒子的margin重叠、双margin的重叠）
- 取大值，并不是它们相加之和，也就是谁大听谁的

**margin塌陷问题**

面试题：大盒子里面嵌套小盒子，给小盒子加`margin-top`值，不但没有实现大盒子和小盒子之间的间距，反而传递到大盒子身上，导致整体下移

解决：
- `overflow: hidden` 解决`margin-top`的传递问题
    ```html
    .parent{
            overflow: hidden
        }
    ```
    
- `padding-top: 1px` 
    ```html
    .parent{
        height: 99px;
        padding-top: 1px
    }
     ```
    
- `border-top: 1px solid;` 
    ```html
    .parent{
        height: 99px;
        border-top: 1px solid;
    }
     ```
     
- 给子元素的`margin-top`值改为给父元素加`padding-top`

```html
<head>
<style>
    .parent{
        width: 100px;
        height: 100px;
        background: tomato;
    }
    .child{
        width: 40px;
        height: 40px;
        background: lightcyan;
        margin: 30px;
    }
</style>
</head>
<body>
<div class="parent">
    <div class="child"></div>
</div>
</body>
```


![](https://ws4.sinaimg.cn/large/006tNc79ly1g25xju1v9lj30940igmxe.jpg)




## background
- `background-color` 背景颜色
- `background-image` 背景图片    
- `background-repeat` 背景重复
- `background-position` 背景定位 规定背景图片段起始位置(雪碧图)

    单位：px %(百分比) 方位(top、bottom、left、right、center)
- `background-attachment` 背景关联 设置背景图像是否固定或者随着页面的其余部分滚动
    - scroll 随页面滚动条滚动
    - fixed 固定不动（默认值）
    - inherit 从父元素继承
- `background-size` （HTML5）
    - px
    - 100%
    - auto 自动 背景图片原本的尺寸
    - cover 覆盖 背景图片会等比例拉伸 到完全覆盖盒子大小为止 会出现被拉伸 变虚
    - contain 背景图片会等比例拉伸 只要有一条边 触碰到盒子的任何一条边 就会停止缩放 会出现留白 
- `background-clip`（HTML5）背景裁剪
    - content-box
    - padding-box
    - border-box
- `background-origin`（HTML5）背景显示原点坐标
    - content-box
    - padding-box
    - border-box
    ```html
    <head>
        <style>
            .logo a{
                display: inline-block;
                width: 100px;
                height: 30px;
                background: #fff url("xxx.png") no-repeat center center fixed;
                background-size: auto;
                background-clip: content-box;
                background-origin: content-box;
                text-indent: -9999px; /* 首段缩进 */
            }
        </style>
    </head>
    <body>
    <h1 class="logo">
        <a href="">我是logo</a>
    </h1>
    </body>
    ```
    =
**雪碧图的使用**
```html
<head>
    <style>
        .logo a{
            display: inline-block;
            width: 100px;
            height: 30px;
            background: url("xxx.png") no-repeat;
            background-position:  -100px 0;
        }
    </style>
</head>
<body>
<h1 class="logo">
    <a href="">我是logo</a>
</h1>
</body>
```

## overflow的多个作用
**`overflow: hidden`的多种作用**
- overflow溢出隐藏
- 清除浮动
- 解决margin-top的传递问题

**多个元素在一行显示**
- `display: inline` 把元素转化为行内元素 

    但设置宽高属性不起作用
- `display: inline-block` 把元素转化为行内块元素 

    会受空格/换行键但影响 会有间距
    
    => 解决办法：
    - 去掉空格和换行键的影响 让标签全都在一行（不推荐 阅读性差）
    - 给父元素加`font-size: 0`（最佳解决方法）

- `float: left` / `float: right` 需要清浮动

    ```html
    <head>
        <style>
            .wrap{
                font-size: 0;
            }
            .content1, .content1{
                display: inline-block; /* 只兼容ie8+ */
                *display: inline; /* 在ie6 7下的解决办法 */
                *zoom: 1; /* 触发css hack的layout */
                font-size: 12px;
                background: tomato;
            }
        </style>
    </head>
    <body>
    <div class="wrap">
        <div class="content1">内容一</div>
        <div class="content2">内容二</div>
    </div>
    </body>
    ```

**单行文本出现省略号**
```html
<head>
    <style>
        h2{
            height: 30px;
            /* 单行文本出现省略号的必备条件 缺一不可 */
            width: 120px; /* 宽度 */
            overflow: hidden; /* 溢出隐藏 */
            white-space: nowrap; /* 强制文字不折行 */
            text-overflow: ellipsis; /* 文字隐藏的方式：以省略号隐藏 */
        }
    </style>
</head>
<body>
<h2>我是内容我是内容我是内容我是内容我是内容我是</h2>
</body>
```


**多行文本出现省略号(主要用在移动端)**
```html
<head>
    <style>
        h2{
            /* 多行文本出现省略号的必备条件 缺一不可 */
            width: 120px; /* 宽度 */
            display: -webkit-box; /* 弹性盒模型 */
            -webkit-box-orient: vertical; /* 元素的排列方式：垂直排列 */
            -webkit-line-clamp: 2; /* 文字的行数 */
            overflow: hidden; /* 溢出隐藏 */
        }
    </style>
</head>
<body>
<h2>我是内容我是内容我是内容我是内容我是内容我是</h2>
</body>
```

## 浮动
##### float元素的特点
- 浮动元素在一行显示
- 浮动元素会脱离文档流，导致下面没有浮动的元素识别不了它的高度，就会往上跑，占领浮动元素的位置
- 浮动元素自动具有块级元素的属性
- 父元素浮动 子元素不会继承父元素的浮动
- 浮动属性不能继承
- 所有元素都可以用浮动属性

##### 文档流 & 脱离文档流
- 文档流：元素排版布局的过程中，元素会自动从左往右，从上往下的流式排列
- 脱离文档流：文档流内的正常元素识别不到这个元素了（脱离文档流的元素相当于平行漂浮在文档流之上）

##### 浮动产生的影响
- 父元素高度为0

**清除浮动的方法**
- 给父元素添加一个固定高度（不推荐）
- 给父元素设置`overflow: hidden`/`overflow: auto`
- 在父元素结束标签之前加一个具有`块元素特点`的标签，给元素加一个`clear: both` `<divs style="clear: both"></div>`
- clearfix 伪元素清除浮动：

    ```html
    <head>
        <style>
            .clearfix:after{
                /* 利用伪元素清除浮动必备条件 */
                display: block; /* 确保元素是一个块级元素 */
                clear: both; /* 不允许左右两边有浮动对象 */
                content: ""; /* 伪元素:before和:after自带属性 如果不写伪元素不起作用 */
                
                 /* 写全的样式属性 下面的四个属性不是必备条件*/
                 height: 0; /* 防止低版本浏览器中height:1px的情况 */
                 font-size: 0;
                 overflow: hidden;
                 visibility: hidden;
            }
            .clearfix{
            *zoom: 1; /* css hack 兼容IE7 */
            }
            .left{
                float: left;
            }
            .right{
                float: right;
            }
        </style>
    </head>
    <body>
    <div class="header clearfix">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    </body>
    ```
    
**如何让元素消失**
- `display: none`
- `opacity: 0`
- `visibility: hidden`
- `height: 0;overflow:hidden`
- `line-height: 0;overflow:hidden`(没有设置高度的情况下)
- ...

**行内元素和块级元素的特点**


## 定位
##### 绝对定位 `position: absolute`
特点：
- 可以设置top、bottom、left、right四个方位值
- 绝对定位元素会脱离文档流
- 参照物：最近的一个父级定位元素（绝对定位 相对定位 固定定位） 优先选择相对定位`position: relative`
- 可以设置`z-index`

##### 相对定位 `position: relative`
特点：
- 不会脱离文档流
- 可以设置top、bottom、left、right四个方位值
- 参照物：为自己本身
- 可以设置`z-index`

`z-index`要和定位元素一起才起作用

##### 固定定位 `position: fixed`
特点：
- 会脱离文档流
- 可以设置top、bottom、left、right四个方位值
- 参照物：整个浏览器窗口
- 可以设置`z-index`
