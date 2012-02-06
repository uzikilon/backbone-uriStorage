!function(){
    
    function S4(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    
    var URI = {
        parse: function() {
            var hash = window.location.href.split("#")[1] || "",
                json = decodeURIComponent(hash),
                data = {};
            try {
                data = json ? JSON.parse(json) : {};
            }
            catch(e) {}
            return data;
        },
        stringify: function(data) {
            return encodeURIComponent(JSON.stringify(data));
        }
    };
    
    this.uriSync = function(method, model, options) {
        var resp = null,
            data = URI.parse() || {};
        switch (method) {
            case "read":
                resp = model.id ? data[model.id] || {} : data;
                break;
            case "create":
                if (!model.id) {
                    model.set("id", guid());
                }
                resp = data[model.id] = model;
                window.location.hash = URI.stringify(data);
                break;
            case "update":
                resp = data[model.id] = model;
                window.location.hash = URI.stringify(data);
                break;
            case "delete":
                delete data[model.id];
                window.location.hash = URI.stringify(data);
                break;
        }
        if (resp) {
            options.success(resp);
        } else {
            options.error("Record not found");
        }
    };
    
}();

