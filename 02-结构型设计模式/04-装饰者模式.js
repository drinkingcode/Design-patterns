/**
 * 装饰者模式
 * 动态地给一个对象添加一些额外的职责。
 * 就增加功能来说，装饰者模式相比生成子类更为灵活
 */
//咖啡的抽象类
function Coffee() {}
Coffee.prototype = {
    constructor:Coffee,
    getPrice:function () {
        throw new Error('这是一个抽象方法');
    }
};

//咖啡的具体类，不带任何配料
function SimpleCoffee(price) {
    this.price = price;
}
SimpleCoffee.prototype = Object.create(Coffee.prototype,{
    constructor:{
        value:SimpleCoffee,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
SimpleCoffee.prototype.getPrice = function () {
    return this.price;
};

//装饰类
function Decorator(coffee) {
    if(!(coffee instanceof Coffee)){
        throw new Error('参数必须属于Coffee类型');
    }
    this.coffee = coffee;
}
Decorator.prototype = Object.create(Coffee.prototype,{
    constructor:{
        value:Decorator,
        writable:true,
        configurable:true,
        enumerable:true
    }
});

//加糖的咖啡
function SugarCoffeeDecorator(coffee) {
    Decorator.call(this,coffee);
}
SugarCoffeeDecorator.prototype = Object.create(Decorator.prototype,{
    constructor:{
        value:SugarCoffeeDecorator,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
SugarCoffeeDecorator.prototype.getPrice = function () {
  return this.coffee.getPrice() + 5;
};

//加牛奶的咖啡
function MilkCoffeeDecorator(coffee) {
    Decorator.call(this,coffee);
}
MilkCoffeeDecorator.prototype = Object.create(Decorator.prototype,{
    constructor:{
        value:MilkCoffeeDecorator,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
MilkCoffeeDecorator.prototype.getPrice = function () {
    return this.coffee.getPrice() + 10;
};

//加摩卡的咖啡
function MochaCoffeeDecorator(coffee) {
    Decorator.call(this,coffee);
}
MochaCoffeeDecorator.prototype = Object.create(Decorator.prototype,{
    constructor:{
        value:MochaCoffeeDecorator,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
MochaCoffeeDecorator.prototype.getPrice = function () {
    return this.coffee.getPrice() + 15;
};

//白糖牛奶咖啡
//若采用继承的方式来写，那么针对每一种组合，都需要写一个子类，那么子类的个数将是无法计算和维护的
//所采用了装饰者模式，那么其优点就显而易见。
var sugarMilkCoffee = new SugarCoffeeDecorator(new MilkCoffeeDecorator(new SimpleCoffee(30)));
console.log('白糖牛奶咖啡的价格：' + sugarMilkCoffee.getPrice());