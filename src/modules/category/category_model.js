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
    image:{
        type:String,
    }
},
{
    timestamps:true
})

module.exports=model("category",schema)