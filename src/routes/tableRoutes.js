// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/tableControllers.js');

// CRUD endpoints for users
// router.post('/', userController.createUser);
router.get('/:table', userController.getTableData);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
