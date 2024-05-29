const jwt = require('jsonwebtoken')
require('dotenv')       //process.env

const verifyToken=(request,response,next)=>{
    //token verification logic


    //get bearer token from headers of request
    let bearerToken=request.headers.authorization;
    //if bearer token doesnot exists,unauthorised request
    if(bearerToken===undefined){
        response.send({message:"Unauthorised request"})
    }
    //if bearer token exists,get token
    else{
        const token=bearerToken.split(" ")[1]
        //verify token using secret token
        try{
            jwt.verify(token,process.env.SECRET_KEY)
            next()
        }catch(err){
            response.send({message:err.message})
        }
    }
        
    
    //if token is valid,allow to access protected route
    //else, ask to login again
}

module.exports=verifyToken;