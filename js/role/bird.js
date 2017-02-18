/**
 * Created by Administrator on 2017/1/10.
 */
function Bird(options){
    Base.call(this,options);
    Event1.call(this);
    this.a = 240;
    this.RotateRadian = Math.PI / 1800;//每下降一个像素,就旋转0.1
    this.maxRotateRadian = Math.PI / 4;
}
Util.extend(Bird.prototype,Event1.prototype);
Util.extend(Bird.prototype,{
    draw:function(){
        //根据速度和设定好的单位旋转弧度计算出每次需要旋转的角度
        var rotateRadian = this.speed * this.RotateRadian;

        //判断是否超过最大值,超过则使用最大值,未超过则使用计算出的
        rotateRadian = rotateRadian>this.maxRotateRadian?this.maxRotateRadian:rotateRadian;

        //保存默认状态值
        this.ctx.save();
        this.ctx.translate(this.x+this.w/2,this.y+this.h/2);
        this.ctx.rotate(rotateRadian);
        this.ctx.drawImage(
            this.img,
            this.w * this.currentFrame,
            0,
            this.w,
            this.h,
            -this.w/2,
            -this.h/2,
            this.w,
            this.h
        );
        //小鸟旋转过后,回滚默认值,不会影响到画布上的其他元素
        this.ctx.restore();
    },
    update:function(delatTime){

        //这里加上了加速度,先计算距离
        this.y += this.speed * delatTime + this.a*delatTime*delatTime/2;

        //再改变速度
        this.speed += this.a * delatTime;

        this.currentFrame = ++this.currentFrame % 3;

    },
    flyUp:function(){
        this.speed = -180;
    }
});
