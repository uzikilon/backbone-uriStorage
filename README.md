Backbone URI Storage
----------
Backbone URI Storage is a sync adaptor for Backbone.js, inspired by <a href="https://github.com/jeromegn/Backbone.localStorage">Backbone.localStorage</a>.

As the name implies, it uses the URI for data storage engine, and therefore is ideal for implementing a model representing an application state or a state machine.
The adapter saves the data in a JSON string, allowing the model to restore primitive variable types later.

An improved version of the adapter takes advantage of <a href="https://github.com/balupton/History.js/">History.js</a> for pushState support and cleaner URIs.

- A working demo of the History.js driven adaptor can be found <a href="http://kilon.org/samples/backbone-uriStorage.html">here</a>.
- Some background and what problem lead me to write this adaptor can be found <a href="http://kilon.org/blog/2012/02/backbone-uri-adapter/">here</a>.

Usage:
-------
``` javascript
var State = Backbone.Model.extend({
  sync: uriSync
});

var state = new State({id: 'state'});
// optional - bind to changes made on the URI and auto update the model
$(window).on("hashchange", function(){
  state.clear({silent: true});
  state.fetch();
});
```
