var BaseForm = require(LIB_PATH + '/jform');
var RequiredValidator = require(LIB_PATH + '/validators/required');

module.exports = function() {

    this
        .addElement('name')
        .setValidator('name', this._getRequiredValidator('Name is empty.'))

        .addElement('password')
        .setValidator('password', this._getRequiredValidator('Password is empty.'))
    ;

}
module.exports.prototype = new BaseForm();
module.exports.prototype._getRequiredValidator = function(message) {
    var validator = new RequiredValidator();
    validator.setMessage(message);

    return validator;
}