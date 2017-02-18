/**
 * Created by Administrator on 2017/1/10.
 */
function Pipe(options){
    Base.call(this,options);
    this.a = 1;
    this.TBspace = options.TBspace || 120;
    this.LRspace = options.LRspace || 130;
    this.upImg = options.upImg;
    this.downImg = options.downImg;
    this.minY =options.minY || 50;
    this.maxY = options.maxY || (this.ctx.canvas.height/2-40);
    Event1.call(this);
    Pipe.total++;
    this.init();
}

Util.extend(Pipe,{
    total:0,
    init:function(){
        Pipe.total = 0;
    }
});
Util.extend(Pipe.prototype,Event1.prototype);
Util.extend(Pipe.prototype,{
    //画一组水管,一个上面一个下面,画之前要随机生成上面水管的y轴坐标
    init:function(){
        //写成方法是因为后面还会用到,当第一个水管出了画布之后移动到右边去重新显示还要随机生成Y坐标
        this.upy = -Util.randow(this.minY,this.maxY);
        this.downy = this.upy + this.TBspace+this.h-10;
        this.x = 300+(this.w + this.LRspace)*(Pipe.total-1)
    },
    draw:function(){
        this.ctx.rect(this.x,this.upy,this.w,this.h);
        this.ctx.rect(this.x,this.downy,this.w,this.h);
        this.ctx.drawImage(
            this.upImg,
            this.x,
            this.upy
        );
        this.ctx.drawImage(
            this.downImg,
            this.x,
            this.downy
        );

    },
    update:function(delatTime){
        this.x -= this.speed * delatTime + this.a * delatTime * delatTime /2;
        this.speed += this.a * delatTime;
        if(this.x<-this.w){
            this.x = (this.w+this.LRspace)*Pipe.total-this.w;
        }
    }
});