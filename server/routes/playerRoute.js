const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController')

//Rutas
router.get('/player', playerController.getAllPlayers);
router.post('/player', playerController.createPlayer);
router.put('/player/:id', playerController.updatePlayer);
router.delete('/player/:id', playerController.deletePlayer);

module.exports = router;