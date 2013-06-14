var AbstractFilter = require('./abstract');
var uuid = require(LIB_PATH + '/uuid');

module.exports = function() {

}

module.exports.prototype = new AbstractFilter();

module.exports.prototype.filter = function(value, cb) {
    if (!value) {
        cb(null, value);
        return;
    }

    value.id = uuid();

    var fileNameArray = value.name.split('.');
    value.newFileName = value.id + '.' + (fileNameArray[fileNameArray.length - 1]);
    value.pathForSave = IMAGES_FOLDER + '/' + value.newFileName;

    cb(null, value);
}