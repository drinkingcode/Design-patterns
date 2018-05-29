/**
 * 享元模式
 * 使用共享对象可有效地支持大量的细粒度的对象
 * */
function Person(name,age,sex) {
    this.name = typeof(name)==='undefined'?'':name;
    this.age = typeof(age)==='undefined'?18:age;
    this.sex = typeof(sex)==='undefined'?'female':sex;
}

function Teacher(num,name,age,sex) {
    Person.call(this,name,age,sex);
    this.num = typeof(sex)==='undefined'?null:num;
}

var TeacherFactory = (function () {
    var pool = [];
    return {getTeacher:function (num) {
                            if(!pool.hasOwnProperty(num)){
                                    pool[num] = new Teacher(num);
                                }
                            return pool[num];
                        }
            };
})();

var teacher_01 = TeacherFactory.getTeacher('000938');
var teacher_02 = TeacherFactory.getTeacher('000939');
var teacher_03 = TeacherFactory.getTeacher('000940');
var teacher_04 = TeacherFactory.getTeacher('000938');

//num属性相同的对象就得到了共享
console.log(teacher_01===teacher_04);  //true