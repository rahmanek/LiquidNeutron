"use strict";

var logger = require('../logger.js');
var db = require('../database.js');
var User = require('./User');
var Key = require('./Key');
var basic = require('basic-auth')

module.exports = class Authenticate{

	static auth0(req, res, next){
		var config = require('../../config.js');
		var jwt = require('jsonwebtoken');
		var bearer = req.get('Authorization').split(' ')[1];
		jwt.verify(bearer, new Buffer(config.auth0Secret, 'base64'), function(err, payload) {
			if(err != null) {
				if(err.message == "jwt expired") res.status(403).send({errorMessage:err.message});
				else if(err.message == "jwt malformed") res.status(403).send({errorMessage:err.message});
				else{
					res.status(500).send({errorMessage:err.message});
					logger.error(err.message);
				}
			}
			else {
				User.retrieve(payload.sub).then(function(user){
					if(user.keys.length == 0){
						Key.create(user).then(function(key){
							user.keys.push(key);
							req.User = user;
							next()
						});
					}
					else{
						req.User = user;
						next();
					}
				}).catch(function(err){
					res.status(err.code).send({errorMessage:err.message});
				});
			}
		});
	}

	static apiKey(req,res,next) {

		req.isAuthenticated = false;
		var credentials = basic(req);
		if (typeof credentials == "undefined") {
			res.status(400).send({errorMessage:"Invalid basic authentication in authorization header"});
			return;
		}
		User.retrieve(credentials.name).then(function(user){
			user.retrieveKeys().then(function(keys){
				keys.map(function(key){
					if(credentials.pass == key.token) {
						req.isAuthenticated = true;
						req.User = user;
						req.Key = key;
						next();
					}
				});
				if(!req.isAuthenticated) res.status(409).send({errorMessage:"Invalid API Key"});
			});
		}).catch(function(err){
			res.status(err.code).send({errorMessage:err.message});
		});
	}

	static apiKeySoft(req,res,next) {
		req.isAuthenticated = false;
		var credentials = basic(req);
		if (typeof credentials != "undefined") apiKey(req,res,next);
		else next();
	}

}
