var express = require('express'),
	middlewares =  require('./middlewares/admin'),
	swig = require('swig');

var ExpressServer = function(config){
	
	config = config || {};

	this.expressServer = express();

	//middlewares
	for(var middleware in middlewares){
		this.expressServer.use(middlewares[middleware]);
	}

	this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', __dirname + '/website/views/templates');
    swig.setDefaults({varControls:['[[',']]']});

	this.expressServer.get('/article/save/', function(req,res,next){
		res.render('article_save',{nombre: 'JoseDiego'});
	});

	this.expressServer.get('/article/remove/', function(req,res,next){
	    res.send('Hello from article remove');
	});

	this.expressServer.get('/article/add/', function(req,res,next){
	    res.send('Hello from article add');
	});

	this.expressServer.get('/article/see/:data', function(req,res,next){
	    res.send('Hello from article see');
	});

	this.expressServer.get('/article/edit/:data', function(req,res,next){
	    res.send('Hello from article edit');
	});

	this.expressServer.get('/article/list/', function(req,res,next){
	    res.send('Hello from article list');
	});
};

module.exports = ExpressServer;