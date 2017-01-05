"use strict";

var db = require('../src/database.js');

db.sequelize.sync({
	force: true
}).then(function() {
	console.log("Database Synced Successfully");
}).catch(function(err) {
	console.log(new Error(err.message));
});
