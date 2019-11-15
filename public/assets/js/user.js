$("#userForm").on('submit',function () {  
	// 
	var userData = $(this).serialize()

    $.ajax({
        type: "post",
        url: "/users",
        data: userData,
        success: function (response) {
            location.reload();
        },
        error: function () {  
            alert('用户添加失败')
        }
    });
    // 阻止表单提交行为
    return false;
})
// 当用户选择文件的时候 使用事件委托方便后面修改头像生效
// $('#avatar').on('change',function(){
	
// })
$('#modifyBox').on('change', '#avatar', function () {
	// console.log(this.files[0])
	var formData = new FormData();
	formData.append('avatar',this.files[0])
	$.ajax({
		type:'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			// console.log(response)
			$('#preview').attr('src',response[0].avatar)
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});
// 展示用户列表
$.ajax({
	type: 'get',
	url:'/users',
	success: response => {
		console.log(response)
		var html = template('userTpl',{data: response})
		$('#userBox').html(html)
	}
})
// 修改用户 并把需要修改的内容渲染到页面
$('#userBox').on('click', ".edit",function () {
	// 点击获取当前用户的id  这个id 通过渲染用户的时候把id值赋给编辑标签的自定义属性上
	let id = $(this).attr('data-id')
	// alert(id)
	$.ajax({
		type: "get",
		url: `/users/${id}`,
		success: function (response) {
			// console.log(response);
			let html = template('modifyTpl',response)
			console.log(html);
			$('#modifyBox').html(html);
			
		}
	});
});
// 为修改表单提交事件
$('#modifyBox').on('submit', '#modifyForm',function () {
	// 获取用户在表单中输入的内容
	let userData = $(this).serialize();
	// 获取需要修改的那个用户id
	let id = $(this).attr('data-id')
	// console.log(userData);
	$.ajax({
		type: "put",
		url: `/users/${id}`,
		data: userData,
		success: function (response) {
			console.log(response);
			// 修改成功，重新加载页面
			location.reload();
			
		}
	});
	return false
});



