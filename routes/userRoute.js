var UserService = require(global.MODEL_PATH + '/user');
var Response = require(global.LIB_PATH + '/response');

module.exports = {

    position : 10,

    'all /:action?' : function(req, res, next) {
        if (req.params.action == 'login') {
            next();
        } else if(!req[global.CURRENT_USER]){
            res.redirect('/user/login');
        } else {
            next();
        }
    },

    'get ' : function(req, res, next) {
        res.redirect('/user/home');
    },

    'get /home' : function(req, res, next) {
        var response = new Response(1);
        response.setBody(req[global.CURRENT_USER].getData());
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
            var response = new Response(1);
            response.setBody({id:userId});
            res.send(response.toString());
        });
    }
}

