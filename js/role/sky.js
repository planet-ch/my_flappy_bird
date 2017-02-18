/**
 * Created by Administrator on 2017/1/10.
 */

function Sky(options){
    Base.call(this,options);
    //要使用Event1构造函数的方法和属性,这里借用一下属性
    Event1.call(this);
    this.x = this.w * Sky.total;
    Sky.total++;
}
Util.extend(Sky,{
    total:0,
    init:function(){
        Sky.total = 0;
    }
});
Util.extend(Sky.prototype,Event1.prototype);
Util.extend(Sky.prototype,{
    draw:function(){
        //这里面就开始绘制背景图片
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y
        );
    },
    update:function(delatTime){
        //这里面改变图片在画布上的位置,根据上一次绘制图片的时间当前时间来计算速度
        //思路2,当计算出当前对象已经离开了画布,就把它拉到画布的右边重新开始,并且,当第一个背景图像开始开始移动,就生成第2个对象填补空白并移动
        this.x -= this.speed*delatTime;
        if(this.x<-this.w){

            //如果图片向左边滑动了不能再显示自身图片了,就把它切换到第二张图片的右边,紧贴着
            this.x +=this.w*2
        }
    }
});
