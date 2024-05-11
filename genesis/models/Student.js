const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    residential_area: {
        type: String,
        required: true
    },
    economically_disadvantaged: {
        type: Boolean,
        required: true
    },
    special_education: {
        type: Boolean,
        required: true
    },
    gifted: {
        type: Boolean,
        required: true
    },
    chronically_absent: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', student);