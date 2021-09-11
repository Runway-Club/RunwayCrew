const mongoose = require('mongoose');

const contribute = new mongoose.Schema({
    achievements: [],
    credit: Number,
    email: String,
    exp:Number,
    skills: [],
    uid: String,
});

module.exports = contribute;