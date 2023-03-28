const { createsubCategories, getsubCategories, getsubCategory, updatesubCategory, deletesubCategory } = require('./subcategory_services');

const router = require('express').Router({mergeParams:true});


router.post('/', createsubCategories)
router.get('/', getsubCategories)
router.get('/:id', getsubCategory)
router.put('/:id', updatesubCategory)
router.delete('/:id', deletesubCategory)


module.exports = router;