// 添加分类功能
$('#addCategory').on('submit', function () {
    let formData = $(this).serialize();
    // alert(formData)
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function () {
            location.reload();
        }
    });
    // 阻止表单默认行为
    return false;
});

// 显示分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        let html = template('categoryTpl', {data:response})
        // console.log(html);
        $('#categoryBox').html(html);
        
    }
});

// 点击编辑获取当前类别的信息 并把类别当前的信息渲染到左侧的表单中
$('#categoryBox').on('click', '.edit', function () {
    let id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/"+id,
        success: function (response) {
            // console.log(response)
            let html = template('modifyCategoryTpl',response)
            // console.log(html)
            $('#formBox').html(html)
        }
    });
});

// 点击修改按钮 提交修改表单
$('#formBox').on('submit', '#modifyCategory', function () {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data: formData,
        success: function () {
            // 重新加载页面
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
})

// 删除分类
$('#categoryBox').on('click', '.delete', function () {
    // 获取要删除分类的id 
    let id = $(this).attr('data-id');
    if (confirm('你确定要删除这个分类？')) {
        $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success: function () {
            // 重新加载页面
            location.reload();
        }
    });
    };

})