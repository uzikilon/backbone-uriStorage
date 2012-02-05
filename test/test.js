
$(document).ready(function(){

    function decodeHash() {
        try {
            return decodeURIComponent(window.location.hash.substr(1));
        } catch(e) {
            return "";
        }
    }
    
    var State = Backbone.Model.extend({
        sync: uriSync
    });
    
    test("Test CREATE", function() {
        var state = new State({id: "test"});
        state.set("foo", "bar");
        state.set("bool", true);
        state.set("num", 17.2);
        state.save();
        equals(decodeHash(), '{"test":{"id":"test","foo":"bar","bool":true,"num":17.2}}', "window hash created");
    });
    
    test("Test READ", function() {
        var state = new State({id: "test"});
        equals(state.get('foo'), undefined, 'foo is undefined');
        state.fetch();
        equals(state.get('foo'), "bar", 'foo equals "bar"');
        ok(state.get('bool') === true, 'bool is a true boolean');
        ok(state.get('num') === 17.2, 'num is a true number with value of 17.2');
    });
    
    test("Test UPDATE", function() {
        var state = new State({id: "test"});
        state.fetch();
        state.set('bool', false);
        state.save();
        equals(decodeHash(), '{"test":{"id":"test","foo":"bar","bool":false,"num":17.2}}', "window hash created");
    });
    
    test("Test DELETE", function() {
        var state = new State({id: "test"});
        state.destroy();
        equals(decodeHash(), '{}', "window hash created");
    });
});
