"use strict";

var db = require('../database.js');
var request = require('request');
var config = require('../../config.js');

module.exports = class Items{

	static create(transaction, items){
		var promises = [];
		var itemList = [];
		var groups = [];
		var i = 0;

		items.map(function(item){
			if(typeof item.items !== "undefined"){
				groups.push({
					start:i,
					end: i + item.items.length - 1,
					description: item.description
				});
				item.items.map(function(item, j){
					item.sequence = i++;
					itemList.push(item);
				});
			} else {
				item.sequence = i++;
				itemList.push(item);
			}
		});

		itemList.map(function(item){
			promises.push(db.Item.create({
				description: item.description,
				unitPrice: item.unitPrice,
				quantity: item.quantity,
				total: item.total,
				upc: item.upc,
				userMetadata: item.userMetadata,
				appMetadata: item.appMetadata,
				sequence: item.sequence,
				TransactionId: transaction.id
			}));
		});

		var updatedItems;
		return Promise.all(promises).then(function(items){
			updatedItems = items;
			if(groups.length > 0) return transaction.update({itemGroups:groups})
			else return Promise.resolve();

		}).then(function(){
			return Promise.resolve(updatedItems);

		}).catch(function(err){
			logger.error(err);
			return Promise.reject({
				code: 500,
				errorMessage: "internal server error"
			})
		});
	}
}
