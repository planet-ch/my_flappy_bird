/**
 * Created by Administrator on 2017/1/9.
 */
function ImgLoad(srcs){
    this.srcs = srcs;
    this.imgs = {};
    Event1.call(this);
}
Util.extend(ImgLoad.prototype,Event1.prototype);
Util.extend(ImgLoad.prototype,{
    load:function(){
        var that = this;
        var key,imgLength = 0,imgLoaded = 0;
        for(key in this.srcs){
            imgLength++;
            var img = new Image();
            img.src = this.srcs[key];
            img.onload = function(){
                imgLoaded++;
                if(imgLoaded>=imgLength){
                    that.trigger('imgAllLoaded',that.imgs);
                }
            }
            this.imgs[key] = img;
        }

    }
})