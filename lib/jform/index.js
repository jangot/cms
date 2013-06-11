var async = require('async');

module.exports = function() {}

module.exports.prototype = {

    _list : null,
    _data : null,
    _message : null,

    addElement : function(name, type) {
        if (!type) {
            type = 'text';
        }
        if (!this._list) {
            this._list = {};
        }
        this._list[name] = {
            type : type,
            filters : [],
            validators : []
        };

        this._message = 'Form is invalid.';
        return this;
    },

    setValidator : function(name, validator) {
        if (typeof validator.validate !== 'function') {
            return this;
        }
        this._list[name].validators.push(validator);

        return this;
    },

    setFilter : function(name, filter) {
        if (typeof filter.filter !== 'function') {
            return this;
        }
        this._list[name].filters.push(filter);

        return this;
    },

    setData : function(data) {
        this._data = data;
        return this;
    },

    getData : function() {
        //@todo wrire filters
        throw Error('You mast write filters for form.');

        var result = {};
        for (var name in this._list) {
            result[name] = this._getElementData(name);
        }

        return result;
    },

    validate : function(cb) {
        if (!this._data) {
            cb(Error('There is\'t data.'));
        }

        var series = {};
        for (var name in this._list) {
            series[name] = this._getValidateFunction(name);
        }

        async.parallel(series, function(e, result) {
            var error = null;
            for (var name in result) {
                if (result[name]) {
                    error = Error(this._message);
                } else {
                    delete result[name];
                }
            }
            cb(error, result);

        }.bind(this));
        return this;
    },

    _getValidateFunction : function(name) {
        return function(cb) {
            this._elementIsValid(name, function(e) {
                if(e) {
                    cb(null, e.message);
                } else {
                    cb(null, null);
                }
            });
        }.bind(this);
    },

    _elementIsValid : function(name, cb) {
        if (!this._list[name]) {
            return false;
        }

        var value = this._data[name];
        var series = [];

        for (var i = 0; i < this._list[name].validators.length; i++) {
            var validator = this._list[name].validators[i];
            validator.setValue(value);
            series.push(validator.validate.bind(validator));
        }

        async.series(series, function(e) {
            if(e) {
                cb(e);
            } else {
                cb(undefined);
            }
        });
        return this;
    },

    _getElementData : function(name) {
        var result = this._data[name];

        var filters = this._list[name].filters;
        for (var i = 0; i < filters.length; i++) {
            var result = filters[i].filter(result);
        }

        return result;
    }

}


