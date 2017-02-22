const config = require('./middleware');

function get(key){
    try {
        return config.get(key);
    }
    catch (e){
        console.error(`[server/configuration/config.js][get] Can't find key '${key}'`);
        return null;
    }
}

module.exports = {
    get
};