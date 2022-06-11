$(function () {
  //
  const form = layui.form;
  form.verify({
    nickname: (value) => {
      if (value.length > 12) return '亲爱的 你的昵称不能超过6个字符';
    },
  });

  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (resizeBy.status !== 0) return layer.msg('获取用hi信息失败');
        layer.msg('获取信息成功');
        console.log(res);
        form.val('formUserInfo', res.data);
      },
    });
  };
  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserInfo();
  });

  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('已更新信息');
        layer.msg('更新用户成功');
        window.parent.getUserInfo();
      },
    });
  });
  initUserInfo();
});
