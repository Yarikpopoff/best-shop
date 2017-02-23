'use strict';

const DBMigrate = require('db-migrate');

exports.db_upgrade = (environment, scope) =>{
    const dbmigrate = DBMigrate.getInstance(true,{cwd: __dirname, env:environment}); //,{cwd: __dirname, env:environment}
    dbmigrate.up(undefined, scope)
        .then(function() {
            console.log('successfully migrated.');
        })
        .catch(function (error) {
            console.error(error);
        });
};