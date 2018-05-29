/**
 * 状态模式
 * 当一个对象内在状态改变时，允许其改变行为，这个对象看起来像改变了其类。
 * 参考：https://blog.csdn.net/chenssy/article/details/11096391
 * */

function Room() {
    this.freeState = new FreeState();
    this.subscribeState = new SubscribeState();
    this.checkInState = new CheckInState();
    this.state = null;
}
Room.prototype = {
    constructor:Room,
    subscribe:function () {
        if(this.isSetState()){
            this.state.subscribe();
        }else {
            throw new Error('需要调用setState()方法初始化房间状态');
        }
    },
    unsubscribe:function () {
        if(this.isSetState()){
            this.state.unsubscribe();
        }else {
            throw new Error('需要调用setState()方法初始化房间状态');
        }
    },
    checkIn:function () {
        if(this.isSetState()){
            this.state.checkIn();
        }else {
            throw new Error('需要调用setState()方法初始化房间状态');
        }
    },
    checkOut:function () {
        if(this.isSetState()){
            this.state.checkOut();
        }else {
            throw new Error('需要调用setState()方法初始化房间状态');
        }
    },
    setState:function (state) {
        if(!(state instanceof State)){
            throw new Error('参数需要属于State类型');
        }
        this.state = state;
        this.state.setContext(this);
    },
    isSetState:function () {
        return this.state!==null;
    }
};

//抽象状态
function State() {}
State.prototype = {
    constructor:State,
    subscribe:function () {
        throw new Error('这是一个抽象方法');
    },
    unsubscribe:function () {
        throw new Error('这是一个抽象方法');
    },
    checkIn:function () {
        throw new Error('这是一个抽象方法');
    },
    checkOut:function () {
        throw new Error('这是一个抽象方法');
    },
    setContext:function (context) {
        this.context = context;
    }
};

//空闲状态
function FreeState() {}
FreeState.prototype = Object.create(State.prototype);
FreeState.prototype.subscribe = function () {
    console.log('您已成功预定希尔顿酒店');
    this.context.setState(this.context.subscribeState);
};
FreeState.prototype.unsubscribe = function () {};
FreeState.prototype.checkIn = function () {
    console.log('您已成功入住希尔顿酒店');
    this.context.setState(this.context.checkInState);
};
FreeState.prototype.checkOut = function () {
    console.log('您尚未入住希尔顿酒店');
};


//预定状态
function SubscribeState() {}
SubscribeState.prototype = Object.create(State.prototype);
SubscribeState.prototype.subscribe = function () {
    console.log('您已预定过了希尔顿酒店');
};
SubscribeState.prototype.unsubscribe = function () {
    console.log('您已成功取消预订希尔顿酒店');
    this.context.setState(this.context.freeState);
};
SubscribeState.prototype.checkIn = function () {
    console.log('您已成功入住希尔顿酒店');
    this.context.setState(this.context.checkInState);
};
SubscribeState.prototype.checkOut = function () {};

//入住状态
function CheckInState() {}
CheckInState.prototype = Object.create(State.prototype);
CheckInState.prototype.subscribe = function () {};
CheckInState.prototype.unsubscribe = function () {};
CheckInState.prototype.checkIn = function () {
    console.log('您已入住过了希尔顿酒店');
};
CheckInState.prototype.checkOut = function () {
    console.log('您已成功退房希尔顿酒店');
    this.context.setState(this.context.freeState);
};


var room = new Room();
room.setState(new SubscribeState());
room.subscribe();
room.checkIn();
room.checkIn();
room.checkOut();