"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('Key', {
		token:{
			type:Sequelize.CHAR(16),
			unique: true,
			allowNull: false,
			defaultValue: function(){
				return require('base64url')(require('crypto').randomBytes(12));
			}
		},
		userToken:{
			type: Sequelize.STRING
		},
		name:{
			type: Sequelize.STRING
		}
	}, {
		paranoid: true,
	});
};
