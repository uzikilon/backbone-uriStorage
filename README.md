Backbone URI Storage
----------
Backbone URI Storage is a sync adapter for backbone.
As the name implies, it uses the URI as the data storage and is ideal for implementing a model represnting an application state.
The adapter saves the data in a JSON string, allowing us to restore primitive variable types later.

Usage
-------
``` javascript
var State = Backbone.Model.extend({
    sync: uriSync
});

var state = new State({id: "test"});
state.set("foo", "bar");
state.save();
assert(window.location.hash === '#{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"}}'); // true

state.set("bool", true);
state.save();
assert(window.location.hash === '#{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue}}'); // true

state.set("num", 17.2);
state.save();
assert(window.location.hash === '#{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue%2C"num"%3A17.2}}'); // true

state = new State({id: "test"}); // an empty instance of state.
assert(typeof state.get("foo") === 'undefined') // true
assert(typeof state.get("bool") === 'undefined') // true
assert(typeof state.get("num") === 'undefined') // true

state.fetch();
assert(state.get("foo") === 'bar') // true
assert(state.get("bool") === true) // true
assert(state.get("num") === 17.2) // true

state.destroy();
assert(window.location.hash === '#{}'); // true
```