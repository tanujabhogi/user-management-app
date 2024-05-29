//create mini-express app (Separate router)
const exp=require('express')
const userApp=exp.Router()

require('dotenv')       //process.env

//import express-async-handler
const expressAsyncHandler=require('express-async-handler')

//import multerObj
const multerObj=require('./middlewares/cloudinaryConfig')

//import bcryptjs
const bcryptjs=require('bcryptjs')

//import jsonwebtoken
const jwt=require('jsonwebtoken')

//import Token verification middleware
const verifyToken=require('./middlewares/verifyToken')

//Body parser
userApp.use(exp.json())


//CREATE USERS API

//1.register user
//PUBLIC ROUTE
userApp.post('/register-user',multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{
    //get user colection
    const userCollectionObj=request.app.get("userCollection")
    
    //get user from client
    const newUser=JSON.parse(request.body.user);

    //verify user if already exists
    const userOfDB=await userCollectionObj.findOne({username:newUser.username})

    //if user already exists
    if(userOfDB!==null){
        response.status(200).send({message:"User already exists"})
    }

    //if user doesnot exists
    else{

        //add CDN link of cludinary image o userObj
        newUser.image=request.file.path;
        //hash the password of new user
        let hashedPassword=await bcryptjs.hash(newUser.password,6)
        //replace plain password with hashedPassword
        newUser.password=hashedPassword
        //insert user
        await userCollectionObj.insertOne(newUser)
        response.status(201).send({message:"user created"})
    }

}))

//2.1.get all users
//PRIVATE ROUTE(as it contains users data)
userApp.get('/get-users',expressAsyncHandler(async(request,response)=>{
    //get user colection
    const userCollectionObj=request.app.get("userCollection")

    //get all users
    let users=await userCollectionObj.find().toArray()

    //send response
    response.status(200).send({message:"Users",payload:users})
}))

//2.2.get user by username
//PRIVATE ROUTE
userApp.get('/get-user/:username',verifyToken,expressAsyncHandler(async(request,response)=>{
    console.log(request.headers)
    
    //get user colection
    const userCollectionObj=request.app.get("userCollection")
    //get username from url
    let usernameOfUrl=request.params.username;
    
    //find user by username
    const user=await userCollectionObj.findOne({username:usernameOfUrl})
    
    //send response
    response.status(200).send({message:"User",payload:user})

}))

//3.update user
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
    //get user colection
    const userCollectionObj=request.app.get("userCollection")
    //get modified user
    const modifiedUser=request.body
    //update user by username
    let res=await userCollectionObj.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
    //send response
    response.status(200).send({message:"User updated",status:res})
}))

//4.delete user by username
//PRIVATE ROUTE
userApp.delete('/delete-user/:username',verifyToken,expressAsyncHandler(async(request,response)=>{
    //get user colection
    const userCollectionObj=request.app.get("userCollection")
    //get username from url
    let usernameOfUrl=request.params.username;

    //delete user by username
    let res=await userCollectionObj.deleteOne({username:usernameOfUrl})

    //send response
    response.status(200).send({message:"User deleted",status:res})
}))

//5.user login
//PUBLIC ROUTE
userApp.post('/login-user',expressAsyncHandler(async(request,response)=>{
    //get user colection
    const userCollectionObj=request.app.get("userCollection")
    //get user from client
    const userCredentialsObj=request.body;

    //verify username
    let userOfDB=await userCollectionObj.findOne({username:userCredentialsObj.username})

    //if user does not exists then username is invalid
    if(userOfDB===null){
        response.status(200).send({message:"Invalid username"})
    }
    //if username is valid
    else{
        //compare passwords
        let isEqual=await bcryptjs.compare(userCredentialsObj.password,userOfDB.password)
        //if passwords are not matched
        if(isEqual===false){
            response.status(200).send({message:"Invalid password"})
        }
        //if passwords matched
        else{
            //create JWT() token
            let signedJWTToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:15})

            //send token in response
            response.status(200).send({message:"success",token:signedJWTToken,user:userOfDB})

        }

    }
}))


//PROTECTED TEST ROUTE
userApp.get('/test',verifyToken,(request,response)=>{
    console.log(request.headers)
    response.send({message:"Reply from protected route"})
})


//export userApp
module.exports=userApp;