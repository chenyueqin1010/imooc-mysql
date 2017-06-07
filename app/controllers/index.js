var connection = require('../models/connection');

//index
exports.index = function(req,res){
	var sql = 'SELECT * FROM movies pb WHERE 4 > (SELECT COUNT(1) FROM movies WHERE category = pb.category AND createAt > pb.createAt) ORDER BY pb.createAt DESC';
	//电影查询
	connection.query(sql,function (err, movies) {
	    res.render('index',{
			title: '五分钟电影网',//注意冒号后带空格
			movies: movies,
		});
	});
}

//more
exports.more = function(req,res){
	var category = req.params.category;
	var sql = 'SELECT * FROM movies where category="'+category+'" order by createAt desc';
	var sql2 = 'select * from categories where value="'+category+'"';
	
	connection.query(sql,function(err,movies){
		connection.query(sql2,function(err,cat){
			res.render('more',{
				title: cat[0].name,
				movies: movies
			});
		})
	})
}

//seach
exports.seach = function(req,res){
	var seach_value = req.body.seach_value;
	var sql = 'select * from movies where title like "%'+seach_value+'%" order by createAt desc';
	
	connection.query(sql,function(err,movies){
		res.render('seach',{
			title: '搜索结果',
			movies:movies
		})
	})
}
