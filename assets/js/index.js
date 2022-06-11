function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: (res) => {
      console.log(res);
      if (res.status !== 0)   return layer.msg('获取用户信息失败！');
      layer.msg('获取用户信息成功！');
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: (res) => {
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // },
  });
}
getUserInfo();
// 渲染用户头像
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  $('#welcome').html(`欢迎${name}`);
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();
    let firstName = name[0].toUpperCase();
    $('.text-avatar').html(firstName);
  }
};
// 退出登录
$('#btnLogout').click(() => {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '提示' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token');
      // 重新跳转到登录页面
      location.href = '/login.html';
    }
  );
});
