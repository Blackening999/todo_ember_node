var mongoose = require('libs/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
	open,
	dropDataBase,
	requireModels,
	createTodos
], function(err) {
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
};

function dropDataBase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
};

function requireModels(callback) {
	require('models/todo');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
};

function createTodos(callback) {
	var todos = [
		{
			title: 'Learn Ember.js',
			isCompleted: true
		},
		{
			title: '...',
			isCompleted: false
		},
		{
			title: 'Profit!',
			isCompleted: false
		}
	];
	async.each(todos, function(todoData, callback) {   //this kind of each drops argument "affected" in callback,
		var todo = new mongoose.models.Todo(todoData); //so we don't need to reduce arguments to (err, results) from (err, results, affected)
		todo.save(callback);
	}, callback);
};
