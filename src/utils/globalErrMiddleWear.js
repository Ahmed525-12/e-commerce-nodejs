module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
      if (process.env.MODE == 'DEV') {
        devMode(err,res)
      } else {
        prodMode(err,res)
      }
    }
  
    let devMode=(err,res)=>{ res.status(err.statusCode).json({message :err.message,stack:err.stack})}



    let prodMode=(err,res)=>{ res.status(err.statusCode).json({message :err.message})}