"use strict";

var db = require('../database.js');
var request = require('request');
var config = require('../../config.js');
var Items = require('./Items');
var User = require('./User');
var logger = require('../logger.js');

module.exports = class Transaction{

	static retrieve(referenceToken, isAuthenticated = false) {
		var itemAttr = ["description","quantity","sequence","total","upc","userMetadata","unitPrice"];
		var transactionAttr = ["referenceToken","contact","KeyId","address","itemGroups","transactedAt","userMetadata","appMetadata","miscMetadata","total"];
		if (isAuthenticated){
			itemAttr.push("appMetadata");
			transactionAttr.push("appMetadata");
		}
		return db.Transaction.find({
			where:{
				referenceToken: referenceToken
			},
			attributes: transactionAttr,
			include: [
				{
					model: db.Key,
					attributes:["name"]
				},{
					model: db.Item,
					attributes:itemAttr
				}
			]
		}).then(function(transaction){
			if(transaction == null) return Promise.reject(new Error(1));
			else {
				delete transaction.dataValues.KeyId;
				return Promise.resolve(transaction);
			}
		}).catch(function(err){
			if (err.message == 1) {
				var message = "invalid reference token";
				logger.info(message);
				return Promise.reject({code:404, errorMessage:message});
			} else {
				logger.error(err);
				return Promise.reject({code:500,errorMessage:"internal server error"});
			}
		});
	}

	static create(key, params) {
		var build = {
			key: key.key,
			total: params.transaction.total,
			address: params.transaction.address,
			contact: params.transaction.contact,
			userMetadata: params.userMetadata,
			appMetadata: params.appMetadata,
			miscMetadata: params.miscMetadata,
			transactedAt: params.transaction.date
		};

		var transaction;
		return db.Transaction.create(build)
		.then(function(preTransaction){
			transaction = preTransaction;
			transaction.setKey(key);
		}).then(function(){
			return Items.create(transaction, params.transaction.items);
		}).then(function(items){
			transaction.setKey(key);
			return Promise.resolve(transaction, items);

		}).catch(function(err){
			logger.error(err);
			return Promise.reject({
				code:500,
				errorMessage: "internal server error"
			});
		});
	}
}
