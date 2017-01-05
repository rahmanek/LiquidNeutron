"use strict";

var logger = require('../src/logger.js');

Promise.resolve()
.then(function(){
	return require("./seeders/keys.js");
})
.then(function(){
	return require("./seeders/transactions.js");
})
.then(function(){
	return require("./seeders/activities.js");
})
.then(function(){
	return require("./seeders/coupons.js");
})
.catch(function(err){
	logger.error(err);
});
