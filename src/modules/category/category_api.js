const { createCategories,getCategories, getCategory ,updateCategory,deleteCategory} = require('./category_services');

const router =require('express').Router();


router.post('/createCategories', createCategories)
router.get('/getCategories', getCategories)
router.get('/getCategory/:id', getCategory)
router.put('/updateCategory/:id', updateCategory)
router.delete('/deleteCategory/:id', deleteCategory)


module.exports = router;