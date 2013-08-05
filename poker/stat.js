var User = require('./user');

module.exports = function() {

    this._usersInfo = {};

}

module.exports.prototype = {



    _usersInfo : null,

    addUserDistribution : function(userDistribution) {
        var login = userDistribution.login;
        if (!this._usersInfo[login]) {
            this._usersInfo[login] = new User(login);
        }
        this._usersInfo[login].addStat(userDistribution);
        return this;
    },

    getAllStat : function() {
        var result = {};

        for (var login in this._usersInfo) {
            result[login] = this._usersInfo[login].getAllStat();
        }
        return result;
    }


}
