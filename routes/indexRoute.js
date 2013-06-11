var UserService = require(global.MODEL_PATH + '/user');
var CMS = require(global.CMS_PATH);

var systemRoutes = {
    user : 1,
    admin : 1
}

module.exports = {

    position : 0,
    name : '',

    'all *' : function(req, res, next) {
        if (req.session.user_id) {
            var service = new UserService();
            var config = service.getConfig();
            config
                .addId(req.session.user_id)
            ;
            service.getCollection(config, function (e, collection) {
                if (e) {
                    next();
                }

                collection.getById(req.session.user_id, function (error, result) {
                    if (error) {
                        next();
                        return;
                    }
                    req[global.CURRENT_USER] = result;
                    next();
                });
            });
        } else {
            next();
        }
    },

    'all ' : function(req, res, next) {
        res.redirect('/guitars');
    },

    'all :route/:template' : function(req, res, next) {
        res.template = req.params.route + '/' + req.params.template;
        next();
    },
    'all :route/:template/*' : function(req, res, next) {
        res.template = req.params.route + '/' + req.params.template;
        next();
    }
}

