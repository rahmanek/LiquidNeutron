"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize) {

	return sequelize.define('Item', {
		description: Sequelize.STRING,
		quantity: Sequelize.INTEGER,
		unitPrice:Sequelize.INTEGER,
		total:Sequelize.INTEGER,
		upc:Sequelize.STRING,
		userMetadata:Sequelize.JSONB,
		appMetadata:Sequelize.JSONB,
		sequence:Sequelize.INTEGER
	}, {
		paranoid: true,
		instanceMethods: {
			sanitize: function() {
			}
		}
	});
};
