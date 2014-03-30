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
	host: 'localhost:5000'
});

Todos.TodoSerializer = DS.RESTSerializer.extend({
	primaryKey: function() {
		return '_id';
	}.property()
});