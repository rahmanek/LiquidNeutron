"use strict";

var loadCsv = require ('../data/loadCsv');
var logger = require('../../src/logger.js');
var Transactions = require('../../src/classes/Transactions');
var Coupon = require('../../src/classes/Coupon');
module.exports = Transactions.retrieve().then(function(transactions){
	var promises = [];
	transactions.map(function(transaction){
		var build = {
			barcodeType: "code128",
			barcodeValue: "1234567890123",
			title: "Save $2 on your next visit",
			details: "Fine print that is very long and explains many things.  Things like when it will expire and other things that are of similar nature.  It is important to read this or you won't really know thing things therein.  Furthermore, by rading these many words, you will not only know what it contains, but things that it does not contain, which, arguably, is just as important as knowing that of which it contains.",
			expiry: new Date()
		};
		promises.push(Coupon.create(transaction,build));
	});
	return Promise.all(promises);
}).then(function(data){
	logger.info('Coupons added');
	return Promise.resolve();
}).catch(function(err){
	logger.error(err);
	return Promise.reject({code:500,errorMessage:"internal server error"});
});
