~function ($) {
    if (typeof $ === 'undefined') {
        throw new ReferenceError('Currently plug-ins needs to rely on jQuery');
    }

    class Drag {
        /**
         *
         * @param ele 当前要实现拖拽的元素
         * @param options
         */
        constructor(ele, options = {}) {
            if (typeof ele === 'undefined' || ele.nodeType !== 1) {
                throw new SyntaxError('The first parameter must be passed, and it must be an element object');
            }
            let {
                selector = ele, //=>selector 当前需要操作的目标元素选择器 默认ele
            } = options;
            // ['ele', 'selector'].forEach(item => {
            //     this[item] = eval(item);
            // });
            this.ele = ele;
            this.dragTarget = selector;
            if (typeof selector === 'string') {
                this.dragTarget = $(ele).find(selector)[0];
            }

            //=> dragStart: 保证执行原型上的方法，方法中的this都是当前类的实例
            $(this.dragTarget).on('mousedown', this.down.bind(this));
        }

        //=> mousedown
        down(ev) {
            this.startX = ev.clientX;
            this.startY = ev.clientY;

            let $ele = $(this.ele);
            this.startL = parseFloat($ele.css('left'));
            this.startT = parseFloat($ele.css('top'));

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);
            document.addEventListener('mousemove', this.MOVE);
            document.addEventListener('mouseup', this.UP);
        }

        //=> mousemove
        move(ev) {
            let minL = 0,
                minT = 0,
                maxL = document.documentElement.clientWidth - this.ele.clientWidth,
                maxT = document.documentElement.clientHeight - this.ele.clientHeight;
            let curL = ev.clientX - this.startX + this.startL,
                curT = ev.clientY - this.startY + this.startT;
            $(this.ele).css({
                left: curL > minL ? (curL < maxL ? curL : maxL) : minL,
                top: curT > minT ? (curT < maxT ? curT : maxT) : minT,
            });
        }

        //= mouseup
        up() {
            document.removeEventListener('mousemove', this.MOVE);
            document.removeEventListener('mouseup', this.UP);
        }
    }
    window.Drag = Drag;
}(jQuery);

