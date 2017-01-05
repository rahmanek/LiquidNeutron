"use strict";

module.exports = {
	apiHost: (function(){
		if(process.env.NODE_ENV == "production") return "http://apitest.flectino.com";
		else return "http://localhost:3010";
	}()),
	webHost: (function(){
		if(process.env.NODE_ENV == "production") return "http://webtest.flectino.com";
		else return "http://localhost:3000";
	}()),
	cleanDatabase: false,
	bcryptFactor: 4,
	projectName: "liquid",
	environment: (function(){
		if(process.env.NODE_ENV == "production") return "production";
		else return "development";
	}()),
	linkTypes: ["licensePlate"],
	googleApiKey: "XXX",
	spreedlyEnvKey: "XXX",
	spreedlyAccessSecret: "XXX",
	spreedlyTestGatewayToken :"XXX",
	emailUser: 'flectinoweb@gmail.com',
	emailPassword: 'XXX',
	auth0Secret: "XXX",
	auth0BearerToken: "Bearer XXX",
	auth0Domain: "https://flectino.auth0.com/",
	auth0Connection: (function(){
		if(process.env.NODE_ENV == "production") return "flectino-production";
		else return "flectino-dev";
	}()),
	twilioSid: "XXX",
	twilioAuth: "XXX",
	twilioPhone: "+5555",
	dbSettings: (function(){
		var dbUrl = process.env.DATABASE_URL;
		if (typeof dbUrl !== 'undefined'){
			var match = dbUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
			return {
				name: match[5],
				user: match[1],
				pass: match[2],
				port: match[4],
				host: match[3],
				logging: false,
				ssl: true
			};
		} else return {
			name: "liquid",
			user: "postgres",
			pass: "admin",
			host: "localhost",
			port: "5432"
		};
	}()),
};
