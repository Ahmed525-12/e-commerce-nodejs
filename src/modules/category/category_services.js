const CategoryModel = require('./category_model');
const factory =require("../../utils/handelerFactory")



exports.createCategories=factory.createDocument(CategoryModel)


exports.getCategories= factory.getDocuments(CategoryModel)


exports.getCategory=factory.getDocument(CategoryModel)



exports.updateCategory=factory.updateDocument(CategoryModel)


exports.deleteCategory=factory.deleteDocument(CategoryModel)