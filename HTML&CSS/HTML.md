## HTML简介
超文本标记语言(Hyper Text Markup Language)
- “超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。
- 超文本标记语言的结构包括“头”部分（Head）、和“主体”部分（Body），其中“头”部提供关于网页的信息，“主体”部分提供网页的具体内容。
    ```html
    <!doctype html>
    <html lang="en">
    <head> 
        <meta charset="UTF-8">
        <title>Document</title>
        <link rel="stylesheet" href="xxx.css">
        <style></style>
    </head>
    <body>
        <div></div>
    </body>
    </html>
    ```
    
## HTML标签
- 闭合标签 如`<p></p>`
- 空标签（自闭合标签）如`<br/>`

## HTML标签属性
```html
<img src="" alt="我是图片" title="我是图片标题">
<!-- alt 图片加载失败或丢失时，图片的描述说明文字
     title 鼠标移动到图片上的文字描述
-->

<a href="#" target="_blank"></a>
<!-- target="_self" 在当前窗口打开链接地址
     target="_blank" 在新窗口打开链接地址
-->
<a href="javascript::" target="_blank"></a>
<!-- href="javascript::" 把a标签默认链接跳转的行为给禁止掉
-->
```

## 常用的标签元素
http://www.w3school.com.cn/html/html_elements.asp
##### A 
- `<!-- -->` 注释
- `<!DOCTYPE>` 文档类型
- `<a>` 链接跳转

**HTML5**
- `<article>` 文章
- `<aside>` 页面内容之外的内容
- `<audio>` 声音内容之外的内容

##### B
- `<body>` 网页主体 
- `<b>` 加粗 
- `<br/>` 换行 
- `<button>` 按钮 
- `<big>` 变大 

##### C
- `<canvas>` 画布（HTML5） 
- `<caption>` 定义table表格的标题 
- `<col>` 
- `<colgroup>` 

##### D
- `<div>` 划分块结构
- `<dl>` `<dt>`  `<dd>` 定义列表
- `<datalist>` 下拉列表

##### E
- `<em>` 斜体
- `<embed>` 定义外部交互内容或插件（HTML5）.swf

##### F
- `<form>` 表单
- `<frame>` 
- `<footer>` 
- `<figure>` `<figcaption>` 图文的组合（HTML5）
```html
<figure>
    <img src="" alt="">
    <figcaption>我是说明</figcaption>
</figure>
```

##### H
- `<head>` 网页的头部
- `<H1>`-`<H6>` 标题
- `<hr>` 水平线
- `<html>` 根元素
- `<header>` 页面的头部

##### I
- `<i>` 斜体
- `<img>` 插入图片
- `<input>` 表单元素
    - `<input  type='text'>` 文本
    - `<input  type='password'>` 密码

##### L
- `<label>` 和input一起使用
- `<li>`
    - `<ul> <li>` 无序列表
    - `<ol> <li>` 有序列表
- `<link>` 外链式

##### M
- `<meta>` 元信息 编码 关键词 描述 视口...
- `<menu>` 菜单
- `<map>` 图像
- `<mark>` 标记（HTML5）
- `<meter>` 进度（HTML5）

##### N
- `<nav>` 导航（HTML5）

##### O
- `<ol> <li>` 有序列表
- `<option>`
    - `<select> <option>` 下拉列表
- `<object>`

##### P
- `<p>` 文字段落
- `<progress>` 进度条（HTML5）

##### S
- `<s>` 中划线
- `<span>` 定义小块 小图标
- `<style>` 内嵌式标签
- `<strong>` 加粗
- `<select> <option>` 下拉列表
- `<small>` 变小
- `<sup>` 上标
- `<sub>` 下标
- `<section>` 相当于div 用来划分块（HTML5）


##### T
- `<title>` 网页的标题
- `<table>` 单元表格 `<th>` `<tr>` `<td>` `<thead>` <tbody>` `<tfoot>` 
- `<time>` 时间（HTML5）
- `<textarea>` 多行文本

##### U
- `<ul> <li>` 无序列表
- `<u>` 下划线标签


##### V
- `<video>` 视频播放器



## 行内元素 & 块级元素
##### 行内元素 
通常用来进行文字、小图标（小结构）的搭建

`<a>` `<button>` `<big>` `<small>` `<datalist>` `<em>` `<i>` `<input>` `<mark>` `<span>` `<select>` `<option>` `<strong>` `<b>` `<sup>` `<sub>` `<textarea>` `<u>` 
1. 不独占一行
2. 排列方式：从左往右
3. 设置宽高不起作用 如要起作用，需转换为块/行内块元素`display:block`/`display:inline-block`
4. 不设置宽高是元素本身内容的宽高
5. 天生自带`display:inline`
6. 行内元素里不能嵌套块级元素（特殊`<a>`）

##### 块级元素 
通常使用块级元素来进行大布局（大结构）的搭建

`<table>` `<form>` `<dl>` `<dt>` `<dd>` `<figure>` `<figcaption>` `<div>` `<h1>`-`<h6>` `<hr>` `<ul>` `<ol>` `<li>` `<nav>` `<p>` 
1. 独占一行
2. 排列方式：从上往下
3. 可以设置宽高以及盒子模型的其它属性
4. 不设置宽高的情况下 宽度是父元素的宽度 高是本身内容的高度
5. 天生自带`display:block`
6. 块级元素可以嵌套行内元素
7. ul ol 下面只能是li  dl 下面只能是 dt dd
8. p 里不能嵌套任何的块级元素 包括它自己本身

##### 行内块元素 
`<img>` `<input>`
1. 天生自带`display:inline-block`




## 标签语义化
##### 为什么要遵循标签语义化
1. 利于SEO优化（即搜索引擎的抓取，搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重）
2. 在样式丢失的时候，可以比较好的呈现结构
3. 更好的支持各种终端，例如无障碍阅读和有声小说等
4. 有利于团队开发和维护，如果团队中都遵循W3C的这个标准，那么代码的差异就会缩小

##### 怎样遵循标签语义化
1. 尽量减少使用无意义的标签，例如`<span>`和`<div>`
2. 尽量不使用标签本生的css属性，例如`<b>`、`<font>`、`<s>`，如果需要这些样式，使用css样式来进行添加
3. 在需要强调的部分，使用`<strong>`、`<em>`，但是样式尽量使用css样式来描述
4. 表格搭建时，使用`<thead>表格头部</thead>`、`<tbody>表格身体</tbody>`、`<tfoot>表格尾部</tfoot>`
5. 列表搭建时，使用`<ul>无序列表</ul>`、`<ol>有序列表</ol>`、`<dl>定义列表</dl>`


