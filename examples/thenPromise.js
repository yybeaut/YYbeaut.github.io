// 基本实现promise
// neng链式调用
// 链式调用原理本质是then 返回了一个new Promise()对象

class Promise {
    static pending = 'pending';
    static onFulfilled = 'fulfilled';
    static onRejected = 'rejected';
    constructor(executor) {
        this.status = Promise.pending; // 默人状态
        this.value = undefined; // 成功的默认值
        this.reason = undefined; // 失败的默认值

        // 存储then中传入的参数  数组是因为then方法可以多次调用
        this.callbacks = [];
        executor(this._resolve.bind(this), this._reject.bind(this));

    }
    _resolve(value) {
        // 处理onFulfilled 执行的是一个promise时的情况
        if (value instanceof Promise) {
            //value instanceof Promise 当前的（value）promise不是第一个promise 是then方法返回值中的 promise（要处理的promise）
            // 获取到value（promise）中的 value ：传递一个函数作为value.then()的 onFulfilled参数
            // value内部会执行这个函数，当前promise的value赋值为value（promise）的value
            // 【value：promise】.then(【this._resolve.bind(this)：value】, 【this._reject.bind(this)：value】)
            value.then(this._resolve.bind(this), this._reject.bind(this))
            return;
        }
        this.status = Promise.onFulfilled; // 将状态设置为成功
        this.value = value;
        this.callbacks.forEach(arr => this.playHandler(arr));
    }
    _reject(reason) {
        if (reason instanceof Promise) {
            reason.then(this._resolve.bind(this), this._reject.bind(this));
            return;
        }
        this.status = Promise.onRejected; // 将状态设置为失败
        this.reason = reason;
        this.callbacks.forEach(arr => this.playHandler(arr));
    }
    playHandler(callback) {
        let {
            nextResolve,
            nextReject,
            onFulfilled,
            onRejected
        } = callback;
        if (this.status === Promise.pending) {
            this.callbacks.push(callback);
            return;
        }
        // if (this.status === Promise.onFulfilled && onFulfilled) {
        //     onFulfilled(this.value);
        // }
        if (this.status === Promise.onFulfilled) {
            // 没有传入 onFulfilled（回调事件） new Pronise() 没有调用 resolve() 将undefined 传入
            // const nextValue = onFulfilled ? onFulfilled(this.value) : undefined;

            // 传入存储的值
            // 未传入onFulfilled时，value传入
            const nextValue = onFulfilled ? onFulfilled(this.value) : this.value;

            nextResolve(nextValue)
            return;
        }
        // if (this.status === Promise.onRejected && onRejected) {
        //     onRejected(this.reason);
        // }
        if (this.status === Promise.onRejected) {
            // const nextReason = onRejected ? onRejected(this.reason) : undefined;
            const nextReason = onRejected ? onRejected(this.reason) : this.reason;

            nextReject(nextReason)
        }
    }
    then(onFulfilled, onRejected) {
        // 这里可以理解为在注册事件
        // 也就是将需要执行的回调函数存储起来
        // this.callbacks.push({
        //     onFulfilled,
        //     onRejected
        // })
        // !!!!这里之所以把下一个Promsie的resolve函数和reject函数也存在callback中
        // !!!!是为了将onFulfilled的执行结果通过nextResolve传入到下一个Promise作为它的value值
        return new Promise((nextResolve, nextReject) => {
            this.playHandler({
                nextResolve,
                nextReject,
                onFulfilled,
                onRejected
            })
        })
    }
}
let success = false;
// let success = true;

new Promise(function(resolve, reject) {
    setTimeout(() => {
        if (success) {
            resolve('一次resolve');
        } else {
            reject('一次错误error')
        }
    }, 100)
}).then((data) => {
    console.log(data, 'data');
    return new Promise(resolve => {
            setTimeout(() => {
                resolve(data + 'resolve()调用新的Promise')
            }, 1000)
        })
        // return '二次调用then';
}, (error) => {
    console.log(error, 'error');
    return 'then-> err'
}).then(data => {
    console.log(data, '链式调用then')
}, error => {
    console.log(error + '  链式调用reject()')
});
// then的第二个参数执行reject返回值
/**
 * .then(()=>{},()=>{})
 */