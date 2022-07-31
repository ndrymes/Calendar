const express = require('express');

const router = express.Router();

const timesController = require('../controllers/index')

router.get('/api/calendar', (req, res) => timesController(req, res) )

module.exports = router;