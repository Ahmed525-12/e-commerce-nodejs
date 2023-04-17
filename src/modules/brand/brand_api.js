const { uploadSingleFile } = require('../../utils/fileUpload');
const { createBrand,getBrands, getBrand ,updateBrand,deleteBrand} = require('./brand_services');

const router =require('express').Router();

router.post('/',uploadSingleFile('image','brand'), createBrand)
router.get('/', getBrands)
router.get('/:id', getBrand)
router.put('/:id',uploadSingleFile('image','brand'), updateBrand)
router.delete('/:id', deleteBrand)


module.exports = router;