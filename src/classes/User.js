"use strict";

var lodash = require('lodash');
var request = require('request');
var db = require('../database');
var config = require('../../config');
var logger = require('../logger')
module.exports = class User{

	constructor(user) {
		return lodash.assign(this,user);
	}

	retrieveKeys(){
		return db.Key.findAll({
			where:{
				userToken: this.user_id
			}
		}).then((keys)=>{
			this.keys = keys;
			return Promise.resolve(keys);
		});
	}

	static create(email){
		//untested
		var password = require('base64url')(require('crypto').randomBytes(10));
		var requestOptions = {
			url: config.auth0Domain + "api/v2/users",
			headers:{
				Authorization: config.auth0BearerToken
			},
			form:{
				connection: config.auth0Connection,
				email: email,
				password: password
			}
		};

		return new Promise(function(resolve, reject) {
			var key = require('base64url')(require('crypto').randomBytes(25));

			require('request').post(requestOptions, function(err,res){
				if(err !== null || res.statusCode != 200) {
					logger.error(err)
					reject({
						code: 500,
						errorMessage: "Internal server error"
					});
				} else {
					var body = JSON.parse(res.body)
					db.Key.create({
						key:key,
						userToken: body.user_id
					}).then(function(key){
						resolve(body,key);
					}).catch(function(err){
						logger.error(err)
						reject({
							code: 500,
							errorMessage: "Internal server error"
						});
					});
				}
			});
		});
	}

	static retrieve(userToken) {

		var requestOptions = {
			url: config.auth0Domain + "api/v2/users/" + userToken,
			headers:{
				Authorization: config.auth0BearerToken
			}
		};

		return new Promise(function(resolve, reject) {

			require('request')(requestOptions, function(err,res){
				if(err !== null) {
					logger.error(err)
					reject({
						code: 500,
						errorMessage: "Internal server error"
					});
				} else if(res.statusCode == 200){
					var user = new User(JSON.parse(res.body));
					user.retrieveKeys().then(function(){
						resolve(user);
					});
				}else if(res.statusCode == 404)
					reject({
						code:404,
						errorMessage: "User not found"
					});
				else{
					logger.error(body);
					reject({
						code:500,
						errorMessage: "Internal Server Error"
					});
				}
			});
		});
	}

}
