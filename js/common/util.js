/**
 * Created by Administrator on 2017/1/9.
 */
var Util = {
    extend:function(){
        var arg = arguments, argLen = arg.length;
        var i = 1, key;
        var target = arg[0];

        // 遍历得到后面的每一个对象
        for(; i < argLen; i++) {

            // 遍历得到后面每一个对象的属性
            for(key in arg[i]) {
                if(arg[i].hasOwnProperty(key)) {
                    target[key] = arg[i][key];
                }
            }
        }
    },
    randow:function(min,max){
        min = min || 0;
        max = max || 1;
        return Math.random() * (max-min) + min
    }
}