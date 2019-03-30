### 指令
- **v-bind** 单项绑定 缩写 `:`
- **v-model** 双向绑定
- **v-on** 绑定事件 缩写 `@`
- **v-if** 条件
- **v-else-if**
- **v-else**
- **v-show** 基于 CSS 进行切换
- **v-for** 循环 eg：v-if=“item in items”
- **v-once** 绑定一次数据
- **v-html** 绑定html
- ****

### 命名规则
- 组件名
	* 定义： kebab-case(短横线分隔命名)  引用：kebab-case
	* 定义： PascalCase(首字母大写命名)
		+ 字符串模板引用：camelCase
		+ DOM引用：kebab-case
- prop
	* 定义： camelCase (驼峰命名法)	
		+ 字符串模板引用：camelCase || kebab-case
		+ DOM引用：kebab-case
- 事件名  始终使用kebab-case

### 组件化
- 注册组件
```javascript
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
	// todo-item 组件现在接受一个
	// "prop"，类似于一个自定义特性。
	// 这个 prop 名为 todo。
	props: ['todo'],
	template: '<li>{{ todo.text }}</li>'
})
```

- 使用组件
```
<ol>
	<!-- 创建一个 todo-item 组件的实例 -->
	<!--
    现在我们为每个 todo-item 提供 todo 对象
    todo 对象是变量，即其内容可以是动态的。
    我们也需要为每个组件提供一个“key”，稍后再
    作详细解释。
	-->
	<todo-item
		v-for="item in groceryList"
		v-bind:todo="item"
		v-bind:key="item.id">
	</todo-item>
</ol>
```

	```
	Vue.component('todo-item', {
	  props: ['todo'],
	  template: '<li>{{ todo.text }}</li>'
	})

	var app7 = new Vue({
	  el: '#app-7',
	  data: {
		groceryList: [
		  { id: 0, text: '蔬菜' },
		  { id: 1, text: '奶酪' },
		  { id: 2, text: '随便其它什么人吃的东西' }
		]
	  }
	})
	```
	
### 计算属性 computed
```
	<div id="example">
	  <p>Original message: "{{ message }}"</p>
	  <p>Computed reversed message: "{{ reversedMessage }}"</p>
	</div>
```

```
	var vm = new Vue({
	  el: '#example',
	  data: {
		message: 'Hello'
	  },
	  computed: {
		// 计算属性的 getter
		reversedMessage: function () {
		  // `this` 指向 vm 实例
		  return this.message.split('').reverse().join('')
		}
	  }
	})
```

### 侦听器 watch

### 生命周期（钩子函数）
- beforeCreate()
	- 1.此方法用不到
- created()
	- 2.获取ajax，初始化操作
- beforeMount() 此方法没有意义 
	- 3.要保证有el 
	- 4.如果有template属性，会用模版替换掉外部html，只要有此属性app中的内容就没有任何意义了，必须且只能有一个根元素
- mounted() 真实dom渲染完了，可以操作dom
	- 
- beforeUpdate() 
	- 一般用watch来替换掉
- updated()
	- 一般用watch来替换掉
- beforeDestory() 可以清除定时器，或者清除事件绑定
- destoryed()

### 组件
#### 分类
- 页面级组件：一个页面是一个组件
- 基础组件：将可复用的部分抽离出来
	- 提高开发效率
	- 方便重复使用
	- 便于协同开发
	- 更容易被管理和维护

#### 全局组件：
- 可以声明一次在任何地方使用
- 一般写插件的时候全局组件使用的多一些
- 一个对象可以看成一个组件
- data必须是函数
```
	vue.component('my-span', {
		template: `<span>my-soan</span>`,
		data() {
			
		}
		
	})
```

#### 局部组件
- 创建组件
- 注册组件
- 引用组件
```
	let myComponent = {template: `<span>my-soan</span>`};
	let vm = new Vue({
		el: '#app',
		component: {
			myComponent
		},
		data: {
			
		}
	})
```


### 路由
- 单页web应用
- 访问不同的路径，就可以返回不同的结果

### 模块
- esmodule
	- 如何定义模块（一个js就是一个模块）
	- 如何导出模块（export）
	- 如何使用模块（import）

### 先下载webpack
```
npm install webpack
```
> 安装webpack或者less最好不要安装全局的，否则可能导致webpack的版本差异
- 在package.json中配置一个脚本，这个脚本用的命令是webpack，会去当前的node_modules下找bin对应的webpack名字让其执行，执行的就是bin/webpack.js，webpack.js需要当前目录下有个名字叫webpack.config.js的文件，我们通过npm run build执行的目录是当前文件下的目录，所以会去当前目录下找。

### babel转义 es6 -> es5
- 安装babel
```
npm install babel-core --save-dev
npm install babel-loder --save-dev
```

### babel-preset-es2015
- 让翻译官拥有解析es6语法的功能
```
npm install babel-preset-es2015 --save-dev
```

### babel-preset-stage-0
- 解析es7语法
```
npm install babel-preset-stage-0 --save-dev
```

- 以上两条已修改为：
```
npm install babel-preset-env --save-dev
```

### 解析样式
- css-loder将css解析成模块，将解析的内容插入到style标签内(style-loder)
```
npm install css-loder style-loder --save-dev
```

### less,sass,stylus(预处理语言)
- less-loader less
- sass-loader sass
- stylus-loader stylus
```
npm install less less-loder --save-dev
```

### 解析图片
- file-loder url-loder(是依赖于file-loder的)
```
npm install file-loder url-loder --save-dev
```

### 需要解析html插件
- 插件的作用是以我们自己的html为模版，将打包后的结果自动引入到html中产出到dist目录下
```
npm install html-webpack-plugin --save-dev
```

### webpack-dev-server
- 这里面内置了服务，可以启动一个端口号，当代码更新时，可以自动打包（内存中打包），代码有变化就重新执行
```
npm install webpack-dev-server --save-dev
```

### 整个流程
```
npm i webpack webpack-dev-serve babel-core babel-loader@7 babel-preset-dev css-loader style-loader less less-loader file-loader url-loader html-webpack-plugin -D
```

### 安装vue-loader vue-template-compiler
- vue-loader解析.vue文件的
- vue-template-compiler用来解析vue模板的
```
npm install vue-loader vue-template-compiler --save-dev
```