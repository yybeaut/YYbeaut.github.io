// apply() 的实现过程

let app = {
    name: '第二',
    color: 'red'
}

function changeColor(first, end) {
    return this.name + this.color + first + end;
}
Function.prototype.myApply = function(context) {
    console.log(context, 'cs')
    var context = context || globle;
    context.fn = this;
    console.log(arguments, 'ar') //[{name: "第二", color: "red", fn: ƒ},["qwe", "mnb"]]
    let args = [...arguments][1]; // 与call() 大同小异，区别是传入参数是数组格式
    if (!args) {
        console.log('calllllllllllllll')
        return context.fn();
    }
    let r = context.fn(...args);
    delete context.fn;
    return r;
}

let capply = changeColor.myApply(app, ['qwe', 'mnb']);
console.log(capply, 'capply')