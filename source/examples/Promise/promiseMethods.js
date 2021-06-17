/**
 * .catch() 方法实现
 * 实际上是 .then的语法糖
 */
Promise.prototype.catch = function(callback) {
    return this.then(null, callback);
}

/**
 * Promise.resolve() 实际上调用的是 new Promise()；并且调用 resolve();
 * 生成一个成功的promise
 */

/**
 * 
 * @param {*} value value !== 'object' value !== 'function'
 */
Promise.resolve1 = function(value) {
    return new Promise(resolve => {
        resolve(value);
    })
}
Promise.resolve1(1).then(res => {
    console.log(res, 'Promise.resolve1()')
})

/**
 * 
 * @param {*} value value === 'object' value === 'function'
 * value 是一个Promise的实例
 */
Promise.resolve2 = function(value) {
    // instanceof 检测符用于 检测构造函数的prototype属性是否出现在某个实例对象的原型上
    if (value instanceof Promise) return value;
    if (value === null) return null;
    if (typeof value === 'object' || typeof value === 'function') {
        // value 是不是一个Promise()是否有then方法
        try {
            // 这段语句中有任何错误都会执行catch
            let then = value.then;
            if (typeof then === 'function') {
                return new Promise(then.call(value)); // 执行value方法
            }
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
    return value;
}

// 参数不是 promise的实例
console.log(Promise.resolve2(2), 'Promise.resolve2()')

// 参数是 promise的实例
Promise.resolve2(new Promise(resolve => { resolve(33) })).then(val => {
    console.log(val, 'Promise.resolve2() val3')
})

/**
 * Promise.reject() 实际上调用的是 new Promise()；并且调用 reject();
 * 生成一个失败的promise
 */
Promise.reject = function(reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}
console.log(Promise.reject('error'));
Promise.reject('error').catch(res => {
    console.log(res, 'Promise.catch()')
})

/**
 * Promise.finally() 无论成功或者失败都会执行
 * 返回 Promise()
 */
// this.then(() =>{}, () =>{}).finally(callback);  ....callback(); callback有可能返回一个 promise
Promise.prototype.finally = function(callback) {
    return this.then(value => {
            // callback(); return value；也可能return new Promise();
            // Promise.resolve1() 会等callback() 执行完毕
            return Promise.resolve1(callback()).then(() => value);
        },
        err => {
            // 错误信息向下传递
            return Promise.resolve1(callback()).then(() => {
                throw err;
            });
        }
    )
};

/**
 * Promise.all()
 * all()接受一个成员为promise实例的数组 依次执行，按顺序返回结果
 * 所有的执行成功进入成功态，失败一个进入失败状态
 */
Promise.all = function(arr) {
    return new Promise((resolve, reject) => {
        let endAnswer = [];
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            let oncePro = arr[i];
            oncePro.then(function(val) {
                endAnswer[i] = val;
                count++;
                if (count === arr.length) {
                    resolve(endAnswer)
                }
            }, reject);
        }
    })
}
let promise1 = new Promise(function(resolve) {
    resolve(1);
});
let promise2 = new Promise(function(resolve) {
    resolve(2);
});
let promise3 = new Promise(function(resolve) {
    resolve(3);
});

let promiseAll = Promise.all([promise1, promise2, promise3]);
promiseAll.then(function(res) {
    console.log(res, 'promise.all()');
});
// [1, 2, 3] "promise.all()"

/**
 * Promise.race()
 * race()接受一个成员为primise实例的数组，
 * 一个成功就成功，一个失败就失败
 */

Promise.race = function(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(resolve, reject);
        }
    })
}

/**
 * Promise.any()
 * 
 * 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
 * 如果传入的参数不包含任何 promise，则返回一个 异步完成 （asynchronously resolved）的 Promise。
 * 其他情况下都会返回一个处理中（pending） 的 Promise。 
 *      只要传入的迭代对象中的任何一个 promise 变成成功（resolve）状态，或者其中的所有的 promises 都失败，
 *      那么返回的 promise 就会 异步地（当调用栈为空时） 变成成功/失败（resolved/reject）状态。
 * 
 */