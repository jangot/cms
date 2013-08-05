var File = require('./file');
var Stat = require('./stat');
var Parser = require('./parser/poker-stars');
var fs = require('fs');



var FOLDER = '/home/jangot/.wine/dosdevices/c:/Program Files (x86)/PokerStars/HandHistory/LinPu';



module.exports = function () {
    var paths = fs.readdirSync(FOLDER);

    for (var j in paths) {
        paths[j] = FOLDER + '/' + paths[j];
    }

    var userStatColculator = new Stat();
    var allStats = {
        currentUsers : [],
        distributions : {}
    }
    for (var i = 0; i < paths.length; i++) {
        var file = new File(paths[i], Parser);
        allStats = file.addDistributionsData(allStats);
    }

    var allDistributions = allStats.distributions;
    for (var id in allDistributions) {
        for (var login in allDistributions[id]) {
            userStatColculator.addUserDistribution(allDistributions[id][login]);
        }

    }

    return {
        currentUsers : allStats.currentUsers,
        users : userStatColculator.getAllStat()
    };
}
if (!module.parent) {
    var result = module.exports()
    console.log(result.LinPu);
}








