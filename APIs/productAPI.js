//create mini-express app (Separate router)
const exp=require('express')
const productApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')

//CREATE PRODUCTS API

productApp.get('/get-products',expressAsyncHandler(async(request,response)=>{
    //get product collection obj
   const productCollection=request.app.get('productCollection')
   //get users
   let products=await productCollection.find().toArray()
   
   //send res
    response.status(200).send({message:"All Products",payload:products})
   
}))

//parse body of request(concept of middleware)
productApp.use(exp.json())

productApp.post('/create-product',expressAsyncHandler(async(request,response)=>{
    //get product collection obj
   const productCollection=request.app.get('productCollection')

    //get product from request
    const newProduct=request.body;

   //save or insert or create newProduct in productCollection
   await productCollection.insertOne(newProduct)
   
    response.status(201).send({message:"Product created"})
  
}))

productApp.delete('/delete-product/:id',expressAsyncHandler(async(request,response)=>{
    //get product collection obj
   const productCollection=request.app.get('productCollection')
   //get id from url
   let productId=(+request.params.id)
    //delete product by id
   let dbRes=await productCollection.deleteOne({id:productId})
    //send res
    response.status(200).send({message:"product deleted",status:dbRes})
   
}))

//export productApp
module.exports=productApp