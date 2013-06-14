var AbstractValidator = require('./abstract');
var Select = require('sql-builder').select;
var db = require(LIB_PATH + '/db');


module.exports = function(table) {
    this._table = table;
};
module.exports.prototype = new AbstractValidator();

module.exports.prototype.validate = function(cb) {
    var query = new Select();
    query
        .select('t.id')
        .from(this._table + ' as t')
        .where('t.id = ' + this._value)
    ;

    var client = db.getClient();
    client.query(query.toString(), function(error, result, fields) {
        if (error) {
            console.log(error);

            cb(Error('DB error'));
        } else if (result.length > 0) {
            cb(null);
        } else {
            cb(Error(this.getMessage()))
        }
    }.bind(this));
    return this;
}
