/**
 * 责任链模式
 * 使多个对象都有机会处理请求，从而避免了请求的发送者和接受者之间的耦合关系。
 * 将这些对象那个连成一条链，并沿着这条链传递该请求，直到有对象处理它为止。
 * */
var BORROW_LEVEL = {
    LOW_LEVEL:0,   //借款1w以下
    MEDIUM_LEVEL:1,  //借款1w-10w
    HIGH_LEVEL:2  //10w以上
};
//借款人
function Borrower(level,request,age) {
    this.level = level;
    this.request = request;
    this.age = age;
}

//放款人
function Handler() {
    this.handleLevel = BORROW_LEVEL.LOW_LEVEL;
    this.nextHandler = null;
}
Handler.prototype = {
    handleMessage:function (borrower) {
        if(!(borrower instanceof Borrower)){
            throw new Error('传入参数需属于Borrower类型');
        }
        if(borrower.level===this.handleLevel){
            this.response(borrower);
        }else if(this.nextHandler!==null){
            this.nextHandler.handleMessage(borrower);
        }else {
            console.log('收到请求：' + borrower.request);
            console.log('拒绝此请求');
        }
    },
    setNextHandler:function (nextHandler) {
        if(!(nextHandler instanceof Handler)){
            throw new Error('传入参数需属于Handler类型');
        }
        this.nextHandler = nextHandler;
    },
    response:function (borrower) {
        throw new Error('这是一个抽象方法');
    }
};

//贷款公司普通员工
function Staff() {
    Handler.call(this);
}
Staff.prototype = Object.create(Handler.prototype);
Staff.prototype.response = function (borrower) {
    console.log('收到请求：' + borrower.request);
    if(borrower.age < 18){
        console.log('员工不同意放贷');
    }else {
        console.log('员工同意放贷');
    }
};

//经理审批
function Manager() {
    Handler.call(this);
    this.handleLevel = BORROW_LEVEL.MEDIUM_LEVEL;
}
Manager.prototype = Object.create(Handler.prototype);
Manager.prototype.response = function (borrower) {
    console.log('收到请求：' + borrower.request);
    if(borrower.age > 18 && borrower.age < 50){
        console.log('经理同意放贷');
    }else {
        console.log('经理不同意放贷');
    }
};

//老板审批
function Boss() {
    Handler.call(this);
    this.handleLevel = BORROW_LEVEL.HIGH_LEVEL;
}
Boss.prototype = Object.create(Handler.prototype);
Boss.prototype.response = function (borrower) {
    console.log('收到请求：' + borrower.request);
    if(borrower.age > 30 && borrower.age < 40){
        console.log('老板同意放贷');
    }else {
        console.log('老板不同意放贷');
    }
};

//具体借贷人
var MrC = new Borrower(BORROW_LEVEL.HIGH_LEVEL,'贷款200000块钱',28);
var MrZ = new Borrower(BORROW_LEVEL.LOW_LEVEL,'贷款2000块钱',20);

//具体放款人
var staff = new Staff();
var manager = new Manager();
var boss = new Boss();
staff.setNextHandler(manager);
manager.setNextHandler(boss);

staff.handleMessage(MrC);  //收到请求：贷款200000块钱  老板不同意放贷
staff.handleMessage(MrZ);  //收到请求：贷款2000块钱  员工同意放贷