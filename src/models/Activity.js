"use strict";

var Sequelize = require('sequelize');
var config = require('../../config.js');
var twilio = require('twilio');
var logger = require('../logger');
var client = new twilio.RestClient(config.twilioSid, config.twilioAuth);

module.exports = function(sequelize) {
	return sequelize.define('Activity', {
		type:{
			type:Sequelize.ENUM('email','phone','alias'),
			allowNull:false
		},
		value:Sequelize.STRING
	}, {
		paranoid: true,
		instanceMethods: {
			send: function() {
				var db = require('../database.js');
				if (this.type == "phone"){
					return this.getTransaction({
						include:[{model:db.Key}]
					}).then((transaction)=>{
						var body = "Thank you for your purchase at " + transaction.Key.name + ".  To view your receipt, please open the following link:" + config.webHost + "/t/" + transaction.referenceToken;
						client.messages.create({
							body: body,
							to: this.value,
							from: config.twilioPhone
						}, (err, message) => {
							if (err != null){
								logger.error(err);
								return Promise.reject(err);
							}
							else {
								logger.info("Activity sent to " + this.value)
								return Promise.resolve(message);
							}
						});
					});
				}
			}
		}
	});
};
