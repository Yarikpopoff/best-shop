const express = require('express');
const cors = require('cors');
const http = require('http');
const config = require('./server/config');

const app = express();

app.use(cors({
    origin: config.get('dev-webpack-server'),
    credentials: true
}));

app.options('*', cors({
    origin: config.get('dev-webpack-server'),
    credentials: true
}));

const server = http.createServer(app);
server.listen(config.get('port'),function() {
    // console.log(`[server][listen] port: ${config.get('port')}`);
    // console.log(`[server][listen] dev-webpack-server: ${config.get('dev-webpack-server')}`);
    console.log('Server listening on port ' + server.address().port);
});

module.exports = server;
