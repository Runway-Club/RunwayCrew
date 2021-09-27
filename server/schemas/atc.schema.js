const mongoose = require('mongoose');


const atcSchema = new mongoose.Schema({
    address : '',
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
    uid : '',
    id:''
});


module.exports = atcSchema;