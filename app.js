
/**
 * Module dependencies.
 */


require('./constants/global');

global.Class = require('inherit');
global.register = require('./lib/register');
require('./bootstrap').run();




