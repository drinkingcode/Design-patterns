/**
 * 模板方法模式
 * 定义一个操作中的算法的框架，而将一些步骤延迟到子类中，
 * 使得子类可以不改变一个算法的结构即可重新定义该算法的某些特定步骤。
 * */
function Car(name) {
    this.name = name;
}
Car.prototype = {
    start:function () {
        throw new Error('这是一个抽象方法');
    },
    stop:function () {
        throw new Error('这是一个抽象方法');
    },
    run:function () {  //模板方法
        this.start();
        this.stop();
    }
};

function BMW(name) {
    Car.call(this,name);
}
BMW.prototype = Object.create(Car.prototype);
BMW.prototype.start = function () {
  console.log(this.name + '慢慢启动');
};
BMW.prototype.stop = function(){
    console.log(this.name + '慢慢熄火');
};

function Benz(name) {
    Car.call(this,name);
}
Benz.prototype = Object.create(Car.prototype);
Benz.prototype.start = function () {
    console.log(this.name + '快速启动');
};
Benz.prototype.stop = function(){
    console.log(this.name + '快速熄火');
};

var bmw = new BMW('宝马X6');
var benz = new Benz('奔驰敞篷');
bmw.run();
benz.run();