"use strict";

var loadCsv = require ('../data/loadCsv');
var config = require('../../config.js');
var db = require('../../src/database.js');
var logger = require('../../src/logger.js');
var Transaction = require('../../src/classes/transaction');
var Users = require("../../src/Classes/Users");

var keys = [];

module.exports = Promise.all([
	db.Key.findAll(),
	loadCsv("food"),
	loadCsv("names"),
	loadCsv("stateInitials"),
]).then(function(data){

	var keys = data[0];
	var foods = data[1];
	var names = data[2];
	var states = data[3];
	var promises = [];
	var link;
	for(var i = 0; i < 100; i++){
		var key = keys[Math.floor(Math.random() * keys.length)];
		var name = key.name;

		if(Math.random() > .4) link = {phone:"+1" +  Math.floor(1000000000 + Math.random() * 9000000000)};
		else if(Math.random() > .5) link = {email: names[Math.floor(Math.random() * names.length)] + "@flectino.com"};
		else link = {alias:require('base64url')(require('crypto').randomBytes(15))};

		var transaction = {
			date: new Date(),
			total: 0,
			items:[]
		};

		transaction.contact = [{
			type: "facebook",
			description: "Facebook",
			value: "https://wwww.facebook.com/" + name
		},{
			type: "twitter",
			description: "Twitter",
			value: "https://www.twitter.com/" + name
		},{
			type: "instagram",
			description: "Instagram",
			value: "https://www.instagram.com/" + name
		},{
			type: "googlePlus",
			description: "Google Plus",
			value: "https://plus.google.com/" + name
		},{
			type: "twitter",
			description: "Twitter",
			value: "https://www.twitter.com/" + name
		},{
			type:"pinterest",
			description: "Pinterest",
			value: "https://www.pinterest.com/" + name
		},{
			type:"web",
			description: "Website",
			value: "https://www." + name + ".com/"
		},{
			type:"email",
			description: "Email",
			value: name + "@flectino.com",
		},{
			type: "phone",
			description: "Corporate Phone",
			value: "+1" +  Math.floor(1000000000 + Math.random() * 9000000000)
		},{
			type: "phone",
			description: "Store Phone",
			value: "+1" +  Math.floor(1000000000 + Math.random() * 9000000000)
		}];

		transaction.agentToken = require('base64url')(require('crypto').randomBytes(15));

		var itemCount = Math.floor(Math.random()*20 + 3);
		var subtotal = 0;
		var items = [];
		for(var j=0; j < itemCount; j++){

			var item = {
				description: foods[Math.floor(Math.random() * foods.length)],
				quantity: Math.floor(Math.random() * 10 + 1),
				unitPrice: Math.floor(Math.random() * 1000)
			};
			item.total = Math.round(item.quantity * item.unitPrice);
			subtotal += item.total;
			items.push(item);
		}
		var tax = parseInt(subtotal * .065);
		var gratuity = parseInt(subtotal * .15);
		var grandTotal = subtotal + tax + gratuity;
			items.push({
				items:[
					{
						description: "Subtotal",
						total: subtotal
					},
					{
						description: "MA State Tax @ 6.25%",
						total: tax
					},{
						description: "Gratuity",
						total: gratuity

					},{
						description:"Grand Total",
						total: grandTotal
					}
				]
			});

		transaction.items = items;
		transaction.address = {
			line1: Math.round(Math.random() * 500) + " " + names[Math.floor(Math.random()*names.length)] + " St",
			city: names[Math.floor(Math.random()*names.length)],
			state: states[Math.floor(Math.random()*states.length)],
			postalCode: Math.floor(10000 + Math.random() * 90000)
		}
		transaction.total = grandTotal;
		var submission = {
			link: link,
			transaction: transaction
		}

		promises.push(Transaction.create(key, submission));
	}

	return Promise.all(promises);

}).then(function(data){
	logger.info('Transactions added');
	return Promise.resolve();
}).catch(function(err){
	logger.error(err);
	return Promise.reject({
		code:500,
		errorMessage: "internal server error"
	});
});
