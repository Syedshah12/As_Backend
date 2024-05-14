// userRoutes.js
const express = require('express');
const router = express.Router();
const buisnesstbl = require('../controllers/buisnesstblController.js');

// CRUD endpoints for users
// router.post('/', userController.createUser);
// router.put('/:id', accounttblRoutes.updateAccount);
router.post('/add', buisnesstbl.createBuisness);
router.post('/update', buisnesstbl.updateBuisness);
router.get('/fetchBuisness', buisnesstbl.fetchAllBuisness);
router.get('/bizTest/:id', buisnesstbl.userBizRelationTest);
router.get('/biz', buisnesstbl.getBizs);
router.get('/:bizId', buisnesstbl.getBizById);

// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;