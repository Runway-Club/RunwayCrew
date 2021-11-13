const mongoose = require('mongoose');

const profile = new mongoose.Schema({
    address: '',
    contribMetadata: { updated: 0, actor: '', created: 0 },
    dob: '',
    email: '',
    facebook: '',
    gender: '',
    linkIn: '',
    name: '',
    phoneNumber: '',
    photoUrl: '',
    profileMetadata: { updated: 0 },
    roles: [],
    selectedRoles: [],
    uid: '',
    id:'',
    styleUserRead:''
})
module.exports = profile;