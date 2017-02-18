/**
 * Created by hp on 2017/1/12.
 */
function BaseScene(options) {
    Event1.call(this);
    this.text = options.text;
    this.ctx = options.ctx
    this.img = options.img;
    //顺序被搞错了.先传参再根据参数初始化
    this.initRole();
}

Util.extend(BaseScene.prototype, Event1.prototype, {
    initRole: function () {
        this.roles = {
            text: [],
            button: []
        };
        //把每一个创建的子对象实例添加到对应的数组中去,方便调用歌子的draw方法
        this.roles.text.push(new Button({
            ctx: this.ctx,
            text: this.text
        }));
        this.roles.button.push(new Text({
            ctx: this.ctx,
            text: this.text
        }))
    },

    drawBase: function (delatTime) {
        //当主函数调用当前场景的draw时候,这个draw方法就会遍历当前对象对应的子对象数组,依次调用当中的每个draw和update方法
        for (var k in this.roles) {
            this.roles[k].forEach(function (role) {
                role.draw(),
                role.update(delatTime);
            });
        }
    },
    click: function () {
        //判断用户有没有点击到按钮对应的画布范围,有则触发(trigger)对应的'gameStart'事件
        this.trigger('gameStart');
    }
})
