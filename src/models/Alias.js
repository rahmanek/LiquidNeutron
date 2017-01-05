"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('Alias', {
		alias:Sequelize.STRING,
		type:{
			type:Sequelize.ENUM('email','phone'),
			allowNull:false
		},
		value:Sequelize.STRING
	}, {
		paranoid: true
	});
};
