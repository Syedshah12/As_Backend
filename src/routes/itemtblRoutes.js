// userRoutes.js
const express = require('express');
const router = express.Router();
const itemTbl = require('../controllers/itemController.js');




router.post('/create', itemTbl.createItem);
router.post('/update', itemTbl.updateItem);
router.get('/fetchItems/:userId/:bizId', itemTbl.allItemsByUidBizId);
// router.get('/fetchItem/:id', itemTbl.getItem);
// router.get('/biz', relationalController.AllUserBizRelation);

module.exports = router;