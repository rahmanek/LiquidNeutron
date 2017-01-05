"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	return sequelize.define('Coupon', {
		barcodeType:Sequelize.ENUM("code128", "ean-13", "ean-8", "ean-5", "ean-2", "upc-a", "code39", "itf-14", "msi", "pharmacode"),
		barcodeValue:Sequelize.STRING,
		title: Sequelize.STRING,
		details: Sequelize.TEXT,
		expiry: Sequelize.DATE,
		isClaimed: {
			type:Sequelize.BOOLEAN,
			defaultValue: false
		},
		referenceToken: {
			type:Sequelize.STRING,
			defaultValue: function(){
				return require('base64url')(require('crypto').randomBytes(6));
			}
		}

	}, {
		paranoid: true
	});
};
//
