var AbstractSelectBuilder = require('../abstract/selectBuilder');

module.exports = global.Class(AbstractSelectBuilder, {

    getSql : function () {
        var query = this._getSelect();
        query
            .select('g.id')
            .select('g.price')
            .select('model')
            .select('photo')
            .select('b.name AS brand')
            .select('n_m.name as neck_material')
            .select('d_m.name as deck_material')
            .from(global.DB_TABLE_GUITAR + ' AS g')
            .left('brands AS b ON g.brand = b.id')
            .left(' LEFT JOIN material AS n_m ON g.neck_material = n_m.id')
            .left(' LEFT JOIN material AS d_m ON g.deck_material = d_m.id')
        ;

        var where = '';
        for (var i = 0; i < this._ids.length; i++) {
            if (!where) {
                where = 'g.id' + ' = ' + Number(this._ids[i]);
            } else {
                where += ' OR g.id' + ' = ' + Number(this._ids[i]);
            }
        }
        query.where(where);

        var result = query.toString();

        return result;
    },

    getAddSql : function(data) {
        var insert = this._getInsert();
        delete data.id;

        insert
            .into(DB_TABLE_GUITAR)
            .values(data)
        ;
        return insert;
    }

});

