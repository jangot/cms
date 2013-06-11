var db = require(global.LIB_PATH + '/db');
var Collection = require('../collection');

module.exports = global.Class({

    getCollection : function (config, cb) {
        var sql = config.getSql();

        var client = this._getDbClient();
        client.query(sql.toString(), function(error, result, fields) {
            if (error) {
                cb(error);
                return;
            }

            var collection = new Collection();

            for (var i in result) {
                this._addToCollection(result[i], collection, function () {
                    if(collection.length == result.length) {
                        cb(undefined, collection);
                    }
                })
            }
        }.bind(this));
    },

    add : function(data, cb) {
        cd(Error('The method is\'t defined.'));
        return this;
    },

    _addToCollection : function (data, collection, cb) {
        var object = this._createObject(data);
        collection.add(data.id, object, cb);
    },

    _createObject : function (){
        cd(Error('The method is\'t defined.'));
    },

    _getDbClient : function() {
        return db.getClient();
    }

});
