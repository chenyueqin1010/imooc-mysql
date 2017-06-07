$(function(){
	var checkName = 0, checkPassword = 0, checkRpassword = 0;
	//checkName
	$('#signupName').blur(function(){
		var username = $(this).val();
		
		if(username.trim() != ''){
			$.ajax({
				type:"post",
				url:"/user/checkName",
				async:true,
				data:{
					'username': username
				},
				success: function (res){
					if(res == '1'){
						$('.signupNameError').text('用户名已被使用');
						checkName = 0;
						checkAll();
					}else if(res == '0'){
						$('.signupNameError').text('');
						checkName = 1;
						checkAll();
					}
				}
			});
		}else{
			$('.signupNameError').text('请输入用户名');
			checkName = 0;
			checkAll();
		}
		
	})
	
	//check password
	$('#signupPassword').on('input',function(){
		password = $(this).val();
		
		if(password.trim() == ''){
			$('.signupPasswordError').text('请输入密码');
			checkPassword = 0;
			checkAll();
		}else if($('#signuprPassword').val().trim() != ''){
			if(password != rpassword){
				$('.signuprPasswordError').text('密码不一致');
				checkRpassword = 0;
				checkAll();
			}
		}else{
			$('.signupPasswordError').text('');
			checkPassword = 1;
			checkAll();
		}
	})
	
	//check repeat password
	$('#signuprPassword').on('input',function(){
       rpassword = $(this).val();
		
		if(rpassword.trim() == ''){
			$('.signuprPasswordError').text('请重复密码');
			checkRpassword = 0;
			checkAll();
		}else if(password != rpassword){
			$('.signuprPasswordError').text('密码不一致');
			checkRpassword = 0;
			checkAll();
		}else if(password == rpassword){
			$('.signuprPasswordError').text('');
			checkRpassword = 1;
			checkAll();
		}
    })
	
	checkAll = function(){
		if(checkName == 1 && checkPassword == 1 && checkRpassword ==1){
			$('.registerBtn').removeAttr('disabled');
		}else{
			$('.registerBtn').attr('disabled',true);
		}
	}
})
