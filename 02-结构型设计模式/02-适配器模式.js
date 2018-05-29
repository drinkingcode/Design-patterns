/**
 * 适配器模式
 * 将一个类的接口变换成客户端所期待的另一种接口，
 * 从而使原本因接口不匹配而无法在一起工作的两个类能够在一起工作。
 **/
//原始数据
var adaptee = ['javascript设计模式','2011-06-17'];
//目标数据
var target = {
  name:'javascript设计模式',
  time:'2011-06-17'
};

//适配器
function arr2ObjAdapter(adaptee) {
    var target = {
        name:adaptee[0],
        time:adaptee[1]
    };
    return target;
}

console.log(arr2ObjAdapter(adaptee));  //{ name: 'javascript设计模式', time: '2011-06-17' }