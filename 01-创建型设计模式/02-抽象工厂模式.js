/**
 * 抽象工厂模式
 * 通过对类的工厂的创建使其业务用于某一系列产品的创建
 */
//产品类
function BMWX1LeftCarDoor() {
    this.type = 'BMW X1 左车门';
}

function BMWX1RightCarDoor() {
    this.type = 'BMW X1 右车门';
}

function BMWX2LeftCarDoor() {
    this.type = 'BMW X2 左车门';
}

function BMWX2RightCarDoor() {
    this.type = 'BMW X2 右车门';
}

//抽象工厂类
function CarDoorFactory() {}
CarDoorFactory.prototype = {
    constructor:CarDoorFactory,
    createLeftCarDoor:function () {
        throw new Error('这是一个抽象类');
    },
    createRightCarDoor:function () {
        throw new Error('这是一个抽象类');
    }
};

//BMWX1工厂
function BMWX1CarDoorFactory() {}
BMWX1CarDoorFactory.prototype = Object.create(CarDoorFactory.prototype,{
    constructor:{
        value:BMWX1CarDoorFactory,
        writable:true,
        configurable:true,
        enumerable:true
    }

});
BMWX1CarDoorFactory.prototype.createLeftCarDoor = function () {
    return new BMWX1LeftCarDoor();
};

BMWX1CarDoorFactory.prototype.createRightCarDoor = function () {
    return new BMWX1RightCarDoor();
};

//BMWX2工厂
function BMWX2CarDoorFactory() {}
BMWX2CarDoorFactory.prototype = Object.create(CarDoorFactory.prototype,{
    constructor:{
        value:BMWX2CarDoorFactory,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
BMWX2CarDoorFactory.prototype.createLeftCarDoor = function () {
    return new BMWX2LeftCarDoor();
};

BMWX2CarDoorFactory.prototype.createRightCarDoor = function () {
    return new BMWX2RightCarDoor();
};

var bmwx1LeftCarDoor = new BMWX1CarDoorFactory().createLeftCarDoor();
var bmwx2RightCarDoor = new BMWX2CarDoorFactory().createRightCarDoor();
console.log(bmwx1LeftCarDoor.type); //BMW X1 左车门
console.log(bmwx2RightCarDoor.type); //BMW X2 右车门