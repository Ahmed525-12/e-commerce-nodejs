const { Schema , model , Types} = require("mongoose");

const schema=Schema({
    code :{
        type:String,
        required:[true,"this required"],
        unique:true
    },
  expires:{
    type:Date,
  },
  discount:{
    type:Number,
  }
},{
    timestamps:true
})

module.exports=model("coupon",schema)