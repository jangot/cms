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
    }
//    ,
//
//    'all :route?' : function(req, res, next) {
//        if(systemRoutes[req.params.route]) {
//            next();
//            return;
//        }
//        var cms = new CMS(req, res, next);
//        cms.run(function(e) {
//            if (e) {
//                res.send('Sorry, we\'re screwed.');
//            } else {
//                console.log('Cms is ok.');
//            }
//        });
//    }
}

