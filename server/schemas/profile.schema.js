const mongoose = require('mongoose');

const profile = new mongoose.Schema({
    address: String,
    contribMetadata:{
        actor: String,
        created: Number,
        update: Number,
    },
    dob: String,
    email: String,
    facebook: String,
    gender: String,
    linkIn: String,
    name: String,
    phoneNumber: String,
    photoUrl: String,
    profileMetadata:{
        update: Number,
    },
    roles:[],
    selectedRoles:[],
    uid: String,
})
module.exports = profile;