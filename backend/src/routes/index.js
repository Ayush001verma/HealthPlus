const express = require('express');
const router = express.Router();

const testRoutes = require('./testRoutes');
const chatRoutes = require('./chatRoutes');
const healthPlanRoutes = require('./healthPlanRoutes');
const imageAnalysisRoutes = require('./imageAnalysisRoutes');
const mapsRoutes = require('./mapsRoutes');

router.use('/', testRoutes);
router.use('/', chatRoutes);
router.use('/', healthPlanRoutes);
router.use('/', imageAnalysisRoutes);
router.use('/', mapsRoutes);

module.exports = router;
