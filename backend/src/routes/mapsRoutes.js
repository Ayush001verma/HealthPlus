const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');

// Route: GET /api/maps/nearby-stores
router.get('/maps/nearby-stores', mapsController.getNearbyStores);

module.exports = router;
