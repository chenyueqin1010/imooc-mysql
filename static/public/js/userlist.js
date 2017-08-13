$(function(){
	//删除用户
	$('.del').click(function(){
		var id = $(this).attr('data-id');
		
		$.ajax({
			type:"post",
			url:"/user/delete",
			data:{
				'id':id
			}
			dataType: 'json',
			success: function(res){
				if(res == '1'){
					$('#dg').datagrid('reload');
				}
			}
		});
		
	})
})
