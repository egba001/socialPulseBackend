const mongoose = require('mongoose');

const business = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Business', business);