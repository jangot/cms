var poker = require('../poker');

function calculateStat(sata) {
    var result = {};
    var seeFlop = 0;
    for (var position in sata.seeFlop) {
        seeFlop += sata.seeFlop[position];
    }
    result.seeFlop = {
        num : seeFlop,
        interest : Math.round(seeFlop / sata.distribution * 100)
    }

    return result;
}

module.exports = {

    'all /stat' : [
        function(req, res, next) {
            var time = new Date();
            var allStats = poker();
            res.view.time = (new Date()).getTime() - time.getTime()


            var stat = allStats.users;
            res.view.title = 'Poker';

            res.view.allUsers = [];
            //res.view.currentUsers = allStats.currentUsers;

            res.view.stats = {};
            res.view.users = {
                LinPu : stat['LinPu']
            }
            //console.log(req.query);
            if (Object.keys(req.query).length > 0) {
                res.view.users = req.query;
            }


            for (var name in stat) {
                res.view.allUsers.push(name);
                if (res.view.users[name]) {
                    res.view.stats[name] = stat[name]
                }
            }

            res.view.currentUsers = {};
            for (var i = 0; i < allStats.currentUsers.length; i++) {
                res.view.currentUsers[allStats.currentUsers[i]] = true;
            }
            next()
        },

        function(req, res, next) {
            for (var login in res.view.stats) {
                res.view.stats[login].calculate = calculateStat(res.view.stats[login]);
            }
            next();
        }
    ]

}
