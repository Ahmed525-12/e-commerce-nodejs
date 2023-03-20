const { createCategories,getCategories, getCategory } = require('./category_services');

const router =require('express').Router();


router.post('/createCategories', createCategories)
router.get('/getCategories', getCategories)
router.get('/getCategory/:id', getCategory)


module.exports = router;