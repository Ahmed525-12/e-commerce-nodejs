const ProductModel = require('./proudct_model');
const factory =require("../../utils/handelerFactory")



exports.createProducts=factory.createDocument(ProductModel);



exports.getProducts=factory.getDocuments(ProductModel);


exports.getProduct=factory.getDocument(ProductModel);



exports.updateProduct=factory.updateDocument(ProductModel);


exports.deleteProduct=factory.deleteDocument(ProductModel)