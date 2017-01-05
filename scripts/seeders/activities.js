"use strict";

var loadCsv = require ('../data/loadCsv');
var config = require('../../config.js');
var db = require('../../src/database.js');
var logger = require('../../src/logger.js');
var Transaction = require('../../src/classes/transaction');

module.exports = Promise.all([
	db.Transaction.findAll(),
	loadCsv("names"),
]).then(function(data){

	var transactions = data[0];
	var names = data[1];
	var promises = [];

	transactions.map(function(transaction){
		var build;
		if (Math.random()>.3) build = {
			type: "phone",
			value: "+1" +  Math.floor(1000000000 + Math.random() * 9000000000),
			TransactionId: transaction.id
		};
		else build = {
			type: "email",
			value: names[Math.floor(Math.random() * names.length)] + "@flectino.com",
			TransactionId: transaction.id
		};

		promises.push(db.Activity.create(build));
	});
	return Promise.all(promises);
}).then(function(activities){
	logger.info("Activities added");
	return Promise.resolve(activities);
}).catch(function(err){
	logger.error(err);
	return Promise.reject({
		code:500,
		errorMessage: "internal server error"
	});
});
