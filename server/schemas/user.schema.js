const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    contribMetadata : { created: 0, actor: '', updated: 0 },
    dob : '',
    email : '',
    facebook : '',
    gender : '',
    linkIn : '',
    name : '',
    phoneNumber : '',
    photoUrl : '',
    profileMetadata : { updated: 0 },
    roles :[],
    selectedRoles :[],
    uid : ''
});


module.exports = userSchema;