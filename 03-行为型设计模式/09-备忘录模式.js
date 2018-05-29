/**
 * 备忘录模式
 * 在不破坏封装性的前提下，捕获一个对象内部状态，并在该对象之外保存这个状态。
 * 这样以后就可将该对象恢复到原先保存的状态。
 * */
function Boy(state) {
    this.state = state;
}
Boy.prototype = {
    constructor:Boy,
    getState:function () {
        return this.state;
    },
    setState:function (state) {
        this.state = state;
    },
    meet:function () {
      this.state = '搭讪失败，心情不好';
    },
    createMemento:function () {
        return new Memento(this.state);
    },
    restoreMemento:function (memento) {
        this.state = memento.state;
    }
};

//备忘录
function Memento(state) {
    this.state = state;
}
Memento.prototype = {
    constructor:Memento,
    getState:function () {
        return this.state;
    },
    setState:function (state) {
        this.state = state;
    }
};


//备忘录管理类
function Caretaker() {
    this.memento = null;
}
Caretaker.prototype = {
    constructor:Caretaker,
    getMemento:function () {
        return this.memento;
    },
    setMemento:function (memento) {
        this.memento = memento;
    }
};


var boy = new Boy('心情很好！');
console.log(boy.getState());
var caretaker = new Caretaker();
caretaker.setMemento(boy.createMemento());
boy.meet();
console.log(boy.getState());
boy.restoreMemento(caretaker.getMemento());
console.log(boy.getState());