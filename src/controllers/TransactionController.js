"use strict";

var User = require('../classes/User');
var logger = require('../logger.js');
var Transaction = require('../classes/Transaction');
var Activity = require('../classes/Activity');
module.exports = class TransactionController{

	static retrieve(req, res){

		Transaction.retrieve(req.params.referenceToken).then(function(transaction){
			return res.status(200).send(transaction);
		}).catch(function(err){
			res.status(err.code).send({errorMessage:err.errorMessage});
		});

	}

	static create(req, res){
		var transaction;
		return Transaction.create(req.Key, req.body).then(function(preTransaction){
			transaction = preTransaction;
			return Activity.create(req.body.link, transaction);
		}).then(function(activity){
			return activity.send();
		}).then(function(){
			return res.status(200).send(transaction);
		}).catch(function(err){
			res.status(err.code).send({errorMessage:err.errorMessage});
		});

	}
}
