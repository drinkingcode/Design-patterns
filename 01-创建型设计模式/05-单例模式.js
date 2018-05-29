/*
* 单例模式
* 类仅实例化一次
* */
var BlackHuman = (function () {
    var instance = null;
    function _BlackHuman(name) {
        this.name = name;
    }
    return function (name) {
        if(instance===null){
            instance = new _BlackHuman(name);
        }
        return instance;
    }
}());

var a = new BlackHuman('Nicholas');
var b = new BlackHuman('Will');
console.log('a.name: ' + a.name);
console.log('b.name: ' + b.name);
console.log('a===b is ' + (a===b));