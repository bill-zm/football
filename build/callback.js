/**
 * Created by zhangmeng on 2018/5/29.
 */
/**
 * Created by zhangmeng on 2018/5/29.
 */
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
//这也是固定的， OC 调JS ， 需要给OC调用的函数必须写在这个函数里面
setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler('testJSFunction', function(data, responseCallback) {
        alert('JS方法被调用:'+data);
        responseCallback('js执行过了');
        //shareClick()
    })
})
//这个 shareClick 就是 原生那边 注入的函数 ， 通过这个方法来调用原生 和传值
//parmas 是JS 给OC的数据 ， response 是 OC函数被调用之后 再 告诉JS 我被调用了
//比如微信分享，给Dic给原生 ， 原生分享成功后再把结果回调给JS 进行处理
// function shareClick() {
//
// }
function shareClick(type,callback){
    // alert("111")
    var params = {'title':type,'content':'测试分享的内容','url':'http://www.baidu.com'};
    window.WebViewJavascriptBridge.callHandler('shareClick',params,function(response) {
        console.log("2222"+response);
        callback(response)
    });
}