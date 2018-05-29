/**
 * 命令模式
 * 将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端实现参数化。
 * */

//命令执行者
function AirContainer() {}
AirContainer.prototype = {
    constructor:AirContainer,
    accelerate:function () {
        console.log('空调风速加快');
    },
    decelerate:function () {
        console.log('空调风速减慢');
    }
};


//命令
function Command() {
    this.aircontainer = new AirContainer();
}
Command.prototype = {
    constructor:Command,
    execute:function () {
        throw new Error('这是一个抽象方法');
    }
};

function DecelerateCommand() {
    Command.call(this);
}
DecelerateCommand.prototype = Object.create(Command.prototype);
DecelerateCommand.prototype.execute = function () {
    this.aircontainer.decelerate();
};

function AccelerateCommand() {
    Command.call(this);
}
AccelerateCommand.prototype = Object.create(Command.prototype);
AccelerateCommand.prototype.execute = function () {
    this.aircontainer.accelerate();
};


//命令调用者
function Invoker() {}
Invoker.prototype = {
    constructor:Invoker,
    setCommand:function (command) {
        if(!(command instanceof Command)){
            throw new Error('传入参数需属于Command类型');
        }
        this.command = command;
    },
    action:function () {
        if(!(this.command instanceof Command)){
            throw new Error('需先调用setCommand()方法设置需要执行的命令');
        }
        this.command.execute();
    }
};


var invoker = new Invoker();
invoker.setCommand(new DecelerateCommand());
invoker.action();
invoker.setCommand(new AccelerateCommand());
invoker.action();