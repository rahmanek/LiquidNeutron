
var Authenticate = require('./classes/Authenticate');
var UserController = require('./controllers/UserController');
var TransactionController = require('./controllers/TransactionController');
var CouponController = require('./controllers/CouponController');
var KeyController = require('./controllers/KeyController');
module.exports = function(express){

	//User Routes
	express.get("/", Authenticate.auth0, function(req,res){
		res.send({message:"hi"})
	});
	express.get("/user", Authenticate.auth0, UserController.retrieve);
	express.get("/v1/user/:userToken", Authenticate.apiKey, UserController.retrieve);

	express.get("/v1/transaction/:referenceToken", Authenticate.apiKeySoft, TransactionController.retrieve);
	express.post("/v1/transaction", Authenticate.apiKey, TransactionController.create);
	express.options("/v1/transaction", function(req,res){res.sendStatus(204)});

	express.get("/v1/coupon/:referenceToken", Authenticate.apiKeySoft, CouponController.retrieve);

	express.post("/v1/key", Authenticate.apiKey, KeyController.update);

	// express.post("/v1/user", Authenticate.apiKey, UserController.create);

	// express.post("/v0/transaction", Authenticate.apiKey, require("./controllers/transaction"));
	// express.get("/v0/transaction/:referenceToken", Authenticate.apiKey, require("./controllers/transaction"));
	// express.get("/transaction/:referenceToken", Authenticate.auth0, require("./controllers/user"));

	// express.post("/v0/transaction/create", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 	require('../controllers/activity/create.js')(req.body)
	// 	.then(function(){
	// 		res.sendStatus(200);
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	//
	// express.post("/activity/retrieve", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 	require('../controllers/activity/retrieve.js')(req.user, req.body)
	// 	.then(function(response){
	// 		res.send(response);
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	//
	// express.post("/activity/count", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 	require('../controllers/activity/count.js')(req.user, req.body)
	// 	.then(function(response){
	// 		res.send({count: response});
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	//
	// express.post("/activity/receipt/create", function(req, res) {
	// 	require('../controllers/activity/receipt/create.js')(req.body)
	// 	.then(function(activities){
	// 		activities.map(function(activity){
	// 			activity.sendReceipt();
	// 			return;
	// 		});
	// 		res.sendStatus(200);
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	//
	// express.post("/activity/receipt/retrieve", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 	require('../controllers/activity/receipt/retrieve.js')(req.user, req.body)
	// 	.then(function(response){
	// 		res.send(response);
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	//
	// express.post("/activity/receipt/count", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 	require('../controllers/activity/count.js')(req.user, req.body)
	// 	.then(function(response){
	// 		res.send({count: response});
	// 	}).catch(function(errCode){
	// 		res.sendStatus(errCode);
	// 	});
	// });
	// module.exports = function(express){
	// 	express.post("/activities/retrieve", Authenticate.auth0, function(req, res) {
	// 		require('../controllers/activities/retrieve.js')(req.User, req.body)
	// 		.then(function(response){
	// 			res.send(response);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	// };

	//
	// var passport = require('../passport.js');
	// var Authenticate = require('../')
	// module.exports = function(express){
	//
	// 	express.post("/v0/transaction/create", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 		require('../controllers/activity/create.js')(req.body)
	// 		.then(function(){
	// 			res.sendStatus(200);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// 	express.post("/activity/retrieve", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 		require('../controllers/activity/retrieve.js')(req.user, req.body)
	// 		.then(function(response){
	// 			res.send(response);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// 	express.post("/activity/count", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 		require('../controllers/activity/count.js')(req.user, req.body)
	// 		.then(function(response){
	// 			res.send({count: response});
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// 	express.post("/activity/receipt/create", function(req, res) {
	// 		require('../controllers/activity/receipt/create.js')(req.body)
	// 		.then(function(activities){
	// 			activities.map(function(activity){
	// 				activity.sendReceipt();
	// 				return;
	// 			});
	// 			res.sendStatus(200);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// 	express.post("/activity/receipt/retrieve", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 		require('../controllers/activity/receipt/retrieve.js')(req.user, req.body)
	// 		.then(function(response){
	// 			res.send(response);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// 	express.post("/activity/receipt/count", passport.authenticate('jwt', {session: false}), function(req, res) {
	// 		require('../controllers/activity/count.js')(req.user, req.body)
	// 		.then(function(response){
	// 			res.send({count: response});
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	//
	// };
	// var passport = require('../passport.js');
	// var Authenticate = require('../classes/Authenticate.js')
	//
	// module.exports = function(express){
	// 	express.post("/activities/retrieve", Authenticate.auth0, function(req, res) {
	// 		require('../controllers/activities/retrieve.js')(req.User, req.body)
	// 		.then(function(response){
	// 			res.send(response);
	// 		}).catch(function(errCode){
	// 			res.sendStatus(errCode);
	// 		});
	// 	});
	// };


};
