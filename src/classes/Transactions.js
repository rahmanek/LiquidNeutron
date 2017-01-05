"use strict";

var db = require('../database.js');

module.exports = class Transaction{

	static retrieve() {
		return db.Transaction.findAll();
	}
}
