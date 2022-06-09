$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });
});
const form = layui.form;
form.verify({
  password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  repassword: (value) => {
    const pwd = $('.reg-box [name="password"]').val();
    if (value !== pwd) {
      return '两次输入密码不一样';
    }
  },
});
$('#form_reg').submit((e) => {
  e.prevenDefault();
});
