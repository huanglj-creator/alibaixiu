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
		// console.log(response)
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

// 删除功能
$('#userBox').on('click', '.delete', function () {
	if (confirm('你确定要删除吗？')) {
		let id = $(this).attr('data-id')
		$.ajax({
			type: "delete",
			url: `/users/${id}`,
			success: function () {
				location.reload();
			}
		});
	}
});

// 批量删除功能
// 获取全选按钮的jquery对象
const selectAll = $('#selectAll')
// 批量删除
const deleteMany = $('#deleteMany')
// 为全选按钮绑定change事件
selectAll.on('change',function () { 
	let status = $(this).prop('checked');
	// 如果全选按钮选中
	if (status) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}
	// console.log(status);
	$('#userBox').find('input').prop('checked',status);
	
 })

// 为当用户前面的复选框绑定change事假 发生改变时
$('#userBox').on('change', '.userStatus', function () {
	let inputs = $('#userBox').find('input');
	if (inputs.length == inputs.filter(':checked').length) {
		selectAll.prop('checked',true)
	}else{
		selectAll.prop('checked',false)
	}
	// 如果选中复选框的个数大于0 则说明有选中的复选框
	if (inputs.filter(':checked').length > 0) {
		// 显示批量删除按钮
		deleteMany.show();
	} else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}
});

// 为批量删除按钮添加点击事件
deleteMany.on('click',function () { 
	let ids = []
	let checkedUser = $('#userBox').find('input').filter(':checked');
	// 遍历的element是原生的dom元素 所以使用jquery时需要$()
	checkedUser.each(function (index,element) { 
		// jquery
		ids.push($(element).attr('data-id'))
		// 原生js 获取自定义属性值
		// element.dataset.id
	 })
	//  console.log(ids.join('-'));
	if (confirm('你确定要进行批量删除操作吗？')) {
		$.ajax({
			type: "delete",
			url: "/users/"+ids.join('-'),
			success: function () {
				location.reload();
			}
		});
	}
	 
})

