//HTTP server

//create express app
const exp=require('express')
const app=exp()
require('dotenv').config()      //process.env

//assign port number
const port=process.env.PORT||4000
app.listen(port,()=>{console.log("server listening to port 4000")})



const path=require('path')

//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))


//Get mongo Client
const mClient=require('mongodb').MongoClient;

//connect to mongodb server
mClient.connect('mongodb://127.0.0.1:27017/demodb')
.then(dbRef=>{
    //get database obj
    let dbObj=dbRef.db('demodb')
    //create collection objects
    let userCollection=dbObj.collection("userscollection")
    let productCollection=dbObj.collection("productscollection")

    //share collection objects to API's
    app.set("userCollection",userCollection)
    app.set("productCollection",productCollection)
    
    console.log("connected to database successfully")
})
.catch(err=> console.log("Database connection err is ",err) )



//import userApp and productApp
const userApp=require('./APIs/userAPI')
const productApp=require('./APIs/productAPI')
const { request } = require('http')

//forward request to userAPI when url path starts with /users-api
app.use('/user-api',userApp)
//forward request to productAPI when url path starts with  products-api/
app.use('/product-api',productApp)

//create middleware-1
const middleware1=(request,response,next)=>{

    //request verification logic
    console.log("middleware-1 is executed")

    //send res
    //response.send({message:"Response from moddleware-1"})


    //forward to next
    next()            //indicates the next code
}


//create middleware-2
const middleware2=(request,response,next)=>{
    
    //request verification logic
    console.log("middleware-2 is executed")
    
    //send res
    //response.send({message:"Response from moddleware-2"})

    next()

}

/*
//execute middleware-1 for every request
app.use(middleware1)
app.use(middleware2)

*/
/*
app.get("/test",middleware1,(request,response)=>{
    response.send({message:"Test route"})
})
*/



//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)



//create a middleware to handle invalid path
const invalidPathHandlingMiddleware=(request,response,next)=>{
    response.send({message:"Invalid path"})
}
app.use(invalidPathHandlingMiddleware)



//create error handling middleware
const errHandler=(error,request,response,next)=>{
    response.send({"error-message":error.message})
}
app.use(errHandler)