"use strict";

var User = require('../classes/User');
var logger = require('../logger.js');
var Transaction = require('../classes/Transaction');
var Activity = require('../classes/Activity');
var Key = require('../classes/Key');
module.exports = class KeyController{

	// static retrieve(req, res){
	// 	// if (req.isAuthenticated){
	// 	// 	res.status(200).send(req.User);
	// 	// 	return;
	// 	// }
	//
	// 	Transaction.retrieve(req.params.referenceToken).then(function(transaction){
	// 		return res.status(200).send(transaction);
	// 	}).catch(function(err){
	// 		res.status(err.code).send({errorMessage:err.errorMessage});
	// 	});
	//
	// }

	static update(req, res){
		return Key.update(req.Key, req.body).then(function(key){
			res.status(200).send(key);
		})
	}
}
