var express = require('express');
var path = require('path');//路径解析
var bodyParser = require('body-parser');//解析表单数据
var app = module.exports = express();
var connection = require('./app/models/connection');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(cookieParser());
app.locals.moment = require('moment'); // 载入moment模块，格式化日期

app.listen(80);
console.log('server started on 80 host');


//前端源码美化
if('development' === app.get('env')){
	app.locals.pretty = true;
}

app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: true
}));

require('./config/routes')(app);