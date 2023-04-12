const slugify = require('slugify');
const catchAsyncError= require('express-async-handler');
const AppError = require('./appErrors');

exports.deleteDocument=(model)=>{
    return catchAsyncError(async(req,res,next)=>{
        const{id}=req.params;
       
            const document=await  model.findByIdAndDelete(id);
          if (!document) {
            next(new  AppError('No documents found',404))
          } else {
            
            return  res.status(201).json({message:"successfully deleted",document})
          }
      } )
}



exports.createDocument=(model)=>{
    return catchAsyncError(async(req,res,next)=>{
        req.body.slug=slugify(req.body.name);
          const document=new model(req.body);
          await document.save();
          if (document.save()) {
            return res.status(201).json(document)
          } else {
            next (new AppError('No create documents',400))
          }
         
      })
}


exports.getDocuments=(model)=>{

    return catchAsyncError(async(req,res,next)=>{
let page = req.query.page*1 ||1
if (page <0) page=1
const limit=8
const skip=(page-1)*limit


const queryString={...req.query}
delete queryString["page"]//to delete query from the req, query to save performance

        const document=await  model.find(queryString).skip(skip).limit(limit);
      
        if (!document) {
           return next (new AppError('No document found',404))
          } else {
            
            return  res.status(201).json({page,document})
          }
      })
}


exports.getDocument=(model)=>{
    return catchAsyncError(async(req,res,next)=>{
        const{id}=req.params;
            const document=await  model.findById(id);
          if (!document) {
            next (new AppError('No  found',404))
          } else {
            
            return  res.status(201).json(document)
          }
        })
}



exports.updateDocument=(model)=>{
    return catchAsyncError(async(req,res,next)=>{
        const{id}=req.params;
      if (req.body.name) {
          req.body.slug=slugify(req.body.name);
      
      }
            const document=await  model.findByIdAndUpdate(id,req.body,{new:true});
          if (!document) {
            next (new AppError('No documents found',404))
          } else {
            
            return  res.status(201).json(document)
          }
      })
}