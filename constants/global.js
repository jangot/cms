var common = require('../lib/common');
var path = require('path');
path.join(__dirname, 'public')

common.defines({
    VIEWS_PATH : path.join(__dirname, '../views'),
    LIB_PATH : path.join(__dirname, '../lib'),
    MODEL_PATH : path.join(__dirname, '../model'),
    ROUTERS_PATH : path.join(__dirname, '../routes'),
    PUBLIC_PATH : path.join(__dirname, '../public'),
    ACL_RESOURCES : [
        'content',
        'admin_panel'
    ],
    ACL_ROLES : {
        GUEST : 'guest',
        ADMIN : 'admin'
    },
    DB_TABLE_GUITAR : 'guitar',
    DB_TABLE_USER : 'user'
});
