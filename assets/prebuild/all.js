require('ember');
require('ember_data');
//require('localstorage');  //ls-storage

window.Todos = Ember.Application.create({
	LOG_TRANSITIONS: true
});

//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();
//Todos.ApplicationAdapter = DS.LSAdapter.extend({  //ls-storage
//	namespace: 'todos'
//});

Todos.RESTAdapter = DS.RESTAdapter.extend({
	host: 'localhost:5000',
	serializeId: function(id) {
		return id.toString();
	}
});

//Todos.Store = DS.Store.extend({
//	revision: 12,
//	adapter: Todos.RESTAdapter
//});

Todos.TodoSerializer = DS.RESTSerializer.extend({
	primaryKey: function() {
		return '_id';
	}.property()
});
Todos.Router.map(function() {
	this.resource('todos', { path: '/' }, function() {
		this.route('active');
		this.route('completed');
	});
});

Todos.TodosRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('todo');
	}
});

Todos.TodosIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('todos');
	}
});

Todos.TodosActiveRoute = Ember.Route.extend({
	model: function() {
		return this.store.filter('todo', function(todo) {
			return !todo.get('isCompleted');
		})
	},
	renderTemplate: function(controller) {
		this.render('todos/index', { controller: controller })
	}
});

Todos.TodosCompletedRoute = Ember.Route.extend({
	model: function() {
		return this.store.filter('todo', function(todo) {
			return todo.get('isCompleted');
		})
	},
	renderTemplate: function(controller) {
		this.render('todos/index', { controller: controller })
	}
})
Todos.TodoController = Ember.ObjectController.extend({
	isEditing: false,
	isCompleted: function(key, value) {
		var model = this.get('model');
		//setter
		if (arguments.length > 1) {
			model.set('isCompleted', value);
			model.save();
			return value;
		}
		//getter
		return model.get('isCompleted');
	}.property('model.isCompleted'),
	actions: {
		editTodo: function() {
			this.set('isEditing', true);
		},
		removeTodo: function() {
			var todo = this.get('model');
			todo.deleteRecord();
			todo.save();
		},
		acceptChanges: function() {
			this.set('isEditing', false);

			if (Ember.isEmpty(this.get('model.title'))) {
				this.send('removeTodo');
			} else {
				this.get('model').save();
			}
		}
	}
});
Todos.TodosController = Ember.ArrayController.extend({
	actions: {
		createTodo: function() {
			var title = this.get('newTitle');
			if (!title.trim()) { return; }

			var todo = this.store.createRecord('todo', {
				title: title,
				isCompleted: false
			});

			this.set('newTitle', '');

			todo.save();
		},
		clearCompleted: function() {
			var completed = this.filterBy('isCompleted', true);
			completed.invoke('deleteRecord');
			completed.invoke('save');

		}
	},
	remaining: function() {
		return this.filterBy('isCompleted', false).get('length');
	}.property('@each.isCompleted'),
	inflection: function() {
		var remaining = this.get('remaining');
		return remaining === 1 ? 'item' : 'items';
	}.property('remaining'),
	completed: function() {
		return this.filterBy('isCompleted', true).get('length');
	}.property('@each.isCompleted'),
	hasCompleted: function() {
		return !!this.get('completed');//0 || 1
	}.property('completed'),
	allAreDone: function(key, value) {
		//setter
		if (arguments.length > 1) {
			this.setEach('isCompleted', value);
			this.invoke('save');
			return value;
		}
		//getter
		return !!this.get('length') && this.everyProperty('isCompleted', true);
	}.property('@each.isCompleted')
});

Todos.Todo = DS.Model.extend({
	_id: DS.attr(),
	title: DS.attr('string'),
	isCompleted: DS.attr('boolean')
});
Todos.EditTodoView = Ember.TextField.extend({
	didInsertElement: function() {
		this.$().focus();
	}
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);