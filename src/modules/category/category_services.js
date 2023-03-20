const CategoryModel = require('./category_model');

exports.createCategories=async(req,res)=>{
const{name}=req.body
    const category=new CategoryModel({name});
    await category.save();
    res.status(201).json(category)
}



exports.getCategories=async(req,res)=>{

    const categories=new CategoryModel.find({});
  
    res.status(201).json(categories)
}


exports.getCategory=async(req,res)=>{
const{id}=req.params;
    const category=new CategoryModel.findById(id);
  
    res.status(201).json(category)
}