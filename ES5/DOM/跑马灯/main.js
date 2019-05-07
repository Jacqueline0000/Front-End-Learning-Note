/**
 * 实现JS动画
 *  让wrapper每间隔一段时间（最优动画时间是13～17）在原有的left值基础上减去步长
 */

let wrapper = document.querySelector('.wrapper');
//=> 1. 把wrapper中原有的li整体克隆一份放到容器的末尾
wrapper.innerHTML += wrapper.innerHTML;

//=> 2. 把wrapper的宽度变为当前的两倍
let curWidth = utils.css(wrapper, 'width');
utils.css(wrapper, 'width', curWidth*2);

//=> 3. 设置定时器
setInterval(() => {
    //=> 4. 获取当前wrapper的left值，减去步长，把最新的left赋值给元素即可
    let curLeft = utils.css(wrapper, 'left');
    utils.css(wrapper, {
        left: --curLeft
    });
    //=> 5. 实现无缝：当wrapper左偏移的值为wrapper的宽度时，将left重置为0
    if (Math.abs(curLeft) >= curWidth) {
        utils.css(wrapper, {
            left: 0
        });
    }
}, 13);