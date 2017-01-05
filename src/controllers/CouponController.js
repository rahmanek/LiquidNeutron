"use strict";

var User = require('../classes/User');
var logger = require('../logger.js');
var Coupon = require('../classes/Coupon');
var Activity = require('../classes/Activity');
module.exports = class CouponController{

	static retrieve(req, res){

		Coupon.retrieve(req.params.referenceToken).then(function(coupon){
			return res.status(200).send(coupon);
		}).catch(function(err){
			res.status(err.code).send({errorMessage:err.errorMessage});
		});

	}

}
