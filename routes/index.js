//refactor in future into separated files
//var User = require('models/user').User;
//var HttpError = require('error').HttpError;
//var ObjectID = require('mongodb').ObjectID;
//var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

	app.get('/', require('./main').get);

	app.get('/todos', require('./todos').get);

	app.post('/todos', require('./todos').post);

	app.put('/todos/:id', require('./todos').put);

	app.del('/todos/:id', require('./todos').del);
}