/**
 * 访问者模式
 * 封装一些作用于某种数据结构中的各元素的操作，它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。
 * */
function Graduate(name,age,salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
}
Graduate.prototype = {
    constructor:Graduate,
    accept:function (visitor) {
        if(!(visitor instanceof Visitor)){
            throw new Error('传入参数必须属于Visitor类型');
        }
        visitor.visit(this);
    }
};

//访问者
function Visitor() {}
Visitor.prototype = {
    constructor:Visitor,
    visit:function (gradute) {
        throw new Error('这是一个抽象方法');
    }
};


function SalaryVisitor() {}
SalaryVisitor.prototype = Object.create(Visitor.prototype);
SalaryVisitor.prototype.visit = function (gradute) {
  console.log(gradute.name + '的薪资是： ' + gradute.salary);
};

function AgeVisitor() {}
AgeVisitor.prototype = Object.create(Visitor.prototype);
AgeVisitor.prototype.visit = function (gradute) {
    console.log(gradute.name + '的年龄是： ' + gradute.age);
};

//将数据和数据的操作方法进行了解耦
var graduates = [new Graduate('MrC',23,5000),new Graduate('MrZ',25,8000)];
graduates.forEach(function (graduate) {
    graduate.accept(new SalaryVisitor());
});