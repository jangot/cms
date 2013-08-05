module.exports = function(id) {

    this._id = id;
    this._users = [];
    this._date = new Date();
}

module.exports.prototype = {

    _id : null,
    _users : null,
    _date : null,

    getId : function() {
        return this._id;
    },

    setDate : function(date) {
        this._date = new Date(date);
    },

    addUser : function(siat, login) {
        siat = --siat;
        this._users[siat] = {
            login : login,
            seeFlop : true,
            win : false,
            position : null,
            open : false
        };
    },

    setButton : function(login) {
        for (var i = 0; i < this._users.length; i++)  {
            if (!this._users[i]) {
                this._users.splice(i, 1);
            }
        }

        do {
            var el = this._users.shift();
            this._users.push(el);
        } while(this._users[0].login != login)

        for (var i in this._users) {
            this._users[i].position = this._getPositionName(i);
        }

        return this;
    },

    flopPass : function(login) {
        this._setUserData(login, 'seeFlop', false);
        return this;
    },

    setWin : function(login) {
        this._setUserData(login, 'win', true);
        return this;
    },

    setOpen : function(login) {
        this._setUserData(login, 'open', true);
        return this;
    },

    getData : function() {
        var result = {
            id : this._id,
            date : this._date,
            users : {}
        };

        for (var i in this._users) {
            result.users[this._users[i].login] = this._users[i];
        }

        return result;
    },

    _setUserData : function(user, key, value) {
        for (var i in this._users) {
            if (this._users[i].login == user && this._users[i][key] !== undefined) {
                this._users[i][key] = value;
                break;
            }
        }
        return this;
    },

    _getPositionName : function(position) {
        position = Number(position)
        var result = 'UTG';
        switch (position) {
            case 0:
                result = 'BTN';
                break;
            case 1:
                result = 'SB';
                break;
            case 2:
                result = 'BB';
                break;
            case 3:
                result = 'UTG';
                break;
            case 4:
                result = 'UTG1';
                break;
            case 5:
                result = 'UTG2';
                break;
            case 6:
                result = 'MP1';
                break;
            case 7:
                result = 'MP2';
                break;
            case 8:
                result = 'MP3';
                break;
            case 9:
                result = 'CO';
                break;
        }
        return result;
    }

}
