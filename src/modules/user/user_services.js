const UserModel = require("./user_model");
const slugify = require("slugify");
const AppError = require("../../utils/appErrors");
const catchAsyncError= require('express-async-handler');
const factory = require('../../utils/handelerFactory')

// to add new barnds
exports.createUser = catchAsyncError(async (req, res,next) => {
    const isUser= await UserModel.findOne({email:req.body.email})
    if (isUser) return next(new AppError("user already exist ",401))
    
        let User = new UserModel(req.body);
        await User.save();
        res.status(200).json(User);

   
});

// to get all Users
exports.getUsers = catchAsyncError(async (req, res) => {
    let Users = await UserModel.find({});
    res.status(200).json(Users);
});

// to get specific User
exports.getUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findById(id);
    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to update specific User
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to changePassword specific User

exports.changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    req.body.passwordChangedAt=Date.now()
        let User = await UserModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to delete specific User
exports.deleteUser = factory.deleteDocument(UserModel)

exports.logout=catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    req.body.passwordChangedAt=Date.now()
    res.json({message:"done"})
});
