var AbstractIndex = require('../abstract/index');
var Resource = require('./object');

module.exports = global.Class(AbstractIndex, {

    getConfig : function () {
        var Config = require('./selectBuilder');
        return new Config();
    },

    _createObject : function (objectData) {
        return new Resource(objectData);
    }

});
