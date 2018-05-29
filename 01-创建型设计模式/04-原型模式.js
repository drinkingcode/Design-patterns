/**
 * 原型模式
 * 用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。
 *
 */

function BMW(name) {
    this.name = name;
}
BMW.prototype = {
    constructor:BMW,
    run:function () {
        console.log(this.name + ' is running');
    }
};

//原型实例
var BMW_X1 = new BMW('第一辆宝马');

//直接复制一个对象的属性和方法到另一个对象中，从而达到创建一个新对象的作用。
//避免直接通过new带来一定的开销
//新的对象
var BMW_X2 = Object.create(BMW_X1);
BMW_X2.name = '第二辆宝马';

BMW_X1.run();
BMW_X2.run();