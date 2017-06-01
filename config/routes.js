var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');

//路由配置
module.exports=function(app){
	
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
	app.post('/user/delete', User.delete);
	app.get('/user/edit', User.edit);
	app.post('/user/upload/image',User.upload);
	
//comments
	app.post('/user/comment',Comment.new);
	app.post('/user/ups', Comment.ups);
	app.post('/user/ups/check', Comment.upsCheck);
}
