const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

// RUTAS
router.get('/coaches',coachController.getAllCoaches);
router.post('/coaches',coachController.createCoach);

module.exports = router;