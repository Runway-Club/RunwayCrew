const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express()

//router
const roleRouter = require('./router/role.router');
const achievementRouter = require('./router/achievement.router');

server.use(cors());
server.use(bodyParser.json());

server.use("/profile", require('./router/profile.router'));
server.use("/contri", require('./router/contribute.router'));
server.use("/user", require('./router/user.router'));
server.use("/api", roleRouter, achievementRouter);
server.use("/atc", require('./router/atc.router'));
server.use("/skill", require('./router/skill.router'));

module.exports = server;