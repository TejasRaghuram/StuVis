require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const students = require('./routes/students');
const incidents = require('./routes/incidents');

const server = express();

server.use(cors());

server.use(express.json());

server.use('/api/students', students);
server.use('/api/incidents', incidents);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected');
    server.listen(4000, () => {
        console.log('listening');
    });
}).catch((error) => {
    console.log(error);
});