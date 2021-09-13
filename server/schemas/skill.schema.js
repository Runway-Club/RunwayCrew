const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    description: String,
    id:String,
    image: String,
    levels:[],
    metadata:{
        actor: String,
        created: String,
        updated: String,
    },
    name:String,
});


module.exports = skillSchema;