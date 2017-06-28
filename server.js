const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const {log, error} = require('./server/node_modules/debugger')('server');

const config = require('./server/conf');
const migration = require('./server/db/migration');

migration.db_upgrade(config.get("db-env"));

const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors({
    origin: config.get('dev-webpack-server'),
    credentials: true
}));

app.options('*', cors({
    origin: config.get('dev-webpack-server'),
    credentials: true
}));

// routes
app.use('/', express.static('public'));
app.get('/image/products/:name', function(req,res,next){
    const name = "100.png";//req.param.name;
    const imagePath = path.join(config.get("image-path"), name);
    log(`imagePath  ${imagePath}`);
    res.sendFile(imagePath);
});
app.use('/api',  require('./server/routes'));

const server = http.createServer(app);
server.listen(config.get('port'),function() {
    // console.log(`[server][listen] port: ${conf.get('port')}`);
    // console.log(`[server][listen] dev-webpack-server: ${conf.get('dev-webpack-server')}`);
    log('Server listening on port ' + server.address().port);
});

module.exports = server;
