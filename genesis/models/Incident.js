const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incident = new Schema({
    id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    students: {
        type: [{ name: String, id: Number }],
        required: true
    },
    school: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Incident', incident);