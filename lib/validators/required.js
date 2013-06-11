var AbstractValidator = require('./abstract');

module.exports = function() {};
module.exports.prototype = new AbstractValidator();

module.exports.prototype.validate = function(cb) {
    if (this._value) {
        cb(null)
    } else {
        cb(Error(this.getMessage()))
    }
    return this;
}

//module.exports.prototype.setMessage('Required field');
