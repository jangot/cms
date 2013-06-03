var GuitarService = require(global.MODEL_PATH + '/guitar');
var Widget = require(global.LIB_PATH + '/widget');

module.exports = {

    position : 100,

    'get /item/:id?' : function(req, res, next) {
        var id = req.params.id;

        var service = new GuitarService();
        var config = service.getConfig();
        config
            .addId(id)
        ;
        service.getCollection(config, function (e, collection) {
            if (e) {
                console.log(e);
            }
            collection.getById(id, function (error, result) {

                res.render('guitars/item', {
                    title : 'Guitar',
                    guitar : result.getData()
                });

            });
        });
    },

    'get /list' : function(req, res, next) {
        var service = new GuitarService();
        var config = service.getConfig();
        config
        ;
        service.getCollection(config, function (e, collection) {
            if (e) {
                console.log(e);
            }
            res.render('guitars/list', {
                title : 'Guitars',
                list : collection.toArray()
            });
        });

    },

    'all /*': function(req, res, next) {
        res.redirect('/guitars/list');
    }

}
