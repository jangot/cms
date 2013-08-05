var Result = require('./result');


var SPLITER = '\r\n';
var TITLE_HOLE_CARDS = '*** HOLE CARDS ***';

module.exports = function() {
    this._strings = [];
}

module.exports.prototype = {

    _strings : null,
    _result : null,

    parse : function(distribution) {

        this
            ._splitStrings(distribution)
            ._createResult()
            ._createUsers()

            ._setFlopers()
            ._setWinner()
        ;

        return this;
    },

    getResult : function() {
        return this._result.getData();
    },

    _splitStrings : function(distribution) {
        this._strings = distribution.split(SPLITER);
        return this;
    },

    _createResult : function() {
        var id = this._strings[0].split(/#|:/)[1];
        this._result = new Result(id);

        var dateString = this._strings[0].split(') - ')[1].replace(' ET', '');
        this._result.setDate(this._getDateByString(dateString));

        return this;
    },

    _getDateByString : function(dateString) {
        var dataArray = dateString.split(/\/| |:/g);
        dataArray[1] = Number(dataArray[1]) - 1;
        var UTC = Date.UTC.apply(Date, dataArray);

        return (new Date(UTC)).getTime() + 1000 * 60 * 60 *4;
    },

    _createUsers : function() {
        var users = [];
        this._each(function(item, i) {
            var userStringRE = /^Seat/;
            if (!userStringRE.test(item)) return false;

            var data = item.split(/ |: /);

            var login = /: (.+) \(/.exec(item)[1];

            users[data[1]] = login;
            this._result.addUser(data[1], login);

        }, /^Table/);

        var buttonRE = /#(\d+)/;
        var r = buttonRE.exec(this._strings[1]);

        var buttonPosition = buttonRE.exec(this._strings[1])[1];

        this._result.setButton(users[buttonPosition]);

        return this;
    },


    _setFlopers : function() {
        this._each(function(item, i) {
            if (!/folds/.test(item)) {
                return;
            }
            var login = /^(.+): /.exec(item)[1];
            this._result.flopPass(login);
        }, /HOLE CARDS/, /FLOP/);
        return this;
    },

    _setWinner : function() {
        this._each(function(item, i) {
            if (!/^Seat/.test(item)) return true;
            var login = this._getWinLogin(item);
            if (/won/.test(item)) {
                this._result.setWin(login);
                this._result.setOpen(login);
                return true;
            }
            if (/showed/.test(item) || /mucked/.test(item)) {
                this._result.setOpen(login);
                return true;
            }
            if (/collected/.test(item)) {

                this._result.setWin(login);
                return true;
            }


        }, /SUMMARY/)
        return this;
    },

    _getWinLogin : function(item) {
        var rep = [
            ' folded',
            ' collected',
            ' before',
            ' Flop',
            / \(.+\)/,
            /^Seat (\d+): /,
            ' on the',
            ' Turn'
        ];
        for (var i = 0; i < rep.length; i++) {
            item = item.replace(rep[i], '');
        }
        item = item.split(' showed')[0];
        item = item.split(' with')[0];
        item = item.split(' mucked')[0];
        return item;
    },

    _each : function(fn, from, to) {
        if (!from) {
            from = /^/;
        }
        if (!to) {
            to = /^$/
        }

        var run = false;
        for (var i = 0; i < this._strings.length; i++) {
            if (from.test(this._strings[i]) && !run) {
                run = true;
                continue;
            }
            if (run && to.test(this._strings[i])) {
                break;
            }
            if (run) {
                var res = fn.apply(this, [this._strings[i], i]);
                if (res === false) {
                    break;
                }
            }
        }
        return this;
    }



}