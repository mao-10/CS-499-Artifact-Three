var express = require('express');
var router = express.Router();
var controller = require('../controllers/pets');

/* GET pets page */

router.get('/', controller.pets);

module.exports = router;
