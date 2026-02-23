const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

const{
    createSale,
    getSale
} = require('../controllers/salesController');

router.post('/create', auth, adminOnly, createSale);
router.get('/getSale', auth, adminOnly, getSale);

module.exports = router