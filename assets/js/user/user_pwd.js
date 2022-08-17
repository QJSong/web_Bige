$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({

        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },

        rePwds: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '确认密码有误'
            }
        }
    })

    //提交修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功！')

                //先转换为dome对象 子调用 reset()
                $('.layui-form')[0].reset()
            }
        })
    })
})