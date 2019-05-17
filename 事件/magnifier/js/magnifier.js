/**
 * 1.鼠标进入和离开smallBox，控制mark以及bigBox的显示隐藏
 * 2.控制mark在smallBox中运动，但是不能超过边界
 * 3.当mark在smallBox移动的时候，根据mark移动的距离，计算出bigImg在bigBox中移动的距离（反向三倍：x/y轴都是三倍，整体九倍）
 */
$(function () {
    let $magnifierBox = $('.magnifierBox'),
        $smallBox = $magnifierBox.find('.smallBox'),
        $mark = $smallBox.find('.mark'),
        $bigBox = $magnifierBox.find('.bigBox'),
        $bigImg = $bigBox.find('img');

    //=>控制mark和bigBox的显示隐藏
    $smallBox.on('mouseenter', function (e) {
        $mark.add($bigBox).css('display', 'block');
        computedMark(e);
    }).on('mouseleave', function () {
        $mark.add($bigBox).css('display', 'none');
    }).on('mousemove', function (e) {
        computedMark(e);
    });

    //=>鼠标在smallBox中移动时控制mark跟着移动
    function computedMark(e) {
        let halfWidth = $mark[0].offsetWidth/2,
            halfHeight = $mark[0].offsetHeight/2,
            x = e.clientX - $smallBox[0].offsetLeft - halfWidth,
            y = e.clientY - $smallBox[0].offsetTop - halfHeight,
            maxX = $smallBox[0].offsetWidth - $mark[0].offsetWidth,
            maxY = $smallBox[0].offsetHeight - $mark[0].offsetHeight,
            minX = 0,
            minY = 0,
            rateX = $bigImg[0].offsetWidth/$smallBox[0].offsetWidth,
            rateY = $bigImg[0].offsetHeight/$smallBox[0].offsetHeight;

        x = x <= minX ? 0 : (maxX <= x ? maxX : x);
        y = y <= minY ? 0 : (maxY <= y ? maxY : y);
        $mark.css({left: x, top: y});
        $bigImg.css({left: - rateX * x, top: - rateY * y});
    }
});