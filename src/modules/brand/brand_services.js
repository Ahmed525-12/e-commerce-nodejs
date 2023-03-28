const BrandModel = require('./brand_model');
const factory =require("../../utils/handelerFactory")



exports.createBrand=factory.createDocument(BrandModel);



exports.getBrands=factory.getDocuments(BrandModel)


exports.getBrand=factory.getDocuments(BrandModel)



exports.updateBrand=factory.updateDocument(BrandModel)


exports.deleteBrand=factory.deleteDocument(BrandModel)