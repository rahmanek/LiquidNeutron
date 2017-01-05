"use strict";

var assert = require('chai').assert;
var request = require('supertest')('http://localhost:3010');
var config = require('../config.js');
var db = require('../src/database.js');

describe.skip("User", function(){
	var user = null;
	var jwt = null;

	before(function(done){
		db.User.findAndCountAll().then(function(dbUsers){
			user = dbUsers.rows[Math.floor(Math.random() * dbUsers.count)];
			jwt = user.getJwt();
			done();
		});

	});
	it('should retrieve a user', function(done) {
		request.post('/user/retrieve')
		.type('form')
		.send({authorization:jwt})
		.expect(200, function(err, res){
			if (err) done(err);
			else done();
		});
	});
	it('should create a new user', function(done){
		request.post('/user/create')
		.type('form')
		.send({email:"hola@something.com",password:'password'})
		.expect(200, function(err, res){
			if (err) done(err);
			else done();
		});
	});

});
