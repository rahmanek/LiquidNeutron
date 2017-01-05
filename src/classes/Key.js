"use strict";

var db = require('../database');
var config = require('../../config');
var logger = require('../logger');

module.exports = class Key{

	static create(user, params){
		var build = params;
		build.userToken = user.user_id;
		return db.Key.create(build).catch(function(err){
			logger.error(err);
			return Promise.reject({code:500,errorMessage:"internal server error"});
		});
	}

	static update(key, params){
		return key.update(params);
	}
}
