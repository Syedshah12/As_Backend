// userRoutes.js
const express = require('express');
const router = express.Router();
const usertblController = require('../controllers/userController.js');

// CRUD endpoints for users
// router.post('/', userController.createUser);
router.post('/create', usertblController.createUser);
router.get('/fetchAdmin', usertblController.selectUsersForAdmin);
router.post('/login', usertblController.loginUser);
router.get('/fetchUsers/:id', usertblController.allUsers);
// router.get('/:id', userController.getUserById);
router.post('/update', usertblController.updateUser);

// router.delete('/:id', userController.deleteUser);

module.exports = router;