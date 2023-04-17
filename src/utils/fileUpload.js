const multer  = require('multer');
const AppError = require('./appErrors');

exports.uploadSingleFile=(fieldName,folderName)=>{


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' + file.originalname)
    }
  })


  



  function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)  
    } else {
        cb(new AppError("image only",400), false)
    }

  
  }
  const upload = multer({ storage ,fileFilter})
  return upload.single(fieldName)
}





exports.uploadMixFiles=(arrayOfFields,folderName)=>{


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' + file.originalname)
    }
  })


  



  function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)  
    } else {
        cb(new AppError("image only",400), false)
    }

  
  }
  const upload = multer({ storage ,fileFilter})
  return upload.fields(arrayOfFields)
}