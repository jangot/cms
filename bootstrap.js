module.exports = {

    _register : null,

    run : function() {

        this._register = global.register;

        this
            ._iniApp()
            ._loadRoutes()
            ._createServer()
        ;

    },

    _iniApp : function() {
        var express = require('express')
            , path = require('path');

        var app = express();

        // all environments
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('your secret here'));
        app.use(express.session());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));

        // development only
        if ('development' == app.get('env')) {
            app.use(express.errorHandler());
        }


        this._register.setApplication(app);
        return this;
    },

    _loadRoutes : function() {
        var fs = require('fs');

        var routersFiles = fs.readdirSync(global.ROUTERS_PATH);
        for (var i in routersFiles) {
            require(global.ROUTERS_PATH + '/' + routersFiles[i]);
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
