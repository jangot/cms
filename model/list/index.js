var Select = require('sql-builder').select;
var db = require(global.LIB_PATH + '/db');
var Collection = require('../collection');

module.exports = function(table) {
    if(!table) {
        throw Error('There is\' table name.');
    }
    this._table = table;
}
module.exports.prototype = {

    _table : null,

    getList : function(cb) {
        var query = new Select();
        query
            .select('*')
            .from(this._table)
        ;

        var client = db.getClient();
        client.query(query.toString(), function(error, result, fields) {
            if (error) {
                cb(error);
                return;
            }

            var collection = this._getCollection(result);
            cb(undefined, collection);
        }.bind(this));
    },

    _getCollection : function(result) {
        var collection = new Collection();
        for (var i = 0; i < result.length; i++) {
            var el = result[i];
            collection.add(el.id, el);
        }
        return collection;
    }

}
