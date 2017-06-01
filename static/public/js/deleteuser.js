$(function(){
	$('.del').click(function(){
		var id = $(this).attr('data-id');
		
		$.ajax({
			type:"post",
			url:"/user/delete",
			data:{
				'id':id
			}
		});
		location.reload();
	})
})
