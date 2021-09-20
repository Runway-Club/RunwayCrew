const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    credit : 0,
        description : '',
        exp : 0,
        image : '',
        metadata : { created: 0, actor: '', updated: 0 },
        name : '',
        skills : [],
        id:''
});

module.exports = achievementSchema;