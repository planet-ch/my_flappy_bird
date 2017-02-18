/**
 * Created by hp on 2017/1/12.
 */
/**
 * Created by Administrator on 2017/1/10.
 */
function Base(options){
    this.ctx = options.ctx;
    this.img = options.img;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.widthFrame = options.widthFrame || 1;
    this.heightFrame = options.heightFrame || 1;
    this.w = options.img.width/this.widthFrame;
    this.h = options.img.height/this.heightFrame;
    this.currentFrame = options.currentFrame || 0;
    this.speed = 80; // 每秒20个像素.对象移动的速度要根据实际时间来判断,不能根据计时器
}