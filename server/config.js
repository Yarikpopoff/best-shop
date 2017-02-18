const conf = require('./configuration');

function get(key){
    try {
        return conf.get(key);
    }
    catch (e){
        console.error(`[server/configuration/config.js][get] Can't find key '${key}'`);
        return null;
    }
}

module.exports = {
    get
};

