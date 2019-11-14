$('#logout').on('click', function () {
  let isLogout = confirm('你确定退出登录吗')
  $.ajax({
    type: "post",
    url: "/logout",
    success: function () {
      location.href = 'login.html'
    },
    error: function () {  
      alert('退出失败')
    }
  });
});