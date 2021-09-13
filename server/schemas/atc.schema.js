const mongoose = require('mongoose');


const atcSchema = new mongoose.Schema({
    address: String,
    contribMetadata: {
        actor: String,
        created: String,
        updated: String,
    },
    dob: String,
    email: String,
    facebook: String,
    gender:String,
    linkIn:String,
    name:String,
    phoneNumber:String,
    photoUrl:String,
    profileMetadata:{
        updated:Number,
    },
    roles:[],
    selectedRoles:[],
    uid:String,
  
});


module.exports = atcSchema;