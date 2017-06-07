var connection = require('../models/connection');

//详情页
exports.detail = function(req,res){
	var id = req.params.id;
	var sql1 = 'SELECT * FROM movies where id='+id;
	var sql2 = 'SELECT * FROM comments where movie_id='+id+' and to_user is null';
	var sql3 = 'SELECT * FROM comments where movie_id='+id+' and content is null';
	//电影查询
	connection.query(sql1,function (err, movie) {
		connection.query(sql2,function(err,comments){
			connection.query(sql3,function(err,replys){
			    res.render('detail',{
					title: movie[0].title,//注意冒号后带空格
					movie: movie[0],
					comments: comments,
					replys: replys
				});
			})
		})
	});
}

//电影录入
exports.admin = function(req,res){
	var sql = 'select * from categories';
	
	connection.query(sql,function(err,categories){
	    res.render('admin',{
			title: '五分钟电影——录入页',//注意冒号后带空格
			movie:{
				title: '',
				director: '',
				language: '',
				poster: '',
				flash: '',
				year: '',
				summary: ''
			},
			categories:categories
		});
	})
}
//电影列表
exports.list = function(req,res){
    var  sql = 'SELECT * FROM movies order by createAt desc';
	//电影查询
	connection.query(sql,function (err, movies) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
	    res.render('list',{
			title: '五分钟电影——列表页',//注意冒号后带空格
			movies: movies
		});
	});
}
//更新 保存电影
exports.save = function(req,res){
	var m = req.body.movie;
	var id = m.id;
	
	if(id == 'undefined'){
	//insert
		var sql = 'insert into movies(title,director,country,poster,year,flash,summary,createAt,category) values(?,?,?,?,?,?,?,?,?)';
		var createAt = new Date();
		var data = [m.title,m.director,m.country,m.poster,m.year,m.flash,m.summary,createAt,m.category];
		
		connection.query(sql,data,function (err,result) {
	        res.redirect('/movie/' + result.insertId);
		});
	}else{
	//update
		var sql = 'update movies set title=?,director=?,country=?,poster=?,year=?,flash=?,summary=?,category=? where id=?';
		var data = [m.title,m.director,m.country,m.poster,m.year,m.flash,m.summary,m.category,id];
		
		connection.query(sql,data,function (err) {
	        res.redirect('/movie/' + id);
		});
	}
}

//update
exports.update = function(req,res){
	var id = req.params.id;//获取url地址内的id
	var sql2 = 'select * from categories';
	
	if (id) {
		var  sql = 'SELECT * FROM movies where id='+id;
		//电影查询
		connection.query(sql,function (err, movie) {
			connection.query(sql2,function(err,categories){
		      	res.render('admin',{
					title: '电影修改页',//注意冒号后带空格
					movie: movie[0],
					categories:categories
				});
			})
		});
	}
}

//delete
exports.delete = function(req,res){
	var id = req.params.id;//获取url地址内的id
	
	if (id) {
		var  sql = 'delete FROM movies where id='+id;
		//电影查询
		connection.query(sql,function (err, movie) {
			res.redirect('/list');
		});
	}
}
