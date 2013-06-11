var UserService = require(MODEL_PATH + '/user');
var FormAuth = require(LIB_PATH + '/forms/auth');

module.exports = {

    position : 10,

    'all /:action?' : function(req, res, next) {
        if (req.params.action == 'login') {
            next();
        } else if(!req[CURRENT_USER]){
            res.redirect('/user/login');
        } else {
            next();
        }
    },

    'get ' : function(req, res, next) {
        res.redirect('/user/home');
    },

    'get /home' : function(req, res, next) {
        res.view.title = 'Страница пользователя';
        res.view['user'] = req[CURRENT_USER].getData();
        next();
    },

    'get /login' : function(req, res, next) {
        res.view = {title: 'Авторизация пользователя'};
        next();
    },

    'post /login' : function(req, res){
        var form = new FormAuth();
        form
            .setData(req.body)
            .validate(function(e, messages) {
                if(e) {
                    res.status(HTTP_ERROR_FORM).send(messages);
                } else {
                    var service = new UserService();
                    service.auth(req.body.name, req.body.password, function(e, userId) {
                        if (!e || userId) {
                            req.session.user_id = userId;
                        }
                        res.redirect('/user/home');
                    });
                }
            })
        ;
    }
}

