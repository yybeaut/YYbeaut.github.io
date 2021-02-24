---
title: js工具函数
tag: js
toc: true
---

数组

<!-- more -->

### 布尔全等判断

数组里面的值是不是都是布尔值

```js
const all = (arr, fn = boolean) => arr.every(fn);
```

```js
all([1, 2, 3], (x) => x > 1); // true
all([1, 1, 1, 1]); // true
```

### 检查数组各项相等

```js
const allEqual = (arr) => arr.every((val) => val === arr[0]);
```

```js
allEqual([1, 2, 3, 4, 5]); // false
allEqual([1, 1, 1, 1, 1, 1, 1]); // true
```

### 数组转‘CSV’格式（带空格的字符串）

```js
const arrayToCSV = (arr, delimiter = ",") =>
  arr.map((v) => v.map((x) => `"${x}"`).join(delimiter)).join("\n");
```

更改写法

```js
const arrayToCSV = function (arr, deli = ",") {
  return arr
    .map((v) => {
      return v
        .map((x) => {
          return `${x}`;
        })
        .join(deli);
    })
    .join("\n");
};
```
