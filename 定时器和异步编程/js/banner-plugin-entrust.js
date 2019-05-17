~function () {
    class Banner {
        constructor (options = {}) {
            //=> options 传递的配置项(解构赋值并给更多的配置项赋默认值)
            let {
                ele,
                url,
                isSlide = true,
                isFade = false,
                isArrow = true,
                isFocus = true,
                isAuto = true,
                defaultIndex = 0,
                interval = 3000,
                speed = 200,
                moveEnd
            } = options;

            //=> 把所有的配置项信息都挂载到实例上（这样以后在原型的任何方法中都可以调取这些属性值了）
            ['ele', 'url', 'isArrow', 'isFocus', 'isAuto', 'defaultIndex', 'interval', 'speed', 'moveEnd'].forEach(item => {
                this[item] = eval(item);
            });

            //=> 获取需要的元素，挂载到实例上
            this.container = document.querySelector(ele);
            this.wrapper = this.container.querySelector('.wrapper');
            this.focus = this.container.querySelector('.focus');
            this.arrowLeft = this.container.querySelector('.arrow-left');
            this.arrowRight = this.container.querySelector('.arrow-right');
            this.slideList = null;
            this.focusList = null;
            this.stepIndex = defaultIndex; //=> step记录当前展示块的索引（步长）
            this.autoTimer = null; //=> autoTimer自动轮播的定时器

            //=> 调取init开启轮播图
            this.init()
        }

        //=> banner的主入口（在init中按顺序执行）
        init() {
            let {isAuto, isFocus, isArrow, interval} = this;
            let promise = this.queryData();
            promise.then(() => {
                this.bindHTML();
            }).then(() => {
                if (isAuto) {
                    this.autoTimer = setInterval(() =>{
                        this.autoMove();
                    }, interval);
                }
                this.handleContainer();
            })
        }

        //=> 获取数据
        queryData() {
            let {url} = this;
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.data = JSON.parse(xhr.responseText); //=> 把获取的数据挂载到实例上
                        resolve();
                    }
                };
                xhr.send()
            });
        };

        //=> 数据绑定
        bindHTML() {
            let {data, wrapper, focus} = this;
            let strSlide = ``,
                strFocus;
            data.forEach((item, index) => {
                let {img = 'img/banner1.jpg', desc = '默认图'} = item;
                strSlide += `<div class="slide">
                    <img src="${img}" alt="${desc}">
                    </div>`;

                strFocus += `<li class="${index === 0 ? 'active' : ''}">

                        </li>`;
            });
            strSlide += `<div class="slide"> 
                    <img src="${this.data[0].img}" alt="${this.data[0].desc}">
                    </div>`;
            wrapper.innerHTML = strSlide;
            focus.innerHTML = strFocus;

            //=> 获取所有的slide和li
            this.slideList = wrapper.querySelectorAll('.slide');
            this.focusList = focus.querySelectorAll('li');

            //=> 根据slide的个数动态计算wrapper的宽度
            utils.css(wrapper, 'width', this.slideList.length * 600);
        };

        //=> 自动轮播
        autoMove() {
            let {focusList, wrapper, speed} = this;
            this.stepIndex++;
            if (this.stepIndex > focusList.length) {
                utils.css(wrapper, 'left', 0);
                this.stepIndex = 1;
            }
            animate(wrapper, {left: -this.stepIndex * 600}, speed);
            this.changeFocus();
        };

        //=> changeFocus：让焦点跟着轮播图的切换而切换
        changeFocus() {
            let {stepIndex, slideList, focusList} = this;
            let tempIndex = stepIndex;
            tempIndex === slideList.length -1 ? tempIndex = 0 : null;
            [].forEach.call(focusList, (item, index) => {
                item.className = index === tempIndex ? 'active' : '';
            })
        };

        //=> handleContainer：鼠标进入和离开控制自动轮播的停止和开启
        handleContainer() {
            let {container, arrowLeft, arrowRight, interval, slideList, wrapper, isFocus, isArrow} = this;
            container.onmouseenter = () => {
                clearInterval(this.autoTimer);
                arrowLeft.style.display = arrowRight.style.display = 'block';
            };
            container.onmouseleave = () => {
                this.autoTimer = setInterval(() => {
                    this.autoMove();
                }, interval);
                arrowLeft.style.display = arrowRight.style.display = 'none';
            };

            //=>基于事件委托实现左右切换和焦点切换
            let queryIndex = function queryIndex(ele) {
                //=>先获取它的所有哥哥，有几个哥哥它的索引就是几
                let ary = [],
                    pre = ele.previousElementSibling;
                while (pre) {
                    ary.unshift(pre);
                    pre = pre.previousElementSibling
                }
                return ary.length;
            };

            container.onclick = (ev) => {
                let target = ev.target,
                    tag = target.tagName,
                    par = target.parentNode;

                if (isFocus) {
                    //=> 焦点
                    if (tag === 'LI' && par.className.indexOf('focus') > -1) {
                        this.stepIndex = queryIndex(target);
                        animate(wrapper, {left: -this.stepIndex * 600}, 300);
                        this.changeFocus();
                        return;
                    }
                }
                if (isArrow) {
                    //=> 左按钮
                    if (tag === 'A' && target.className.indexOf('arrow') > -1) {
                        if (target.className.indexOf('arrow-right') > -1) {
                            this.stepIndex--;
                            if (this.stepIndex < 0) {
                                utils.css(wrapper, 'left', -(slideList.length - 1) * 600);
                                this.stepIndex = slideList.length - 2;
                            }
                            animate(wrapper, {left: -this.stepIndex * 600}, 300);
                            this.changeFocus();
                            return;
                        }
                        //=> 右按钮
                        this.autoMove();
                    }

                }
            }
        };

    }

    window.Banner = Banner;
}();

//=> 一个优秀的插件是尽可能支持更多的配置项（大部分配置项都是有默认值的）
/*new Banner({
    ele: '#container', //=> 操作哪个容器
    url: '', //=> 获取数据的API地址
    isArrow: true, //=> 是否支持左右切换
    isFocus: true, //=> 是否支持焦点切换
    isAuto: true, //=> 是否支持自动切换
    defaultIndex: 0, //=> 默认展示第几张
    interval: 3000, //=> 多久切换一次
    speed: 200, //=> 切换的速度
    moveEnd: () => {}, //=> 切换完成后处理的事情
});*/

//=> 支持扩展，可以让用户自己在你的插件中扩展方法
//=> Banner.fn.extend({xxx:()=>{}})