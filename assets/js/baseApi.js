//每次调用接口的之前 都会调用一下函数 
//可以接口的根路径提取出来 进行拼接
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一权限的接口 设置 headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 
    //阻止用户在没有登录的情况下 访问index.html 页面
    options.complete = function (res) {
        // console.log(res);
        //responseJSON 里的值 来判断
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清空 token
            localStorage.removeItem('token')
            //跳转回登录页面
            location.href = '/login.html'
        }
    }

})