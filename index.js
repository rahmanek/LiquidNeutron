"use strict";

var config = require('./config.js');
var db = require('./src/database.js');
var log = require('./src/logger');
var express = require('./src/express');
var port = process.env.PORT || 3010;

var listener = express.listen(port, function() {
	log.info("API server listening on port " + listener.address().port + " in " + (process.env.NODE_ENV || "development") + " v1");
});
