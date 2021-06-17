// 数组方法实现原理


// push

/**
 * 在数组末尾添加
 * 可以一次性添加多项不同的数据
 * 返回数组长度
 */

const arr = [1, 2, 3, 4];
Array.prototype.myPush = function() {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}
console.log(arr.myPush({ x: 1, y: 2 }));
console.log(arr, 'arr')

// pop

/**
 * 去处数组尾部项
 * 返回被去除的数组项
 */

const arr1 = [1, 2, 3, 4];
Array.prototype.myPop = function() {
    let item = this[this.length - 1];
    this.length--;
    return item;
}

console.log(arr1.myPop());
console.log(arr1, 'arr1')

// unshift

/**
 * 在数组的开头添加项
 * 可以一次添加多项不同的数据
 * 返回数组长度
 */

const arr2 = [1, 2, 3, 4];

Array.prototype.myUnshift = function() {
    let arr = [...arguments, ...this];
    for (var i = 0; i < arr.length; i++) {
        this[i] = arr[i];
    }
    return this.length;
}

console.log(arr2.myUnshift('1234'));
console.log(arr2);


// shift

/**
 * 在数组的开头删除项
 * 返回去除的数组项
 */

const arr3 = [1, 2, 3, 4];

Array.prototype.myShift = function() {
    let item = this[0];
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr[i] = this[i + 1];
    }
    for (let i = 0; i < newArr.length; i++) {
        this[i] = newArr[i];
    }
    this.length--;
    return item;
}
console.log(arr3.myShift());
console.log(arr3);

// reduce

/**
 * 没有做默认值类型判断
 */

const arr4 = [1, 2, 3, 4];
// 必须幽默值
Array.prototype.myReduce1 = function(fn, state) {
    let init = state;
    let brr = this;
    console.log(init, brr, '....')
    brr.forEach(function(val, i) {
        init = fn(init, val)
    })
    console.log(init, '//')
    return init;
};
// 有没有默认值都可以
Array.prototype.myReduce2 = function(fn, state) {
    for (let i = 0; i < this.length; i++) {
        if (state === undefined) {
            state = fn(this[i], this[i + 1], i + 1, this);
            i++;
        } else {
            state = fn(state, this[i], i, this);
        }
    }
    return state;
};


Array.prototype.reduce3 = function(callback, init) {
    if (typeof callback !== 'function' || !Array.isArray(this) || this.length === 0) {
        return []
    }
    const hasInit = init != null
    let value = hasInit ? init : this[0]

    for (let i = hasInit ? 0 : 1; i < this.length; i++) {
        value = callback(value, this[i], i, this)
    }
    return value
}

console.log(arr4.myReduce1((a, b) => {
    return a + b;
}, 0), 'reduce1');
console.log(arr4.myReduce2((a, b) => {
    return a - b
}), 'reduce2');

// forEach

/**
 * 
 */
Array.prototype.MyForEach = function(fn, thisArg) {
    // 第二个参数是this指向
    for (let i = 0; i < this.length; i++) {
        fn(this[i], i, this);
    }
}

// map

Array.prototype.MyMap = function(fn, thisArg) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(fn(this[i], i, this));
    }
    return arr;
}

// reverse

/**
 * 数组反转
 * 改变原数组
 */
const arr5 = [1, 2, 3, 4, 5];
Array.prototype.myReverse = function() {
    let len = this.length;
    console.log(len)
    for (let i = 0; i < len / 2; i++) {

        let temp = this[i];
        this[i] = this[len - 1 - i];
        this[len - 1 - i] = temp;
    }
    return this;
}
arr5.myReverse();
console.log(arr5);

// filter

Array.prototype.myFilter = function(fn, obj) {
    let len = this.length;
    let arr = [];
    let that = obj || window;
    for (let i = 0; i < len; i++) {
        if (fn.call(that, this[i], i, this)) arr.push(this[i]);
    }
    return arr;
}

// every

Array.prototype.myEvery = function(fn, obj) {
    let flag = true;
    let len = this.length;
    let that = obj || window;
    for (let i = 0; i < len; i++) {
        if (!fn.call(that, this[i], i, this)) {
            flag = false;
            break;
        }
    }
    return flag;
}


// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
console.log('___________________________________________________');
// 函数柯里化
// currying
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    console.log(_args, '_args')
        // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        console.log(_args, _adder, '_adder///')
        return _adder;
    };
    console.log(_adder, '|||||||||||||||||')
    console.log(_adder.toString, '++++++++')


    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function() {
        return _args.reduce(function(a, b) {
            return a + b;
        });
    }
    console.log(_adder.toString, '11111')
    return _adder;
}

console.log(add(1)(2)(3)) // 6
    // console.log(add(1, 2, 3)(4)) // 10
    // console.log(add(1)(2)(3)(4)(5)) // 15
    // console.log(add(2, 6)(1)) // 9