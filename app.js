var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var mongoose = require('mongoose');

router.set('views', __dirname + '/views'); // views where?
router.set('view engine', 'ejs'); //views working format
router.engine('html', require('ejs').renderFile); //ejs -> HTML




//app.use(express.static('public')); //design form

router.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
router.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true
})); // session setting

// port config
var port = process.env.PORT || 8080;

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

//mongoose.connect('mongodb://ipadderss/userinfo'); external ip connect
mongoose.connect('mongodb://localhost/userinfo');
//var Userinfo = require('./model/User');
var route = require('./router/router')//(router,Userinfo);
router.use('/',route);

var server = router.listen(port, function(){
	console.log("Express server has started on port 8080")
}); //server create

