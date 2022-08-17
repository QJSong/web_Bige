$(function () {
    getUserInfo()

    let layer = layui.layer
    //退出操作
    $('#btnLogout').on('click', function () {
        //弹出提示框
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清除本地存储 token
            localStorage.removeItem('token')
            //跳转到登录 页面
            location.href = '/login.html'
            //这是关闭提示 
            layer.close(index);
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers:
        //     { Authorization: localStorage.getItem('token') },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败')
            }
            //渲染用户头像函数
            renderAvatar(res.data)
        },

        //阻止用户在没有登录的情况下 访问index.html 页面
        // complete: function (res) {
        //     console.log(res);
        //     //responseJSON 里的值 来判断
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清空 token
        //         localStorage.removeItem('token')
        //         //跳转回登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    //获取用户名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    //按需展示用户头像
    if (user.user_pic !== null) {
        //渲染已有的用户的头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}