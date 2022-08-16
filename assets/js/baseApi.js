//每次调用接口的之前 都会调用一下函数 
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})