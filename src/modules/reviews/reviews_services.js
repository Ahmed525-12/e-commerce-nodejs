const ReviewsModel = require('./reviews_model');
const factory =require("../../utils/handelerFactory")



exports.createReview=factory.createDocument(ReviewsModel);



exports.getReviews=factory.getDocuments(ReviewsModel)


exports.getReview=factory.getDocuments(ReviewsModel)



exports.updateReview=factory.updateDocument(ReviewsModel)


exports.deleteReview=factory.deleteDocument(ReviewsModel)