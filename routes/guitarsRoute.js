var GuitarService = require(MODEL_PATH + '/guitar');
var ListService = require(MODEL_PATH + '/list');
var async = require('async');
var FormAddGuitar = require(LIB_PATH + '/forms/guitars');
var copyFile = require(LIB_PATH + '/copyFile');
var uuid = require(LIB_PATH + '/uuid');

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
                res.view = {
                    title : 'Guitar',
                    guitar : result.getData()
                }
                next();
            });
        });
    },

    'get /list/:item?' : function(req, res, next) {
        var service = new GuitarService();
        service.getCollection(service.getConfig(), function (e, collection) {
            if (e) {
                console.log(e);
            }
            res.view = {
                title : 'Guitars',
                list : collection.toArray()
            }
            next();
        });

    },

    'get /add' : function(req, res, next) {
        res.view.title = 'Добавить инструмент';
        var materialService = new ListService(DB_TABLE_MATERIAL);
        var brandService = new ListService(DB_TABLE_BRAND);


        async.parallel({
            materials : materialService.getList.bind(materialService),
            brands : brandService.getList.bind(brandService)
        }, function(e, collections) {
            for (var name in collections) {
                var arr = collections[name].toArray();
                arr.unshift({
                    id : 0,
                    name : '-- select --'
                });
                res.view[name] = arr;
            }
            next();
        });
    },

    'post /add' : function(req, res, next) {
        var fs = require('fs');
        var service = new GuitarService();

        var form = new FormAddGuitar();
        form.setData(req.body);

        var series = [
            form.validate.bind(form),
            function(result, cb) {
                form.getData(cb);
            },
            function(result, cb) {
                if (result.photo) {
                    fs.rename(result.photo.path, result.photo.pathForSave, function(e) {
                        result.photo = result.photo.newFileName;
                        cb(e, result);
                    });
                } else {
                    cb(null, result);
                }
            },
            service.add.bind(service)
        ];

        async.waterfall(series, function(e, result) {
            if(e) {
                if (e.code == HTTP_ERROR_FORM) {
                    res.status(HTTP_ERROR_FORM).send(result);
                } else {
                    res.status(HTTP_ERROR_SERVER).send(e.message);
                }
                return;
            }

            res.redirect('/'+ this.name +'/list');
        }.bind(this));

    },

    'all ': function(req, res, next) {
        res.redirect('/'+ this.name +'/list');
    }

}
