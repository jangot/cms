var UserService = require(global.MODEL_PATH + '/user');
var Response = require(global.LIB_PATH + '/response');
var userLogin = require(global.LIB_PATH + '/userLogin');

module.exports = {

    position : 10,

    'all /:action?' : [
        userLogin,
        function(req, res, next) {
            if (req.params.action == 'login') {
                next();
            } else if(!req.currentUser){
                res.redirect('/user/login');
            } else {
                next();
            }
        }
    ],

    'get ' : function(req, res, next) {
        res.redirect('/user/home');
    },

    'get /home' : function(req, res, next) {
        var response = new Response(1);
        response.setBody(req.currentUser.toString());
        res.send(response.toString());
    },

    'get /login' : function(req, res) {
        res.render('user/login', {
            title: 'Express'
        });
    },

    'post /login' : function(req, res){
        var service = new UserService();

        service.auth(req.body.name, req.body.password, function(e, userId) {
            if (!e || userId) {
                req.session.user_id = userId;
            }
            res.redirect('/user/home');
        });
    }
}

