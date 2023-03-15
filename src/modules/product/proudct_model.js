const { Schema , model , Types} = require("mongoose");

const schema=Schema({
    name :{
        type:String,
        required:[true,"this required"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    imageCover:String,
    description:{
        type:String,
        required:[true,"this required"]

    },
    quantity:{
        type:Number,
        required:[true,"this required"],
        default:0

    },
    colors:[String],
    price:{
        type:Number,
        required:[true,"this required"],
        

    },
    priceAfterDiscount:{
        type:Number,
        required:[true,"this required"],
        

    },
    soldCount:{
        type:Number,
        required:[true,"this required"],
        default:0

    },
    images:[String],
    category:{
        type:Types.ObjectId,
        ref:"category"
    },
    subcategory:{
        type:Types.ObjectId,
        ref:"subcategory"
    },
    brand:{
        type:Types.ObjectId,
        ref:"brand"
    }
})
//6:35

module.exports=model("product",schema)