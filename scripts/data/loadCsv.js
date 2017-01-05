"use strict";

module.exports = function(file) {

	return new Promise(function(resolve, reject) {
		var stream = require('fs').createReadStream(__dirname + '/' + file + ".csv");
		stream.setEncoding('utf8');
		var dataArray = [];
		var parser = require('csv').parse();

		parser.on('readable', function() {
			var i, j, len;
			var record = parser.read();
			if (record != null) {
				if (record.length === 1) {
					return dataArray.push(record[0]);
				} else {
					var fields = {};
					for (var i = 0; i < record.length; i++) {
						var element = record[i];
						fields["element" + i] = element;
					}
					return dataArray.push(fields);
				}
			}
		});

		parser.on('end', function() {
			return resolve(dataArray);
		});

		return stream.pipe(parser);
	});
};
