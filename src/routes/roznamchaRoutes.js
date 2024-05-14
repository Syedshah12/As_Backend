// userRoutes.js
const express = require('express');
const router = express.Router();
const roznamchaController = require('../controllers/roznamchaController.js');



router.get('/:id/:startDate/:endDate', roznamchaController.getRoznamcha);
router.get('/all/:id', roznamchaController.getRoznamchaFromAllBiz);
router.post('/create', roznamchaController.createRoznamcha);
router.post('/update', roznamchaController.updateRoznamcha);
router.post('/update/account', roznamchaController.updateRoznamchaForAccount);



module.exports = router;