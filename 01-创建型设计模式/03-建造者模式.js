/**
 * 建造者模式
 * 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
 */
function AbstractComputerBuilder() {}
AbstractComputerBuilder.prototype = {
    constructor:AbstractComputerBuilder,
    setCPU:function () {
        throw new Error('这是一个抽象方法');
    },
    setMemory:function () {
        throw new Error('这是一个抽象方法');
    },
    setDisk:function () {
        throw new Error('这是一个抽象方法');
    },
    create:function () {
        throw new Error('这是一个抽象方法');
    }
};

//负责整体组装,但不负责内部具体细节的建造，即对象的构建
function Director(builder) {
    if(!(builder instanceof AbstractComputerBuilder)){
        throw new Error('参数类型必须属于AbstractComputerBuilder类型');
    }
    this.builder = builder;
}
Director.prototype = {
    constructor:Director,
    createComputer:function () {
        this.builder.setCPU();
        this.builder.setMemory();
        this.builder.setDisk();
        return this.builder.create();
    }
};
//具体建造细节在这里确定，但不负责将这些细节组装起来，即对象的表示
function ToshibaBuilder() {}
ToshibaBuilder.prototype = Object.create(AbstractComputerBuilder.prototype,{
    constructor:{
        value:ToshibaBuilder,
        writable:true,
        configurable:true,
        enumerable:true
    }
});
ToshibaBuilder.prototype.setCPU = function () {
    console.log('组装东芝电脑CPU');
};
ToshibaBuilder.prototype.setMemory = function () {
    console.log('组装东芝电脑内存条');
};
ToshibaBuilder.prototype.setDisk = function () {
    console.log('组装东芝电脑磁盘');
};
ToshibaBuilder.prototype.create = function () {
    return '东芝电脑';
};

var toshibaBuilder = new ToshibaBuilder();
var director = new Director(toshibaBuilder);
var toshibaComputer = director.createComputer();
console.log(toshibaComputer);