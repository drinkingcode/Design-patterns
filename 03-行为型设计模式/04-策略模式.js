/**
 * 策略模式
 * 定义一组算法，将每个算法都封装起来，并且使它们之间可以互换。
 * */
//具体执行者
function Person(name,strategy) {
    this.name = name;
    this.strategy = (strategy instanceof Strategy)?strategy:null;
};
Person.prototype = {
    constructor:Person,
    travel:function () {
        if(this.strategy===null){
            throw new Error('需要先调用setStrategy()方法设置strategy');
        }
        this.strategy.travel();
    },
    setStrategy:function (strategy) {
        if(!(strategy instanceof Strategy)){
            throw new Error('参数需属于Strategy类型');
        }
        this.strategy = strategy;
    }
};

//策略
function Strategy() {}
Strategy.prototype = {
    constructor:Strategy,
    travel:function () {
        throw new Error('这是一个抽象方法');
    }
};

function AirplaneStrategy() {}
AirplaneStrategy.prototype = Object.create(Strategy.prototype);
AirplaneStrategy.prototype.travel = function () {
    console.log('坐飞机去旅行');
};

function TrainStrategy() {}
TrainStrategy.prototype = Object.create(Strategy.prototype);
TrainStrategy.prototype.travel = function () {
    console.log('坐高铁去旅行');
};

function CarStrategy() {}
CarStrategy.prototype = Object.create(Strategy.prototype);
CarStrategy.prototype.travel = function () {
    console.log('坐汽车去旅行');
};


var MrC = new Person('MrC',new AirplaneStrategy());
MrC.travel();
MrC.setStrategy(new CarStrategy());
MrC.travel();