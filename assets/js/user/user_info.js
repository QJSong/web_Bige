$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1～6个字符之间！'
            }
        }
    })
    //初始化用户基本信息
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用 form.val() 给表单赋值
                form.val('formUserInfo', res.data)

            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        getUserInfo()
    })

    //修改表单内容
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                //调用父页面的方法 重新渲染头像和昵称
                window.parent.getUserInfo()
            }
        })
    })
})

