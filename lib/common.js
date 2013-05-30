module.exports = {

    define : function (name, value) {
        this.constant(global, name, value);
    },

    defines : function (list){
        for (var key in list) {
            this.define(key, list[key]);
        }
    },

    constant : function(target, name, value) {
        Object.defineProperty(target, name, {
            value:      value,
            enumerable:   true,
            writable:     false,
            configurable: false
        });
    }


}

