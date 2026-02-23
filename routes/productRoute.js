const express =  require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    queryPagination
} = require('../controllers/productController');


router.post('/create', auth, adminOnly, addProduct);
router.put('/update/:id', auth, adminOnly, updateProduct);
router.delete('/delete/:id', auth, adminOnly, deleteProduct);
router.get('/', getProducts);
router.get('/search', queryPagination);
router.get('/:id', getProductById);


module.exports = router;