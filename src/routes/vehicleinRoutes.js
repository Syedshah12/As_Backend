// userRoutes.js
const express = require('express');
const router = express.Router();
const vehicleInTblRoutes = require('../controllers/vehicleInController');



router.get('/:id', vehicleInTblRoutes.getAllExistingStock);
router.post('/create', vehicleInTblRoutes.insertStockIn);
router.post('/update', vehicleInTblRoutes.updateVehicleIn);







module.exports = router;