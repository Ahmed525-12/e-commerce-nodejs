const { createCategories,getCategories, getCategory ,updateCategory,deleteCategory} = require('./category_services');
const subCategoriesRoute = require('../subcategory/subcategory_api');

const router =require('express').Router();

router.use("/:categoryid/subcategory",subCategoriesRoute)
router.post('/', createCategories)
router.get('/', getCategories)
router.get('/:id', getCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router;