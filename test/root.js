"use strict";

var assert = require('chai').assert;
var request = require('supertest')('http://localhost:3010');

describe.skip('Root', function() {
	it('should return a greeting', function(done) {
		request.get('/')
		.expect(200)
		.expect({message:"hi"}, function(err, res){
			if (err) done(err);
			else done();
		});
	});
});
