$('#modifyForm').on('submit', function () {
    let formData = $(this).serialize();
    // console.log(formData);
    
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function () {
            location.href= '/admin/login.html'
        }
    });
    // 阻止表单默认提交行为
    return false;
});