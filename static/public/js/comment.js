$(function(){
	var comment_id = null;
	var username = $('.saveComment').attr('name') || null;
	var reply_to = null;
	//未登录跳出登录框
	var detailUnsign = $('.detailUnsign');
	if(detailUnsign){
		$('#signinModal').modal('show');
	}
	//回复
	$('.reply').click(function(){
		reply_to = $(this).attr('to_user');
		comment_id = $(this).attr('comment_id');
		if(username != reply_to){
			$('.speakTo').text('回复 '+reply_to);
			$('.cancelSpeakTo').removeClass('hide');
		}else{
			$('.speakTo').text('');
			$('.cancelSpeakTo').addClass('hide');
			comment_id = null;
		}
	});
	
	$('.cancelSpeakTo').click(function(){
		reply_to = null;
		$('.speakTo').text('');
		$('.cancelSpeakTo').addClass('hide');
	})
	//评论
	$('.saveComment').click(function(){
		var movie_id = $('.movie_id').attr('movie_id');
		var imgData = $(this).attr('imgData');
		var to_user = reply_to;
		var content = $(this).prev().val().trim();
		
		if(username == to_user){
			to_user = null;
		}
		if(imgData == 'null'){
			imgData = '/public/img/user.jpg';
		}
		if(content != ''){
			$.ajax({
				type:"post",
				url:"/user/comment",
				data:{
					'movie_id':movie_id,
					'comment_id':comment_id,
					'from_user':username,
					'to_user':to_user,
					'content':content,
					'imgData':imgData
				},
				success:function(res){
					window.location.reload();
				}
			});
		}else{
			alert('请输入内容!')
		}
	})
	//点赞
	var movie_id = $('.glyphicon-thumbs-up').attr('movie_id') || null;
	
	$('.glyphicon-thumbs-up').click(function(){
		var ups = $(this);
		var comment_id = ups.attr('comment_id');
		
		if(!username){
			alert('请先登录！');
		}else if(comment_id.indexOf(username) != -1){
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
					'user':username
				},
				dataType:'json',
				success:function(res){}
			});
		}
	})
	
//检测用户赞过的
	if(movie_id && username){
		$.ajax({
			type: "post",
			url: "/user/ups/check",
			async: true,
			data: {
				'movie_id':movie_id,
				'user': username
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