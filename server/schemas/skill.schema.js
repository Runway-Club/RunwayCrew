const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    description: '',
    id: '',
    image: '',
    levels: [],
    metadata: { actor: '', updated: 0, created: 0 },
    name: ''
});


module.exports = skillSchema;