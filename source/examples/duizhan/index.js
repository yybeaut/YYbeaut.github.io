// 每调用一个函数，JavaScript引擎会为其创建执行上下文，并把该执行上下文压入调用栈，然后JavaScript引擎开始执行函数代码。
// 如果在一个函数A中调用了另外一个函数B，那么JavaScript引擎会为B函数创建执行上下文，并将B函数的执行上下文压入栈顶。
// 当前函数执行完毕后，JavaScript引擎会将该函数的执行上下文弹出栈。
// 当分配的调用栈空间被占满时，会引发“堆栈溢出”问题。


// 在一个函数A中调用了另外一个函数B
// function runStack(n) {
//     if (n === 0) return 100;
//     return runStack(n - 2);
// }
// runStack(50000)

//在一个函数A没有调用另一个函数
// 优化
function runStack(n) {
    while (true) {
        if (n === 0) {
            return 100;
        }
        if (n === 1) { // 防止陷入死循环 (防止奇数进入死循环)
            return 200;
        }

        n = n - 2;
    }
}
console.log(runStack(50000));

// console.log(runStack(50001));