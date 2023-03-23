const CategoryModel = require('./category_model');
const slugify = require('slugify');
const catchAsyncError= require('express-async-handler')



exports.createCategories=catchAsyncError(async(req,res)=>{
  const{name}=req.body
      const category=new CategoryModel({name,slug:slugify(name)});
      await category.save();
     return res.status(201).json(category)
  })



exports.getCategories=catchAsyncError(async(req,res)=>{

  const categories=await  CategoryModel.find({});

  if (!categories) {
     return res.status(404).json({message:"not found"})
    } else {
      
      return  res.status(201).json(categories)
    }
})


exports.getCategory=catchAsyncError(async(req,res)=>{
  const{id}=req.params;
      const category=await  CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({message:"not found"})
    } else {
      
      return  res.status(201).json(category)
    }
  })



exports.updateCategory=catchAsyncError(async(req,res)=>{
  const{id}=req.params;
  const{name}=req.body;
      const category=await  CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    if (!category) {
      return res.status(404).json({message:"not found"})
    } else {
      
      return  res.status(201).json(category)
    }
})


exports.deleteCategory=catchAsyncError(async(req,res)=>{
  const{id}=req.params;
 
      const category=await  CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({message:"not found"})
    } else {
      
      return  res.status(201).json({message:"successfully deleted",category})
    }
} )