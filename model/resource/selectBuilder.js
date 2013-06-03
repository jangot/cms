var AbstractSelectBuilder = require('../abstract/selectBuilder');

module.exports = global.Class(AbstractSelectBuilder, {

    _urls : null,

    init : function() {
        AbstractSelectBuilder.apply(this, arguments);
        this._urls = [];
    },

    getSql : function () {
        var query = this._getSelect();
        query
            .select('*')
            .from(global.DB_TABEL_RESOURCE + ' AS r')
            .where(this._getWhere())
        ;

        return query.toString();
    },

    _getWhere : function() {
        var where = '';

        this
            ._addIdWhere(where)
            ._addUrlWhere(where)
        ;

        return '';
    },

    _addIdWhere : function(where) {
        for (var i = 0; i < this._ids.length; i++) {
            if (!where) {
                where = 'r.id' + ' = ' + this._ids[i];
            } else {
                where += ' OR r.id' + ' = ' + this._ids[i];
            }
        }
        return this;
    },

    _addUrlWhere : function(where) {
        for (var i = 0; i < this._urls.length; i++) {
            if (!where) {
                where = 'r.url' + ' = ' + this._urls[i];
            } else {
                where += ' OR r.url' + ' = ' + this._urls[i];
            }
        }
        return this;
    }

});

