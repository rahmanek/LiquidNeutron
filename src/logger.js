"use strict";

var winston = require('winston');
var logger = new winston.Logger({
	transports:[
		new winston.transports.Console()/*,
		new winston.transports.File({
			name:"logFile",
			filename: 'filelog.log',
			level:'info'
		})*/
	],
	level:'debug'
});

module.exports = logger;
