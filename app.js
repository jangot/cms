
/**
 * Module dependencies.
 */


require('./constants/global');

global.Class = require('./lib/node-inherit');




global.register = require('./lib/register');
var bootstrap = require('./bootstrap');
bootstrap.run();




