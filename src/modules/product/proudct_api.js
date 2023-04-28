const { uploadMixFiles } = require('../../utils/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user_auth');
const { createProducts,getProducts, getProduct ,updateProduct,deleteProduct,getProductByPrice} = require('./proudct_services');

const router =require('express').Router();
let Fields=[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 3 }]

router.post('/', protectedRoutes,allowedTo("user","admin"),uploadMixFiles(Fields,'product'),createProducts)
router.get('/', getProducts)
router.get('/prices', getProductByPrice)
router.get('/:id', getProduct)
router.put('/:id',protectedRoutes,allowedTo("user","admin"), updateProduct)
router.delete('/:id', protectedRoutes,allowedTo("user","admin"),deleteProduct)


module.exports = router;