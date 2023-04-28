const { uploadSingleFile } = require('../../utils/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user_auth');
const { createBrand,getBrands, getBrand ,updateBrand,deleteBrand} = require('./brand_services');

const router =require('express').Router();

router.post('/',protectedRoutes,allowedTo("user","admin"),uploadSingleFile('image','brand'), createBrand)
router.get('/', getBrands)
router.get('/:id', getBrand)
router.put('/:id',protectedRoutes,allowedTo("user","admin"),uploadSingleFile('image','brand'), updateBrand)
router.delete('/:id', protectedRoutes,allowedTo("user","admin"),deleteBrand)


module.exports = router;