/**
 * Created by hp on 2017/1/12.
 */
function Button(options){
    this.text = options.text;
}
Button.prototype = {
    draw:function(){
      console.log(this.text+'按钮绘制');
    },
    update:function(){
        console.log(this.text+'更新按钮数据');
    }
}