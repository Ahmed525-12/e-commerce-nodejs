const { createBrand,getBrands, getBrand ,updateBrand,deleteBrand} = require('./brand_services');

const router =require('express').Router();

router.post('/', createBrand)
router.get('/', getBrands)
router.get('/:id', getBrand)
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)


module.exports = router;