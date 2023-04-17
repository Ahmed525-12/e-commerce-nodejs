const slugify = require('slugify');
const catchAsyncError= require('express-async-handler');
const AppError = require('./appErrors');
const GetDocuments = require('./apiFeatuers');
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudApiKey,
  api_secret: process.env.cloudApiSecret
});

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

          // Upload





          if (req.file) {
           
            cloudinary.uploader.upload(req.file.path,async(err,result)=>{
              req.body.slug=slugify(req.body.name);
              req.body.image=result.secure_url
              const document=new model(req.body);
          await document.save();
            })
           

            
            }     
            
          
           if (req.files) {
            req.body.imageCover=req.files.imageCover[0].filename

            let imgs=[]
            req.files.images.forEach((elm)=>{
              imgs.push(elm.filename)
            })
            req.body.images=imgs
           }

                  
              
          
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
     let apiFeature=new GetDocuments(model.find(),req.query).paginate().sort().filter().search().selectFields()
 
      const document=await  apiFeature.mongooseQuery

        if (!document) {
           return next (new AppError('No document found',404))
          } else {
            
            return  res.status(201).json({page:apiFeature.page,document})
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
      req.body.image=req.file.filename
            const document=await  model.findByIdAndUpdate(id,req.body,{new:true});
          if (!document) {
            next (new AppError('No documents found',404))
          } else {
            
            return  res.status(201).json(document)
          }
      })
}

