"use strict";

var db = require('../database.js');
var request = require('request');
var config = require('../../config.js');
var logger = require('../logger.js');

module.exports = class Activities{
	var db = require('../../database.js');
	var logger = require('../../logger.js');
	static create(items){
		return new Promise(function(resolve, reject) {
			// module.exports = function(user, params) {
			// 	return new Promise(function(resolve, reject) {
			// 		var filter = {
			// 			where: {
			// 				UserId: user.id
			// 			},
			// 			// limit: 50,
			// 			offset: 0,
			// 			include: [
			// 				{model: db.ApiKey, attributes:["name"]},
			// 				{model: db.Receipt, attributes:["content"]},
			// 				{model: db.Message, attributes:["subject"]},
			// 				{model: db.Coupon, attributes:["subject"]}
			// 			]
			// 		};
			// 		return db.Activity.findAll(filter).then(function(activities) {
			// 			console.log(activities);
			// 			var results = [];
			//
			// 			activities.map(function(activity){
			// 				var data;
			// 				if(activity.Receipt !== null) data = {type: "receipt", total:activity.Receipt.content.total};
			// 				else if(activity.Coupon !== null) data = {type: "coupon", subject:activity.Coupon.subject};
			// 				else if(activity.Message !== null) data = {type: "message", subject:activity.Message.subject};
			// 				var result = {
			// 					referenceToken: activity.referenceToken,
			// 					data: data,
			// 					senderName: activity.ApiKey.name,
			// 					createdAt: activity.createdAt
			// 				};
			// 				results.push(result);
			// 			});
			// 			resolve(results);
			// 		});
			// 	}).catch((err)=>{logger.error(err);});
			// };

		}
	}



}
