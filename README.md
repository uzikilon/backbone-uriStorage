Backbone URI Storage
----------
Backbone URI Storage is a sync adapter for Backbone.js.
As the name implies, it uses the URI for data storage and therefore is ideal for implementing a model representing an application state.
The adapter saves the data in a JSON string, allowing the model to restore primitive variable types later.

Usage:
-------
``` javascript
var State = Backbone.Model.extend({
    sync: uriSync
    // optional - bind to changes made on the URI and auto update the model
    , initialize: function(){
        var self = this;
        $(window).on("hashchange", function(){
            self.fetch();
        });
    }
});

var state = new State({id: "test"});
state.set("foo", "bar");
state.save();

state.set("bool", true);
state.save();

// window.location.hash is #{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue}}

state.set("num", 17.2);
state.save();
// window.location.hash is #{"test"%3A{"id"%3A"test"%2C"foo"%3A"bar"%2C"bool"%3Atrue%2C"num"%3A17.2}}

state = new State({id: "test"}); // an empty instance of state.
// state.get("foo") is undefined'
// state.get("bool") is undefined'
// state.get("num") is undefined'

state.fetch();
// state.get("foo") === 'bar'
// state.get("bool") === true 
// state.get("num") === 17.2

state.destroy();
// window.location.hash is '#{}'
```
