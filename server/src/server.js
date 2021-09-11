const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()

//router
const roleRouter = require('./router/role.router');
const achievementRouter = require('./router/achievement.router');

server.use(cors());
server.use(bodyParser.json());

server.use("/user", require('./router/user.router'));
server.use("/api", roleRouter, achievementRouter);

module.exports = server;