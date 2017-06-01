$(function(){
	$('.loginBtn').click(function(){
		var data = $('.loginForm').serialize();
		
		$.ajax({
			type:"post",
			url:"/user/signin",
			data:data,
			dataType:'json',
			success:function(res){
				if(res == 'none'){
					$('#loginError').text('用户名不存在！');
				}else if(res == '0'){
					$('#loginError').text('密码错误！');
				}else{
					sessionStorage.setItem('username',res.username);
					sessionStorage.setItem('imgData',res.imgData);
					location.reload();
				}
			}
		});
	})
	
	var username = sessionStorage.getItem('username');
	var imgData = sessionStorage.getItem('imgData');
	
	if(username){
		$('.loginUser').show();
		$('.noUser').hide();
		$('.loginUserName').text(username);
	}else{
		$('.loginUser').hide();
		$('.noUser').show();
	}
	
	$('.logout').click(function(){
		sessionStorage.clear();
		location.reload();
	})
	
	if(imgData != 'null'){
		$('.imgData').attr('src',imgData);
	}
})
