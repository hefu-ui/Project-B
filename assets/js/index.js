$(function () {
    var layer = layui.layer
    // 获得用户的信息
    getUserInfo()
})

// 获得用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            console.log(res);
            // 调用renderAvatar(res.data)函数渲染用户头像
            renderAvatar(res.data)
        },
        // 不管成功还是失败，最终都会调用complete回调函数

    })
}
function renderAvatar(user) {
    // 获得用户的名称
    console.log(1563);
    // var htmlStr = template('tpl', render)
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    // 渲染用户头像
    var first = user.username.substr(0, 1)
    $('.text-avatar').html(first.toUpperCase())
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').html().hide()
    }
    else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html().show()
    }
}
$('.exit').on('click', function () {
    //eg1
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '../../../reprint/login.html'
        layer.close(index);
    })
    // //eg2
    // layer.confirm('is not?', function (index) {
    //     //do something

    //     layer.close(index);
    // });
})
