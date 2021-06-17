// 函数节流
// 每隔一段时间，只执行一次函数

var timer1;

function throttle(fn, s) {
    if (timer1) {
        return;
    }
    timer1 = setTimeout(function() {
        fn();
        timer1 = null;
    }, s)
}

// function testThrottle() {
//     console.log('throttle');
// }
// document.onmousemove = function(e) {
//     throttle(testThrottle, 1000)
// }

function throttle1(fn, deley) {
    var timer;
    return function() {
        var that = this;
        var args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function() {
            fn.apply(that, args);
            timer = null;
        }, deley)
    }
}

function testThrottle(e, content) {
    console.log(e, content);
}
var testThrottleFn = throttle1(testThrottle, 1000); // 节流函数
document.onmousemove = function(e) {
    testThrottleFn(e, 'throttle'); // 给节流函数传参
}