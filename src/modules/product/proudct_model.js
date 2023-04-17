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
                required:[true,"this required"],

        ref:"category"
    },
    subcategory:{
        type:Types.ObjectId,
        required:[true,"this required"],

        ref:"subcategory"
    },
    brand:{
        type:Types.ObjectId,
        required:[true,"this required"],

        ref:"brand"
    },
    ratingAverage:{
        type:Number,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
        default:0
    
    }
},{
    timestamps:true
}
)
schema.post('init',(doc)=>{
 
    doc.imageCover="localhost:3000/product/"+doc.imageCover
    let imgs=[]
    doc.images.forEach((elm)=>{
        
        imgs.push("localhost:3000/product/"+elm)
    })
    doc.images=imgs
})

module.exports=model("product",schema)