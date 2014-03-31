var templates = {};
templates['todos.js'] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "All";
  }

function program3(depth0,data) {
  
  
  return "Active";
  }

function program5(depth0,data) {
  
  
  return "Completed";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\r\n			<button id=\"clear-completed\" ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.action || (depth0 && depth0.action)),stack1 ? stack1.call(depth0, "clearCompleted", options) : helperMissing.call(depth0, "action", "clearCompleted", options)))
    + " >\r\n				Clear completed ";
  if (stack2 = helpers.completed) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.completed); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\r\n			</button>\r\n        ";
  return buffer;
  }

  buffer += "<section id=\"todoapp\">\r\n	<header id=\"header\">\r\n		<h1>todos</h1>\r\n        ";
  options = {hash:{
    'type': ("text"),
    'id': ("new-todo"),
    'placeholder': ("What needs to be done?"),
    'value': ((depth0 && depth0.newTitle)),
    'action': ("createTodo")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options)))
    + "\r\n	</header>\r\n\r\n	<section id=\"main\">\r\n        ";
  if (stack2 = helpers.outlet) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.outlet); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\r\n\r\n        ";
  options = {hash:{
    'type': ("checkbox"),
    'id': ("toggle-all"),
    'checked': ((depth0 && depth0.allAreDone))
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options)))
    + "\r\n	</section>\r\n\r\n	<footer id=\"footer\">\r\n        <span id=\"todo-count\">\r\n          <strong>";
  if (stack2 = helpers.remaining) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.remaining); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</strong> ";
  if (stack2 = helpers.inflection) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.inflection); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " left\r\n        </span>\r\n		<ul id=\"filters\">\r\n			<li>\r\n                ";
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "todos.index", options) : helperMissing.call(depth0, "link-to", "todos.index", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n			</li>\r\n			<li>\r\n                ";
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "todos.active", options) : helperMissing.call(depth0, "link-to", "todos.active", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n			</li>\r\n			<li>\r\n                ";
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "todos.completed", options) : helperMissing.call(depth0, "link-to", "todos.completed", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n			</li>\r\n		</ul>\r\n        ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.hasCompleted), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n	</footer>\r\n</section>\r\n\r\n<footer id=\"info\">\r\n	<p>Double-click to edit a todo</p>\r\n</footer>";
  return buffer;
  };
;
module.exports = templates;
