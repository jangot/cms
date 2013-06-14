module.exports = function() {

}

module.exports.prototype = {

    filter : function(value, cb) {
        cb(null, value);
        return this;
    }

}
