//custom error classes handling
//create base class then all extends base class
class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}
class NotFoundError extends AppError{
    constructor(message){
        super(message,404)
       // this.statusCode=404
    }
}
class BadRequestError extends AppError{
    constructor(message){
        super(message,400)
        //this.statusCode=400
    }
}
module.exports={AppError,NotFoundError,BadRequestError}