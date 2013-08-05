module.exports = function(login) {

    this._login = login;

    this._analysis = {

        distribution : 0,
        notSeeFlop : {
            BTN : 0,
            SB : 0,
            BB : 0,
            UTG : 0,
            UTG1 : 0,
            UTG2 : 0,
            MP1 : 0,
            MP2 : 0,
            MP3 : 0
        },
        seeFlop : {
            BTN : 0,
            SB : 0,
            BB : 0,
            UTG : 0,
            UTG1 : 0,
            UTG2 : 0,
            MP1 : 0,
            MP2 : 0,
            MP3 : 0
        },
        open : {
            all : 0,
            win : 0
        },
        close : 0
    }

}

module.exports.prototype = {

    _analysis : null,
    _login : null,

    addStat : function(stat) {
        this._analysis.distribution++;
        if (!stat.seeFlop) {
            this._analysis.notSeeFlop[stat.position]++;
            return this;
        }
        this._analysis.seeFlop[stat.position]++;
        if (stat.open && stat.win) {
            this._analysis.open.all++;
            this._analysis.open.win++;
        } else if (stat.open) {
            this._analysis.open.all++;
        } else if (stat.win) {
            this._analysis.close++;
        }

    },

    getAllStat : function() {
        return this._analysis;
    }

}
