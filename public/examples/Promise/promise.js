// 基本实现promise
// 不能链式调用

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
        this.status = Promise.onFulfilled; // 将状态设置为成功
        this.value = value;
        this.callbacks.forEach(arr => {
            this.playHandler(arr);
        });
    }
    _reject(reason) {
        this.status = Promise.onRejected; // 将状态设置为失败
        this.reason = reason;
        this.callbacks.forEach(arr => {
            this.playHandler(arr);
        });
    }
    playHandler(callback) {
        let {
            onFulfilled,
            onRejected
        } = callback;
        if (this.status === Promise.onFulfilled && onFulfilled) {
            onFulfilled(this.value);
        }
        if (this.status === Promise.onRejected && onRejected) {
            onRejected(this.reason);
        }
    }
    then(onFulfilled, onRejected) {
        // 这里可以理解为在注册事件
        // 也就是将需要执行的回调函数存储起来
        this.callbacks.push({
            onFulfilled,
            onRejected
        })
    }
}
let success = false;
new Promise(function(resolve, reject) {
    setTimeout(() => {
        if (success) {
            resolve('righht');
        } else {
            reject('error')
        }
    }, 100)
}).then((data) => {
    console.log(data, 'data');
}, (error) => {
    console.log(error, 'error');
});
// then的第二个参数执行错误
/**
 * .then(()=>{},()=>{})
 */