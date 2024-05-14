// userRoutes.js
const express = require('express');
const router = express.Router();
const vehicleOutTblRoutes = require('../controllers/vehicleoutController');



router.get('/:id', vehicleOutTblRoutes.getvehicleOutStock);
router.post('/create', vehicleOutTblRoutes.insertStockOut);
router.post('/update', vehicleOutTblRoutes.updateVehicleOut);







module.exports = router;