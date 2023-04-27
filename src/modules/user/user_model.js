const { Schema , model , Types} = require("mongoose");
const bcrypt = require('bcrypt');

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
        enum:["admin","user"],
        default:"user"
    },
    isActive:{
        type:Boolean,
        default:true,
    }

},
{
    timestamps:true
})
schema.pre("save",async function () {
    this.password=await bcrypt.hash(this.password,Number(process.env.SaltRound))
})
schema.pre("findOneAndUpdate",async function () {
    this._update.password=await bcrypt.hash(this._update.password,Number(process.env.SaltRound))
})

module.exports=model("user",schema)