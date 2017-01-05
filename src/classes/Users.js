"use strict";

var db = require('../database');
var config = require('../../config');
var User = require('./User.js');

module.exports = class Users{

	static retrieve(page = 0, limit = 100) {

		return new Promise(function(resolve, reject) {

			var requestOptions = {
				url: config.auth0Domain + "api/v2/users",
				headers:{
					Authorization: config.auth0BearerToken
				}
			};

			require('request')(requestOptions, function(err,res,bodyString){
				if(!!err) reject(err);
				else{
					var users = JSON.parse(bodyString);
					var userArr = [];
					users.map(function(user){
						userArr.push(new User(user));
					});
					resolve(userArr);
				}
			});
		});
	}

}
