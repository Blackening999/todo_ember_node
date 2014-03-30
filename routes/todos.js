var Todo = require('models/todo').Todo;
var HttpError = require('error').HttpError;
//var AuthError = require('models/todo').AuthError;
var async = require('async');

exports.get = function(req, res) {
	//debugger;
	Todo.find({}, function(err, todos) {
		res.send(JSON.stringify({ todos: todos }));
	});
};

exports.post = function(req, res) {
	debugger;
	var params = req.body.todo;
	Todo.create({title: params.title, isCompleted: params.isCompleted}, function(err, todo) {
		if (err) callback(null, null);
		console.log(todo);
		res.send(JSON.stringify(todo));
	});
};