

module.exports = function(status, body) {
    this
        .setStatus(status)
        .setBody(body)
    ;
}

module.exports.prototype = {

    _status : null,
    _body : null,

    isSuccess : function() {
        return this._status;
    },

    setStatus : function(status) {
        this._status = Boolean(status);
        return this;
    },

    setBody : function(body) {
        this._body = body || {};
        return this;
    },

    getBody : function() {
        return this._body;
    },

    toString : function() {
        var result = {};
        result['status'] = this._status;
        result['body'] = this._body;

        return JSON.stringify(result);
    }
}
