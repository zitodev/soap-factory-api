const  express = require('express');
const router = express.Router();

const {
    adminRegister,
    adminLogin,
    addStaff,
    searchStaffs, getStaff
} = require('../controllers/authController');

const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const loginLimiter = require('../middlewares/loginLimiterMiddleware');


router.post('/register', adminRegister);
router.post('/login', loginLimiter, adminLogin);
router.post('/addStaff', auth, adminOnly, upload.single('passport'), addStaff);
router.get('/staff', auth, adminOnly, getStaff);
router.get('/searchStaff', auth, adminOnly, searchStaffs);

module.exports = router;