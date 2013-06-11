var AbstractIndex = require('../abstract/index');
var Guitar = require('./object');

module.exports = global.Class(AbstractIndex, {

    getConfig : function () {
        var Config = require('./selectBuilder');
        return new Config();
    },

    add : function(data, cb) {
        var Data = require('./data');
        try {
            data = new Data(data);
        } catch (e) {
            cb(e);
            return this;
        }

        var Config = require('./selectBuilder');
        var sqlBuilder = new Config();
        var sql =  sqlBuilder.getAddSql(data.getParams());

        var client = this._getDbClient();
        client.query(sql.toString(), function(){
            cb(null);
        });
        return this;
    },

    _createObject : function (objectData) {
        return new Guitar(objectData);
    },

    _getDataConstructor : function (){
        return require('./data');
    }

});