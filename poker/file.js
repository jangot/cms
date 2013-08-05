var fs = require('fs');

var SPLITER = '\r\n\r\n\r\n\r\n';


module.exports = function(path, parser) {

    this._path = path;
    this._parser = parser;

    this._distributions = {}

}

module.exports.prototype = {

    _path : null,
    _distributions : null,

    addDistributionsData : function(allStats) {
        if (!allStats) {
            allStats = {
                currentUsers : [],
                distributions : {}
            };
        }
        var now = new Date()

        var currentTime = (now.getTime() - (1000 * 60 * 10));

        var distributionsText = fs.readFileSync(this._path, 'utf-8').split(SPLITER);

        var last = 0;
        for (var i = 0; i < distributionsText.length; i++) {
            var parser = this._getParser();
            try {
                parser.parse(distributionsText[i]);
            } catch (e) {
                console.log('!!! Parse error.');
                continue;
            }
            var result = parser.getResult();

            if (last < result.date) {
                last = result.date
            }
            if (result.date > currentTime) {
                console.log(8888);
                var users = Object.keys(result.users);
                allStats.currentUsers = allStats.currentUsers.concat(users);
            }

            var currentUsers = {};
            //console.log(allStats.currentUsers);
//            for (var i in allStats.currentUsers) {
//                for (var j = 0; j < allStats.currentUsers[i].length; j++) {
//                    //currentUsers[allStats.currentUsers[i][j]] = true;
//                }
//
//                //currentUsers[allStats.currentUsers[i]] = i;
//            }
            //allStats.currentUsers = Object.keys(currentUsers);

            allStats.distributions[result.id] = result.users;
        }

         //console.log(new Date(last));

        return allStats;
    },

    _getParser : function() {
        var Parser = this._parser;
        return new Parser();
    }

}