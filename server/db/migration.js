'use strict';

const DBMigrate = require('db-migrate');
const {log, error} = require('debugger')("migration");

exports.db_upgrade = (environment, scope) =>{
    const dbmigrate = DBMigrate.getInstance(true,{cwd: __dirname, env:environment}); //,{cwd: __dirname, env:environment}
    dbmigrate.up(undefined, scope)
        .then(function() {
            log('successfully migrated.');
        })
        .catch(function (error) {
            error(error);
        });
};