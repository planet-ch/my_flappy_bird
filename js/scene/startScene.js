function StartScene(options) {
    BaseScene.call(this, options);
}

Util.extend(StartScene.prototype, BaseScene.prototype, {
    draw:function(delatTime){
        this.drawBase(delatTime);
    },
});
