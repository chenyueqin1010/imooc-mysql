var mysql  = require('mysql');

//链接数据库
var connection = mysql.createConnection({     
  host     : 'sql9.freemysqlhosting.net',       
  user     : 'sql9178856',              
  password : 'QrxrQ42Igy',                        
  database: 'sql9178856', 
});
connection.connect();

//var mysql = require('mysql');
//var session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);
// 
//var options = {
//	host: 'localhost',
//	port: 3306,
//	user: 'root',
//	password: '',
//	database: 'imooc',
//	schema: {
//	tableName: 'sessions',
//	columnNames: {
//	    session_id: 'session_id',
//	    expires: 'expires',
//	    data: 'data'
//	  }
//	}
//};
// 
//var connection = mysql.createConnection(options); // or mysql.createPool(options); 
//var sessionStore = new MySQLStore({}/* session store options */, connection)

module.exports = connection;