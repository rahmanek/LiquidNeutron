"use strict";

var logger = require('./logger.js');
var express = require('express')();

express.use(require('body-parser').urlencoded({extended: true}));
express.use(require('passport').initialize());
express.set('port', process.env.PORT || 3010);

express.use(function(err, req, res, next) {
	logger.error(err);
	next(err);
});

express.all('*', function(req, res, next) {
	console.log(req.method);
	logger.info('Request: ' + req.path);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Content-Type", "application/json");
	res.header("Access-Control-Allow-Headers", "Authorization");
	res.header("X-powered-by", "Milk and cookies");
	if(req.method == 'OPTIONS') res.sendStatus(204);
	else next();
});

require('./routes')(express)

module.exports = express;
