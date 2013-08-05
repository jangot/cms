module.exports = {




    'get /test' : function(req, res, next) {
        res.view.title = 'Test';
        console.log(req.query);

        next();
    }

}
