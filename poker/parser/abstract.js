module.exports = function() {

}

module.exports.prototype = {

    _distribution : null,

    parse : function(distribution) {
        this._distribution = distribution;

        return this._getResult();
    },

    getDistribution : function() {
        return this._distribution;
    },

    _getResult : function() {
        throw Error('Call abstract method');
    }

}
