var mongoose = require('libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	isCompleted: {
		type: Boolean,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

exports.Todo = mongoose.model('Todo', schema);