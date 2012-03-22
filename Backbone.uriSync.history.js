!function(root, _, $){
    
    function cast(arg) {
        if ( arg === 'null' ) {
            return null;
        } else if ( arg === 'undefined' ) {
            return undefined;
        } else if ( arg == +arg ) {
            return +arg;
        } else if(/^(true|false)$/.test(arg)) {
            return arg === 'true';
        } else {
            return arg;
        }
    }
    
    function sort(src, comperator) {
        var arr = [], dest = {};
        _(src).each(function(value, key){
            arr.push([key, value]);
        });
        _(arr.sort(comperator)).each(function(value){
            dest[value[0]] = value[1];
        });
        return dest;
    }
    
    function filter(src, comperator) {
        var dest = {};
        _(src).each(function(value, key) {
            if(comperator(value, key)) {
                dest[key] = value;
            }
        });
        return dest;
    }
    
    var URI = {
        parse: function() {
            var query = window.location.href.split("?")[1] || "", pairs = query.split("&"),  data = {};
            _(pairs).each(function(pair){
                var set = pair.split("="), key = set[0], value = set[1];
                if(key && value) {
                    data[decodeURIComponent(key)] = cast(decodeURIComponent(value));
                }
            });
            return data;
        },
        stringify: function(data) {
            var params = filter(data, function(value, key){
                return ! _.isNull(value) 
                    && ! _.isUndefined(value) 
                    && key !== '_suid' 
                    && key !== 'id';
            });
            params = sort(params, function(a, b) {
                return a[0].charCodeAt(0) - b[0].charCodeAt(0);
            });
            return $.param(params).replace(/\+/g, '%20');
        }
    };
    
    root.uriSync = function(method, model, options) {
        var resp = null,
            data = URI.parse() || {};
        switch (method) {
            case "read":
                resp = data;
                break;
            case "create":
            case "update":
                resp = model.toJSON();
                root.History.pushState(resp, window.title, "?" + URI.stringify(resp));
                break;
            case "delete":
                root.History.pushState({}, window.title, "");
                break;
        }
        if (resp) {
            options.success(resp);
        } else {
            options.error("Record not found");
        }
    };
    
}(this, _, jQuery);
