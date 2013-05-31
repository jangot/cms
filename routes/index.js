var userLogin = require(global.LIB_PATH + '/userLogin');

var USER_ROUTE = 'user';
module.exports = {

    position : 0,
    name : '',

    //'all ' : userLogin,

    'all :route?' : [
        userLogin,
        function(req, res, next){
            if (req.params.route == USER_ROUTE) {
                next();
                return;
            }
            if (req.currentUser) {
                next();
            } else {
                res.redirect('/user');
            }
        }
    ]
}

