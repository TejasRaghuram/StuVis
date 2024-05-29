const express = require('express');

const router = express.Router();

const {
    create,
    all,
    get
} = require('../controllers/students');

router.post('/create', create);

router.get('/all', all);

router.get('./get', get);

module.exports = router;