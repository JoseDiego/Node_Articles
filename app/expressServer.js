var env = process.env.NODE_ENV || 'production',
	express = require('express'),
	middlewares =  require('./middlewares/admin'),
	bodyParser = require('body-parser'),
	swig = require('swig'),
	router = require('./website/router');

var ExpressServer = function(config){
	
	config = config || {};

	this.expressServer = express();

	//middlewares

	this.expressServer.use(bodyParser.urlencoded({extended: true}))

	for(var middleware in middlewares){
		this.expressServer.use(middlewares[middleware]);
	}

	this.expressServer.engine('html', swig.renderFile);
    this.expressServer.set('view engine', 'html');
    this.expressServer.set('views', __dirname + '/website/views/templates');
    swig.setDefaults({varControls:['[[',']]']});

    if(env == 'development'){
    	console.log('development');
    	this.expressServer.set('view cache', false);
    	swig.setDefaults({cache: false, varControls:['[[',']]']});
    }
    for(var controller in router){
    	for(var prototype in router[controller].prototype){
    		var method = prototype.split('_')[0];
    		var action = prototype.split('_')[1];
    		var data = prototype.split('_')[2];
    		data = (method == 'get' && data != undefined) ? ':data' : '';
    		var url = '/' + controller + '/' + action + '/' + data ;
    		console.log(url);
    		this.router(controller,prototype,method,url);
    	}
    }
    this.expressServer.use(function(req,res,next){
    	res.status(404);

		if (req.accepts('html')) {
		  res.render('404', { url: req.url });
		  return;
		}

		// respond with json
		if (req.accepts('json')) {
		  res.send({ error: 'Not found' });
		  return;
		}

		  // default to plain-text. send()
		res.type('txt').send('Not found');
    });
};

ExpressServer.prototype.router = function(controller,prototype,method,url) {
	this.expressServer[method](url, function(req,res,next){
		var conf = {
			'prototype': prototype,
			'req': req,
			'res': res,
			'next': next
		}
		var Controller = new router[controller](conf);
		Controller.response();
	});
};

module.exports = ExpressServer;