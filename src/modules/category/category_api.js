const { createCategories,getCategories, getCategory ,updateCategory,deleteCategory} = require('./category_services');
const subCategoriesRoute = require('../subcategory/subcategory_api');
const { uploadSingleFile } = require('../../utils/fileUpload');
const router =require('express').Router();


router.use("/:categoryid/subcategory",subCategoriesRoute)
router.post('/',uploadSingleFile('image','category') ,createCategories)
router.get('/', getCategories)
router.get('/:id', getCategory)
router.put('/:id',uploadSingleFile('image','category'), updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router;