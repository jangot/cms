var UID_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

module.exports = function(){
    return UID_TEMPLATE.replace(/[xy]/g, replace);
}


function replace(c) {
    var r = Math.random()*16|0;
    if(c == 'x') {
        r = (r&0x3|0x8);
    }
    return r.toString(16);
}
