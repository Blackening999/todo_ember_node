Todos.Todo = DS.Model.extend({
	_id: DS.attr(),
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean')
});