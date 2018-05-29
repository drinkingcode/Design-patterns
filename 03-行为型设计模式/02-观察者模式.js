/**
 * 观察者模式
 * 定义对象间一种一对多的依赖关系，使得每当一个对象改变状态，则所有依赖于它的对象都会得到通知并自动更新。
 * */
//抽象被观察者
function Observable(name) {
    this.name = name;
}
Observable.prototype = {
    constructor:Observable,
    addObserver:function () {
        throw new Error('这是一个抽象方法');
    },
    deleteObserver:function () {
        throw new Error('这是一个抽象方法');
    },
    notifyObservers:function () {
        throw new Error('这是一个抽象方法');
    }
};


//抽象观察者
function Observer(name) {
    this.name = name;
}
Observable.prototype = {
    constructor:Observer,
    update:function (context) {
        throw new Error('这是一个抽象方法');
    }
};

//具体的被观察者
function Criminal(name) {
    Observable.call(this,name);
    this.observers = [];
}
Criminal.prototype = Object.create(Observable.prototype);
Criminal.prototype.addObserver = function (observer) {
    if(!(observer instanceof Observer)){
        throw new Error('参数需属于Observer类型');
    }
    if(this.observers.indexOf(observer)===-1){
        this.observers.push(observer);
    }
};
Criminal.prototype.deleteObserver = function (observer) {
    if(!(observer instanceof Observer)){
        throw new Error('参数需属于Observer类型');
    }
    //删除数组中的某一个元素
    this.observers = this.observers.splice(this.observers.indexOf(observer,1));
};
Criminal.prototype.notifyObservers = function (context) {
    this.observers.forEach(function (observer) {
        observer.update(context);
    });
};
Criminal.prototype.run = function () {
    var context = this.name + '罪犯逃跑了....';
    console.log(context);
    this.notifyObservers(context);
};

//具体的观察者
function Police(name) {
    Observer.call(this,name);
}
Police.prototype = Object.create(Observer.prototype);
Police.prototype.update = function (context) {
  console.log(this.name + '警察得到通知：' + context);
};

var criminal = new Criminal('王麻子');
var police_xiaoLi = new Police('小李');
var police_xiaoZhang = new Police('小张');
criminal.addObserver(police_xiaoLi);
criminal.addObserver(police_xiaoZhang);
criminal.deleteObserver(police_xiaoLi);
criminal.run();
