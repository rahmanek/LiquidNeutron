"use strict";

var db = require('../database.js');
var request = require('request');
var config = require('../../config.js');
var logger = require('../logger.js');

module.exports = class Err{

   static handle(err, res=null){
      if(res == null){
         logger.error(err);
      } else {
         res.status(err.code).send({errorMessage:err.errorMessage});
      }
			if (typeof err.code == "undefined"){
				logger.error(err);
				err = {
					code: 500,
					errorMessage: "internal server error"
				}
			};
			res.status(err.code).send({errorMessage:err.errorMessage});
		});
	}
}
