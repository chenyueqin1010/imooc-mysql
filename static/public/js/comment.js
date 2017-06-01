$(function(){
	var comment_id = null;
	var user = sessionStorage.getItem('username');
	//回复
	$('.reply').click(function(){
		var reply_to = $(this).attr('to_user');
		comment_id = $(this).attr('comment_id');
		sessionStorage.setItem('reply_to',reply_to);
	});
	//评论
	$('.saveComment').click(function(){
		var movie_id = $('.movie_id').attr('movie_id');
		var imgData = sessionStorage.getItem('imgData');
		var to_user = sessionStorage.getItem('reply_to');
		var content = $(this).prev().val().trim();
		
		if(user == to_user){
			to_user = null;
		}
		if(imgData == 'null'){
			imgData = '/public/img/user.jpg';
		}
		if(user){
			if(content != ''){
				$.ajax({
					type:"post",
					url:"/user/comment",
					data:{
						'movie_id':movie_id,
						'comment_id':comment_id,
						'from_user':user,
						'to_user':to_user,
						'content':content,
						'imgData':imgData
					},
					success:function(res){
						sessionStorage.removeItem('reply_to');
						window.location.reload();
					}
				});
			}else{
				alert('请输入内容!')
			}
		}else{
			alert('请登录后评论!')
		}
	})
	//点赞
	var movie_id = $('.glyphicon-thumbs-up').attr('movie_id') || null;
	
	$('.glyphicon-thumbs-up').click(function(){
		var ups = $(this);
		var comment_id = ups.attr('comment_id');
		
		if(!user){
			alert('请先登录！');
		}else if(comment_id.indexOf(user) != -1){
			alert('自己不能赞自己哦！');
		}else{
			var id = ups.attr('commentId');
			var num = parseInt(ups.text());
			movie_id = ups.attr('movie_id');
			
			num+=1;
			ups.text(' ' + num);
			ups.addClass('disabled text-muted');
			
			$.ajax({
				type:"post",
				url:"/user/ups",
				async:true,
				data:{
					'id':id,
					'movie_id': movie_id,
					'comment_id':comment_id,
					'user':user
				},
				dataType:'json',
				success:function(res){}
			});
		}
	})
	
//检测用户赞过的
	if(movie_id && user){
		$.ajax({
			type: "post",
			url: "/user/ups/check",
			async: true,
			data: {
				'movie_id':movie_id,
				'user': user
			},
			dataType:'json',
			success: function (result){
				var len = result.length;
				for(var i = 0; i<len; i++){
					$('a[comment_id="'+result[i]['comment_id']+'"]').addClass('disabled text-muted');
				}
			}
		});
	}
})			