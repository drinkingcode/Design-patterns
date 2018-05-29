/**
 * 外观模式
 * 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易。
 */
var cpu = {
    startup:function () {
        console.log('启动cpu');
    },
    shutdown:function () {
        console.log('关闭cpu');
    }
};


var memory = {
    startup:function () {
        console.log('启动memory');
    },
    shutdown:function () {
        console.log('关闭memory');
    }
};


var disk = {
    startup:function () {
        console.log('启动disk');
    },
    shutdown:function () {
        console.log('关闭disk');
    }
};


//使用外观模式之前
//开机
cpu.startup();
memory.startup();
disk.startup();
//关机
disk.shutdown();
memory.shutdown();
cpu.shutdown();


//使用外观模式之后,对原有接口进行再次封装,使其更易于使用,代码更清晰简单
var facade = {
  startup:function () {
      cpu.startup();
      memory.startup();
      disk.startup();
  },
  shutdown:function () {
      disk.shutdown();
      memory.shutdown();
      cpu.shutdown();
  }
};
//开机
facade.startup();
//关机
facade.shutdown();