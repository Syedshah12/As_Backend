// userRoutes.js
const express = require('express');
const router = express.Router();
const accounttblRoutes = require('../controllers/accounttblController.js');
// const maxId = require('../middleware/maxId.js');

// CRUD endpoints for users
// router.post('/', userController.createUser);
// router.put('/:id', accounttblRoutes.updateAccount);
router.post('/create',accounttblRoutes.createAccount);
router.post('/update',accounttblRoutes.updateAccount);
router.get('/allAccounts',accounttblRoutes.getAllAccounts);
router.get('/:id',accounttblRoutes.getAccounts);
router.get('/balance/:id',accounttblRoutes.getAccountsBalanceSheet);
router.get('/InActive/:id',accounttblRoutes.getAccountsBalanceSheetNotActive);
router.get('/',accounttblRoutes.getMasterAccounts);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;