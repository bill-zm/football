// import * as callback from '../public/callback'
// document.write("<script language=javascript src='../public/callback.js'></script>");
// shareClick()

var NativeCallBack = {
    click_alert:function(){
        // alert('触发函数');
        // window.shareClick({
        //
        // })
    },
//这个 shareClick 就是 原生那边 注入的函数 ， 通过这个方法来调用原生 和传值
//parmas 是JS 给OC的数据 ， response 是 OC函数被调用之后 再 告诉JS 我被调用了
//比如微信分享，给Dic给原生 ， 原生分享成功后再把结果回调给JS 进行处理
};

export default NativeCallBack;