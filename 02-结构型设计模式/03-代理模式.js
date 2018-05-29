/**
 * 代理模式
 * 为其他对象提供一种代理以控制对这个对象的访问
* */
function AbstractSinger() {}
AbstractSinger.prototype = {
    signContract:function () {
        throw new Error('这是一个抽象方法');
    },
    singing:function () {
        throw new Error('这是一个抽象方法');
    }
};

function RealSinger(name) {
    this.name = name;
}
RealSinger.prototype = Object.create(AbstractSinger.prototype,{
    constructor:{
        value:RealSinger,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
RealSinger.prototype.signContract = function () {
    console.log(this.name + ' 正在签合同');
};

RealSinger.prototype.singing = function () {
    console.log(this.name + ' 正在唱歌');
};


function SingerProxy(name) {
    this.realSinger = new RealSinger(name);
}
SingerProxy.prototype = Object.create(AbstractSinger.prototype,{
    constructor:{
        value:SingerProxy,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
SingerProxy.prototype.signContract = function () {
    console.log('proxy 正在签合同');
};

SingerProxy.prototype.singing = function () {
    this.realSinger.singing();
};


//
var proxy = new SingerProxy('王力宏');
proxy.signContract();
proxy.singing();