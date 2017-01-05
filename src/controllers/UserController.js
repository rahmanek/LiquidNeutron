"use strict";

var User = require('../classes/User');
var logger = require('../logger.js');
module.exports = class UserController{

	static retrieve(req, res){
		if (req.isAuthenticated){
			res.status(200).send(req.User);
		}
		else {
			User.retrieve(req.params.userToken).then(function(user){
				return res.status(200).send(user);
			}).catch(function(err){
				res.status(err.code).send({errorMessage:err.errorMessage});
			});
		}
	}
}
