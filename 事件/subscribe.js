~function (global) {
    class Subscribe {
        constructor() {
            //=> 创建一个容器（每一个实例都有一个自己独有的容器，管理自己需要执行的方法即可）
            this.pond = [];
        }

        //=> 向计划表（pond池子）中增加方法：去重
        add(fn) {
            let {pond} = this;
            if (this.pond.indexOf(fn) > -1) {
                return;
            }
            pond.push(fn);
        }

        //=> 从计划表（pond池子）中移除方法
        remove(fn) {
            let {pond} = this;
            this.pond = pond.filter(item => item !== fn);
        }

        fire(...arg) {
            let {pond} = this;
            pond.forEach(fn => {
                fn(...arg);
            });
        }
    }
    global.Subscribe = Subscribe;
}(global);

let subscribe = new Subscribe();
let fn = (...arg)=>{
    console.log(1);
};
let fn1 = (...arg)=>{
    console.log(111);
};
let fn2 = (...arg)=>{
    console.log(222);
    subscribe.remove(fn);
    subscribe.remove(fn1);
};
subscribe.add(fn);
subscribe.add(fn1);
subscribe.add(fn2);
subscribe.add(()=>{
    console.log(444);
});
subscribe.fire(12,33);
subscribe.fire(12,33);



