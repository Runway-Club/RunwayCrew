const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    id: String,
    credit: Number,
    description: String,
    exp: Number,
    image: String,
    metadata:{
        actor: String,
        created: String,
        updated: String,
    },
    name: String,
    skill:[]
});

module.exports = achievementSchema;