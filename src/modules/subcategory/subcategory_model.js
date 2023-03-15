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
    category:{
        type:Types.ObjectId,
        ref:"category"
    }
},{
    timestamps:true
}
)

module.exports=model("subcategory",schema)