"use strict";

var assert = require('chai').assert;
var request = require('supertest')('http://localhost:3010');
var config = require('../config.js');
var db = require('../src/database.js');

describe("Agent", function(){
	var agents = null;
	var jwt = null;

	before(function(done){
		db.User.findAll({
			where:{
				type:1
			}
		}).then(function(dbUsers){
			agents = dbUsers;
			done();
		});
	});

	it('should not have links', function(done) {
		db.CreditCard.findAll({
			include: [
				{model: db.User}
	      ]
		}).then(function(cards){
			for(var i=0; i< cards.length; i++){
				if(cards[i].User.type == 1){
					return assert.fail("Agent cards","No agent cards", [cards[i].dataValues, cards[i].dataValues.User.dataValues])
				}
			}
			done();
		}).catch(function(err){
			console.log(err)
		});
	});

	// it('should not have activities', function(done){
	// 	request.post('/user/create')
	// 	.type('form')
	// 	.send({email:"hola@something.com",password:'password'})
	// 	.expect(200, function(err, res){
	// 		if (err) done(err);
	// 		else done();
	// 	});
	// });

});
