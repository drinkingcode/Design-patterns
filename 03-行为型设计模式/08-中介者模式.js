/**
 * 中介者模式
 * 用一个中介对象封装一系列的对象交互，中介者使各对象不需要显示地相互作用，
 * 从而使其耦合松散，而且可以独立改变它们之间的交互。
 * */
//抽象同事类
function Colleague(mediator){
    this.mediator = mediator;
}

//具体同事类
//财务部
function FinanceDepartment(mediator) {
    Colleague.call(this,mediator);
}
FinanceDepartment.prototype = {
    constructor:FinanceDepartment,
    income:function (money) {
        console.log('财务部收款：' + money);
    },
    expense:function (money) {
        console.log('财务部拨款：' + money);
    }
};

//研发部
function DevelopmentDepartment(mediator){
    Colleague.call(this,mediator);
}
DevelopmentDepartment.prototype = {
    constructor:DevelopmentDepartment,
    develop:function (request,money) {
        this.mediator.execute('develop',request,money);
    }
};

//销售部
function SalesDepartment(mediator){
    Colleague.call(this,mediator);
}
SalesDepartment.prototype = {
    constructor:SalesDepartment,
    sale:function (request,money) {
        this.mediator.execute('sale',request,money);
    }
};

//抽象中介类
function Mediator() {}
Mediator.prototype = {
    constructor:Mediator,
    execute:function(){
        throw new Error('这是一个抽象方法');
    }
};

//具体中介类
//总经理
function ManagerMediator() {
    this.financeDep = new FinanceDepartment(this);
    this.developmentDep = new DevelopmentDepartment(this);
    this.salesDep = new SalesDepartment(this);
}
ManagerMediator.prototype = Object.create(Mediator.prototype);
ManagerMediator.prototype.execute = function (type,request,money) {
    if(type==='sale'){
        this.sale(request,money);
    }else if(type==='develop'){
        this.develop(request,money);
    }
};
Mediator.prototype.sale = function sale(request,money) {
    console.log(request);
    this.financeDep.income(money);
};

Mediator.prototype.develop = function develop(request,money) {
    console.log(request);
    this.financeDep.expense(money);
};

var mediator = new ManagerMediator();
var develop = new DevelopmentDepartment(mediator);
var sale = new SalesDepartment(mediator);

sale.sale('已售卖2w台智能机器人',2000000);
develop.develop('升级智能机器人',300000);