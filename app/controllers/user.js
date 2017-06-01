var connection = require('../models/connection');
var bcrypt = require('bcrypt');//加密中间件
var SALT_WORK_FACTOR = 10;

//userlist
exports.list = function(req,res){
    var  sql = 'SELECT * FROM users';
	//电影查询
	connection.query(sql,function (err, users) {
    res.render('userlist',{
			title: '用户列表页',//注意冒号后带空格
			users: users
		});
	});

}
//signup
exports.signup = function(req, res){
	var user = req.body.user;
	
	//密码加盐处理
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
		bcrypt.hash(user.password, salt, function (err, hash){
			var hash_password = hash;
			var data = [user.name,hash_password];
			var sql = 'insert into users(username,password) values(?,?)';
			
			connection.query(sql,data,function(err,response){
				if(err){
					console.log(err.message);
				}
				res.redirect('/userlist');
			})
		})
	})
}
//signin
exports.signin = function(req,res){
	var user = req.body.user;
	var sql = 'select * from users where username=?';
	var data = user.name;
			
	connection.query(sql,data,function(err,result){
		if(result.length == 0){
			res.json('none');//用户不存在
			return;
		}
		var db_password = result[0].password;
		bcrypt.compare(user.password, db_password, function (err,isMatch){
			if(isMatch){
				res.json(result[0]);
				return;
			}
			res.json('0');
			return;
		})
	})
}
//delete
exports.delete = function(req,res){
	var id = req.body.id;
	var sql = 'delete from users where id='+id;
	
	connection.query(sql,function(err,result){
		if(err){
			console.log(err.message);
		}
	})
}

//user edit
exports.edit = function(req,res){
	res.render('user',{
		title:'个人设置'
	})
}
//user upload
exports.upload = function(req,res){
	var imgData = req.body.imgData;
	var username = req.body.username;
	var sql_u = 'update users set imgData=? where username=?';
	var sql_c = 'update comments set imgData=? where from_user=?';
	var data = [imgData, username];
	
	connection.query(sql_u, data, function (err, result){
		connection.query(sql_c, data, function (err, result){
			res.json('upload success');
		})
	})
	
}
