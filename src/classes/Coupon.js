"use strict";

var db = require('../database');
var config = require('../../config');
var logger = require('../logger');

module.exports = class Coupon{

	static create(transaction, params){
		var build = params;
		build.TransactionId = transaction.id;
		return db.Coupon.create(build).catch(function(err){
			logger.error(err);
			return Promise.reject({code:500,errorMessage:"internal server error"});
		});
	}

	static retrieve(referenceToken, isAuthenticated=false){
		return db.Coupon.find({
			where:{
				referenceToken:referenceToken
			}
		})
	}
}
