"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('Transaction', {
		referenceToken:{
			type: Sequelize.CHAR(8),
			defaultValue: function(){
				return require('base64url')(require('crypto').randomBytes(6));
			}
		},
		contact: Sequelize.ARRAY(Sequelize.JSONB),
		itemGroups:Sequelize.ARRAY(Sequelize.JSONB),
		address:Sequelize.JSONB,
		transactedAt: Sequelize.DATE,
		userMetadata:Sequelize.JSONB,
		appMetadata:Sequelize.JSONB,
		miscMetadata: Sequelize.JSONB,
		total: Sequelize.INTEGER
	}, {
		paranoid: true
	});
};
