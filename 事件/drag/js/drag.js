$(function () {
    let $dialogMask = $('.dialogMask'),
        $dialogBox = $('.dialogBox'),
        $dialogTitle = $dialogBox.find('.title'),
        $closeBtn = $dialogTitle.find('i');

    let winW = document.documentElement.clientWidth,
        winH = document.documentElement.clientHeight,
        boxW = $dialogBox[0].offsetWidth,
        boxH = $dialogBox[0].offsetHeight;

    $dialogBox.css({
        left: (winW - boxW) / 2,
        top: (winH - boxH) / 2
    });

    $closeBtn.on('click', function () {
        $dialogMask.css({display: 'none'});
        $dialogBox.css({display: 'none'});
    });




    let dragstart = function (e) {
        //=> this: $dialogTitle
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startL = parseFloat($dialogBox.css('left'));
        this.startT = parseFloat($dialogBox.css('top'));

        // $dialogTitle.on('mousemove', dragMove);

        //=>BIND是预先处理THIS
        // console.log(dragMove.bind(this) === dragMove);//=>FALSE:说明执行BIND把方法中的THIS预先进行改变处理，得到的结果和原有的函数是不一样的，也就是此时我们给DOCUMENT绑定的方法就不在是DRAG-MOVE了
        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_END = dragEnd.bind(this);
        $(document).on('mousemove', this.DRAG_MOVE).on('mouseup', this.DRAG_END);
    };
    let dragMove = function (e) {
        let {startX, startY, startL, startT} = this,
            maxL = winW - boxW,
            maxT = winH - boxH,
            curL = e.clientX - startX + startL,
            curT = e.clientY - startY + startT;

        $dialogBox.css({
            left: curL > 0 ? (curL < maxL ? curL : maxL) : 0,
            top: curT > 0 ? (curT < maxT ? curT : maxT) : 0,
        });
    };
    let dragEnd = function () {
        // $dialogTitle.off('mousemove', dragMove);
        $(document).off('mousemove', this.DARG_MOVE).off('mouseup', this.DRAG_END);
    };
    $dialogTitle.on('mousedown', dragstart);
    // $dialogTitle.on('mouseup', dragEnd);
    // $dialogTitle.on('mouseleave', dragEnd);
});