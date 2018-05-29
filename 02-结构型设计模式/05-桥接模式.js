/**
 * 桥接模式
 * 将抽象和实现解耦，使得两者可以独立变化
 * 例如：公司卖产品，那么公司和产品其实是两个维度在变化，那么将这两个维度拆分开，就达到了解耦的目的
 * */

//运用桥接模式之前
function Corporation() {}
Corporation.prototype = {
    constructor:Corporation,
    produce:function () {
        throw new Error('这是一个抽象方法');
    },
    sell:function () {
        throw new Error('这是一个抽象方法');
    },
    makeMoney:function () {
        this.produce();
        this.sell();
        console.log('赚大钱');
    }
};

function MyCorporation() {}
MyCorporation.prototype = Object.create(Corporation.prototype,{
    constructor:{
        value:MyCorporation,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
MyCorporation.prototype.produce = function () {
  console.log('造房子');
};
MyCorporation.prototype.sell = function () {
  console.log('卖房子');
};

//若日后，公司每当转型做其他产品时，则都需要根据产品来新建一个公司类，
//那么，可想而知，此时这种模式所应对产品变化的能力是比较脆弱的。
var myCorporation = new MyCorporation();
myCorporation.makeMoney();


//运用桥接模式之后
//将公司和所卖产品进行分离，因为产品是可变因素
function AbstractCorporation(product) {
    if(!(product instanceof Product)){
        throw new Error('参数必须属于Product类型');
    }
    this.product = product;
}
AbstractCorporation.prototype = {
    makeMoney:function () {
        this.product.produce();
        this.product.sell();
        console.log('赚大钱');
    }
};

function MyUpgradeCorporation(product) {
    AbstractCorporation.call(this,product);
}
MyUpgradeCorporation.prototype = Object.create(AbstractCorporation.prototype,{
    constructor:{
        value:MyUpgradeCorporation,
        writable:true,
        configurable:true,
        enumerable:true
    }
});

function Product() {}
Product.prototype = {
    produce:function () {
        throw new Error('这是一个抽象方法');
    },
    sell:function () {
        throw new Error('这是一个抽象方法');
    }
};

function House() {}
House.prototype = Object.create(Product.prototype,{
    constructor:{
        value:House,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
House.prototype.produce = function () {
  console.log('造房子');
};
House.prototype.sell = function () {
  console.log('卖房子');
};

function Phone() {}
Phone.prototype = Object.create(Product.prototype,{
    constructor:{
        value:Phone,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
Phone.prototype.produce = function () {
    console.log('造手机');
};
Phone.prototype.sell = function () {
    console.log('卖手机');
};
//现在将公司和产品分离后，公司不会因产品而受影响
var myHouseCorporation = new MyUpgradeCorporation(new House());
var myPhoneCorporation = new MyUpgradeCorporation(new Phone());
myHouseCorporation.makeMoney();
myPhoneCorporation.makeMoney();