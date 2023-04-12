const ProductModel = require('./proudct_model');
const factory =require("../../utils/handelerFactory")
const slugify = require('slugify');
const catchAsyncError= require('express-async-handler');
const AppError = require('../../utils/appErrors');



exports.createProducts=factory.createDocument(ProductModel);



exports.getProducts=factory.getDocuments(ProductModel);


exports.getProduct=factory.getDocument(ProductModel);



exports.updateProduct=factory.updateDocument(ProductModel);


exports.deleteProduct=factory.deleteDocument(ProductModel)

exports.getProductByPrice=catchAsyncError(async(req,res,next)=>{
    let page = req.query.page*1 ||1
    if (page <0) page=1
    const limit=8
    const skip=(page-1)*limit
let queryString=req.query
queryString=JSON.stringify(queryString)
queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
queryString=JSON.parse(queryString)

    const document=await  ProductModel.find(queryString).skip(skip).limit(limit);
          
            if (!document) {
               return next (new AppError('No document found',404))
              } else {
                
                return  res.status(201).json({page,document})
              }
          })