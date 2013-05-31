module.exports = {

    _register : null,

    run : function() {

        this._register = global.register;

        this
            ._iniApp()
            ._loadConfig()
            ._loadRoutes()
            ._createServer()
        ;

    },

    _iniApp : function() {
        var express = require('express')

        var app = express();

        // all environments
        app.set('port', process.env.PORT || 3000);
        app.set('views', global.VIEWS_PATH);
        app.set('view engine', 'jade');
        app.disable('strict routing');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('42'));
        app.use(express.session());
        app.use(express.static(global.PUBLIC_PATH));
        app.use(app.router);


        // development only
        if ('development' == app.get('env')) {
            app.use(express.errorHandler());
        }

        this._register.setApplication(app);
        return this;
    },

    _loadConfig : function() {
        this._register.setConfig(require('./conf/application'));
        return this;
    },

    _loadRoutes : function() {
        var fs = require('fs');

        var routersFiles = fs.readdirSync(global.ROUTERS_PATH);

        var routes = [];
        for (var i in routersFiles) {
            var rout = require(global.ROUTERS_PATH + '/' + routersFiles[i]);
            if (rout.name === undefined) {
                rout.name = routersFiles[i].split('.js')[0];
            }
            routes.push(rout);
        }

        routes.sort(function(a, b) {
            return a.position > b.position ? 1 : -1;
        });

        var app = this._register.getApplication();
        for (var i = 0; i < routes.length; i ++) {
            var routeList = routes[i];

            for (var key in routeList) {
                var params = key.split(' ');

                if (typeof app[params[0]] == 'function') {
                    console.log('/' + routeList.name + params[1]);
                    if (typeof routeList[key] == 'function') {
                        app[params[0]]('/' + routeList.name + params[1], routeList[key].bind(routeList));
                    } else {
                        app[params[0]]('/' + routeList.name + params[1], routeList[key]);
                    }

                }

            }

        }

        return this;
    },

    _createServer : function() {
        var app = this._register.getApplication();
        require('http').createServer(app).listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'));
        });

        return this;
    }

}
