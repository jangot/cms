var fs = require('fs');


module.exports = function(source, target, cb) {
    fs.readFile(source, function (err, data) {
        if (err) throw err;
        fs.writeFile(target, data, function (err) {
            if (err) throw err;
            cb(null);
            //console.log('It\'s saved!');
        });
    });
}
//return;
//
//module.exports = function copyFile(source, target, cb) {
//    var cbCalled = false;
//
//    var rd = fs.createReadStream(source);
//    rd.on("error", function(err) {
//        done(err);
//    });
//    var wr = fs.createWriteStream(target);
//    wr.on("error", function(err) {
//        done(err);
//    });
//    wr.on("close", function(ex) {
//        done();
//    });
//    rd.pipe(wr);
//
//    function done(err) {
//        if (!cbCalled) {
//            cb(err);
//            cbCalled = true;
//        }
//    }
//}
