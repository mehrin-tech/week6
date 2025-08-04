const {AppError}=require('../utils/errors')

const errorHandleMiddleware=(err,req,res,next)=>{
    // console.log('Error:',err.message)
    // console.log(err.stack)
    //to check is it the object of that classes after handle.
    if(err instanceof AppError){
 
    res.status(err.statusCode).render('error',{status:err.statusCode,
        message:err.message
    })
    }
    res.status(500).render('error',{
        status:500,
        message:'Internal Server Error'
    })

}
module.exports={errorHandleMiddleware}