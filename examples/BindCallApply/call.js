// call实现过程


let obj = {
    name: '1',
    age: '2'
}

function adds(arg) {
    return this.name + this.age + arg;
}
Function.prototype.mycall = function(context) {
    console.log(context, '/') // {name: '1', age: '2'}
    var context = context || global; // context 不存在为undefined或者null this指向全局
    // 将this赋值给context的fn属性
    context.fn = this; // this指向为调用mycall的function、
    console.log(arguments); //[{}, 4]
    let args = [...arguments].slice(1); // 获取参数
    console.log(args) // [4]
    console.log(context.fn)
        /**
         * ƒ adds(arg) {
            return this.name + this.age + arg;
          }
          此函数是this
         */
    let r = context.fn(...args); // 执行函数
    console.log(r, 'r') // 124
    delete context.fn; // 将this指向删除 删除属性避免污染
    return r;
}

let end = adds.mycall(obj, 4);
console.log(end, 'end')