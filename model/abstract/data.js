
module.exports = global.Class({

    id : null,

    __constructor : function (data){
        this
            ._checkData(data)
            ._setData(data)
        ;
    },

    getId : function (){
        return this.getParam('id');
    },

    getParam : function (name){
        var params = this.getParams();
        return params[name];
    },

    getParams : function() {
        var result = {};
        for (var name in this) {
            if (typeof this[name] !== 'function') {
                result[name] = this[name];
            }
        }
        return result;
    },

    toString : function (){
        return JSON.stringify(this.getParams());
    },

    _checkData : function (data){
        if (!data) {
            throw Error('There is\'t data');
        }
        return this;
    },

    _setData : function (data){
        for (var name in this) {
            if (typeof this[name] !== 'function' && data[name] !== undefined) {
                this[name] = data[name];
            }
        }
        return this;
    }

});
