/**
 * 组合模式
 *将对象组合成树形结构以表示“部分-整体”的层次结构，使得用户对单个对象和组合对象的使用具有一致性。
 * */
var MyArray = function () {};
MyArray.prototype = Object.create(Array.prototype);
MyArray.prototype.toString = function toString() {
    var result = '[';
    for(var i=0; i<this.length; i++){
        result += this[i].toString();
        if(i<this.length-1){
            result += ',';
        }
    }
    result += ']';
    return result;
};

function Component(name,position,salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
}
Component.prototype = {
    constructor:Component,
    getInfo:function () {
        var info = '名字：' + this.name + ' 职位：' + this.position + ' 薪资：' + this.salary;
        console.log(info);
    },
    toString:function () {
        return '{name:' + this.name + ',position:' + this.position + ',salary:' + this.salary + '}';
    }
};

function Leaf(name,position,salary) {
    Component.call(this,name,position,salary);
}
Leaf.prototype = Object.create(Component.prototype);

function Composite(name,position,salary) {
    Component.call(this,name,position,salary);
    this.sub = new MyArray();
}
Composite.prototype = Object.create(Component.prototype);
Composite.prototype.add = function (component) {
    if(!(component instanceof Component)){
        throw new Error('参数需属于Component类型');
    }
    this.sub.push(component);
};
Composite.prototype.getSub = function () {
  return this.sub;
};
Composite.prototype.toString = function () {
    return '{name:' + this.name + ',position:' + this.position + ',salary:' + this.salary + ',sub:' + this.sub.toString() + '}';
};

var chief = new Composite('小程','董事长',100000);
var developDep = new Composite('小王','开发部部长',30000);
var financeDep = new Composite('小红','财务部部长',25000);
var developDepGroup = new Composite('小张','开发部组长',15000);
var developDepStaff_1 = new Leaf('小李','开发人员',10000);
var developDepStaff_2 = new Leaf('小陈','开发人员',8000);
var financeDepStaff = new Leaf('小丽','财务人员',6000);
developDepGroup.add(developDepStaff_1);
developDepGroup.add(developDepStaff_2);
developDep.add(developDepGroup);
financeDep.add(financeDepStaff);
chief.add(developDep);
chief.add(financeDep);

chief.getInfo();
developDep.getInfo();
developDepStaff_1.getInfo();
console.log(chief.getSub().toString());