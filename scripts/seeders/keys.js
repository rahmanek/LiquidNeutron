"use strict";

var loadCsv = require ('../data/loadCsv');
var logger = require('../../src/logger.js');
var Key = require('../../src/classes/Key');
var Users = require("../../src/Classes/Users");

var promises =[
	Users.retrieve(),
	loadCsv("brands")
];

module.exports = Promise.all(promises).then(function(data){
	var users = data[0];
	var brands = data[1];
	var promises = [];
	users.map(function(user){
		var name = brands[Math.floor(Math.random() * brands.length)].replace(/\s+/g, '');
		promises.push(Key.create(user,{
			name: name
		}));
	});
	return Promise.all(promises);
}).then(function(data){
	logger.info('Keys added');
	return Promise.resolve();
}).catch(function(err){
	logger.error(err);
	return Promise.reject({code:500,errorMessage:"internal server error"});
});
