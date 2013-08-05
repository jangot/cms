var AbstractValidator = require('./abstract');

module.exports = function() {};
module.exports.prototype = new AbstractValidator();

module.exports.prototype.validate = function(cb) {

    if (!this._value) {
        cb(null)
        return;
    }
    var type = this._value.type.split('/')[0];
    if (type == 'image') {
        cb(null)
    } else {
        cb(Error(this.getMessage()))
    }
    return this;
}
