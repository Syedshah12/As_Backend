const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController.js');





router.get('/roznamcha/:accId/:bizId',reportsController.getRoznamchaForAccount);
router.get('/roznamcha/:accId',reportsController.getMasterRoznamchaReport);
router.post('/admin/:accId',reportsController.getAdminRoznamchaReport);
router.post('/adminVehicleIn/:accId',reportsController.getAdminVehicleInReport);
router.post('/adminVehicleOut/:accId',reportsController.getVehicleOutForAdmin);
router.get('/vehicleIn/:accId/:bizId',reportsController.getVehicleInForAccount);
router.get('/vehicleIn/:accId',reportsController.getVehicleInForMasterAccount);
router.get('/vehicleOut/:accId',reportsController.getVehicleOutForMasterAccount);
router.get('/vehicleOut/:accId/:bizId',reportsController.getVehicleOutForAccount);
// router.get('/biz', relationalController.AllUserBizRelation);
// router.get('/items/:id', relationalController.userBizRealtionByUidByBizId);


module.exports = router;