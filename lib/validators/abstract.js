module.exports = function() {}

module.exports.prototype = {

    _message : null,
    _value : null,

    setMessage : function(message) {
        this._message = message;
        return this;
    },

    validate : function(cb) {
        cb(null);
        return this;
    },
    getMessage : function() {
        return this._message;
    },
    setValue : function(value) {
        this._value = value;
        return this;
    }

}
