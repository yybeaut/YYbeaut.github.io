const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  let called = false;

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      //x.then 执行错误,抛出异常
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            //y是resolve中传递的值
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

function isPromise(val) {
  if ((typeof val === "object" && val !== null) || typeof val === "function") {
    return typeof val.then === "function";
  }
  return false;
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    let resolve = (value) => {
      if (this.status === PENDING) {
        if (value instanceof Promise) {
          return value.then(resolve, reject);
        }
        this.value = value;
        this.status = FULFILLED;
        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
  catch(err) {
    return this.then(null, () => {
      throw err;
    });
  }
  static resolve(val) {
    return new Promise((resolve, reject) => {
      resolve(val);
    });
  }
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      function resolvePromise(val) {
        if (isPromise(val)) {
          val.then((data) => {
            resolvePromise(data);
          }, reject);
        } else {
          processData(val);
        }
      }
      function processData(val) {
        resolve(val);
      }
      for (let i = 0; i < promises.length; i++) {
        const item = promises[i];
        resolvePromise(item, i);
      }
    });
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [],
        index = 0,
        len = promises.length;
      function resolvePromise(val, index) {
        if (isPromise(val)) {
          val.then((data) => {
            resolvePromise(data, index);
          }, reject);
        } else {
          processData(val, index);
        }
      }
      function processData(val, i) {
        arr[i] = val;
        if (len === ++index) {
          resolve(arr);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        const item = promises[i];
        resolvePromise(item, i);
      }
    });
  }
}

// 测试 需要测试再添加
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
