let bool = false;
new Promise((resolve, reject) => {
    setTimeout(() => {
        if (bool) {
            resolve(123);
        } else {
            reject('error')
        }
    }, 1000)
}).then(res => {
    console.log(res, 'res')
}).catch(err => {
    console.log(err, 'err--')
});