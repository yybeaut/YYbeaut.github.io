// 假设本地机器无法做加减乘除法，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现
const addRemote = async(a, b) => new Promise(resolve => {
    setTimeout(() => resolve(a + b), 1000)
})

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
    // 你的实现
    // return new Promise((resolve, reject) => {
    //     inputs.reduce(function(init, val) {
    //         resolve(init + val);
    //     })
    // })
    // 参数越多耗时越久
    // 待优化
    return inputs.reduce((fn, val) => {
        return fn.then(next => {
            return addRemote(next, val);
        })
    }, Promise.resolve(0));


}
// 亢明悦思路2
async function add1(...inputs) {
    // 你的实现
    const argsList = [...inputs];
    if (argsList.length <= 2) {
        return addRemote(...inputs);
    } else {
        const numArrList = argsList.reduce((acc, cValue, cIndex, arr) => {
            if (cIndex % 2 === 0) {
                let value = cIndex + 1 >= argsList.length ? 0 : arr[cIndex + 1];
                acc.push(addRemote(cValue, value));
            }
            return acc;
        }, []);
        console.log(numArrList);
        return Promise.all(numArrList).then((data) => {
            console.log(data);
            if (data.length > 1) {
                return add(...data);
            }
        });
    }
}


// function add2(...inputs) {
//     return inputs.reduce((memo, next) => {
//         return memo.then((prev) => addRemote(prev, next));
//     }, Promise.resolve(0));
// }



add(3, 4, 56).then(res => {
    console.log(res, 'res')
});
// 请用示例验证运行结果:
// add(1, 2)
//     .then(result => {
//         console.log(result) // 3
//     })

// add(3, 5, 2)
//     .then(result => {
//         console.log(result) // 10
//     })


//////////////////////////////////////////////////////


const timeout = (ms) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const ajax1 = () =>
    timeout(2000).then(() => {
        console.log("1");
        return 1;
    });

const ajax2 = () =>
    timeout(1000).then(() => {
        console.log("2");
        return 2;
    });

const ajax3 = () =>
    timeout(2000).then(() => {
        console.log("3");
        return 3;
    });

function mergePromise() {
    //
}

// mergePromise([ajax1, ajax2, ajax3]).then((data) => {
//     console.log("done");
//     console.log(data); // data 为 [1, 2, 3]
// });

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function runPromiseInSequence() {

}

// promise function 1
function p1(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 5);
    });
}

// promise function 2
function p2(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 2);
    });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
    return a * 3;
}

// promise function 4
function p4(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 4);
    });
}
// function runPromiseInSequence(arr, input) {
//     return arr.reduce(
//         (promiseChain, currentFunction) => promiseChain.then(currentFunction),
//         Promise.resolve(input)
//     );
// }

const promiseArr = [p1, p2, f3, p4];
// runPromiseInSequence(promiseArr, 10)
//     .then(console.log); // 1200