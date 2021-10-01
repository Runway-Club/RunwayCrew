const mongoose = require('mongoose');

const contribute = new mongoose.Schema({
    achievements: [],
    credit: 0,
    email: '',
    exp: 0,
    skills: [],
    uid: '',
    id:''
});

module.exports = contribute;