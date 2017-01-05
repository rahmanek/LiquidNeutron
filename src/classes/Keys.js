"use strict";

var db = require('../database');
var logger = require('../logger');

module.exports = class Keys{

	static retrieve(){
		return db.Key.findAll()
		.catch(function(err){
			logger.error(err);
			return Promise.reject({
				code:500,
				errorMessage:"internal server error"
			});
		});
	}

}
