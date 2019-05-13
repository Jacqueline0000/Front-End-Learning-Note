~function (window) {
    class TabPlugin {
        constructor(container, options = {}) {
            //=> 第一个参数必传，而且传递的必须是元素对象（参数合法性验证）
            if (typeof container === 'undefined' || container.nodeType !== 1) {
                throw new SyntaxError('The first parameter must be passed, and it must be an element object');
            }

            //=> 参数初始化（初始化配置项）:把处理好的参数配置项尽可能的挂载到当前类的实例上，成为实例的私有属性，这样不仅在公共或者私有方法中可以直接获取使用，而且也保证每一个实例之间这些属性是不冲突的
            let {
                lastIndex = 0,
                eventType = 'mouseover',
                customPageClass = 'option',
                customContentClass = 'con',
                changeEnd
            } = options;
            ['lastIndex', 'eventType', 'customPageClass', 'customContentClass', 'changeEnd'].forEach(item => {
                this[item] = eval(item); //=> 挂载：把每一项当作实例的私有属性设置一下即可，我们通常说把属性挂载到实例上
            });

            this.container = container;
            let childs = [...container.children],
                option = null;
            option = childs.find(item => this.hasClass(item, customPageClass));
            this.optionList = option ? [...option.children] : [];
            this.conList = childs.filter(item => this.hasClass(item, customContentClass));
            // this.option = container.querySelector(customPageClass);
            // this.optionList = this.option.querySelectorAll('li');
            // this.conList = container.querySelectorAll(customContentClass);

            this.init();
        }

        init() {
            let {lastIndex, eventType} = this;
            this.handleOption();
            this.optionList[lastIndex][`on${eventType}`]();
        };

        /*==把公共方法挂载到类的原型上==*/
        hasClass(ele, str) {
            return ele.className.trim().split(/ +/).indexOf(str) >= 0;
        }

        addClass(ele, str) {
            if (this.hasClass(ele, str)) return;
            ele.className += ` ${str}`;
        }

        removeClass(ele, str) {
            if (!this.hasClass(ele, str)) return;
            ele.className = ele.className.split(/ +/)
                .filter(item => item !== str)
                .join(' ');
        }
        //=> 1.tab绑定点击事件
        handleOption() {
            let {optionList, eventType} = this;
            [].forEach.call(optionList, (item, index) => {
                this.removeClass(optionList[index], 'active');
                this.conList[index].style.display = 'none';
                item[`on${eventType}`] = () => {
                    let _lastIndex = this.lastIndex;
                    this.removeClass(optionList[this.lastIndex], 'active');
                    this.conList[this.lastIndex].style.display = 'none';
                    this.addClass(optionList[index], 'active');
                    this.conList[index].style.display = 'block';
                    this.lastIndex = index;

                    this.changeEnd && this.changeEnd(index, _lastIndex);
                };
            })
        };
    }

    window.TabPlugin = TabPlugin;
}(window);

/**
 * 配置项
 * 1、哪个容器实现选项卡（必传项）
 * 2、默认选中项
 * 3、切换的事件类型（如：mouseover）
 * 4、可以自定义页卡区域的样式类（如：option/con）
 * 5、支持钩子函数
 * ...
 */
