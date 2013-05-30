
/*
 * GET home page.
 */

global.register.getApplication().get('/', function(req, res){
    res.render('index', { title: 'Express' });
});
