function OverScene(options) {
    BaseScene.call(this, options);
}

Util.extend(OverScene.prototype, BaseScene.prototype, {

    draw:function(delatTime){
        this.drawBase(delatTime);
    },
    /*
     * @点击，判断是否点到该场景内的按钮，如果点到则触发gameRestart事件
     * */
    click: function(e) {
        this.trigger('gameRestart');
    }
});
