// userRoutes.js
const express = require('express');
const router = express.Router();
const vehicletblRoutes = require('../controllers/vehicleController');



router.get('/:id', vehicletblRoutes.getAllVehiclesForBiz);
 router.post('/create', vehicletblRoutes.createVehicleForBiz);
 router.post('/update', vehicletblRoutes.updateVehicle);






module.exports = router;