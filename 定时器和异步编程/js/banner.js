let bannerRender = (function () {
    //=> 获取后续需要操作的元素对象或者元素集合
    let container = document.getElementById('container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        arrowLeft = container.querySelector('.arrow-left'),
        arrowRight = container.querySelector('.arrow-right'),
        slideList = null,
        focusList = null;

    //=> 轮播图运动的基础参数
    let stepIndex = 0, //=> step记录当前展示块的索引（步长）
        autoTimer = null, //=> autoTimer自动轮播的定时器
        interval = 2000; //=> interval间隔多长时间自动切换一次

    //=> autoMove：控制轮播图的自动切换
    let autoMove = function () {
        stepIndex++;
        if (stepIndex > focusList.length) {
            utils.css(wrapper, 'left', 0);
            stepIndex = 1;
        }
        animate(wrapper, {left: -stepIndex * 600}, 300);
        changeFocus();
    };

    //=> changeFocus：让焦点跟着轮播图的切换而切换
    let changeFocus = function () {
        let tempIndex = stepIndex;
        tempIndex === slideList.length -1 ? tempIndex = 0 : null;
        [].forEach.call(focusList, (item, index) => {
            item.className = index === tempIndex ? 'active' : '';
        })
    };

    //=> queryData:获取数据
    let queryData = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/banner.json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send()
        });
    };

    //=> bindHTML:数据绑定
    let bindHTML = function (data) {
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
                    <img src="${data[0].img}" alt="${data[0].desc}">
                    </div>`;
        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        //=> 获取所有的slide和li
        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        //=> 根据slide的个数动态计算wrapper的宽度
        utils.css(wrapper, 'width', slideList.length * 600);
    };

    //=> handleContainer：鼠标进入和离开控制自动轮播的停止和开启
    let handleContainer = function () {
        container.onmouseenter = function () {
            clearInterval(autoTimer);
            arrowLeft.style.display = arrowRight.style.display = 'block';
        };
        container.onmouseleave = function () {
            autoTimer = setInterval(autoMove, interval);
            arrowLeft.style.display = arrowRight.style.display = 'none';
        };
    };

    //=>handleFocus：点击焦点实现切换
    let handleFocus = function () {
        [].forEach.call(focusList, (item, index) => {
            item.onclick = function () {
                stepIndex = index;
                animate(wrapper, {left: -stepIndex * 600}, 300);
                changeFocus();
            };
        })
    };

    //=>handleArrow：给两个按钮绑定点击事件
    let handleArrow = function () {
        arrowRight.onclick = autoMove;
        arrowLeft.onclick = function () {
            stepIndex--;
            if (stepIndex < 0) {
                utils.css(wrapper, 'left', -(slideList.length - 1) * 600);
                stepIndex = slideList.length - 2;
            }
            animate(wrapper, {left: -stepIndex * 600}, 300);
            changeFocus();
        }
    };

    return {
        init: function () {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                //=> 开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove, interval);
            }).then(() => {
                //=> 左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();