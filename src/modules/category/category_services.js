const CategoryModel = require('./category_model');
const slugify = require('slugify');
const catchAsyncError= require('express-async-handler');
const AppError = require('../../utils/appErrors');



exports.createCategories=catchAsyncError(async(req,res,next)=>{
  const{name}=req.body
      const category=new CategoryModel({name,slug:slugify(name)});
      await category.save();
      if (category.save()) {
        return res.status(201).json(category)
      } else {
        next (new AppError('No create Categories',400))
      }
     
  })



exports.getCategories=catchAsyncError(async(req,res,next)=>{

  const categories=await  CategoryModel.find({});

  if (!categories) {
     return next (new AppError('No categories found',404))
    } else {
      
      return  res.status(201).json(categories)
    }
})


exports.getCategory=catchAsyncError(async(req,res,next)=>{
  const{id}=req.params;
      const category=await  CategoryModel.findById(id);
    if (!category) {
      next (new AppError('No  found',404))
    } else {
      
      return  res.status(201).json(category)
    }
  })



exports.updateCategory=catchAsyncError(async(req,res,next)=>{
  const{id}=req.params;
  const{name}=req.body;
      const category=await  CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    if (!category) {
      next (new AppError('No categories found',404))
    } else {
      
      return  res.status(201).json(category)
    }
})


exports.deleteCategory=catchAsyncError(async(req,res,next)=>{
  const{id}=req.params;
 
      const category=await  CategoryModel.findByIdAndDelete(id);
    if (!category) {
      next(new  AppError('No categories found',404))
    } else {
      
      return  res.status(201).json({message:"successfully deleted",category})
    }
} )