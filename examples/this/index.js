var myObj1 = {
    name: " 极客时间 ",
    showThis: function() {
        console.log(this);

        function bar() {
            //创建其自身的执行上下文
            console.log(this, 'this'); // window
        }
        bar();
    }
}
myObj1.showThis();
// {name: '', shouThis: function() {}}
// window

var myObj2 = {
    name: " 极客时间 ",
    showThis: function() {
        console.log(this);
        var self = this;

        function bar() {

            self.name = " 极客邦 "
        }
        bar();
    }
}
myObj2.showThis(); // {name: '', shouThis: function(){}}
console.log(myObj2.name, '1') // 极客邦
console.log(window.name, '222') // 空～


var myObj3 = {
    name: " 极客时间 ",
    showThis: function() {
        console.log(this);
        var bar = () => {
            this.name = " 极客邦 ";
            console.log(this);
        }
        bar();
    }
}
myObj3.showThis();
console.log(myObj3.name);
console.log(window.name);

// 箭头函数 bar 里面的 this 是指向 myObj 对象的。 这是因为 ES6 中的箭头函数并不会创建其自身的执行上下文， 所以箭头函数中的 this 取决于它的外部函数。