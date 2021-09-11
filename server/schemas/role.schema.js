const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id: String,
    description: String,
    image: String,
    metadata: {
        actor: String,
        created: String,
        updated: String
    },
    name:String,
});

module.exports = roleSchema;