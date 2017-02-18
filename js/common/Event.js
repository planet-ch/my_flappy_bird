/**
 * Created by Administrator on 2017/1/9.
 */
function Event1(){
    this.event = {};
}
Event1.prototype = {
    //on是自己写的一个事件,给实例绑定绑定一些回调函数,放到一个固定好的的对象里的对应回调数组里面去,英雄做出了什么对应的事件,就遍历这个对应的回调数组,调用里面的每一个回调函数
    on: function (type, fn) {
        //第一次进来可能对象里面没有这个对应的数组
        (this.event[type] || (this.event[type] = [])).push(fn);
    },
    trigger:function(type,data){
        //先找到这次改变对应的回调函数的数组,然后遍历,每个回调都执行
        (this.event[type] || []).forEach(function(fn){
            fn(data || {});
        });
    }
}