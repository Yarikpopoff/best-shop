const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'dev'; /// prod || dev
const configPath =  path.join(__dirname, `config.${env}.json`);
const fileName = (function(path){
    if (fs.existsSync(path)) {
        return path;
    } else {
        path = path.join(__dirname, `_config.${env}.json`);
        if (fs.existsSync(path)) {
            return path;
        }  else {
            throw "configuration file not found";
        }
    }
})(configPath);

nconf.argv()
    .env()
    .file({file: fileName});

module.exports = nconf;