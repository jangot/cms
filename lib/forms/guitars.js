var BaseForm = require(LIB_PATH + '/jform');
var RequiredValidator = require(LIB_PATH + '/validators/required');
var IdValidator = require(LIB_PATH + '/validators/idInTable');

module.exports = function() {

    this
        .addElement('model')
        .setValidator('model', this._getRequiredValidator('Model is empty.'))

        .addElement('brand')
        .setValidator('brand', this._getRequiredValidator('Brand is empty.'))
        .setValidator('brand', this._getIdValidator(DB_TABLE_BRAND, 'There is\'t this brand.'))

        .addElement('neck_material')
        .setValidator('neck_material', this._getRequiredValidator('Neck material is empty.'))
        .setValidator(
            'neck_material',
            this._getIdValidator(DB_TABLE_MATERIAL, 'There is\'t this material.')
        )

        .addElement('deck_material')
        .setValidator('deck_material', this._getRequiredValidator('Deck material is empty.'))
        .setValidator(
            'deck_material',
            this._getIdValidator(DB_TABLE_MATERIAL, 'There is\'t this material.')
        )
    ;

}
module.exports.prototype = new BaseForm();
module.exports.prototype._getRequiredValidator = function(message) {
    var validator = new RequiredValidator();
    validator.setMessage(message);

    return validator;
}

module.exports.prototype._getIdValidator = function(table, message) {
    var validator = new IdValidator(table);
    validator.setMessage(message);

    return validator;
}