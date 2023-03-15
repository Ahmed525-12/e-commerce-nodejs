const { Schema , model , Types} = require("mongoose");

const schema=Schema({
    name :{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"this required"]
    },
    product: {
        type:Types.ObjectId,
        ref:"product",
        required:[true,"this required"]
    },
    ratingAverage:{
        type:Number,
        min:1,
        max:5
    },
    message:{
        type:String,
        
    },
   
},{
    timestamps:true
})

module.exports=model("reviews",schema)