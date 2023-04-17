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
    image:String
},
{
    timestamps:true
})
schema.post('init',(doc)=>{
    doc.image="localhost:3000/category/"+doc.image
})
module.exports=model("category",schema)