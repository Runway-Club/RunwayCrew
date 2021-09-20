const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    description: '',
    id: '',
    image: '',
    metadata: { actor: '', created: 0, updated: 0 },
    name: ''
});

module.exports = roleSchema;