/**
 * Created by Administrator on 2017/1/10.
 */
function Land(options){
    Base.call(this,options);
    Event1.call(this);
    this.y = this.ctx.canvas.height - this.h;
    this.x = Land.total * this.w;
    Land.total++;
}
Util.extend(Land,{
    total:0,
    init:function(){
        Land.total = 0
    }
});
Util.extend(Land.prototype,Event1.prototype);
Util.extend(Land.prototype,{
    draw:function(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y
        );
    },
    update:function(delatTime){
        this.x -= this.speed*delatTime;
        if(this.x<-this.w){
            this.x = (this.w * (Land.total-1))-8;
            console.log(this.x);
        }
    }
});
