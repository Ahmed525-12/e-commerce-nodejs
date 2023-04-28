const UserModel = require("./user_model");
const slugify = require("slugify");
const AppError = require("../../utils/appErrors");
const catchAsyncError= require('express-async-handler');
const factory = require('../../utils/handelerFactory')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// to add new barnds
exports.signup = catchAsyncError(async (req, res,next) => {
    const isUser= await UserModel.findOne({email:req.body.email})
    console.log(isUser);
    if (isUser) return next(new AppError("user already exist ",401))
    
        let User = new UserModel(req.body);
        await User.save();
        res.status(200).json(User);

   
});
// to add new barnds
exports.signin = catchAsyncError(async (req, res,next) => {
    const user= await UserModel.findOne({email:req.body.email})
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const token = jwt.sign({ userId: user._id,name:user.name}, process.env.tokenSignature, { expiresIn: 60 * 60 * 24 })
                return res.status(200).json({ message: "Done", token })
        } else {
            return next(new AppError("password wrong ",404))

        }

    }else{
        return next(new AppError("email or password wrong ",404))
    }
    
       

   
});

exports.protectedRoutes=  catchAsyncError(async (req, res,next) => {
    let token=req.headers.token
    if (!token) {
        next(new AppError("token required ",401))
    }
    let decoded = await jwt.verify(token,process.env.tokenSignature)

    const user = await UserModel.findById(decoded.userId)
    if (!user) {
        next(new AppError("user not found ",404))

    } 
  if (user.passwordChangedAt) {
    let changePassword = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePassword > decoded.iat)
      return next(new AppError("password changed", 401));
  }
req.user=user
next()
});


exports.allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
      if (!roles.includes(req.user.role))
        return next(
          new AppError("YOU are not authorized to acces this route", 401)
        );
  
      next();
    });
  };
  