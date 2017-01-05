"use strict";

var db = require('../database.js');
var request = require('request');
var config = require('../../config.js');
var logger = require('../logger.js');

module.exports = class Activity{

   static create(link, transaction){
      var build = {};
      if (typeof link.phone != "undefined") build = {
            value: link.phone,
            type: "phone",
            TransactionId: transaction.id
      };
      else if (typeof link.email != "undefined") build = {
         value: link.email,
         type: "email",
         TransactionId: transaction.id
      };

		return db.Activity.create(build).catch(function(err){
         logger.error(err);
         return Promise.reject({
            code: 500,
            errorMessage: "Internal server error"
         });
      });
	}
}
