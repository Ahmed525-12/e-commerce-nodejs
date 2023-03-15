const { Schema , model , Types} = require("mongoose");

const schema=Schema({
    name :{
        type:String,
        required:[true,"this required"]
    },
 phone:{
type:String,
required:true,

 },
    imageProfile:String,

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       minlength:[6]
    },
    role:{
        type:String,
        enum:["admin","user"]
    },
    isActive:{
        type:Boolean,
        default:true,
    }

},
{
    timestamps:true
})

module.exports=model("user",schema)