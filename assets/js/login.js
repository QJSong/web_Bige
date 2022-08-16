$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //layui里获取form 对象
    let form = layui.form
    let layer = layui.layer

    //通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function (value) {
            if ($('#regpwd').val() !== value) {
                return '两次密码不一样'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name = username]').val(),
                password: $('#form_reg [name = password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                $('#link-login').click()

            }
        })

    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg(res.message)

                //登录成功后 需要获取token值 存到 localStorage
                localStorage.setItem('token', res.token)

                //跳转到首页
                location.href = '/index.html'
            }
        })


    })

})