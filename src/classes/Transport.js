"use strict";

var logger = require('./logger.js');

module.exports = class Transport(){

	sendEmail(recipient, email) {

		var transporter = require('nodemailer').createTransport({
			service: 'Gmail',
			auth: {
				user: 'flectinoweb@gmail.com',
				pass: 'Bobbob101'
			}
		});

		var mailOptions = {
			from: 'Flectino <admin@flectino.com>',
			to: recipient.email,
			subject: email.subject,
			html: email.content
		};

		return new Promise(function(resolve, reject) {

			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					logger.error(error);
					reject(error);
				}
				else {
					logger.info('Message sent to ' + require('util').inspect(info));
					resolve("success");
				}
				return;
			});
		}
	};
};
