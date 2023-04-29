const { uploadSingleFile } = require('../../utils/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user_auth');
const { createReview,getReviews, getReview ,updateReview,deleteReview} = require('./reviews_services');

const router =require('express').Router();

router.post('/',protectedRoutes,allowedTo("user"),uploadSingleFile('image','Review'), createReview)
router.get('/', getReviews)
router.get('/:id', getReview)
router.put('/:id',protectedRoutes,allowedTo("user"),uploadSingleFile('image','Review'), updateReview)
router.delete('/:id', protectedRoutes,allowedTo("user","admin"),deleteReview)


module.exports = router;