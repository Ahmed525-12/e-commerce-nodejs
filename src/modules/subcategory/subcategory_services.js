const subCategoryModel = require('./subcategory_model');
const catchAsyncError = require('express-async-handler');
const AppError = require('../../utils/appErrors');
const factory =require("../../utils/handelerFactory")



exports.createsubCategories = factory.createDocument(subCategoryModel);



exports.getsubCategories = catchAsyncError(async (req, res, next) => {

    let filter = {}


    if (req.params.categoryid) {

    
        filter = { category: req.params.categoryid };
        
    }

    const subCategories = await subCategoryModel.find(filter);

    if (!subCategories) {
        return next(new AppError('No subCategories found', 404))
    } else {

        return res.status(201).json(subCategories)
    }
})


exports.getsubCategory = factory.getDocument(subCategoryModel);



exports.updatesubCategory = factory.updateDocument(subCategoryModel);


exports.deletesubCategory = factory.deleteDocument(subCategoryModel);