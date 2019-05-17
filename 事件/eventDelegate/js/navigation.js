$(function () {
    let $detailBox = $('.detail-box');
    $('.menu-box').on('mouseover',function (ev) {
        let target = ev.target,
            tag = target.tagName,
            $target = $(target),
            $pars = $target.parents();
        let flag = $pars.filter('.nav-box').length > 0;
        if ((tag === 'A' || tag === 'LI') && flag) {
            $pars.find('li').removeClass('active');
            $detailBox.text($target.text() + '详情');
            $target.addClass('active');
        }
    });

    //=> 如果是detailBox不做处理
    $detailBox.on('mouseover', function (ev) {
        ev.stopPropagation();
    })
});