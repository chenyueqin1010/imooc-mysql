var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');
var connection = require('../app/models/connection');
var bcrypt = require('bcrypt');//加密中间件

//路由配置
module.exports=function(app){
	
//分类列表
	var sql_c = 'select * from categories';
	connection.query(sql_c,function(err,categories){
		app.locals.categories = categories;
	})
	
	app.use(function(req, res, next){
		app.locals.user = req.session.user || null;
		next();
	});
	
//movie
	app.get('/', Index.index);
	app.get('/categories/:category', Index.more);
	app.post('/movies/seach', Index.seach);
	app.get('/movie/:id',Movie.detail);
	app.get('/admin',Movie.admin);
	app.post('/admin/movie/save', Movie.save);
	app.get('/movie/update/:id', Movie.update);
	app.get('/movie/delete/:id', Movie.delete);
	app.get('/list', Movie.list);
	
//user
	app.get('/userlist', User.list);
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/user/logout', User.logout);
	app.post('/user/delete', User.delete);
	app.get('/user/edit', User.edit);
	app.post('/user/upload/image',User.upload);
	app.post('/user/checkName',User.checkName);
	
//comments
	app.post('/user/comment',Comment.new);
	app.post('/user/ups', Comment.ups);
	app.post('/user/ups/check', Comment.upsCheck);
}
