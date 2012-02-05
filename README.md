Backbone URI Storage
----------
Backbone URI Storage is a sync adapter for backbone.
As the name implies, it uses the URI as the data storage and is ideal for implementing a model represnting an application state.
The adapter saves the data in a JSON string, allowing us to restore primitive variable types later.

Usage
-------
``` javascript
var State = Backbone.Model.extend({
    sync: uriSync,
});

var state = new State({id: "test"});
state.set("foo", "bar");
state.save(); // URI IS http://example.com/path?query#{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"}}

state.set("bool", true);
state.save(); // URI hash is now #{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue}}

state.set("num", 17.2);
state.save(); // URI hash is now #{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue%2C"num"%3A17.2}}

state = new State({id: "test"}); // an empty instance of state.
state.fetch();  // state model toJSON is now {"id":"test","foo":"bar","bool":true,"num":17.2}

/*
typeof state.get("foo"); // string
typeof state.get("bool"); // boolean
typeof state.get("num"); // number
*/

state.destroy(); // URI has is now #{}
```