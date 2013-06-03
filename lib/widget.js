var jade = require('jade');
var fs = require('fs');

//var routersFiles = fs.readdirSync(global.ROUTERS_PATH);


module.exports = function(path, params) {
    if (!path) {
        throw Error('There is\'t path.');
    }

    this._path = path;
    this._params = params || {};
}

module.exports.prototype = {

    _path : null,
    _params : null,

    draw : function(cb) {
        var path = global.WIDGET_PATH + '/' + this._path + '.jade';
        var text = fs.readFileSync(path, 'utf8');

        return jade.compile(text)(this._params);





        jade.renderFile(
            path,
            this._params,
            function (err, html) {
                if (err) {
                    console.log(err);
                    cb('Widget error ' + path);
                    return;
                }
                cb(html);
            }
        );
    }

}
