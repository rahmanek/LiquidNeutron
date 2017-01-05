"use strict";

var config = require('../config.js');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var path = require('path');

var sequelize = new Sequelize(config.dbSettings.name, config.dbSettings.user, config.dbSettings.pass, {
	dialect: 'postgres',
	protocol: 'postgres',
	host: config.dbSettings.host,
	port: config.dbSettings.port,
	logging: config.dbSettings.logging,
	dialectOptions: {
		ssl: config.dbSettings.ssl
	}
});

var files = require('fs').readdirSync(path.join(__dirname, './models'));
var models = {};
for (var i = 0; i < files.length; i++) {
	var file = files[i];
	var cutFile = file.substring(0, file.length - 3);
	models[cutFile] = require('./models/' + file)(sequelize);
}

// Associations

models.Item.belongsTo(models.Transaction, {
	foreignKey: 'TransactionId'
});

models.Transaction.hasMany(models.Item, {
	foreignKey: 'TransactionId'
});

models.Activity.belongsTo(models.Alias, {
	foreignKey: 'AliasId'
});

models.Activity.belongsTo(models.Transaction, {
	foreignKey: 'TransactionId'
});

models.Coupon.belongsTo(models.Transaction, {
	foreignKey: 'TransactionId'
});

models.Alias.belongsTo(models.Key,{
	foreignKey: 'KeyId'
})

models.Transaction.belongsTo(models.Key, {
	foreignKey: 'KeyId'
});

models.Key.hasMany(models.Transaction, {
	foreignKey: 'KeyId'
});

module.exports = lodash.assign({
	sequelize:sequelize
}, models);
