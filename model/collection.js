var inherit = require('inherit');

module.exports = inherit({

    _list : null,
    length : null,

    __constructor : function() {
        this._list = {};
        this.length = 0;
    },

    add : function (id, ob, cb) {
        if (!id) {
            cb(Error('You try to add object without params to collection.'));
            return;
        }
        if (!ob) {
            cb(Error('You try to missing object to collection.'));
            return;
        }

        this._list[id] = ob;
        this.length++;

        if(cb) {
            cb(undefined);
        }
        return this;
    },

    getById : function (id, cb) {
        if (!this._list[id]) {
            var error = Error('Object with id "'+ id +'" not found.');
            if (cb) {
                cb(error);
                return;
            }
            throw error;
        }
        if (cb) {
            cb(undefined, this._list[id]);
        }
        return this._list[id];
    },

    toString : function (){
        return JSON.stringify(this._list);
    },

    toArray : function() {
        var result = [];
        for (var id in this._list) {
            if (typeof this._list[id].getData == 'function') {
                result.push(this._list[id].getData());
            } else {
                result.push(this._list[id]);
            }
        }
        return result;
    }

});
