module.exports = function(req, res, next) {

    this._req = req;
    this._res = res;
    this._next = next;
    this._cb = function() {};

}

module.exports.prototype = {

    _req : null,
    _res : null,
    _next : null,
    _cb : null,

    run : function(cb) {
        if (cb) {
            this._cb = cb;
        }


    }

}
