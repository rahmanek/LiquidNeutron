"use strict";

var config = require("../config");
var sample = require('./data/transactionSample.js');
var requestOptions = {
	url: config.auth0Domain + "v1/transaction",
	headers:{
		Authorization: "Basic YXV0aDB8NTgxNDMxOTdmYmE4YjYxNzI3NzE2NmQ1OmhjcnF0cU9KMUVhM01Bamc="
	},
	form:sample
};



require('request').post(requestOptions, function(err,res){
	if(err !== null) {
		logger.error(err,6)
	} else {
		console.log(res.body,res.statusCode,2);
		return;
		var body = JSON.parse(res.body)
		db.Key.create({
			key:key,
			userToken: body.user_id
		}).then(function(key){
			resolve(body,key);
		}).catch(function(err){
			logger.error(err)
			reject({
				code: 500,
				errorMessage: "Internal server error"
			});
		});
	}
});
