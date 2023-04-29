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
//////////////////////////////////// cloudinary /-------------------------------


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
////////////////////////////////////////////////////////// deleteDocument//////////////////////////////////////////



exports.createDocument=(model)=>{

    return catchAsyncError(async(req,res,next)=>{

        req.body.slug=slugify(req.body.name); 

          // Upload
          if (req.file) {
            cloudinary.uploader.upload(req.file.path,async(err,result)=>{

              req.body.slug=slugify(req.body.name);

              req.body.image=result.secure_url

              const document=new model(req.body,{new:true});

          await document.save();

          console.log(result.secure_url);

            })

            }     
            
      if (req.files) {
            
            req.body.imageCover=req.files.imageCover[0].filename

            let imgs=[]

            req.files.images.forEach( async(elm)=>{

              const { secure_url } = await cloudinary.uploader.upload(elm.path, { folder: `OnlineCommerce/${req.body.name}` })

              imgs.push(secure_url)
             
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

/////////////////////////////////////////////////////////createDocument///////////////////////////////////////////////////////////////

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


//////////////////////////////////////////////////////////////getDocuments/////////////////////////////////////////////


exports.getDocument=(model)=>{

    return catchAsyncError(async(req,res,next)=>{
        
      const{id}=req.params;

      const document=await  model.findById(id);

          if (!document) {

            next (new AppError('Not  found',404))

          } else {
            
            return  res.status(201).json(document)

          }

        })
}

//////////////////////////////////////////////////////////////getDocument/////////////////////////////////////////////


exports.updateDocument=(model)=>{
    return catchAsyncError(async(req,res,next)=>{

        const{id}=req.params;
         const idCheck= await model.findById(id)
        if (idCheck) {
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
          } 
          else {
        
        next (new AppError('Not  found ',404))

              }
      })
}

//////////////////////////////////////////////////////////////getDocument/////////////////////////////////////////////
