//=>操作css样式的方法
let utils = (function () {
    let getCss = function (ele, attr) {
        let val = null,
            reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(ele)[attr];
            reg.test(val) ? val = parseFloat(val) : null;
        }
        return val;
    };

    let setCss = function (ele, attr, val) {
        if (!isNaN(val)) {
            if (!/^(opacity|zIndex)$/.test(attr)) {
                val += 'px';
            }
        }
        ele['style'][attr] = val;
    };

    let setGroupCss = function (ele, options) {
        for (let attr in options){
            if (options.hasOwnProperty(attr)) {
                setCss(ele, attr, options[attr]);
            }
        }
    };

    let css = function (...arg) {
        let len = arg.length,
            fn = getCss;
        if (len >= 3) {
            fn = setCss
        }
        if (len === 2 && typeof arg[1] === 'object') {
            fn = setGroupCss;
        }
        return fn(...arg);
    };

    return {
        css
    }
})();

/*==ANIMATE动画库==*/
~function () {
    //=> effect: 准备运动的公式
    let effect = {
        Linear: (t, b, c, d) => t / d * c +b
    };

    //=> 封装动画库
    window.animate = function (ele, target = {}, duration = 1000) {
        //1.基于target计算出begin/change
        let begin = {},
            change = {},
            time = 0;
        for (let attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = utils.css(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }

        //2.实现动画
        clearInterval(ele.animateTimer);//=>在给当前元素设置新的动画之前，先清空原有正在运行的动画（防止多动画共存，把动画的返回值赋值给当前元素的自定义属性，这样只要元素不变，不管什么时候在哪执行都可以清除元素的动画）
        ele.animateTimer = setInterval(() => {
            time += 17;
            //=>边界判断
            if (time >= duration) {
                utils.css(ele, target);
                clearInterval(ele.animateTimer);
                return;
            }
            //=>依托target计算出每个方向的当前位置
            let cur = {};
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = effect.Linear(time, begin[attr],change[attr], duration)
                }
            }
            utils.css(ele, cur);
        }, 17)
    };
}();
/*
animate(box, {
    top: 300,
    left: 500,
    width: 200,
    height: 200,
    opacity: 0.2
}, 300);*/
