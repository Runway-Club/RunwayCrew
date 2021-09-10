const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()

server.use(cors());
server.use(bodyParser.json());

server.use("/user", require('./router/user.router'));
module.exports = server;