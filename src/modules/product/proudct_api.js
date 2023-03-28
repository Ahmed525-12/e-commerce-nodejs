const { createProducts,getProducts, getProduct ,updateProduct,deleteProduct} = require('./proudct_services');

const router =require('express').Router();


router.post('/', createProducts)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router;