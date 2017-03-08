const Promise = require('bluebird');
const Sqlite = require('sqlite-pool');
const config = require('../conf');
const path = require('path');
const {log, error} = require('debugger')("utils");

function dbPath() {
    let result;
    switch (config.get('db-env')) {
        case "dev":
            result = path.join(__dirname, '../..', "server/db/dev.sqlite");
            break;
        case "prod":
            result = path.join(__dirname, '../..', "server/db/prod.sqlite");
            break;
        default:
            result = "";
    }
    log(`[getDbPath][spath] ${result}`);
    return result;
}

function getDB() {
    return new Sqlite(dbPath(), {Promise});
}

function getKnex(){
    const knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: dbPath()
        }
    });
    return knex;
}

module.exports = {
    dbPath,
    getKnex,
    getDB
};