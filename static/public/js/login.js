$(function(){
	$('.loginBtn').click(function(){
		var index = $(this).attr('name');
		var data = $('.loginForm').serialize();
		var username = $('#signinName').val().trim();
		var password = $('#signinPassword').val().trim();
		var signinNameError = $('.signinNameError');
		var loginError = $('#loginError');
		
		if(username == ''){
			signinNameError.text('请输入用户名');
		}else if(password == ''){
			loginError.text('请输入密码');
		}else{
			signinNameError.text('');
			$.ajax({
				type: "post",
				url: "/user/signin",
				data: data,
				dataType: 'json',
				success: function (res){
					if(res == 'none'){
						loginError.text('用户名不存在');
					}else if(res == '0'){
						loginError.text('密码错误');
					}else{
						location.reload();
					}
				}
			});
		}
	})
	
	$('.logout').click(function (){
		
		$.ajax({
			type:"get",
			url:"/user/logout",
			dataType:"json",
			success: function(res){
				if(res == '1'){
					location.reload();
				}
			}
		});		
	})
	
	var detailUnsign = $('.detailUnsign');
	if(detailUnsign){
		$('#signinModal').modal('show');
	}
})
