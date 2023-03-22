const CategoryModel = require('./category_model');
const slugify = require('slugify');
exports.createCategories=async(req,res)=>{
const{name}=req.body
    const category=new CategoryModel({name,slug:slugify(name)});
    await category.save();
   return res.status(201).json(category)
}



exports.getCategories=async(req,res)=>{

    const categories=await  CategoryModel.find({});
  
    if (!categories) {
       return res.status(404).json({message:"not found"})
      } else {
        
        return  res.status(201).json(categories)
      }
}


exports.getCategory=async(req,res)=>{
const{id}=req.params;
    const category=await  CategoryModel.findById(id);
  if (!category) {
    return res.status(404).json({message:"not found"})
  } else {
    
    return  res.status(201).json(category)
  }
}



exports.updateCategory=async(req,res)=>{
    const{id}=req.params;
    const{name}=req.body;
        const category=await  CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
      if (!category) {
        return res.status(404).json({message:"not found"})
      } else {
        
        return  res.status(201).json(category)
      }
}


exports.deleteCategory=async(req,res)=>{
    const{id}=req.params;
   
        const category=await  CategoryModel.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({message:"not found"})
      } else {
        
        return  res.status(201).json({message:"successfully deleted",category})
      }
}