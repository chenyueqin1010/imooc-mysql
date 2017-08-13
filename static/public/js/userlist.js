$(function(){
	//加载列表
	/* $('#dg').datagrid({
		url:'/user/list',
		columns:[[
			{field:'imgData',title:'头像',width:100,align:'center'},
			{field:'username',title:'用户名',width:100,align:'center'},
			{field:'role',title:'ROLE',width:100,align:'center'},
			{field:'count',title:'COUNT',width:100,align:'center'},
			{field:'action',title:'操作',width:100,align:'center',formatter:"formatAction"}
		]]
	}); */
	
	//		操作列
	function formatAction(){
		var e = ' <a href="#" class="btn btn-default actionBtn" onclick="edit()">修改</a> ';
		var d = ' <a href="#" class=" btn btn-default actionBtn" onclick="delete()">删除</a>';
		
		return e+d;
	}
	//删除用户
	$('.del').click(function(){
		var id = $(this).attr('data-id');
		
		$.ajax({
			type:"post",
			url:"/user/delete",
			data:{
				'id':id
			},
			dataType: 'json',
			success: function(res){
				if(res == '1'){
					$('#dg').datagrid('reload');
				}
			}
		});
		
	})
})
