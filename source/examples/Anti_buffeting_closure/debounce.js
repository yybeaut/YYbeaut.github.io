// 函数防抖
// 事件在触发n秒后再执行回调，如果在n秒内又触发，则重新计时

var timer;

function debounce(fn, t) {
    clearTimeout(timer);
    timer = setTimeout(function() {
        fn();
    }, t);
}

function moves() {
    console.log('moves');
}
// document.onmousemove = function() {
//     debounce(moves, 1000);
// };
// 事件执行完毕1000毫秒后可执行moves()



// 优化

function debounces(fn, deley) {
    var timer;
    return function() {
        var that = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(that, args);
        }, deley);
    }
}

function testDebounce(e, content) {
    console.log(e, content);
}
let debounceFn = debounces(testDebounce, 1000)
document.onmousemove = function(e) {
    debounceFn(e, 'content');
};
// !!!函数做参数时不能执行状态 不带（）
// 使用闭包后，解决 传参 和 封装防抖函数 的问题，这样就可以在其他地方随便将需要防抖的函数传入debounce了.