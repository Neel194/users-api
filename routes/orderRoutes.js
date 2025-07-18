const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const authMiddleWare = require('../middlewares/authMiddleware');

router.get('/', getOrders);
router.post('/', authMiddleWare, createOrder);  // only logged in user 

module.exports = router;
