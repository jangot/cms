var AbstractValidator = require('./abstract');

module.exports = function() {};
module.exports.prototype = new AbstractValidator();

module.exports.prototype.validate = function(cb) {
    var value = Number(this._value);
    if (isNaN(value)) {
        cb(Error(this.getMessage()));
    } else {
        cb(null);
    }
    return this;
}
