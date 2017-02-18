/*
 *
 * */
function FlappyBird(container) {
    this.container = container;
    this.ncontainer = document.querySelector(this.container)
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ncontainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.currentScene = null;
    this.srcObj = {
        sky: './imgs/sky.png',
        land:'./imgs/land.png',
        pipeUp:'./imgs/pipeDown.png',
        pipeDown:'./imgs/pipeUp.png',
        bird:'./imgs/bird.png'
    }
    this.isPause = false;
    this.bind();
}

FlappyBird.prototype = {
    /*
     * @入口方法
     * 1、调用initImg方法加载游戏的所需资源，通过回调的形式获取已加载好的资源
     * 2、资源加载完毕后调用initScene方法初始化所需的场景对象，然后监听每一个场景的事件
     * 3、修改this.currentScene属性为入场场景，然后调用render方法不断的绘制该场景画面
     * */
    run: function() {
        var that = this;
        this.initImg(function(imgObj){
            that.imgObj = imgObj;
            that.initScene();
            that.currentScene = that.startScene;
            that.render();
        });
    },
    /*
     * @负责加载游戏所需资源
     * 1、创建一个图片加载器对象
     * 2、然后调用load加载方法
     * 3、监听imgAllLoaded事件，当事件发生时执行传入的回调
     * */
    initImg: function(fn) {
        var imgLoad = new ImgLoad(this.srcObj);
        imgLoad.load();
        imgLoad.on('imgAllLoaded',fn)
    },

    //创建场景对象
    initScene: function() {
        var that = this;
        //游戏开始场景
        this.startScene = new StartScene({
            ctx:this.ctx,
            img:this.imgObj,
            text:'开始游戏'
        });
        this.startScene.on('gameStart',function(){
            that.start();
        });

        //游戏场景
        this.gameScene = new GameScene({
            ctx:this.ctx,
            img:this.imgObj,
            text:'运行游戏'
        });
        this.gameScene.on('gameOver',function(){
            that.end();
        });

        //游戏结束场景
        this.overScene = new OverScene({
            ctx:this.ctx,
            img:this.imgObj,
            text:'结束游戏'
        });
        this.overScene.on('gameRestart',function(){
            that.restart();
        });
    },

    render: function() {
        //计算每次绘制之间的时间差,并开启一个定时器循环绘制
        var that = this,
            currentTime = Date.now(),
            lastTime = Date.now(),
            delatTime = 0;

        (function mainloop() {
            currentTime = Date.now();
            delatTime = (currentTime - lastTime)/1000;
            lastTime = currentTime;
            //如果,暂停了,那就isPause为true,就不执行下面的渲染代码
            if(!this.isPause){
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                that.ctx.beginPath();
                //这里是调用每个场景的draw方法,每个场景分别去触发对应场景的实例的fraw方法和update方法绘制画布
                that.currentScene.draw(delatTime);
            }
            requestAnimationFrame(mainloop)
        })();
    },

    start: function() {
        this.currentScene = this.gameScene;
    },

    pause: function() {
        this.isPause = !this.isPause;
    },

    end: function() {
        this.currentScene = this.overScene;
    },

    restart: function() {
        //重新开始需要清除之前的游戏数据,再改变场景
        this.gameScene.initRole();
        this.currentScene = this.gameScene;
    },

    bind:function(){
        var that = this;
        //绑定事件,这里需要绑定2个事件,用户键盘输入和用户点击,点击又分场景,游戏开始和结束场景,这里点击就是切换场景,在游戏场景点击就是改变小鸟下降速度
        document.addEventListener('keyup',function(e){
            if(e.keyCode == 65){
                that.pause();
            }
        })

        this.canvas.addEventListener('click',function(e){
            //currentSence代表的当前的场景,在对应的场景里面去写对应的click方法,这个只管下发指令
           that.currentScene.click(e);
        })
    }
}
