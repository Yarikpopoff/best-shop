const config = require('./middleware');
const {log, error} = require('debugger')("server");

function get(key){
    try {
        return config.get(key);
    }
    catch (e){
        error(`[server/configuration/config.js][get] Can't find key '${key}'`);
        return null;
    }
}

module.exports = {
    get
};