const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
    loginTime: [],
    email: String,
});


module.exports = userSchema;