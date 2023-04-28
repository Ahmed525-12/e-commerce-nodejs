const { createCategories,getCategories, getCategory ,updateCategory,deleteCategory} = require('./category_services');
const subCategoriesRoute = require('../subcategory/subcategory_api');
const { uploadSingleFile } = require('../../utils/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user_auth');
const router =require('express').Router();


router.use("/:categoryid/subcategory",subCategoriesRoute)
router.post('/',protectedRoutes,allowedTo("user","admin"),uploadSingleFile('image','category') ,createCategories)
router.get('/', getCategories)
router.get('/:id', getCategory)
router.put('/:id',protectedRoutes,allowedTo("user","admin"),uploadSingleFile('image','category'), updateCategory)
router.delete('/:id',protectedRoutes,allowedTo("user","admin"), deleteCategory)


module.exports = router;