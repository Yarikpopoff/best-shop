1. When launch script 'server' using '_config.dev.json'
2. When launch script 'server-prod' using '_config.prod.json'
3. For using custom untrackable config file create files 'config.dev.json' and 'config.prod.json' which will be loading in case of using scripts 'server' and 'server-prod' 
4. key "db-env" means name of db-migrate configuration 'server/db/database.json' available values "dev", "prod", "memory"(difference db locations "server/db/dev.db", "server/db/prod.db",  ":memory:")