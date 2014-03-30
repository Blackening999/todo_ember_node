var Todo = require('models/todo').Todo;
var HttpError = require('error').HttpError;
//var AuthError = require('models/todo').AuthError;
var async = require('async');

exports.get = function(req, res) {
	Todo.find({}, function(err, todos) {
		res.send(JSON.stringify({ todos: todos }));
	});
};

exports.post = function(req, res, next) {
	var request = req.body.todo; // clearing inconsistency
	Todo.create({title: request.title, isCompleted: request.isCompleted}, function(err, todo) {
		if (err) next(new HttpError(err));
		res.send(JSON.stringify(todo));
	});
};

exports.put = function(req, res, next) {
	var request = req.body.todo; // clearing inconsistency
	Todo.update({_id: req.params.id}, {title: request.title, isCompleted: request.isCompleted}, function(err, todo) {
		if (err) next(new HttpError(err));
	});
};

exports.del = function(req, res, next) {
	Todo.remove({_id: req.params.id}, function(err) {
		if (err) next(new HttpError(err));
	});
};