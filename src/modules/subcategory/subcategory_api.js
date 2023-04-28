const { protectedRoutes, allowedTo } = require('../user/user_auth');
const { createsubCategories, getsubCategories, getsubCategory, updatesubCategory, deletesubCategory } = require('./subcategory_services');

const router = require('express').Router({mergeParams:true});


router.post('/',protectedRoutes,allowedTo("user","admin"), createsubCategories)
router.get('/', getsubCategories)
router.get('/:id', getsubCategory)
router.put('/:id',protectedRoutes,allowedTo("user","admin"), updatesubCategory)
router.delete('/:id', protectedRoutes,allowedTo("user","admin"),deletesubCategory)


module.exports = router;