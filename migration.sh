#!/usr/bin/env bash

if [ "$1" == "" ]; then
    echo "Error: Specify migration name."
    echo "new_migration <name> [--sql-file]"
else
    echo "Creating new migration " $1
    node node_modules/db-migrate/bin/db-migrate  -m server/db/migrations --config server/db/database.json create $1 $2
fi
read -p "Press any key to continue... " -n1 -s



