const { uploadMixFiles } = require('../../utils/fileUpload');
const { createProducts,getProducts, getProduct ,updateProduct,deleteProduct,getProductByPrice} = require('./proudct_services');

const router =require('express').Router();
let Fields=[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 3 }]

router.post('/', uploadMixFiles(Fields,'product'),createProducts)
router.get('/', getProducts)
router.get('/prices', getProductByPrice)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router;