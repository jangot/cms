var BaseForm = require(LIB_PATH + '/jform');



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

        .addElement('photo')
        .setValidator('photo', this._getIsFileValidator('Photo is\'t image.'))
        .setFilter('photo', this._getPhotoFilter())

        .addElement('price')
        .setValidator('price', this._getRequiredValidator('Price is empty.'))
        .setValidator('price', this._getNumberValidator('Price is\'t number.'))
    ;

}
module.exports.prototype = new BaseForm();
module.exports.prototype._getRequiredValidator = function(message) {
    var RequiredValidator = require(LIB_PATH + '/validators/required');

    var validator = new RequiredValidator();
    validator.setMessage(message);

    return validator;
}

module.exports.prototype._getIdValidator = function(table, message) {
    var IdValidator = require(LIB_PATH + '/validators/idInTable');

    var validator = new IdValidator(table);
    validator.setMessage(message);

    return validator;
}

module.exports.prototype._getPhotoFilter = function() {
    var Filter = require(LIB_PATH + '/filters/file');

    return new Filter();

}

module.exports.prototype._getIsFileValidator = function(message) {
    var IsFileValidator = require(LIB_PATH + '/validators/isImagesFile');

    var validator = new IsFileValidator();
    validator.setMessage(message);

    return validator;
}

module.exports.prototype._getNumberValidator = function(message) {
    var IntValidator = require(LIB_PATH + '/validators/int');

    var validator = new IntValidator();
    validator.setMessage(message);

    return validator;
}