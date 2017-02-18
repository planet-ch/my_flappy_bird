function GameScene(options) {
    this.img = options.img;
    this.LRspace = options.LRspace || 130;
    this.TBspace = options.TBspace || 130;
    BaseScene.call(this, options);
}

Util.extend(GameScene.prototype, BaseScene.prototype, {

    calculateRoleNumber:function(imgwidth){
        return  Math.ceil(this.ctx.canvas.width / imgwidth)+1;
    },
    /*
     * @创建该场景所需对象
     * 1、创建文本对象和按钮对象，添加到this.roles里
     * */
    initRole: function() {
        this.roles = {
            sky: [],
            pipe: [],
            land: [],
            timer: [],
            bird: []
        }
        Sky.init();
        // 创建天空
        var skyL = this.calculateRoleNumber(this.img.sky.width);
        for(var i = 0;i<skyL;i++){
            this.roles.sky.push(new Sky({
                ctx: this.ctx,
                img: this.img.sky
            }));
        }

        Land.init();
        var landL = this.calculateRoleNumber(this.img.land.width)
        // 创建大地
        for(var i = 0;i<landL;i++){
            this.roles.land.push(new Land({
                ctx: this.ctx,
                img: this.img.land
            }));
        }
        Pipe.init();
        var pipeL = this.calculateRoleNumber(this.img.pipeDown.width + this.LRspace)
        // 创建管道
        for(var i = 0;i<pipeL;i++){
            this.roles.pipe.push(new Pipe({
                ctx: this.ctx,
                img: this.img.pipeDown,
                upImg: this.img.pipeUp,
                downImg: this.img.pipeDown
            }));
        }

        // 创建计时器
        this.roles.timer.push(new Timer({
            ctx: this.ctx
        }));

        // 创建小鸟
        this.roles.bird.push(new Bird({
            ctx: this.ctx,
            img: this.img.bird,
            widthFrame : 3,
            x: 25
        }));

    },

    draw:function(delatTime){
        this.drawBase(delatTime);
        this.isDie();
    },
    /*
     * @点击，小鸟上飞
     * */
    click: function() {
        this.roles.bird[0].flyUp();
    },
    isDie:function(){
        var bird = this.roles.bird[0];
        var landH = this.roles.land[0].h;
        if(this.ctx.isPointInPath(bird.x+bird.w/2,bird.y+bird.h/2)){
            this.trigger('gameOver')
        }else if(bird.y<-bird.h){
            this.trigger('gameOver')
        }else if(bird.y> this.ctx.canvas.height - landH - bird.h){
            this.trigger('gameOver');
        }
    }
});