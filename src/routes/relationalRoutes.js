// userRoutes.js
const express = require('express');
const router = express.Router();
const relationalController = require('../controllers/relationalController.js');





router.get('/biz/:id', relationalController.userBizRelation);
router.get('/biz', relationalController.AllUserBizRelation);
router.get('/items/:id', relationalController.userBizRealtionByUidByBizId);


module.exports = router;