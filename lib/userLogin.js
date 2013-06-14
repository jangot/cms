var UserService = require(global.MODEL_PATH + '/user');

module.exports = function(req, res, next) {
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
                req.currentUser = result;
                next();
            });
        });
    } else {
        next();
    }
}
