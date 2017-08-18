var connection = require('../models/connection');

//添加评论
exports.new = function(req, res){
	var c = req.body;
	var createAt = new Date();
	createAt.setHours(createAt.getHours()+8);
	//insert
	var sql = 'insert into comments(movie_id, comment_id, from_user, content,imgData,createAt) values(?, ?, ?, ?, ?, ?)';
	
	if(!c.comment_id){
		c.comment_id =new Date().getTime() + c.from_user;
	}
	
	var data = [c.movie_id, c.comment_id, c.from_user, c.content, c.imgData,createAt];

	if(c.to_user){
		if(!c.imgData){
			c.imgData = null;
		}
		sql = 'insert into comments(movie_id, comment_id, from_user, to_user, reply_content,imgData,createAt) values(?,?, ?, ?, ?, ?,?)';
		data = [c.movie_id, c.comment_id, c.from_user, c.to_user, c.content, c.imgData,createAt];
	}
	
	connection.query(sql, data, function (err, result){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
}
//点赞功能
exports.ups = function (req,res){
	var movie_id = req.body.movie_id;
	var id = req.body.id;
	var comment_id = req.body.comment_id;
	var user = req.body.user;
	
	var sql = 'insert into ups (movie_id,comment_id,user) values(?,?,?)';
	var sql2 = 'update comments set ups=ups+1 where id = '+id;
	var data= [movie_id,comment_id,user];
	
	connection.query(sql,data,function(err,result){
		connection.query(sql2,function(err,result2){
			res.json('ups success');
		})
	})
}
exports.upsCheck = function (req, res){
	var movie_id = req.body.movie_id;
	var user = req.body.user;
	var sql = 'select comment_id from ups where movie_id =? and user = ?';
	var data = [movie_id,user];
	
	connection.query(sql,data,function(err,result){
		res.json(result);
	})
}
