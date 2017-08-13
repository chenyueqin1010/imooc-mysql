var connection = require('../models/connection');
var bcrypt = require('bcrypt');//加密中间件
var SALT_WORK_FACTOR = 10;

//userlist
exports.list = function(req,res){
	$page = req.body.page ? req.body.page : 1;
	$rows = req.body.rows ? req.body.rows : 10;
	$offset = ($page-1)*$rows;
	$result = array();

	$rs = "select count(*) from users";
	
	connection.query($rs,function(err,result){
		var users = result[0];
		res.render('userlist',{
			title: '用户列表页',//注意冒号后带空格
			users: users
		});
	}) 
	/* $rs = connectionquery("select * from users limit $offset,$rows");
	
	$items = array();
	while($row = connection.fetch.object($rs)){
		array.push($items, $row);
	}
	$result["rows"] = $items;

	res.json($result); */
	
    //var  sql = 'SELECT * FROM users';
    

	

}
//checkName
exports.checkName = function (req, res){
	var username = req.body.username;
	var sql = 'select id from users where username=?';
	var data = username;
	
	connection.query(sql,data,function(err,result){
		if(result.length == 0){
			res.json('0');
		}else{
			res.json('1');
		}
	})
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
				res.redirect('/');
			})
		})
	})
}

//signin
exports.signin = function(req,res){
	var user = req.body.user;
	var sql_u = 'select * from users where username=?';
	var data_u = user.name;
			
	connection.query(sql_u,data_u,function(err,result){
		if(result.length == 0){
			res.json('none');//用户不存在
			return;
		}
		var db_password = result[0].password;
		bcrypt.compare(user.password, db_password, function (err,isMatch){
			if(isMatch){
				//改变count值
				if(result[0].role != 100){
					var count = result[0].count + 1;
					var sql_count = 'update users set count=? where username=?';
					var data_count = [count,user.name];
					
					connection.query(sql_count,data_count,function (err) {
				       
					});
				}
				
				req.session.user = result[0];
				res.json(result[0]);
				return;
			}
			res.json('0');
			return;
		})
	})
}
	
//退出
exports.logout = function (req,res){
	req.session.destroy();
	res.json('1');
}

//delete
exports.delete = function(req,res){
	var id = req.body.id;
	var sql = 'delete from users where id='+id;
	
	connection.query(sql,function(err,result){
		res.json('1');
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
			req.session.user.imgData = imgData;
			res.json('upload success');
		})
	})
}
