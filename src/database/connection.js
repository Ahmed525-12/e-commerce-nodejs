const mongoose=  require("mongoose") ;

 exports.connectDB=async()=>{
    return await mongoose.connect(process.env.DBURI)
    .then(res => {
        console.log(`Connected DB Success on  ${process.env.DBURI}`);
    }).catch(err=>console.log(`Fail to connectDB ${err}`))
}
