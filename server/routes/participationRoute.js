const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController')

// Rutas
router.get('/participation', participationController.getAllParticipations);
router.post('/participation', participationController.createParticipation);
router.put('/participation/:id', participationController.updateParticipation);
router.delete('/participation/:id', participationController.deleteParticipation);

module.exports = router;