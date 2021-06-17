// new 操作符原理

function myNews() {
    // 获取构造函数
    let Constructor = Array.prototype.shift.call(arguments);
    console.log(Constructor, 'Constructor');
    // 创建一个新对象
    let obj = {};
    console.log(Constructor.prototype, 'Constructor.prototype', arguments);
    // 该对象的原型等于构造函数的prototype  将函数的作用域赋给新对象
    obj.__proto__ = Constructor.prototype;
    // 执行函数中的代码 为新对象添加属性方法
    var result = Constructor.myApply(obj, arguments);
    // 无返回值或者返回一个非对象时将创建的新对象返回 
    // 否则将返回值作为新对象返回
    return typeof result === 'Onject' ? result : obj;
}

function Man(name, age) {
    this.name = name
    this.age = age
}
var tom = new Man('tom', 20);
var mikes = myNews(Man, 'mike', 20);
console.log(tom, mikes);
var mike2 = myNews(Man, 'mike', 30);
console.log(mike2, 'mike2');

console.log(tom instanceof Man, mikes instanceof Man); // true true