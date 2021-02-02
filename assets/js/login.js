$(function () {
    var form = layui.form
    var layer = layui.layer
    $('#link_reg').on('click', function () {

        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value !== $('.oldpwd').val()) {
                return '两次密码不一致';
            }
        }


    })
    // 发起ajax请求
    // 注册页面时发起请求监听注册表单的提交事件
    $('.reg-layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }

                $('#link_login').click()
            }
        })
    })



    // 监听登录表单的提交事件
    $('.login-layui-form').on('submit', function (e) {

        e.preventDefault()
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: 'http://ajax.frontend.itheima.net/api/login',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token)
                // 调用原生就是的方法重置表单数据
                $('.login-layui-form')[0].reset()
                location.href = '../../index.html'
            }

        })
    })

})