// bind实现过程

Function.prototype.myBind = function(context) {
    console.log(context);
    let _me = this;
    return function() {
        return _me.myApply(context);
    }
}

var a = 1,
    b = 2;
var obj1 = { a: 10, b: 20 }

function test(x, y) {
    console.log(this.a + this.b + x + y);
}
var fns = test.myBind(obj1);
// console.log(fns, 'fns');
/**
 * ƒ () {
        return _me.myApply(context)
    } "fns"
 */
fns(a, b) // 30


let obj2 = {
    name: 'joker'
}

function fn(name, age) {
    console.log(this.name + '今年' + name + age + '岁了')
}
let bindFn = fn.myBind(obj2, '大概')
bindFn(10);
// joker今年大概10岁了