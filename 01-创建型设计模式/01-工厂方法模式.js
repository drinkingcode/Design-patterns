/*
* 工厂方法模式
* 将需要创建的具体类放置在工厂中，当需要创建某个类的对象时，则根据其传入的条件来动态创建并返回，
* 这样代码的内聚性就得到了提高
* */
function HumanFactory(type) {
    if(this instanceof HumanFactory){
        return new this[type];
    }else {
        return new HumanFactory(type); //执行这里的时候，又会转到第一步if()语句
    }
}

HumanFactory.prototype = {
    constructor:HumanFactory,
    BlackHuman:(function () {
        function _blackHuman() {
            this.name = '黑人';
        }
        _blackHuman.prototype = {
            getInfo:function () {
                return '这是一个黑人';
            }
        };
        return _blackHuman;
    }()),
    YellowHuman:(function () {
        function _yellowHuman() {
            this.name = '黄人';
        }
        _yellowHuman.prototype = {
            getInfo:function () {
                return '这是一个黄人';
            }
        };
        return _yellowHuman;
    }()),
    WhiteHuman:(function () {
        function _whiteHuman() {
            this.name = '白人';
        }
        _whiteHuman.prototype = {
            getInfo:function () {
                return '这是一个白人';
            }
        };
        return _whiteHuman;
    }())
};

var HumanType = {
    BlackHuman:'BlackHuman',
    YellowHuman:'YellowHuman',
    WhiteHuman:'WhiteHuman'
};

var whiteHuman = new HumanFactory(HumanType.WhiteHuman);
var yellowHuman = new HumanFactory(HumanType.YellowHuman);
var blackHuman = new HumanFactory(HumanType.BlackHuman);
console.log(whiteHuman.name);
console.log(whiteHuman.getInfo());
console.log(yellowHuman.name);
console.log(yellowHuman.getInfo());
console.log(blackHuman.name);
console.log(blackHuman.getInfo());
